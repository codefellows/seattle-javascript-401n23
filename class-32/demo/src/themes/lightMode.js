import { createTheme } from "@mui/material/styles";

export const lightMode = createTheme({
  palette: {
    mode: "light",

    primary: {
      main: "#283593",
    },
    secondary: {
      main: "#2962ff",
    },
  },
});
