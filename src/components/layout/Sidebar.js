"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";

const drawerWidth = 240;

const navItems = [
  { label: "Dashboard", href: "/" },
  { label: "Usuarios", href: "/users" },
  { label: "Categorías", href: "/categories" },
  { label: "Webinars", href: "/webinars" },
  { label: "Videos", href: "/videos" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          borderRight: 0,
          backgroundColor: "transparent",
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Toolbar>
        <Box display="flex" alignItems="center" gap={1.5}>
          <Box
            sx={{
              width: 36,
              height: 36,
              display: "grid",
              placeItems: "center",
              borderRadius: "50%",
              backgroundImage: "linear-gradient(135deg, #6366f1, #f43f5e)",
              boxShadow: "0 10px 25px rgba(99, 102, 241, 0.3)",
            }}
          >
            <PlayArrowRoundedIcon fontSize="small" />
          </Box>
          <Box>
            <Typography variant="h6" component="div" fontWeight={700}>
              NovaStream
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Control streaming
            </Typography>
          </Box>
        </Box>
      </Toolbar>
      <Box sx={{ overflow: "auto", flexGrow: 1 }}>
        <List>
          {navItems.map((item) => (
            <ListItemButton
              key={item.href}
              component={Link}
              href={item.href}
              selected={pathname === item.href}
              sx={{ my: 0.5 }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                <PlayArrowRoundedIcon fontSize="small" sx={{ color: pathname === item.href ? "primary.main" : "text.secondary" }} />
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}
