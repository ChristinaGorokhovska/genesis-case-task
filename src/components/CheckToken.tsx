import { Box, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuthContext } from "../context/authProvider";
import useRefresh from "../hooks/useRefresh";

export default function CheckToken() {
  const [loading, setLoading] = useState<boolean>(true);
  const { auth } = useAuthContext();
  const refresh = useRefresh();
  const verifyToken = async () => {
    try {
      await refresh();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    !auth.accessToken && verifyToken();
  }, []);
  return (
    <>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      ) : (
        <Outlet />
      )}
    </>
  );
}
