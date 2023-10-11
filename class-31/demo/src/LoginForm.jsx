// import React from "react";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { UserContext } from "./App";

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

const LoginForm = ({ open, handleClose }) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const { setUser } = useContext(UserContext);

  const handleChange = (e) => {
    const value = e.target.value;
    const id = e.target.id;
    if (id === "address") {
      setAddress(value);
    } else if (id === "name") {
      setName(value);
    }
  };

  const handleLogin = () => {
    if (!name || !address) return console.log("missing data");
    setUser({ name, address });
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          gutterBottom
        >
          Enter your User Information
        </Typography>
        <TextField
          fullWidth
          id="name"
          label="Name"
          value={name}
          variant="outlined"
          onChange={handleChange}
          style={{ marginBottom: "8px" }}
        />
        <TextField
          fullWidth
          id="address"
          label="Address"
          value={address}
          variant="outlined"
          onChange={handleChange}
          style={{ marginBottom: "8px" }}
        />
        <Button fullWidth variant="contained" onClick={handleLogin}>
          Log In
        </Button>
      </Box>
    </Modal>
  );
};

export default LoginForm;
