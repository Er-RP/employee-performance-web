import {
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useTheme,
} from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { NavItems } from "./NavItems";
import LOGO from "../assets/images/logo.png";
import { get } from "../network/api";
import { RIL } from "../utils/localStorage";
import { useUser } from "../providers/userProvider";

const SideDrawer = () => {
  const theme = useTheme();
  const { setCurrentUser } = useUser();
  const navigate = useNavigate();
  const handleLogout = async () => {
    const res = await get("/auth/logout");
    if (res?.success) {
      setCurrentUser({
        loading: false,
        user: null,
        error: null,
      });
      RIL("UID");
      navigate("/auth");
    } else {
      alert("Oops! Something went wrong");
    }
  };
  return (
    <List sx={{ mx: 1 }}>
      <ListItem
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          px: "1px",
        }}
      >
        <img src={LOGO} alt="G" style={{ height: "38px" }} />
        <IconButton
          color="error"
          aria-label="logout"
          edge="start"
          onClick={handleLogout}
          sx={{
            display: { xs: "block" },
          }}
        >
          <LogoutIcon />
        </IconButton>
      </ListItem>
      {NavItems.map((item, i) => {
        if (item?.name === "Divider") {
          return <Divider key={i} />;
        }
        // const Icon = item?.icon;
        return (
          <NavLink
            key={i}
            to={item?.path}
            style={({ isActive, isPending }) => {
              return {
                color: isActive ? "white" : "inherit",
                textDecoration: "none",
                backgroundColor: isActive && theme.palette.primary.main,
                margin: "5px 0px",
              };
            }}
          >
            <ListItem
              sx={{ bgcolor: "inherit", m: "10px 0", p: 0, borderRadius: 2 }}
            >
              <ListItemButton>
                {/* <ListItemIcon sx={{ color: "inherit" }}>
                  <Icon color="inherit" />
                </ListItemIcon> */}

                <ListItemText primary={item?.name} />
              </ListItemButton>
            </ListItem>
          </NavLink>
        );
      })}
    </List>
  );
};

export default SideDrawer;
