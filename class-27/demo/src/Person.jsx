import { useEffect, useState } from "react";

const Person = (props) => {
  const { name, setName } = props;
  const [counter, setCounter] = useState(0);
  const [isCounting, setIsCounting] = useState(false);

  const handleClick = () => {
    setName("");
  };

  // use effect is a special kind of function that takes 2 arguments
  // a function (and optional the function would return a clean up effect)
  // and an array of dependancies - are things that could change that would effect
  // how this function would run
  useEffect(() => {
    // this is great to use when:
    // you want something to run when the component mounts
    // you want something to run when a specific piece of state has changed (a dependancy)
    console.log("is counting has changed!!!");
    if (!isCounting) return;
    // setInterval(() => {
    //   setCounter((prev) => prev + 1);
    // }, 1000);
    setName("Counting person");
    console.log("I run when my dependancies update");
  }, [isCounting, setName]);

  useEffect(() => {
    console.log("hello, I run when the component mounts");
  }, []);

  useEffect(() => {
    console.log("no dependancy array, I run ANY TIME state changes");
  });

  return (
    <div>
      <h2>{name}</h2>
      <button onClick={handleClick}>reset name</button>
      <h3>counter: {counter}</h3>
      <button onClick={() => setIsCounting(!isCounting)}>
        is counting? {isCounting ? "true" : "false"}
      </button>
    </div>
  );
};

export default Person;
