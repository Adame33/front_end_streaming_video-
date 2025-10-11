"use client";

import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

export default function CategoryDetailDrawer({ open, category, onClose }) {
  return (
    <Drawer anchor="right" open={open} onClose={onClose} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Box sx={{ width: 360, p: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">Detalle de categoría</Typography>
          <IconButton onClick={onClose} color="secondary">
            <CloseRoundedIcon />
          </IconButton>
        </Box>
        {category ? (
          <Box display="flex" flexDirection="column" gap={2}>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                Nombre
              </Typography>
              <Typography>{category.name}</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                Descripción
              </Typography>
              <Typography>{category.description || "Sin descripción"}</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                Webinars asociados
              </Typography>
              <List dense>
                {(category.webinars || []).map((webinar) => (
                  <ListItem key={webinar.id} disableGutters>
                    <ListItemText
                      primary={webinar.title}
                      secondary={`${webinar._count?.videos || 0} videos`}
                    />
                  </ListItem>
                ))}
                {(!category.webinars || category.webinars.length === 0) && (
                  <Typography variant="body2" color="text.secondary">
                    No hay webinars asociados.
                  </Typography>
                )}
              </List>
            </Box>
          </Box>
        ) : (
          <Typography variant="body2" color="text.secondary">
            Selecciona una categoría para ver más información.
          </Typography>
        )}
      </Box>
    </Drawer>
  );
}
