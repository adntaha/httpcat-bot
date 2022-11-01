import {
  CommandHandler,
  useDescription,
  useString,
  createElement,
  Message,
  useNumber,
} from "slshx";

import { getOptionValue } from "./util";
import statuses from "./statuses";

export function cat(): CommandHandler {
  useDescription(
    "Returns the http.cat image associated with an http status code"
  );

  const statusCodes = Object.values(statuses).map((status) => status.code);

  const code = useNumber("code", "HTTP response code", {
    required: true,
    async autocomplete(interaction) {
      const option = getOptionValue(interaction, "code");
      return statusCodes
        .filter((status) => String(status).startsWith(option))
        .slice(0, 25);
    },
  });

  const show = useString("show", "Who to show the image to", {
    choices: ["me", "everyone"],
  });

  const image_url = "https://http.cat/" + code;
  const valid = statusCodes.includes(code);

  if (!valid)
    return () => <Message ephemeral>Invalid HTTP status code</Message>;

  return async () => {
    const res = await fetch(image_url).then((res) => res.blob());
    const file = new File([res], "image.jpg");

    return <Message ephemeral={show === "me"} attachments={[file]} />;
  };
}
