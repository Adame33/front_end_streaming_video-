"use client";

import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export default function VideoFilterBar({ webinars = [], value, onChange }) {
  return (
    <FormControl fullWidth>
      <InputLabel id="video-filter-label">Filtrar por webinar</InputLabel>
      <Select
        labelId="video-filter-label"
        value={value ?? ""}
        label="Filtrar por webinar"
        onChange={(event) => onChange(event.target.value || null)}
      >
        <MenuItem value="">
          <em>Todos los webinars</em>
        </MenuItem>
        {webinars.map((webinar) => (
          <MenuItem key={webinar.id} value={webinar.id}>
            {webinar.title}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
