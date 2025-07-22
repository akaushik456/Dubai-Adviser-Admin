import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { IconButton, Stack, Tooltip, useTheme } from "@mui/material";
import {Brightness4, Brightness7} from '@mui/icons-material';
import { useThemeMode } from "../../src/ThemeContext";
import BreadCrumb from "./common/BreadCrumb/BreadCrumb";
import SideBarList from "./SideBarList";
import { bottomlisting } from "./sideBarListing";
import { CopyrightComp } from "./common/CopyrightComp";
import MenuComp from "./Menu/MenuComp";
import { selectUsername } from "../app/features/auth/authSlice";
import { useState } from "react";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";

const drawerFullWidth = 323;
const drawerCollapsedWidth = 80;

const SideBarDrawer = () => {
  const { pathname } = useLocation();
  const nav = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const usernameSelector: string | null = useSelector(selectUsername || null);
  const [collapsed, setCollapsed] = useState(false);
    const theme = useTheme();
  const { toggleTheme, mode } = useThemeMode(); 

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* Top AppBar */}
      <AppBar
        elevation={0}
        position="fixed"
        sx={{
          backgroundColor: "formbg.main",
          width: `calc(100% - ${collapsed ? drawerCollapsedWidth : drawerFullWidth}px)`,
          ml: `${collapsed ? drawerCollapsedWidth : drawerFullWidth}px`,
          transition: "width 0.3s, margin-left 0.3s",
        }}
      >
        <Toolbar
          sx={{
            height: { xl: "102px", lg: "64px" },
            minHeight: { xl: "102px", lg: "64px", md: "64px" },
          }}
        >
          <Box
            sx={{
              border: "1px solid #BB5FD366",
              borderTop: 0,
              borderBottom: 0,
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              ml: "auto",
            }}
          >
            
            <Stack direction="row" sx={{ minWidth: "261px", height: "100%", width: "100%" }}>
              <IconButton
              onClick={toggleTheme}
              sx={{ m: 0, width: "87px" }}
              aria-label="Toggle light/dark theme"
            >
              {mode === 'dark' ? (
                <Brightness7 sx={{ color: '#fff' }} />
              ) : (
                <Brightness4 sx={{ color: '#fff' }} />
              )}
            </IconButton>
              <IconButton sx={{ m: 0, width: "87px" }}>
                <img src="/info.svg" alt="" />
              </IconButton>
              <IconButton
                aria-label="bell"
                disabled
                color="primary"
                sx={{
                  borderRadius: "0",
                  m: 0,
                  width: "87px",
                  borderInline: "1px solid #BB5FD366",
                }}
              >
                <img src="/bell.svg" alt="" />
              </IconButton>
              <IconButton sx={{ m: 0, width: "87px" }}>
                <Typography
                  title={usernameSelector ?? ""}
                  component="p"
                  sx={{
                    width: "34px",
                    height: "33px",
                    fontSize: "20px",
                    backgroundColor: "#27F371",
                    borderRadius: "3px",
                    textAlign: "center",
                    fontFamily: "Poppins, sans-serif",
                    textTransform: "uppercase",
                    fontWeight: "700",
                    color: "google.main",
                  }}
                >
                  {usernameSelector?.charAt(0)}
                </Typography>
              </IconButton>
            </Stack>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Tooltip title="More">
              <IconButton
                onClick={handleClick}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? true : undefined}
                sx={{ m: 0, width: "87px", p: 0 }}
              >
                <img src="/more.svg" alt="" />
              </IconButton>
            </Tooltip>
            <MenuComp open={open} anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          width: collapsed ? drawerCollapsedWidth : drawerFullWidth,
          transition: "width 0.3s",
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: collapsed ? drawerCollapsedWidth : drawerFullWidth,
            boxSizing: "border-box",
            backgroundColor: "formbg.main",
            transition: "width 0.3s",
            overflowX: "hidden",
          },
        }}
      >
        <Toolbar
          sx={{
            backgroundColor: "formbg.main",
            height: { xl: "102px", lg: "64px", md: "64px" },
            minHeight: { xl: "102px", lg: "64px", md: "64px" },
          }}
        >
          
            <Typography
              onClick={() => nav("/home")}
              sx={{
                color: "info.main",
                fontSize: "44px",
                fontWeight: "700",
                fontFamily: "Poppins, sans-serif",
                lineHeight: "31px",
              }}
              component="p"
            >
              ALfallah
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "flex-end",
                  fontSize: "22px",
                  fontWeight: "600",
                  fontFamily: "Poppins, sans-serif",
                  lineHeight: "31px",
                }}
                component="span"
              >
                .com
              </Typography>
            </Typography>
      
        </Toolbar>

        {/* Dashboard Section */}
        <List sx={{ backgroundColor: "primary.main" }}>
          {["Dashboard"].map((text, index) => (
            <ListItem key={text + index} disablePadding>
              <ListItemButton sx={{ height: "55px" }} onClick={() => nav("/home")}>
                <ListItemIcon sx={{ color: "info.main", minWidth: "40px" }}>
                  <img src="/Dashboard-Icon.svg" alt="Dashboard" />
                </ListItemIcon>
                {collapsed ? (
                  <Tooltip title={text} placement="right">
                    <Box sx={{ width: "100%" }} />
                  </Tooltip>
                ) : (
                  <ListItemText
                    sx={{ color: "info.main" }}
                    primary={
                      <Typography
                        sx={{
                          fontFamily: "Poppins, sans-serif",
                          fontWeight: "600",
                          fontSize: "18px",
                        }}
                      >
                        {text}
                        
                      </Typography>
                    }
                    />
                )}
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider sx={{ borderColor: "rgb(106 106 106)" }} />

        {/* Collapsible Toggle Button */}
        <IconButton
          onClick={() => setCollapsed(!collapsed)}
          sx={{
            position: "absolute",
            bottom: 20,
            left: collapsed ? "22px" : "20px",
            backgroundColor: "rgb(0, 123, 255)",
            color: "#fff",
            borderRadius: "5px",
            "&:hover": { backgroundColor: "rgb(0, 105, 217)" },
            zIndex: 1,
          }}
        >
          {collapsed ? <FaLongArrowAltRight size={20} /> : <FaLongArrowAltLeft size={20} />}
        </IconButton>

        {/* Mid Section */}
        <SideBarList collapsed={collapsed} />

        {/* Bottom List Section */}
        <List>
          {bottomlisting?.map((btmlist, idx) => (
            <ListItem key={idx} disablePadding sx={{ borderBottom: "1px solid rgb(106 106 106)" }}>
              <ListItemButton
                sx={{ backgroundColor: "primary.main", height: "55px" }}
                onClick={() => nav(`${btmlist?.pathname}`)}
              >
                <ListItemIcon sx={{ color: "info.main", minWidth: "40px" }}>
                  <img src={`${btmlist?.src}`} alt={btmlist.list} />
                </ListItemIcon>
                {collapsed ? (
                  <Tooltip title={btmlist.list} placement="right">
                    <Box sx={{ width: "100%" }} />
                  </Tooltip>
                ) : (
                  <ListItemText
                    sx={{ color: "info.main", m: 0 }}
                    primary={
                      <Typography
                        sx={{
                          fontFamily: "Poppins, sans-serif",
                          fontWeight: "600",
                          fontSize: "18px",
                        }}
                      >
                        {btmlist.list}
                      </Typography>
                    }
                  />
                )}
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        {/* Footer */}
        <Box sx={{ flexGrow: 1 }} />
        <List
          sx={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            mb: 2,
          }}
        >
          <CopyrightComp collapsed={collapsed}/>
        </List>  
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "primary.main",
          px: 3,
          maxHeight: "1500px",
          height: "100vh",
          transition: "margin-left 0.3s",
        }}
      >
        <Toolbar sx={{ mt: { xl: "102px" } }}>
          <BreadCrumb currentPath={pathname.split("/").filter(Boolean).pop() || "Home"} />
        </Toolbar>

        <Outlet />
      </Box>
    </Box>
  );
};

export default SideBarDrawer;