// import React from 'react'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import beastSlice from "../../store/beast";

const Beast = ({ beast }) => {
  // define dispatch
  const dispatch = useDispatch();

  const handleClick = () => {
    // dispatch the action to update the selected beast
    // it's like setting state, but we ask the store to do it
    // dispatch the action and pass the action the payload
    dispatch(beastSlice.actions.showBeast(beast));
  };
  return (
    <Grid item xs={3}>
      <Card>
        <CardMedia
          sx={{ height: 275 }}
          image={beast.image_url}
          title={beast.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {beast.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {beast.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={handleClick}>
            Select
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default Beast;
