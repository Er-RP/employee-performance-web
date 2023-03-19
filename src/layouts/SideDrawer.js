import {
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { NavItems } from "./NavItems";
import LOGO from "../assets/images/logo.png";

const SideDrawer = ({ onClose = () => null }) => {
  const theme = useTheme();
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
          color="primary"
          aria-label="open drawer"
          edge="start"
          onClick={onClose}
          sx={{
            display: { xs: "block", md: "none" },
          }}
        >
          <MenuIcon />
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
