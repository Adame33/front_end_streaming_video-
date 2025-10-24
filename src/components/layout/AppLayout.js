"use client";

import { Box } from "@mui/material";
import AppHeader from "./AppHeader";
import Sidebar from "./Sidebar";

export default function AppLayout({ children }) {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <AppHeader />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
         
          mt: "64px",
          minHeight: "100vh",
          backgroundColor: "transparent",
          px: { xs: 2, md: 6 },
          pb: 8,
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background: "radial-gradient(circle at 0% 0%, rgba(99,102,241,0.25), transparent 55%)",
            zIndex: 0,
          }}
        />
        <Box sx={{ position: "relative", zIndex: 1 }}>{children}</Box>
      </Box>
    </Box>
  );
}
