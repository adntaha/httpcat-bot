import {
  CommandHandler,
  useDescription,
  useString,
  createElement,
  Message,
} from 'slshx';

import { APIApplicationCommandInteractionDataStringOption } from 'discord-api-types/v9';

import { statuses } from './constants';

export function http(): CommandHandler {
  useDescription(
    'Returns the http.cat image associated with a http return code'
  );
  const code = useString('code', 'HTTP response code', {
    required: true,
    async autocomplete(interaction) {
      const option = (
        interaction.data.options.find(
          (e) => e.name === 'code'
        ) as APIApplicationCommandInteractionDataStringOption
      ).value;
      return statuses.filter(status => status.startsWith(option));
    },
  });

  if (!statuses.includes(code))
    return () => <Message ephemeral>Invalid HTTP status code</Message>;

  return async () => {
    const data = await fetch('https://http.cat/' + code).then((res) =>
      res.blob()
    );

    return (
      <Message
        attachments={[new File([data], code + '.jpg', { type: 'image/jpeg' })]}
      />
    );
  };
}
