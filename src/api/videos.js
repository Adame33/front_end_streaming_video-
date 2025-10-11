import { apiFetch } from "./httpClient";

export function getVideos() {
  return apiFetch("/videos");
}

export function getVideoById(videoId) {
  return apiFetch(`/videos/${videoId}`);
}

export function getVideosByWebinar(webinarId) {
  return apiFetch(`/videos/webinar/${webinarId}`);
}
