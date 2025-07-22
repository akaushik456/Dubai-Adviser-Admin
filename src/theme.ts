import { createTheme, ThemeOptions } from "@mui/material/styles";

export const tokens = {
  light: {
    info: { main: "#fff" },
    text: { main: "#181818" },
    primary: { main: "#18202D" },
    buttonbg: { main: "#34BE66" },
    formbg: { main: "rgb(43, 52, 67)" },
    active: { main: "#56C05A" },
    google: { main: "#0D0D0D" },
    sidebaractive: { main: "#27F371" },
  },
  dark: {
    info: { main: "#fff" },
    text: { main: "#f5f5f5" },
    primary: { main: "#121212" },
    buttonbg: { main: "#2ecc71" },
    formbg: { main: "#1f1f1f" },
    active: { main: "#00ff00" },
    google: { main: "#ffffff" },
    sidebaractive: { main: "#00e676" },
  },
};

const lineHeight = {
  lhxl: "31px",
  lhxl2: "24px",
};

const fontSize = {
  xl: "27px",
  lgH: "26px",
  smP: "16px",
};

const fontFamily = {
  poppins: "Poppins, sans-serif",
  calibri: "Calibri, sans-serif",
};

const fontWeight = {
  fw100: 100,
  fw200: 200,
  fw300: 300,
  fw400: 400,
  fw500: 500,
  fw600: 600,
  fw700: 700,
  fw800: 800,
};

// Extend MUI Theme Type to Support Custom Properties
declare module "@mui/material/styles" {
  interface Theme {
    custom: typeof lineHeight;
    fontSize: typeof fontSize;
    fontFamily: typeof fontFamily;
    fontWeight: typeof fontWeight;
    lineHeight: typeof lineHeight;
  }

  interface ThemeOptions {
    custom?: typeof lineHeight;
    fontSize?: typeof fontSize;
    fontFamily?: typeof fontFamily;
    fontWeight?: typeof fontWeight;
    lineHeight?: typeof lineHeight;
  }
}

// MAIN THEME EXPORT FUNCTION
export const getTheme = (mode: 'light' | 'dark') =>
  createTheme({
    palette: {
      mode,
      ...tokens[mode],
    },
    custom: {
      ...lineHeight,
    },
    fontSize: {
      ...fontSize,
    },
    fontFamily: {
      ...fontFamily,
    },
    fontWeight: {
      ...fontWeight,
    },
    lineHeight: {
      ...lineHeight,
    },
  } as ThemeOptions);
