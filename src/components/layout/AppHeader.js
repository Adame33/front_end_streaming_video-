"use client";

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import { clearSession, getStoredUser } from "../../utils/auth";

export default function AppHeader() {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(getStoredUser());
  }, []);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    clearSession();
    setUser(null);
    setAnchorEl(null);
    router.replace("/login");
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        ml: "240px",
        width: `calc(100% - 240px)`,
        color: "text.primary",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <Typography variant="h6" component="div" fontWeight={700}>
            Panel de streaming
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Administración en tiempo real
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" gap={2}>
          <Button component={Link} href="/webinars" variant="contained" color="primary">
            Nuevo webinar
          </Button>
          <IconButton
            onClick={handleMenuOpen}
            color="inherit"
            sx={{
              px: 1.5,
              borderRadius: 12,
              border: "1px solid",
              borderColor: "rgba(148, 163, 184, 0.25)",
            }}
          >
            <Avatar
              sx={{ width: 32, height: 32, bgcolor: "primary.main" }}
              src=""
              alt={user?.firstName || "Usuario"}
            >
              {(user?.firstName || user?.username || "U").charAt(0).toUpperCase()}
            </Avatar>
            <Box sx={{ display: { xs: "none", sm: "flex" }, alignItems: "center", ml: 1 }}>
              <Typography variant="body2" fontWeight={600}>
                {user?.firstName ? `${user.firstName} ${user.lastName || ""}`.trim() : user?.username || "Usuario"}
              </Typography>
              <KeyboardArrowDownRoundedIcon fontSize="small" sx={{ ml: 0.5 }} />
            </Box>
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose} keepMounted>
            <MenuItem disabled>{user?.email || "Sin correo"}</MenuItem>
            <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
