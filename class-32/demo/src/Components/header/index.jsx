import { useContext } from "react";
import { Button } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { GlobalContext } from "../../App";

const Header = ({ incomplete }) => {
  const { toggleAppTheme, appTheme } = useContext(GlobalContext);

  const handleThemeClick = () => {
    localStorage.setItem("theme", appTheme === "light" ? "dark" : "light");
    toggleAppTheme();
  };
  return (
    <header
      data-testid="todo-header"
      style={{ display: "flex", justifyContent: "space-between" }}
    >
      <h1 data-testid="todo-h1">
        To Do List: {incomplete.length} items pending
      </h1>
      <Button onClick={handleThemeClick}>
        {appTheme === "light" ? <DarkModeIcon /> : <LightModeIcon />}
      </Button>
    </header>
  );
};

export default Header;
