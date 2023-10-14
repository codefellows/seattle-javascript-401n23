// import React from "react";
// bring in the context regarding showing incomplete and/or completed items
import { useContext, useMemo, useState } from "react";
import { Pagination } from "@mui/material";
import { GlobalContext } from "../../App";
import { useEffect } from "react";

const TodoList = ({ list, toggleComplete, incomplete }) => {
  // list is a list of ALL todos, incomplete is a list of only todos that have not been done
  const { hideCompleted, displayCount } = useContext(GlobalContext);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);

  const listToUse = useMemo(() => {
    console.log(hideCompleted, incomplete, list);
    if (hideCompleted) return incomplete;
    else return list;
  }, [hideCompleted, incomplete, list]);

  useEffect(() => {
    // figure out how many pages we need by dividing the list to use by the displayCount
    const totalPages = Math.floor(listToUse.length / displayCount);
    const addOne = listToUse.length % displayCount;
    console.log(totalPages, addOne);
    setCount(addOne ? totalPages + 1 : totalPages);
  }, [displayCount, listToUse]);

  const handlePageChange = (e, ePage) => {
    setPage(ePage);
  };

  const startIndex = useMemo(() => {
    return (page - 1) * displayCount;
  }, [displayCount, page]);

  const endIndex = useMemo(() => {
    return (page - 1) * displayCount + displayCount;
  }, [page, displayCount]);

  return (
    <>
      {listToUse.slice(startIndex, endIndex).map((item) => (
        <div key={item.id}>
          <p>{item.text}</p>
          <p>
            <small>Assigned to: {item.assignee}</small>
          </p>
          <p>
            <small>Difficulty: {item.difficulty}</small>
          </p>
          <div onClick={() => toggleComplete(item.id)}>
            Complete: {item.complete.toString()}
          </div>
          <hr />
        </div>
      ))}
      <Pagination
        count={count}
        variant="outlined"
        color="secondary"
        onChange={handlePageChange}
      />
    </>
  );
};

export default TodoList;
