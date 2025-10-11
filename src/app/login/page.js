import { Box, Container, Paper, Typography } from "@mui/material";
import LoginForm from "../../components/auth/LoginForm";

export default function LoginPage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        background: "radial-gradient(circle at top, rgba(99,102,241,0.45), transparent 55%)",
      }}
    >
      <Container maxWidth="sm" sx={{ py: 8 }}>
        <Paper elevation={0} sx={{ p: 5, borderRadius: 4 }}>
          <Box textAlign="center" mb={4}>
            <Typography variant="h4" fontWeight={700} gutterBottom>
              NovaStream Admin
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Accede a tu panel para gestionar la experiencia de streaming.
            </Typography>
          </Box>
          <LoginForm />
        </Paper>
      </Container>
    </Box>
  );
}
