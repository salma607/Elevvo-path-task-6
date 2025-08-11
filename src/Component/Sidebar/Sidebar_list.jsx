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
import { useNavigate } from "react-router-dom";

export default function Sidebar_list() {
  const navigate = useNavigate();
  const Iconstyle = {
    color: "var(--color-lightgreen)",
  };
  return (
    <List>
      <Tooltip title="Overview" placement="right" disableHoverListener={open}>
        <ListItem button onClick={() => navigate("/")}>
          <ListItemIcon sx={Iconstyle}>
            <DashboardIcon />
          </ListItemIcon>
          {open && <ListItemText primary="Overview" />}
        </ListItem>
      </Tooltip>
      <Tooltip title="Projects" placement="right" disableHoverListener={open}>
        <ListItem button onClick={() => navigate("/Table")} >
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
        <ListItem button >
          <ListItemIcon>
            <AccountCircleIcon sx={Iconstyle} />
          </ListItemIcon>
          {open && <ListItemText primary="Profile Settings" />}
        </ListItem>
      </Tooltip>
    </List>
  );
}
