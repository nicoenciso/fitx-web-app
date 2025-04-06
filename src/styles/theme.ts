import { createTheme } from "@mui/material/styles";

/**
 * Personalización del tema global de MUI
 */
const theme = createTheme({
  palette: {
    primary: {
      main: "#070707", // #070707
      light: "#00A6FF", // #00A6FF
      dark: "#2E2E2E", // #2E2E2E
      contrastText: "#FFFFFF", // #FFFFFF
    },
    secondary: {
      main: "#561F1F", // #561F1F
      light: "#FF0000", // #FF0000
      contrastText: "#FFFFFF", // #FFFFFF
    },
  },
  typography: {
    fontFamily: "Oswald, sans-serif",
  },
});

export default theme;
