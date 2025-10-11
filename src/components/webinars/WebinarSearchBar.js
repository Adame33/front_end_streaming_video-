"use client";

import { TextField } from "@mui/material";

export default function WebinarSearchBar({ value, onChange }) {
  return (
    <TextField
      fullWidth
      label="Buscar webinars"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder="Escribe un título o descripción"
    />
  );
}
