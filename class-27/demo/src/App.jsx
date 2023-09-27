import { useState } from "react";
import Person from "./Person";
// add 1 button - when pushed will increment some starting value by 1
// and we will put that number on the screen

// hook: useState is a special function that can accept an argument
// the argument represents the starting value of the state
// returns an array of a getter and setter
function App() {
  const [value, setValue] = useState(5);
  const [name, setName] = useState("sara");

  return (
    <>
      <h1>Hello</h1>
      <input
        name="myInput"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={() => setValue(value + 1)}>add 1</button>
      <p>{value}</p>
      <Person name={name} setName={setName} />
      {/* <p>{name}</p> */}
    </>
  );
}

export default App;
