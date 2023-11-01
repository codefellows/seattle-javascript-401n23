import { AppBar, Toolbar, Typography } from "@mui/material";

const Header = () => {
  return (
    <AppBar color="success" position="static" style={{ padding: "8px" }}>
      <Toolbar>
        <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
          ROCK 🪨 PAPER 📄 SCISSORS ✂️
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
