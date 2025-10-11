"use client";

import { Alert, AlertTitle } from "@mui/material";

export default function ErrorAlert({ title = "Error", message }) {
  if (!message) {
    return null;
  }

  return (
    <Alert severity="error" variant="outlined">
      <AlertTitle>{title}</AlertTitle>
      {message}
    </Alert>
  );
}
