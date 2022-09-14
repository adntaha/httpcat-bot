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

  const image = 'https://http.cat/' + code;
  const message = str_statuses.includes(code)
    ? image
    : 'Invalid HTTP status code';

  return () => {
    return <Message ephemeral>{message}</Message>;
  };
}
