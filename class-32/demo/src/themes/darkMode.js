import { createTheme } from "@mui/material/styles";

export const darkMode = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#d84315",
    },
    secondary: {
      main: "#ffd600",
    },
    background: {
      default: "#2d2d2d",
    },
  },
});
