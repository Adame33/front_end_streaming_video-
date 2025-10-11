"use client";

import { useEffect, useMemo, useState } from "react";
import { Button, Divider, Stack, Typography } from "@mui/material";
import PageContainer from "../../components/common/PageContainer";
import LoadingState from "../../components/common/LoadingState";
import ErrorAlert from "../../components/common/ErrorAlert";
import WebinarSearchBar from "../../components/webinars/WebinarSearchBar";
import WebinarList from "../../components/webinars/WebinarList";
import WebinarDetailDialog from "../../components/webinars/WebinarDetailDialog";
import { getWebinars, searchWebinars, getWebinarById } from "../../api/webinars";
import { getCategories } from "../../api/categories";

export default function WebinarsPage() {
  const [webinars, setWebinars] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedWebinar, setSelectedWebinar] = useState(null);
  const [detailOpen, setDetailOpen] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      try {
        setLoading(true);
        const [webinarsResponse, categoriesResponse] = await Promise.all([
          getWebinars(),
          getCategories(),
        ]);

        if (!isMounted) return;

        setWebinars(webinarsResponse?.data || []);
        setCategories(categoriesResponse?.data || []);
        setError(null);
      } catch (apiError) {
        if (!isMounted) return;
        setError(apiError.message || "No fue posible cargar los webinars");
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

  const handleSearchChange = async (value) => {
    setSearchTerm(value);

    try {
      if (value.trim().length < 3) {
        const response = await getWebinars();
        setWebinars(response?.data || []);
      } else {
        const response = await searchWebinars(value.trim());
        setWebinars(response?.data || []);
      }
      setError(null);
    } catch (apiError) {
      setError(apiError.message || "No fue posible realizar la búsqueda");
    }
  };

  const handleSelect = async (webinar) => {
    try {
      setDetailOpen(true);
      const response = await getWebinarById(webinar.id);
      setSelectedWebinar(response?.data || webinar);
    } catch (apiError) {
      setSelectedWebinar(webinar);
      setError(apiError.message || "No fue posible cargar el detalle del webinar");
    }
  };

  const categorySummary = useMemo(() => {
    if (!categories.length) {
      return "";
    }
    const totalWebinars = categories.reduce((acc, category) => acc + (category._count?.webinars || 0), 0);
    return `${categories.length} categorías — ${totalWebinars} webinars`;
  }, [categories]);

  return (
    <PageContainer
      title="Webinars"
      subtitle="Gestiona lanzamientos, busca sesiones y analiza su rendimiento"
      actions={
        <Stack direction="row" spacing={2}>
          <Button variant="contained" disabled>
            Próximamente: nuevo webinar
          </Button>
        </Stack>
      }
    >
      {loading ? (
        <LoadingState message="Cargando webinars" />
      ) : (
        <Stack spacing={3}>
          {error && <ErrorAlert message={error} />}
          <Stack spacing={2}>
            <WebinarSearchBar value={searchTerm} onChange={handleSearchChange} />
            {categorySummary && (
              <Typography variant="body2" color="text.secondary">
                {categorySummary}
              </Typography>
            )}
          </Stack>
          <Divider />
          <WebinarList webinars={webinars} onSelect={handleSelect} />
        </Stack>
      )}
      <WebinarDetailDialog open={detailOpen} webinar={selectedWebinar} onClose={() => setDetailOpen(false)} />
    </PageContainer>
  );
}
