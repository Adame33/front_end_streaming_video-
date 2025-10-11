"use client";

import { Box, CircularProgress, Typography } from "@mui/material";

export default function FullscreenSpinner({ message = "Validando sesión" }) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        minHeight: "100vh",
        background: (theme) => theme.palette.background.default,
        gap: 2,
      }}
    >
      <CircularProgress />
      <Typography variant="body2" color="text.secondary">
        {message}
      </Typography>
    </Box>
  );
}
