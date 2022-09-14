import {
  CommandHandler,
  useDescription,
  useString,
  createElement,
  Message,
} from 'slshx';

import { APIApplicationCommandInteractionDataStringOption } from 'discord-api-types/v9';

import statuses from './statuses';

export function http(): CommandHandler {
  useDescription(
    'Returns the http.cat image associated with a http return code'
  );
  const str_statuses = Object.keys(statuses).map((e) => String(e));
  const code = useString('code', 'HTTP response code', {
    required: true,
    async autocomplete(interaction) {
      const option = (
        interaction.data.options.find(
          (e) => e.name === 'code'
        ) as APIApplicationCommandInteractionDataStringOption
      ).value;
      return str_statuses
        .filter((status) => status.startsWith(option))
        .slice(0, 25);
    },
  });

  if (!str_statuses.includes(code))
    return () => <Message ephemeral>Invalid HTTP status code</Message>;

  return async () => {
    const data = await fetch('https://http.cat/' + code).then((res) =>
      res.blob()
    );

    return (
      <Message
        ephemeral
        attachments={[new File([data], code + '.jpg', { type: 'image/jpeg' })]}
      />
    );
  };
}
