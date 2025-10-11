"use client";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Typography,
} from "@mui/material";

function formatDuration(seconds) {
  const totalSeconds = Number(seconds) || 0;
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export default function WebinarDetailDialog({ open, webinar, onClose }) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{webinar?.title || "Detalle de webinar"}</DialogTitle>
      <DialogContent dividers>
        {webinar ? (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="subtitle2" color="text.secondary">
                Descripción
              </Typography>
              <Typography>{webinar.description || "Sin descripción"}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Categoría
              </Typography>
              <Typography>{webinar.category?.name || "Sin categoría"}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Publicado
              </Typography>
              <Typography>{new Date(webinar.createdAt).toLocaleString()}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ my: 1 }} />
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Videos
              </Typography>
              {(webinar.videos || []).map((video) => (
                <Typography key={video.id} variant="body2" sx={{ mb: 0.5 }}>
                  {video.order}. {video.title} — {formatDuration(video.duration)}
                </Typography>
              ))}
              {(!webinar.videos || webinar.videos.length === 0) && (
                <Typography variant="body2" color="text.secondary">
                  No hay videos asociados.
                </Typography>
              )}
            </Grid>
          </Grid>
        ) : (
          <Typography variant="body2" color="text.secondary">
            Selecciona un webinar para ver más información.
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
}
