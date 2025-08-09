import { useState } from "react";
import {
  Drawer,
  Toolbar,
  IconButton,
  AppBar,
  Typography,
  Box,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Sidebar_list from "./Sidebar_list";

const drawerWidthOpen = 240;
const drawerWidthClosed = 60;

export default function Sidebar() {
  const [open, setOpen] = useState(true);

  const handleDrawerToggle = () => setOpen(!open);

  return (
    <Box sx={{ display: "flex" }}>
      {/* Top AppBar */}
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1,background:"var(--color-green)" }}
      >
        <Toolbar>
          <IconButton
            aria-label={open ? "Collapse sidebar" : "Expand sidebar"}
            onClick={handleDrawerToggle}
            edge="start"
            sx={{ mr: 2 ,background:"var(--color-lightgreen)",color:"var(--color-green)",
                "&:hover":{
                    boxShadow:"none",
                    background:"var(--color-lightgreen)"
                }
            }}
          >
            {open ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
          <Typography variant="h6" noWrap
          sx={{color:"var(--color-beig)"}}>
            Hi,salma Ahmed
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Sidebar Drawer */}
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          width: open ? drawerWidthOpen : drawerWidthClosed,
          flexShrink: 0,
          whiteSpace: "nowrap",
          boxSizing: "border-box",
          "& .MuiDrawer-paper": {
            width: open ? drawerWidthOpen : drawerWidthClosed,
            transition: "width 0.3s",
            overflowX: "hidden",
            color:"var(--color-beig)",
            background:"var(--color-green)"
            
          },
        }}
      >
        <Toolbar />
        <Divider />
        <Sidebar_list />
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
      </Box>
    </Box>
  );
}
