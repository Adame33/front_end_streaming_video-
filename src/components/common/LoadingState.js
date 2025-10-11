"use client";

import { Box, CircularProgress, Typography } from "@mui/material";

export default function LoadingState({ message = "Cargando" }) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight={240}
      gap={2}
    >
      <CircularProgress />
      <Typography variant="body2" color="text.secondary">
        {message}
      </Typography>
    </Box>
  );
}
