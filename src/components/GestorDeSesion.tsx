import { Link, useNavigate } from "react-router-dom";
import { LogIn } from "lucide-react";
import CirculoLetra from "./CirculoLetra";
import { useAuth } from "../contexts/authContext"; // ✅ usamos tu nuevo contexto

export default function BotonSesion() {
  const navigate = useNavigate();
  const { usuario, logout } = useAuth(); // ✅ usamos logout del contexto

  const CerrarSesion = () => {
    logout(); // limpia sesión y storage
    navigate("/");
  };

  return (
    <>
      {usuario && usuario.logueado ? (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Link to="/perfil">
            <CirculoLetra size={40} letra={usuario.nickName[0]} />
          </Link>
          <button
            onClick={CerrarSesion}
            style={{
              color: "red",
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
              marginLeft: "8px",
            }}
          >
            <LogIn />
          </button>
        </div>
      ) : (
        <Link
          to="/login"
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            color: "inherit",
          }}
        >
          <LogIn size={20} />
          <p style={{ marginLeft: "10px" }}>Iniciar Sesión</p>
        </Link>
      )}
    </>
  );
}