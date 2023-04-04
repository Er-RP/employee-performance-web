import { Box } from "@mui/material";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { DRAWER_WIDTH } from "../constants";
import SideBar from "./SideBar";
import TopBar from "./TopBar";

const Layout = () => {
  const [mobileOpen, setMobileOpen] = useState(true);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  return (
    <>
      <TopBar onClick={handleDrawerToggle} />
      <SideBar onClose={handleDrawerToggle} open={mobileOpen} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "#ffad3321",
          color: "text.primary",
          p: 0.5,
          width: {
            md: mobileOpen ? `calc(100% - ${DRAWER_WIDTH}px)` : "100%",
          },
          ml: { md: mobileOpen ? `${DRAWER_WIDTH}px` : "auto" },
          mr: "auto",
          maxWidth: 1900,
          minHeight: `calc(100vh)`,
        }}
      >
        <Box
          sx={{
            // display: "flex",
            width: "100%",
            borderRadius: 1,
            px: 0.5,
            // height: "100%",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </>
  );
};

export default Layout;
