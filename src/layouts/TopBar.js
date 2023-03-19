import { AppBar, Box, IconButton, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LOGO from "../assets/images/logo.png";

const TopBar = ({ onClick }) => {
  return (
    <AppBar
      position="sticky"
      sx={{
        display: { xs: "block", md: "none" },
        width: "100%",
        zIndex: (theme) => theme.zIndex.drawer - 1,
        boxShadow: "none",
        // maxWidth: 1600,
        // left: 0,
      }}
    >
      <Toolbar
        sx={{
          display: { xs: "flex", md: "none" },
          bgcolor: "background.paper",
          boxShadow: "none",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid red",
        }}
      >
        <img src={LOGO} alt="G" style={{ height: "38px" }} />
        <IconButton
          color="primary"
          aria-label="open drawer"
          edge="start"
          onClick={onClick}
          sx={{
            mr: 2,
            // display: { md: "none" }
          }}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
