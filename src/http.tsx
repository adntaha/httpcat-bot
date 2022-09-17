import {
  CommandHandler,
  useDescription,
  useString,
  createElement,
  Message,
} from 'slshx';

import { getOptionValue } from './util'
import statuses from './statuses';

export function http(): CommandHandler {
  useDescription(
    'Returns the http.cat image associated with an http status code'
  );

  const str_statuses = Object.keys(statuses).map((e) => String(e));

  const code = useString('code', 'HTTP response code', {
    required: true,
    async autocomplete(interaction) {
      const option = getOptionValue(interaction, 'code');
      return str_statuses
        .filter((status) => status.startsWith(option))
        .slice(0, 25);
    },
  });

  const show = useString('show', 'Who to show the image to', {
    choices: ['me', 'everyone'],
  });

  const image_url = 'https://http.cat/' + code;
  const valid = str_statuses.includes(code);

  if (!valid)
    return () => <Message ephemeral>Invalid HTTP status code</Message>;

  return async () => {
    const res = await fetch(image_url).then((res) => res.blob());
    const file = new File([res], code + '.jpg');

    return (
      <Message
        ephemeral={show === 'everyone' ? false : true}
        attachments={[file]}
      />
    );
  };
}
