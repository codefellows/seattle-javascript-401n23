import React, { createContext } from "react";

import Todo from "./Components/Todo";

export const GlobalContext = createContext(null);

// Add the following defaults to the context provider’s state, they will not be changeable in this lab.
// Display three items.
// Hide completed items using a boolean.
// Define “difficulty” as a default sort word to optionally use in the stretch goal.

export default class App extends React.Component {
  render() {
    return (
      <GlobalContext.Provider
        value={{
          displayCount: 1,
          hideCompleted: false,
          sortWord: "difficulty",
        }}
      >
        <Todo />
      </GlobalContext.Provider>
    );
  }
}
