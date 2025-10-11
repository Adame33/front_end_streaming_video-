"use client";

import {
  Box,
  Card,
  CardContent,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";

function formatDuration(seconds) {
  const totalSeconds = Number(seconds) || 0;
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export default function VideoList({ videos = [], onSelect, onPlay }) {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 4,
        border: "1px solid rgba(99, 102, 241, 0.15)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Videos
        </Typography>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: "primary.light" }}>#</TableCell>
                <TableCell sx={{ color: "primary.light" }}>Título</TableCell>
                <TableCell sx={{ color: "primary.light" }}>Duración</TableCell>
                <TableCell sx={{ color: "primary.light" }}>Webinar</TableCell>
                <TableCell sx={{ color: "primary.light" }}>Estado</TableCell>
                <TableCell sx={{ color: "primary.light" }} align="right">
                  Reproducir
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {videos.map((video) => (
                <TableRow
                  key={video.id}
                  hover
                  sx={{ cursor: onSelect ? "pointer" : "default" }}
                  onClick={() => onSelect?.(video)}
                >
                  <TableCell>{video.order}</TableCell>
                  <TableCell>{video.title}</TableCell>
                  <TableCell>{formatDuration(video.duration)}</TableCell>
                  <TableCell>{video.webinar?.title || "Sin webinar"}</TableCell>
                  <TableCell>{video.isActive ? "Activo" : "Inactivo"}</TableCell>
                  <TableCell align="right">
                    <Tooltip title="Reproducir video">
                      <span>
                        <IconButton
                          color="primary"
                          onClick={(event) => {
                            event.stopPropagation();
                            onPlay?.(video);
                          }}
                          disabled={!onPlay}
                        >
                          <PlayArrowRoundedIcon />
                        </IconButton>
                      </span>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {videos.length === 0 && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            No hay videos disponibles.
          </Typography>
        )}
      </CardContent>
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: "linear-gradient(160deg, transparent 0%, rgba(244,63,94,0.12) 100%)",
        }}
      />
    </Card>
  );
}
