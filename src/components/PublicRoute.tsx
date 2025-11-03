import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

export default function PublicRoute() {
  const { usuario, cargando } = useAuth();

  if (cargando) return <p>Cargando...</p>;

  return usuario?.logueado ? <Navigate to="/" replace /> : <Outlet />;
}