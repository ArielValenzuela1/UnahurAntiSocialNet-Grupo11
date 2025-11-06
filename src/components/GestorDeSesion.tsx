import { Link, useNavigate } from "react-router-dom";
import { LogIn } from "lucide-react";
import CirculoLetra from "./CirculoLetra";
import style from "./Modules/GestorDeSesion.module.css";
import { useAuth } from "../contexts/authContext";
import { motion } from "framer-motion";

export default function BotonSesion() {
  const navigate = useNavigate();
  const { usuario, logout } = useAuth();

  const CerrarSesion = () => {
    logout();
    navigate("/");
  };

  return (
    <div className={style.gestor}>
      {usuario && usuario.logueado ? (
        <div className="d-flex align-items-center">
          <Link to="/perfil">
            <CirculoLetra size={40} letra={usuario.nickName[0]} />
          </Link>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <button className={style.botonCerrarSesion} onClick={CerrarSesion}>
              <LogIn />
              {' '}
              Salir
            </button>
          </motion.div>

        </div>
      ) : (

        <motion.div whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.05 }}>
          <Link
            to="/login"
            className={style.botonIniciarSesion}
          >
            <LogIn size={20} />
            <p>Iniciar Sesión</p>
          </Link>
        </motion.div>

      )}
    </div>
  );
}