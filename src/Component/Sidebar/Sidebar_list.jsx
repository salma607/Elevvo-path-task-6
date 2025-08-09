import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";

export default function Sidebar_list() {
  const Iconstyle = {
    color: "var(--color-lightgreen)",
  };
  return (
    <List>
      <Tooltip title="Overview" placement="right" disableHoverListener={open}>
        <ListItem button component={Link} to="/">
          <ListItemIcon sx={Iconstyle}>
            <DashboardIcon />
          </ListItemIcon>
          {open && <ListItemText primary="Overview" />}
        </ListItem>
      </Tooltip>
      <Tooltip title="Projects" placement="right" disableHoverListener={open}>
        <ListItem button component={Link} to="/projects">
          <ListItemIcon sx={Iconstyle}>
            <AssignmentIcon />
          </ListItemIcon>
          {open && <ListItemText primary="Projects" />}
        </ListItem>
      </Tooltip>
      <Tooltip
        title="Profile Settings"
        placement="right"
        disableHoverListener={open}
      >
        <ListItem button component={Link} to="/profile">
          <ListItemIcon>
            <AccountCircleIcon sx={Iconstyle} />
          </ListItemIcon>
          {open && <ListItemText primary="Profile Settings" />}
        </ListItem>
      </Tooltip>
    </List>
  );
}
