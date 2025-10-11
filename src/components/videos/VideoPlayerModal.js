"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Button,
  Typography,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";

const VIDEO_FILE_REGEX = /\.(mp4|webm|ogg|mov)$/i;

function getEmbedUrl(video) {
  if (!video?.videoUrl) {
    return null;
  }

  try {
    const parsed = new URL(video.videoUrl);
    const host = parsed.hostname;

    if (host.includes("youtube.com")) {
      const videoId = parsed.searchParams.get("v");
      if (videoId) {
        const params = new URLSearchParams({ autoplay: "1", rel: "0", modestbranding: "1" });
        return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
      }
    }

    if (host === "youtu.be") {
      const videoId = parsed.pathname.replace("/", "");
      if (videoId) {
        const params = new URLSearchParams({ autoplay: "1", rel: "0", modestbranding: "1" });
        return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
      }
    }
  } catch (error) {
    return video.videoUrl;
  }

  return video.videoUrl;
}

export default function VideoPlayerModal({ open, video, onClose }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const embedUrl = useMemo(() => getEmbedUrl(video), [video]);
  const isYoutube = embedUrl?.includes("youtube.com/embed");

  const playerType = useMemo(() => {
    if (!embedUrl) return null;
    if (isYoutube) return "youtube";
    if (VIDEO_FILE_REGEX.test(embedUrl)) return "file";
    return "external";
  }, [embedUrl, isYoutube]);

  useEffect(() => {
    if (!open) {
      setIsPlaying(false);
    }
  }, [open, video]);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Box>
          <Typography variant="h6" fontWeight={700}>
            {video?.title || "Reproductor"}
          </Typography>
          {video?.description && (
            <Typography variant="body2" color="text.secondary">
              {video.description}
            </Typography>
          )}
        </Box>
        <IconButton onClick={onClose} color="secondary">
          <CloseRoundedIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ pt: 0 }}>
        {video ? (
          <Box
            sx={{
              position: "relative",
              borderRadius: 3,
              overflow: "hidden",
              aspectRatio: "16 / 9",
              backgroundColor: "rgba(15, 23, 42, 0.85)",
              backgroundImage: !isPlaying && video.thumbnailUrl ? `url(${video.thumbnailUrl})` : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {!isPlaying && (
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(15, 23, 42, 0.55)",
                  backdropFilter: "blur(3px)",
                }}
              >
                <IconButton
                  onClick={handlePlay}
                  sx={{
                    width: 88,
                    height: 88,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #6366f1, #22d3ee)",
                    boxShadow: "0 20px 45px rgba(99, 102, 241, 0.45)",
                    color: "#fff",
                    "&:hover": {
                      background: "linear-gradient(135deg, #4f46e5, #0ea5e9)",
                    },
                  }}
                >
                  <PlayArrowRoundedIcon sx={{ fontSize: 48 }} />
                </IconButton>
              </Box>
            )}

            {isPlaying && embedUrl && playerType === "youtube" && (
              <Box
                component="iframe"
                src={embedUrl}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                sx={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  border: 0,
                }}
              />
            )}

            {isPlaying && embedUrl && playerType === "file" && (
              <Box
                component="video"
                src={embedUrl}
                title={video.title}
                controls
                autoPlay
                sx={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "black",
                }}
              />
            )}

            {isPlaying && embedUrl && playerType === "external" && (
              <Box
                component="iframe"
                src={embedUrl}
                title={video.title}
                allow="autoplay"
                sx={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  border: 0,
                }}
              />
            )}
          </Box>
        ) : (
          <Typography variant="body2" color="text.secondary">
            Selecciona un video para reproducirlo.
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
}
