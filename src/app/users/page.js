"use client";

import { useEffect, useState } from "react";
import { Button, Stack } from "@mui/material";
import PageContainer from "../../components/common/PageContainer";
import LoadingState from "../../components/common/LoadingState";
import ErrorAlert from "../../components/common/ErrorAlert";
import UserList from "../../components/users/UserList";
import UserDetailDialog from "../../components/users/UserDetailDialog";
import { getUsers, getUserById } from "../../api/users";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [detailOpen, setDetailOpen] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadUsers() {
      try {
        setLoading(true);
        const response = await getUsers();
        if (!isMounted) return;
        setUsers(response?.data || []);
        setError(null);
      } catch (apiError) {
        if (!isMounted) return;
        setError(apiError.message || "No fue posible cargar los usuarios");
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadUsers();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSelect = async (user) => {
    try {
      setDetailOpen(true);
      const response = await getUserById(user.id);
      setSelectedUser(response?.data || user);
    } catch (apiError) {
      setSelectedUser(user);
      setError(apiError.message || "No fue posible cargar el detalle del usuario");
    }
  };

  return (
    <PageContainer
      title="Usuarios"
      subtitle="Gestiona a tu comunidad y revisa la actividad reciente"
      actions={
        <Stack direction="row" spacing={2}>
          <Button variant="contained" disabled>
            Próximamente: invitar usuario
          </Button>
        </Stack>
      }
    >
      {loading ? (
        <LoadingState message="Cargando usuarios" />
      ) : (
        <>
          {error && <ErrorAlert message={error} />}
          <UserList users={users} onSelect={handleSelect} />
        </>
      )}
      <UserDetailDialog open={detailOpen} user={selectedUser} onClose={() => setDetailOpen(false)} />
    </PageContainer>
  );
}
