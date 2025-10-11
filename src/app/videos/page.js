"use client";

import { useEffect, useState } from "react";
import { Stack } from "@mui/material";
import PageContainer from "../../components/common/PageContainer";
import LoadingState from "../../components/common/LoadingState";
import ErrorAlert from "../../components/common/ErrorAlert";
import VideoFilterBar from "../../components/videos/VideoFilterBar";
import VideoList from "../../components/videos/VideoList";
import VideoDetailDialog from "../../components/videos/VideoDetailDialog";
import VideoPlayerModal from "../../components/videos/VideoPlayerModal";
import { getVideos, getVideoById, getVideosByWebinar } from "../../api/videos";
import { getWebinars } from "../../api/webinars";

export default function VideosPage() {
  const [videos, setVideos] = useState([]);
  const [webinars, setWebinars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedWebinarId, setSelectedWebinarId] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [playerOpen, setPlayerOpen] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      try {
        setLoading(true);
        const [videosResponse, webinarsResponse] = await Promise.all([
          getVideos(),
          getWebinars(),
        ]);

        if (!isMounted) return;

        setVideos(videosResponse?.data || []);
        setWebinars(webinarsResponse?.data || []);
        setError(null);
      } catch (apiError) {
        if (!isMounted) return;
        setError(apiError.message || "No fue posible cargar los videos");
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleFilterChange = async (webinarId) => {
    setSelectedWebinarId(webinarId);

    try {
      if (!webinarId) {
        const response = await getVideos();
        setVideos(response?.data || []);
      } else {
        const response = await getVideosByWebinar(webinarId);
        setVideos(response?.data || []);
      }
      setError(null);
    } catch (apiError) {
      setError(apiError.message || "No fue posible filtrar los videos");
    }
  };

  const handleSelectVideo = async (video) => {
    try {
      setDetailOpen(true);
      const response = await getVideoById(video.id);
      setSelectedVideo(response?.data || video);
    } catch (apiError) {
      setSelectedVideo(video);
      setError(apiError.message || "No fue posible cargar el detalle del video");
    }
  };

  const handlePlayVideo = (video) => {
    setSelectedVideo(video);
    setPlayerOpen(true);
  };

  return (
    <PageContainer
      title="Videos"
      subtitle="Revisa el catálogo completo, filtra por webinar y controla el orden de reproducción"
    >
      {loading ? (
        <LoadingState message="Cargando videos" />
      ) : (
        <Stack spacing={3}>
          {error && <ErrorAlert message={error} />}
          <VideoFilterBar webinars={webinars} value={selectedWebinarId ?? ""} onChange={handleFilterChange} />
          <VideoList videos={videos} onSelect={handleSelectVideo} onPlay={handlePlayVideo} />
        </Stack>
      )}
      <VideoDetailDialog open={detailOpen} video={selectedVideo} onClose={() => setDetailOpen(false)} />
      <VideoPlayerModal open={playerOpen} video={selectedVideo} onClose={() => setPlayerOpen(false)} />
    </PageContainer>
  );
}
