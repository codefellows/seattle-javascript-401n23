// import React from 'react'
// only doing this one (useReducer) to help prepare for redux
import Chance from "chance";

import { useReducer } from "react";
const chance = new Chance();

// define the initial state
const initialStateValue = {
  characters: [
    { name: "Simba", color: "purple" },
    { name: "Mufasa", color: "green" },
    { name: "Timon", color: "orange" },
    { name: "Pumba", color: "turquoise" },
    { name: "Rafiki", color: "rainbow" },
  ],
  active: { name: "Mufasa", color: "green" },
};

// dispatch fires off a function to update some state
function reducerFunction(state, action) {
  // if (action.type === "ADD_CHARACTER") return {
  //   ...state,
  //   active: {},
  //   characters: [...state.characters, action.payload],
  // };

  /// this is prob what you will do in your lab
  // return [...state, action.payload]
  // payload = {
  //   url: "kjhafkdjfh",
  //   method: "get",
  //   data: {}
  // }

  switch (action.type) {
    case "ADD_CHARACTER":
      return {
        ...state,
        active: {},
        characters: [...state.characters, action.payload],
      };
    case "ACTIVATE_CHARACTER":
      return {
        ...state,
        active: state.characters.find((char) => char.name === action.payload),
      };
    case "REMOVE_CHARACTER":
      return {
        ...state,
        active: {},
        characters: state.characters.filter(
          (char) => char.name !== action.payload
        ),
      };
  }
}

const Characters = () => {
  const [state, dispatch] = useReducer(reducerFunction, initialStateValue);
  // const [history, dispatchHistory] = useReducer(historyReducer, []);
  // const [charState, setCharState] = useState(initialStateValue)

  const handleNewCharacter = () => {
    const char = {
      name: chance.name(),
      color: chance.color(),
    };

    const action = {
      type: "ADD_CHARACTER",
      payload: char,
    };

    dispatch(action);
  };

  const handleActivateCharacter = (name) => {
    const action = {
      type: "ACTIVATE_CHARACTER",
      payload: name,
    };
    dispatch(action);
    // setCharState({
    //   ...state,
    //   active: state.characters.find((char) => char.name === name),
    // })
  };

  const handleRemoveCharacter = (nameOfCharWeWantToRemove) => {
    const action = {
      type: "REMOVE_CHARACTER",
      payload: nameOfCharWeWantToRemove,
    };
    dispatch(action);
  };

  return (
    <div>
      <h1>Characters in Lion King</h1>
      <strong>
        {state.active.name
          ? `${state.active.name} is ${state.active.color}`
          : "Click a character to learn their secret"}
      </strong>
      <ul>
        {state.characters.map((char) => (
          <li
            key={char.name}
            onClick={() => handleActivateCharacter(char.name)}
            onDoubleClick={() => handleRemoveCharacter(char.name)}
          >
            {char.name}
          </li>
        ))}
      </ul>
      <button onClick={handleNewCharacter}>Add Random Character</button>
    </div>
  );
};

export default Characters;
