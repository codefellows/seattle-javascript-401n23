import { AppBar, Toolbar, Typography } from "@mui/material";
import Horns from "../horns/Horns";

const Header = () => {
  return (
    <AppBar position="static" style={{ padding: "8px" }}>
      <Toolbar>
        <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>
          Horned Beasts
        </Typography>
        <Horns />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
