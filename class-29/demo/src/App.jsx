// import React from "react";

import { useCallback, useEffect, useState } from "react";
import Characters from "./Characters";
import Chance from "chance";
const chance = new Chance();

const App = () => {
  const [number, setNumber] = useState(10);
  const [showHorray, setShowHorray] = useState(false);
  const [horrayText, setHorrayText] = useState("");

  const handleAddHorray = useCallback(() => {
    setHorrayText(`Wow! the number is over 100, it is ${number}`);
    setShowHorray(true);
  }, [number]);

  const handleRemoveHorray = () => {
    setHorrayText("");
    setShowHorray(false);
  };

  useEffect(() => {
    if (number > 100) {
      handleAddHorray();
    } else {
      handleRemoveHorray();
    }
  }, [number, handleAddHorray]);

  const handleAddSome = () => {
    console.log("we are adding some");
    const newNum = chance.integer();
    console.log(newNum);
    setNumber(number + newNum);
  };

  return (
    <div>
      <Characters />
      {number}
      <button onClick={handleAddSome}>add some</button>
      {showHorray && <h1>{horrayText}</h1>}
    </div>
  );
};

export default App;
