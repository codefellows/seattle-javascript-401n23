// THANK YOU EMILY FOR LETTING US USE YOUR CODE FOR DEMO!
// PLEASE DO NOT COPY AND PASTE THIS WHOLE FILE AS IT IS PROPERTY OF EMILY
// USE IT AS REFERENCE FOR HOW TO MAKE THE AXIOS REQUESTS

import React, { useEffect, useState } from "react";
import useForm from "../../hooks/form";
import { v4 as uuid } from "uuid";
import TodoList from "../List";
import Header from "../Header";
import TodoForm from "../TodoForm";
import starterData from "./starterData.json";
import Auth from "../Auth/auth";
import axios from "axios";

const Todo = () => {
  const [defaultValues] = useState({
    difficulty: 4,
  });
  const [list, setList] = useState([]);
  // const [pullFromServer, setPullFromServer] = useState(true);
  const [incomplete, setIncomplete] = useState([]);
  const { handleChange, handleSubmit } = useForm(addItem, defaultValues);

  async function makeRequest(config, doNext) {
    try {
      const response = await axios(config);
      console.log(response);
      // if we successfully add to the database do the call back - in the case of add that
      // means the callback is adding the item to the list
      // in the case of delete it will be filtering the item out of the list
      if (doNext) doNext(response.data);
    } catch (e) {
      // if there is an error do not change the list
      console.error(e);
    }
  }

  useEffect(() => {
    // if (!pullFromServer) return;
    // setPullFromServer(false);
    (async () => {
      const items = await axios.get("https://lab34server.onrender.com/todo");
      console.log(items.data);
      setList(items.data);
    })();
  }, []);

  // Update these functions "ADD", "DELETE", "TOGGLE COMPLETED"
  async function addItem(item) {
    item.complete = false;
    console.log(item);
    // make axios request to post the item to the server
    const config = {
      method: "post",
      baseURL: "https://lab34server.onrender.com",
      url: "/todo",
      data: item,
    };
    const doNext = (item) => setList([...list, item]);

    const data = await makeRequest(config, doNext);

    // setPullFromServer(true);
  }

  function deleteItem(id) {
    // this will only be visable to admins
    const items = list.filter((item) => item.id !== id);
    setList(items);
  }

  function toggleComplete(id) {
    /// this function is gated by your auth
    const items = list.map((item) => {
      if (item.id === id) {
        item.complete = !item.complete;
      }
      return item;
    });
    const newIncomplete = items.filter((it) => !it.complete);
    setIncomplete(newIncomplete);
    setList(items);
  }

  useEffect(() => {
    let incompleteCount = list.filter((item) => !item.complete);
    setIncomplete(incompleteCount);
    document.title = `To Do List: ${incomplete.length}`;
    // linter will want 'incomplete' added to dependency array unnecessarily.
    // disable code used to avoid linter warning
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list]);

  const containerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <>
      <Header incomplete={incomplete} />

      <div style={containerStyle}>
        <Auth capability={"create"}>
          <TodoForm
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            defaultValues={defaultValues}
            deleteItem={deleteItem}
          />
        </Auth>

        <TodoList
          list={list}
          toggleComplete={toggleComplete}
          incomplete={incomplete}
        />
      </div>
    </>
  );
};

export default Todo;
