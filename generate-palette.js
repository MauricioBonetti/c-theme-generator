import Color from "colorjs.io";

function clampLightness(l) {
  return Math.max(0, Math.min(1, l));
}

function clampChroma(c) {
  return Math.max(0, Math.min(0.4, c));
}

function clampHue(h) {
  return Math.max(0, Math.min(360, h));
}

function isLight(l) {
    return l > 0.5;
}

export function generatePalette({ backgroundColor, textColor, buttonColor }) {
  const colorTextStandard = textColor;
  const colorSurfaceAction = new Color(buttonColor);
  const colorTextSecondary = new Color(textColor).set(
    "oklch.l",
    (l) => isLight(l) ? l - 0.25 : l + 0.25
  );

  const colorTextDisabled = new Color(colorTextSecondary)
    .set("oklch.c", (c) => clampChroma(c - 0.2))
    .set("oklch.l", (l) => clampLightness(isLight(l) ? l - 0.1 : l + 0.2));

  const colorBackgroundInverseSecondary = new Color(backgroundColor).set(
    "oklch.l",
    (l) => l + 0.075
  );
  const colorBackgroundInverseTertiary = new Color(backgroundColor).set(
    "oklch.l",
    (l) => l + 0.125
  );

  const colorSurfaceActionHover = new Color(colorSurfaceAction).set(
    "oklch.l",
    (l) => l - 0.05
  );

  const colorTextInverseStandard = new Color("white").set(
    "oklch.l",
    colorSurfaceAction.get("oklch.l") > 0.7 ? 0.1 : 0.9
  );

  const colorTextInverseSecondary = new Color(colorTextInverseStandard).set(
    "oklch.l",
    (l) => l >= 0.9 ? l - 0.15 : l + 0.15
  );

  const colorTextInverseDisabled = new Color(colorTextInverseSecondary).set(
    "oklch.c",
    (c) => clampChroma(c - 0.2)
  )
    .set("oklch.l", 
    (l) => colorBackgroundInverseTertiary.oklch.l > 0.5 ? l + 0.2 : l - 0.1);


  const palette = {
    colorTextStandard,
    colorTextSecondary: colorTextSecondary.toString({ format: "hex" }),
    colorTextDisabled: colorTextDisabled.toString({ format: "hex" }),
    colorTextAction: colorSurfaceAction.toString({ format: "hex" }),
    colorTextActionContrast: colorSurfaceAction.set("oklch.l", (l) => (l > 0.5 ? l - 0.1 : l + 0.1)).toString({ format: "hex" }),
    colorTextInverseStandard: colorTextInverseStandard.toString({ format: "hex" }),
    colorTextInverseSecondary: colorTextInverseSecondary.toString({ format: "hex" }),
    colorTextInverseDisabled: colorTextInverseDisabled.toString({ format: "hex" }),
    colorTextInverseAction: "",
    colorTextInverseActionContrast: "",

    colorBackgroundInverseStandard: backgroundColor,
    colorBackgroundInverseSecondary: colorBackgroundInverseSecondary.toString({
      format: "hex",
    }),
    colorBackgroundInverseTertiary: colorBackgroundInverseTertiary.toString({
      format: "hex",
    }),

    colorSurfaceAction: colorSurfaceAction.toString({ format: "hex" }),
    colorSurfaceActionHover: colorSurfaceActionHover.toString({ format: "hex" }),
    colorSurfaceActionSecondary: "",
    colorSurfaceActionSecondaryHover: "",
    colorSurfaceInverseStandard: backgroundColor,
    colorSurfaceInverseSecondary: colorBackgroundInverseSecondary.toString({ format: "hex" }),
    colorSurfaceInverseDisabled: colorBackgroundInverseTertiary.toString({ format: "hex" }),

    colorIconStandard: textColor,
    colorIconHover: "",
    colorIconSecondary: "",
    colorIconActive: "",
    colorIconDisabled: "",
    colorIconInverseStandard: "",
    colorIconInverseHover: "",
    colorIconInverseSecondary: "",
    colorIconInverseActive: "",
    colorIconInverseDisabled: "",
  };

  return palette;
}
