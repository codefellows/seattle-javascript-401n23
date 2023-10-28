// import React from "react";
import { Card, CardContent, CardMedia, Modal, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import beastSlice from "../../store/beast";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const BeastModal = () => {
  const beast = useSelector((state) => state.beast.selectedBeast);
  const dispatch = useDispatch();
  const handleClose = () => {
    // dispatch the action to update the selected beast
    // it's like setting state, but we ask the store to do it
    // dispatch the action and pass the action the payload
    dispatch(beastSlice.actions.showBeast(undefined));
  };
  return (
    <Modal open={beast !== undefined} onClose={handleClose}>
      {beast ? (
        <Card style={style}>
          <CardMedia
            sx={{ height: 275 }}
            image={beast?.image_url}
            title={beast?.title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {beast?.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {beast?.description}
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <></>
      )}
    </Modal>
  );
};

export default BeastModal;
