"use client";

import {
  Box,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

export default function UserList({ users = [], onSelect }) {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 4,
        border: "1px solid rgba(99, 102, 241, 0.15)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Usuarios registrados
        </Typography>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: "primary.light" }}>Usuario</TableCell>
                <TableCell sx={{ color: "primary.light" }}>Nombre</TableCell>
                <TableCell sx={{ color: "primary.light" }}>Correo</TableCell>
                <TableCell sx={{ color: "primary.light" }}>Estado</TableCell>
                <TableCell sx={{ color: "primary.light" }}>Creado</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow
                  key={user.id}
                  hover
                  sx={{ cursor: onSelect ? "pointer" : "default" }}
                  onClick={() => onSelect?.(user)}
                >
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{`${user.firstName || ""} ${user.lastName || ""}`.trim()}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.isActive ? "Activo" : "Inactivo"}</TableCell>
                  <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {users.length === 0 && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            No hay usuarios registrados.
          </Typography>
        )}
      </CardContent>
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: "linear-gradient(180deg, transparent 0%, rgba(99,102,241,0.12) 100%)",
        }}
      />
    </Card>
  );
}
