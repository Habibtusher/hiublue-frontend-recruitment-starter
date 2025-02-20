"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  AppBar,
  Avatar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LockIcon from "@mui/icons-material/Lock";
import { styled } from "@mui/system";
import Image from "next/image";

const drawerWidth = 260;

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const Main = styled("main")(({ theme }) => ({
  flexGrow: 1,
  padding: "20px",
  marginLeft: drawerWidth,
  transition: "margin 0.3s",
  "@media (max-width: 600px)": {
    marginLeft: 0,
  },
}));

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navigationItems = [
    {
      text: "Dashboard",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity="0.32"
            d="M21.1808 16.9703C20.8971 17.6255 20.2225 18 19.5086 18H14.8154C14.8462 17.9145 14.8735 17.8269 14.8971 17.7373C15.1709 16.6974 14.8825 15.639 14.2214 14.8963C14.4654 12.9091 14.6177 10.8733 14.7108 9.26516C14.7569 8.46731 13.7795 8.20081 13.4274 8.91526C12.7178 10.3553 11.8493 12.1958 11.0842 14.041C10.1467 14.3479 9.3768 15.1177 9.10295 16.1576C8.93642 16.7899 8.97782 17.4291 9.18451 18H4.49141C3.77747 18 3.10288 17.6255 2.81918 16.9703C2.29212 15.7533 2 14.4108 2 13C2 7.47715 6.47715 3 12 3C17.5229 3 22 7.47715 22 13C22 14.4108 21.7079 15.7533 21.1808 16.9703Z"
            fill="#637381"
          />
          <path
            d="M14.7108 9.26516C14.7569 8.46731 13.7795 8.20081 13.4274 8.91526C12.7178 10.3553 11.8493 12.1958 11.0842 14.041C10.1467 14.3479 9.3768 15.1177 9.10295 16.1576C8.6742 17.7856 9.62375 19.459 11.2238 19.8953C12.8238 20.3315 14.4684 19.3654 14.8971 17.7373C15.1709 16.6974 14.8825 15.639 14.2214 14.8963C14.4654 12.9091 14.6177 10.8733 14.7108 9.26516Z"
            fill="#637381"
          />
        </svg>
      ),
      path: "/dashboard",
    },
    {
      text: "Onboarding",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity="0.32"
            d="M4.32992 6C3.84871 6 3.43524 6.34385 3.34854 6.8172C1.98294 14.2724 1.75 18 1.75 18H22.25C22.25 18 22.017 14.2724 20.6514 6.8172C20.5647 6.34385 20.1513 6 19.67 6H4.32992Z"
            fill="#637381"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M22.25 18H1.75C1.75 18 1.75 18.695 1.80122 19.6754C1.87282 21.0459 2.95622 22.0861 4.32766 22.138C5.855 22.1959 8.2782 22.25 12 22.25C15.7218 22.25 18.145 22.1959 19.6723 22.138C21.0438 22.0861 22.1272 21.0459 22.1988 19.6754C22.25 18.695 22.25 18 22.25 18Z"
            fill="#637381"
          />
          <path
            d="M12 1C9.2386 1 7 3.23857 7 6H9C9 4.34314 10.3432 3 12 3C13.6568 3 15 4.34314 15 6H17C17 3.23857 14.7614 1 12 1Z"
            fill="#637381"
          />
        </svg>
      ),
      path: "/dashboard/onboarding",
    },
  ];

  const drawer = (
    <Box sx={{ width: drawerWidth }}>
      <Toolbar>
        <Image
          src="/images/logo.png"
          alt="Install Cursor"
          layout="intrinsic"
          width={40}
          height={40}

        />
      </Toolbar>

      <List>
        <Typography
          style={{
            marginLeft: "20px",
            paddingBottom: "10px",
            fontWeight: 700,
            fontSize: "11px",
            color: "#919EAB",
          }}
        >
          OVERVIEW
        </Typography>
        {navigationItems.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              component={Link}
              href={item.path}
              style={{ display: "flex", alignItems: "center", gap: "8px" }}
            >
              <ListItemIcon style={{ minWidth: "30px" }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                style={{ fontWeight: 500, color: "#637381", fontSize: "14px" }}
                primary={item.text}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/* Topbar */}
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: "white",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          color: "black",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <div
            style={{ width: "100%", display: "flex", justifyContent: "end" }}
          >
            <Avatar alt="User" src="/avatar.png" />
          </div>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main Content */}
      <Main sx={{ marginTop: "64px" }}>{children}</Main>
    </Box>
  );
};

export default DashboardLayout;
