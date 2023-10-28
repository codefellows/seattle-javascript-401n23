// import React from "react";
import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import Beast from "../beast/Beast";

// map through beastdata and pass individual beasts to beast components
const Beasts = () => {
  const beastData = useSelector((state) => state.beast.beastData);
  const numOfHorns = useSelector((state) => state.beast.numOfHorns);
  return (
    <Grid container spacing={2} marginTop={"16px"}>
      {beastData
        .filter((b) => b.horns === numOfHorns || numOfHorns === "all")
        .map((beast) => (
          <Beast key={beast.title} beast={beast} />
        ))}
    </Grid>
  );
};

export default Beasts;
