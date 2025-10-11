import { Box, Container, Paper, Typography } from "@mui/material";
import RegisterForm from "../../components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        background: "radial-gradient(circle at bottom, rgba(244,63,94,0.35), transparent 55%)",
      }}
    >
      <Container maxWidth="sm" sx={{ py: 8 }}>
        <Paper elevation={0} sx={{ p: 5, borderRadius: 4 }}>
          <Box textAlign="center" mb={4}>
            <Typography variant="h4" fontWeight={700} gutterBottom>
              Crea tu cuenta
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Habilita acceso a la consola de administración de NovaStream.
            </Typography>
          </Box>
          <RegisterForm />
        </Paper>
      </Container>
    </Box>
  );
}
