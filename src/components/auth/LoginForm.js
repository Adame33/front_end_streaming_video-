"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import NextLink from "next/link";
import { Alert, Box, Button, Link, Stack, TextField, Typography } from "@mui/material";
import { loginUser } from "../../api/users";
import { storeSession } from "../../utils/auth";

export default function LoginForm() {
  const router = useRouter();
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await loginUser(form);
      if (response?.success) {
        storeSession(response.data);
        router.push("/");
      } else {
        setError(response?.message || "Credenciales inválidas");
      }
    } catch (apiError) {
      setError(apiError.message || "No fue posible iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <Stack spacing={3}>
        <Box
          sx={{
            p: 3,
            borderRadius: 3,
            background: "linear-gradient(120deg, rgba(99,102,241,0.2), rgba(244,63,94,0.15))",
          }}
        >
          <Typography variant="h5" fontWeight={700} gutterBottom>
            Bienvenido de nuevo
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Ingresa tus credenciales para acceder al centro de control.
          </Typography>
        </Box>
        {error && <Alert severity="error">{error}</Alert>}
        <TextField
          label="Usuario"
          value={form.username}
          onChange={handleChange("username")}
          required
          autoComplete="username"
        />
        <TextField
          label="Contraseña"
          type="password"
          value={form.password}
          onChange={handleChange("password")}
          required
          autoComplete="current-password"
        />
        <Button type="submit" variant="contained" size="large" disabled={loading}>
          {loading ? "Ingresando..." : "Iniciar sesión"}
        </Button>
        <Typography variant="body2" color="text.secondary" textAlign="center">
          ¿Aún no tienes cuenta? <Link component={NextLink} href="/register">Crear una cuenta</Link>
        </Typography>
      </Stack>
    </Box>
  );
}
