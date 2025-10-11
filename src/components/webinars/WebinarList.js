"use client";

import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Chip,
  Grid,
  Typography,
} from "@mui/material";

export default function WebinarList({ webinars = [], onSelect }) {
  return (
    <Grid container spacing={3}>
      {webinars.map((webinar) => (
        <Grid item xs={12} sm={6} md={4} key={webinar.id}>
          <Card
            elevation={0}
            sx={{
              borderRadius: 4,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              position: "relative",
            }}
          >
            {webinar.thumbnailUrl && (
              <CardMedia
                component="img"
                height="160"
                image={webinar.thumbnailUrl}
                alt={webinar.title}
              />
            )}
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="overline" color="primary.light">
                {webinar.category?.name || "Sin categoría"}
              </Typography>
              <Typography variant="h6" gutterBottom>
                {webinar.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ minHeight: 64 }}>
                {webinar.description}
              </Typography>
              <Chip
                label={`${webinar._count?.videos || 0} videos`}
                size="small"
                color="secondary"
                sx={{ mt: 2 }}
              />
            </CardContent>
            <CardActions sx={{ px: 3, pb: 3 }}>
              <Button size="small" variant="outlined" onClick={() => onSelect?.(webinar)}>
                Ver detalle
              </Button>
            </CardActions>
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                pointerEvents: "none",
                background: "linear-gradient(160deg, transparent 0%, rgba(99,102,241,0.18) 65%, rgba(14,116,144,0.2) 100%)",
              }}
            />
          </Card>
        </Grid>
      ))}
      {webinars.length === 0 && (
        <Grid item xs={12}>
          <Typography variant="body2" color="text.secondary">
            No se encontraron webinars.
          </Typography>
        </Grid>
      )}
    </Grid>
  );
}
