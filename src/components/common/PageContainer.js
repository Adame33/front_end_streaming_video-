"use client";

import { Box, Container, Stack, Typography } from "@mui/material";

export default function PageContainer({ title, subtitle, actions, children, maxWidth = "lg" }) {
  return (
    <Container maxWidth={maxWidth} sx={{ py: 5 }}>
      <Stack spacing={4}>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
            p: 3,
            borderRadius: 3,
            background: "linear-gradient(135deg, rgba(99, 102, 241, 0.25), rgba(15, 23, 42, 0.2))",
            border: "1px solid rgba(99, 102, 241, 0.35)",
          }}
        >
          <Box>
            {typeof title === "string" ? (
              <Typography variant="h4" fontWeight={700} gutterBottom>
                {title}
              </Typography>
            ) : (
              title
            )}
            {subtitle && (
              <Typography variant="body2" color="text.secondary">
                {subtitle}
              </Typography>
            )}
          </Box>
          {actions && <Box display="flex" gap={2}>{actions}</Box>}
        </Box>
        <Box display="flex" flexDirection="column" gap={3}>
          {children}
        </Box>
      </Stack>
    </Container>
  );
}
