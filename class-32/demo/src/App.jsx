import { createContext, useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { darkMode } from "./themes/darkMode";
import { lightMode } from "./themes/lightMode";
import Todo from "./Components/Todo";

export const GlobalContext = createContext(null);

// Add the following defaults to the context provider’s state, they will not be changeable in this lab.
// Display three items.
// Hide completed items using a boolean.
// Define “difficulty” as a default sort word to optionally use in the stretch goal.

const App = () => {
  const [appTheme, setAppTheme] = useState("light");

  useEffect(() => {
    const mode = localStorage.getItem("theme");
    setAppTheme(mode);
  }, []);

  console.log(appTheme);
  return (
    <GlobalContext.Provider
      value={{
        displayCount: 1,
        hideCompleted: false,
        sortWord: "difficulty",
        toggleAppTheme: () =>
          setAppTheme(appTheme === "light" ? "dark" : "light"),
        appTheme,
      }}
    >
      <ThemeProvider theme={appTheme === "light" ? lightMode : darkMode}>
        <CssBaseline />
        <Todo />
      </ThemeProvider>
    </GlobalContext.Provider>
  );
};

export default App;
