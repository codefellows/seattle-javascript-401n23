import { useState } from "react";
import { Button } from "@mui/material";
import LoginForm from "./LoginForm";

const LoginButton = () => {
  const [showModal, setShowModal] = useState(false);

  const handleLogin = () => {
    setShowModal(true);
  };
  return (
    <>
      <LoginForm open={showModal} handleClose={() => setShowModal(false)} />
      <Button variant="contained" onClick={handleLogin}>
        Login
      </Button>
    </>
  );
};

export default LoginButton;
