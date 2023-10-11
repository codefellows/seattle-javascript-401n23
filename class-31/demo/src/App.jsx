import { createContext, useState } from "react";
import Header from "./Header";
// context must be exported
export const UserContext = createContext(null);

const App = () => {
  const [user, setUser] = useState({ name: "", address: "" });
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Header />
    </UserContext.Provider>
  );
};

export default App;
