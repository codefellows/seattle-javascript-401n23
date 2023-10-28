import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
// import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import beastSlice from "../../store/beast";
const Horns = () => {
  const dispatch = useDispatch();
  const horns = useSelector((state) => state.beast.numOfHorns);
  // const [horns, setHorns] = useState("all");
  const handleChange = (e) => {
    dispatch(beastSlice.actions.setHornCount(e.target.value));
    // setHorns(e.target.value);
  };
  return (
    <div style={{ width: "250px" }}>
      <FormControl fullWidth>
        <InputLabel id="num-of-horns-label">Horns</InputLabel>
        <Select
          labelId="num-of-horns-label"
          id="num-of-horns"
          value={horns}
          label="Horns"
          onChange={handleChange}
        >
          <MenuItem value={"all"}>All</MenuItem>
          <MenuItem value={1}>One</MenuItem>
          <MenuItem value={2}>Two</MenuItem>
          <MenuItem value={3}>Three</MenuItem>
          <MenuItem value={100}>Greater Than Three</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default Horns;
