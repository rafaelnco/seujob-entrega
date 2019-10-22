import { generator, applyAll, defaults } from "barestyle";

const { color, scale } = defaults.types;

const unit = value => `${value}vmax`;

const variations = {};

const proprietaryDefinitions = {
  types: {
    spacing: spacing => ({ spacing: 5 * spacing }),
    unit
  },
  values: {
    dimension: {
      sub: scale(0.2),
      small: scale(0.5),
      normal: scale(1),
      big: scale(1.5),
      bigger: scale(2),
      giant: scale(2.5),
      monumental: scale(5)
    },
    pallete: {
      link: color("#4169e1"),
      success: color("#11cc11"),
      alert: color("#ff1111"),
      attention: color("#ffcc00"),
      primary: color("#000000"),
      secondary: color("#ffffff"),
      filled: color("#222222"),
      disabled: color("#555555"),
      empty: color("#eeeeee"),
      transparent: color("#00000000")
    }
  }
};

const availableThemes = [
  {
    primary: "#000000",
    secondary: "#ffffff",
    link: "#4169e1"
  },
  {
    primary: "#ffffff",
    secondary: "#000000",
    link: "#ffcc00"
  }
];

const applyVariations = props => applyAll(variations, props);

const applyTheme = (theme, definitions = proprietaryDefinitions) => {
  const pallete = Object.assign({}, definitions.values.pallete, theme);
  const values = Object.assign({}, definitions.values, { pallete });
  return Object.assign(variations, generator({ ...definitions, values }));
};

applyTheme(availableThemes[0]);

export { applyVariations, unit, applyTheme, availableThemes };
