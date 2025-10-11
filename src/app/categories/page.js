"use client";

import { useEffect, useState } from "react";
import { Button, Stack } from "@mui/material";
import PageContainer from "../../components/common/PageContainer";
import LoadingState from "../../components/common/LoadingState";
import ErrorAlert from "../../components/common/ErrorAlert";
import CategoryList from "../../components/categories/CategoryList";
import CategoryDetailDrawer from "../../components/categories/CategoryDetailDrawer";
import { getCategories, getCategoryById } from "../../api/categories";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadCategories() {
      try {
        setLoading(true);
        const response = await getCategories();
        if (!isMounted) return;
        setCategories(response?.data || []);
        setError(null);
      } catch (apiError) {
        if (!isMounted) return;
        setError(apiError.message || "No fue posible cargar las categorías");
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadCategories();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleSelect = async (category) => {
    try {
      setDrawerOpen(true);
      const response = await getCategoryById(category.id);
      setSelectedCategory(response?.data || category);
    } catch (apiError) {
      setSelectedCategory(category);
      setError(apiError.message || "No fue posible cargar el detalle de la categoría");
    }
  };

  return (
    <PageContainer
      title="Categorías"
      subtitle="Organiza el contenido por temáticas y descubre tendencias"
      actions={
        <Stack direction="row" spacing={2}>
          <Button variant="contained" disabled>
            Próximamente: nueva categoría
          </Button>
        </Stack>
      }
    >
      {loading ? (
        <LoadingState message="Cargando categorías" />
      ) : (
        <>
          {error && <ErrorAlert message={error} />}
          <CategoryList categories={categories} onSelect={handleSelect} />
        </>
      )}
      <CategoryDetailDrawer open={drawerOpen} category={selectedCategory} onClose={() => setDrawerOpen(false)} />
    </PageContainer>
  );
}
