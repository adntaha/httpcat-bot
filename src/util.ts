import {
  APIApplicationCommandAutocompleteInteraction,
  APIApplicationCommandInteractionDataStringOption,
} from 'discord-api-types/v9';

export function getOptionValue(
  interaction: APIApplicationCommandAutocompleteInteraction,
  name: string
) {
  const { options } = interaction.data;
  const target = options.find(
    (option) => option.name === name
  ) as APIApplicationCommandInteractionDataStringOption;

  return target.value;
}
