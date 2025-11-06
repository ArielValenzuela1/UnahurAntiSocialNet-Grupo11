import { NavLink } from "react-router-dom";
import style from "./Modules/SideBar.module.css";
import { House, User, CirclePlus, Menu, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../contexts/authContext";
import { motion } from "framer-motion";

export default function SideBar() {
  const { usuario } = useAuth();

  const logueado = !!usuario;

  const [menuAbierto, setMenuAbierto] = useState(false);

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  const handleInicioClick = () => {
    if (location.pathname === "/") {
      window.location.reload();
    } else {
      setMenuAbierto(false);
    }
  };

  return (
    <div className={`${style.SideBar} ${menuAbierto ? style.abierto : ""}`}>
      <button className={style.MenuToggle} onClick={toggleMenu}>
        {menuAbierto ? <X /> : <Menu />}
      </button>

      <div className={style.NavLinksContainer}>
        <p>Navegación</p>
        <motion.div
          whileHover={{ x: 5 }}
          whileTap={{ scale: 0.98 }}>
          <NavLink
            to="/"
            className={({ isActive }) => `${style.NavLink} ${isActive ? style.activo : ""}`}
            onClick={handleInicioClick}>
            <House /> Inicio
          </NavLink>
        </motion.div>

        {logueado && (
          <>
            <motion.div
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.98 }}>
              <NavLink
                to="/perfil"
                className={({ isActive }) =>
                  `${style.NavLink} ${isActive ? style.activo : ""}`
                }
                onClick={toggleMenu}
              >
                <User /> Perfil
              </NavLink>
            </motion.div>

            <motion.div
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.98 }}>
              <NavLink
                to="/crear-post"
                className={({ isActive }) =>
                  `${style.NavLink} ${isActive ? style.activo : ""}`
                }
                onClick={toggleMenu}
              >
                <CirclePlus /> Crear Post
              </NavLink>

            </motion.div>

          </>
        )}
      </div>
    </div>
  );
}