"use client";

import { usePathname } from "next/navigation";
import { Box } from "@mui/material";
import AppLayout from "./AppLayout";
import AuthGuard from "./AuthGuard";

const AUTH_PATHS = new Set(["/login", "/register"]);

export default function AppContent({ children }) {
  const pathname = usePathname();
  const isAuthRoute = AUTH_PATHS.has(pathname);

  if (isAuthRoute) {
    return (
      <AuthGuard>
        <Box sx={{ minHeight: "100vh", backgroundColor: "background.default" }}>{children}</Box>
      </AuthGuard>
    );
  }

  return (
    <AuthGuard>
      <AppLayout>{children}</AppLayout>
    </AuthGuard>
  );
}
