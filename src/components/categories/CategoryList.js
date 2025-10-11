"use client";

import {
  Box,
  Card,
  CardActions,
  CardContent,
  Button,
  Grid,
  Typography,
  Chip,
} from "@mui/material";

export default function CategoryList({ categories = [], onSelect }) {
  return (
    <Grid container spacing={3}>
      {categories.map((category) => (
        <Grid item xs={12} sm={6} md={4} key={category.id}>
          <Card
            elevation={0}
            sx={{
              borderRadius: 4,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              p: 3,
              gap: 2,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <CardContent sx={{ flexGrow: 1, p: 0 }}>
              <Typography variant="overline" color="primary.light">
                Categoría
              </Typography>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
                {category.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ minHeight: 64 }}>
                {category.description || "Sin descripción"}
              </Typography>
              <Chip
                label={`${category._count?.webinars || 0} webinars`}
                size="small"
                color="primary"
                sx={{ mt: 2 }}
              />
            </CardContent>
            <CardActions sx={{ p: 0 }}>
              <Button size="small" variant="outlined" onClick={() => onSelect?.(category)}>
                Ver detalle
              </Button>
            </CardActions>
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                pointerEvents: "none",
                background: "linear-gradient(160deg, transparent 0%, rgba(56,189,248,0.2) 60%, rgba(99,102,241,0.15) 100%)",
              }}
            />
          </Card>
        </Grid>
      ))}
      {categories.length === 0 && (
        <Grid item xs={12}>
          <Typography variant="body2" color="text.secondary">
            No hay categorías disponibles.
          </Typography>
        </Grid>
      )}
    </Grid>
  );
}
