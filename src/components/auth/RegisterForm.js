"use client";

import { useState } from "react";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { Alert, Box, Button, Grid, Link, Stack, TextField, Typography } from "@mui/material";
import { registerUser } from "../../api/users";

export default function RegisterForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    username: "",
    password: "",
    email: "",
    firstName: "",
    lastName: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await registerUser(form);
      if (response?.success) {
        setSuccess("Usuario creado exitosamente");
        window.setTimeout(() => {
          router.push("/login");
        }, 1200);
      } else {
        setError(response?.message || "No fue posible crear el usuario");
      }
    } catch (apiError) {
      setError(apiError.message || "Ocurrió un error al registrar el usuario");
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
            background: "linear-gradient(120deg, rgba(14,116,144,0.2), rgba(99,102,241,0.15))",
          }}
        >
          <Typography variant="h5" fontWeight={700} gutterBottom>
            Crear nueva cuenta
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Registra un nuevo usuario para administrar la plataforma.
          </Typography>
        </Box>
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Nombre"
              value={form.firstName}
              onChange={handleChange("firstName")}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Apellido"
              value={form.lastName}
              onChange={handleChange("lastName")}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Correo electrónico"
              type="email"
              value={form.email}
              onChange={handleChange("email")}
              required
              autoComplete="email"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Usuario"
              value={form.username}
              onChange={handleChange("username")}
              required
              autoComplete="username"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Contraseña"
              type="password"
              value={form.password}
              onChange={handleChange("password")}
              required
              autoComplete="new-password"
            />
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" size="large" disabled={loading}>
          {loading ? "Creando..." : "Registrar usuario"}
        </Button>
        <Typography variant="body2" color="text.secondary" textAlign="center">
          ¿Ya tienes una cuenta? <Link component={NextLink} href="/login">Inicia sesión aquí</Link>
        </Typography>
      </Stack>
    </Box>
  );
}
