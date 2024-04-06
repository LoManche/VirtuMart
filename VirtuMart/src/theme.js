import { createTheme } from "@mui/material/styles";

// color design tokens export
export const dashboardOverviewStill = {
  blue: {
    0: "#262d79",
    100: "#374186",
    200: "#475492",
    300: "#677bab",
    400: "#88a2c4",
    500: "#a9c9dd",
    600: "#caf0f6",
  },
  green: {
    0: "#425533",
    100: "#526a40",
    200: "#63804d",
    300: "#739559",
    400: "#94bf73",
    500: "#a5d580",
    600: "#b5ea8c",
  },
  orange: {
    0: "#8c4820",
    100: "#bf5b04",
    200: "#f28705",
    300: "#f29f05",
  },
};

export const still = {
  box: "#555555",
  table: {
    100: "#141414",
    200: "#888888",
    1000: "#CBD5CE",
    1100: "#E7EBE8",
  },
  greyscale: {
    0: "#FFFFFF",
    100: "#F4F4F7",
    200: "#ECECEC",
    300: "#C5C5C5",
    400: "#888888",
    500: "#3d3d3d",
    600: "#141414",
  },
  green: {
    100: "#BDE6B6",
    200: "#73C167",
    300: "#4D9E40",
    400: "#33692B",
  },
  darkgreen: {
    100: "#91C6AA",
    200: "#00703C",
    300: "#00542D",
    400: "#00381E",
  },
  purple: {
    100: "#C693C5",
    200: "#790478",
    300: "#560F56",
    400: "#3A0A39",
  },
  blue: {
    100: "#91B4DA",
    200: "#00539B",
    300: "#003E74",
    400: "#00294E",
  },
  orange: {
    100: "#FEE3B7",
    200: "#FDBE57",
    300: "#F19D19",
    400: "#E57C00",
  },
};
export const tokens = () => ({
  ...{
    box: "#C5C5C5",
    table: {
      100: "#FFFFFF",
      200: "#ECECEC",
      1000: "#CBD5CE",
      1100: "#E7EBE8",
    },
    greyscale: {
      600: "#FFFFFF",
      500: "#F4F4F7",
      400: "#ECECEC",
      300: "#C5C5C5",
      200: "#888888",
      100: "#3d3d3d",
      0: "#141414",
    },
    green: {
      400: "#BDE6B6",
      300: "#73C167",
      200: "#4D9E40",
      100: "#33692B",
    },
    darkgreen: {
      400: "#91C6AA",
      300: "#00703C",
      200: "#00542D",
      100: "#00381E",
    },
    purple: {
      400: "#C693C5",
      300: "#790478",
      200: "#560F56",
      100: "#3A0A39",
    },
    blue: {
      400: "#91B4DA",
      300: "#00539B",
      200: "#003E74",
      100: "#00294E",
    },
    orange: {
      400: "#FEE3B7",
      300: "#FDBE57",
      200: "#F19D19",
      100: "#E57C00",
    },
  },
});

// mui theme settings
export const themeSettings = (mode) => {
  const colors = tokens(mode);
  return {
    palette: {
      mode: mode,
      ...{
        // palette values for light mode
        primary: {
          main: colors.greyscale[600],
        },
        secondary: {
          main: colors.green[400],
        },
        neutral: {
          dark: colors.greyscale[100],
          main: colors.greyscale[300],
          light: colors.greyscale[500],
        },
        background: {
          default: colors.greyscale[600], //"#ffffff",
        },
      },
    },
    typography: {
      fontFamily: ["sans-serif", "Source Sans Pro", "Sen"].join(","),
      fontSize: 14, //10,
      h1: {
        fontSize: 40, //36,
      },
      h2: {
        fontSize: 32, //28,
      },
      h3: {
        fontSize: 24, //20,
      },
      h4: {
        fontSize: 20, //16,
      },
      h5: {
        fontSize: 16, //12,
      },
      h6: {
        fontSize: 14, //10,
      },
    },
  };
};

export const getTheme = () => {
  return createTheme(themeSettings("light"));
};
