import { generator, applyVariants, defaults, assemble } from "barestyle";

import { merge } from "barestyle/utils";

import { useMouse } from "./Hooks";

const { color, scale } = defaults.types;

const unit = value => `${value}vmax`;

const variations = {};

const spacing = spacing => ({ spacing: 5 * spacing });

spacing.base = "dimension";

const proprietary = {
  types: {
    spacing,
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
    values: {
      pallete: {
        primary: "#000000",
        secondary: "#ffffff",
        link: "#4169e1"
      }
    }
  },
  {
    values: {
      pallete: {
        primary: "#ffffff",
        secondary: "#000000",
        link: "#ffcc00"
      }
    }
  }
];

const hook = hook => ({ hook });

const hooks = generator({
  types: { hook },
  values: {
    hooks: {
      mouse: hook(useMouse)
    }
  },
  rules: {
    hooks: { use: ["action"] }
  },
  variants: ({ rules, values }) => ({
    hooks: [rules.hooks, values.hooks]
  }),
  transformers: ({}) => [
    {
      type: "properties",
      parameters: ["hook"],
      transformation: ({ hook }) => ({ hook })
    }
  ]
});

let assembledVariations = assemble(variations, hooks);

const applyVariations = props => applyVariants(assembledVariations, props);

const applyTheme = (theme, definitions = proprietary) => {
  Object.assign(variations, generator(merge(definitions, theme)));
  assembledVariations = assemble(variations, hooks);
};

applyTheme(availableThemes[0]);

export { applyVariants, applyVariations, unit, applyTheme, availableThemes };
