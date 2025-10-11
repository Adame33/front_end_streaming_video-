"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  Typography,
} from "@mui/material";
import PageContainer from "../components/common/PageContainer";
import LoadingState from "../components/common/LoadingState";
import ErrorAlert from "../components/common/ErrorAlert";
import { getUsers } from "../api/users";
import { getCategories } from "../api/categories";
import { getWebinars } from "../api/webinars";
import { getVideos } from "../api/videos";

const overviewLinks = [
  { label: "Gestionar usuarios", href: "/users" },
  { label: "Explorar categorías", href: "/categories" },
  { label: "Administrar webinars", href: "/webinars" },
  { label: "Controlar videos", href: "/videos" },
];

export default function Home() {
  const [data, setData] = useState({ users: [], categories: [], webinars: [], videos: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function loadOverview() {
      try {
        setLoading(true);
        const [usersResponse, categoriesResponse, webinarsResponse, videosResponse] = await Promise.all([
          getUsers(),
          getCategories(),
          getWebinars(),
          getVideos(),
        ]);

        if (!isMounted) return;

        setData({
          users: usersResponse?.data || [],
          categories: categoriesResponse?.data || [],
          webinars: webinarsResponse?.data || [],
          videos: videosResponse?.data || [],
        });
        setError(null);
      } catch (apiError) {
        if (!isMounted) return;
        setError(apiError.message);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadOverview();

    return () => {
      isMounted = false;
    };
  }, []);

  const summaryCards = useMemo(
    () => [
      { title: "Usuarios", value: data.users.length, caption: "Usuarios activos en la plataforma" },
      { title: "Categorías", value: data.categories.length, caption: "Áreas temáticas disponibles" },
      { title: "Webinars", value: data.webinars.length, caption: "Eventos publicados" },
      { title: "Videos", value: data.videos.length, caption: "Lecciones disponibles" },
    ],
    [data]
  );

  return (
    <PageContainer
      title="Panel general"
      subtitle="Resumen en vivo del catálogo y la audiencia de tu plataforma"
      actions={
        <Button component={Link} href="/webinars" variant="contained" color="primary">
          Crear webinar
        </Button>
      }
    >
      {loading ? (
        <LoadingState message="Cargando información del panel" />
      ) : (
        <Box display="flex" flexDirection="column" gap={4}>
          {error && <ErrorAlert message={error} />}

          <Grid container spacing={3}>
            {summaryCards.map((card) => (
              <Grid item xs={12} sm={6} md={3} key={card.title}>
                <Card
                  elevation={0}
                  sx={{
                    borderRadius: 4,
                    height: "100%",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="subtitle2"
                      sx={{ color: "primary.light", fontWeight: 600, letterSpacing: 0.5 }}
                      gutterBottom
                    >
                      {card.title.toUpperCase()}
                    </Typography>
                    <Typography variant="h4" fontWeight={700} gutterBottom>
                      {card.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {card.caption}
                    </Typography>
                  </CardContent>
                  <Box
                    sx={{
                      position: "absolute",
                      inset: 0,
                      pointerEvents: "none",
                      background: "linear-gradient(160deg, transparent 0%, rgba(99,102,241,0.15) 60%, rgba(244,63,94,0.15) 100%)",
                    }}
                  />
                </Card>
              </Grid>
            ))}
          </Grid>

          <Grid container spacing={3}>
            {overviewLinks.map((item) => (
              <Grid item xs={12} sm={6} md={3} key={item.href}>
                <Card
                  elevation={0}
                  sx={{
                    borderRadius: 4,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    p: 2.5,
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {item.label}
                    </Typography>
                    <Chip
                      label="Ver detalles"
                      variant="filled"
                      color="primary"
                      component={Link}
                      href={item.href}
                      clickable
                    />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </PageContainer>
  );
}
