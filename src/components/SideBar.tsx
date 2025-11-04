import { NavLink } from "react-router-dom";
import style from "./Modules/SideBar.module.css";
import { House, User, CirclePlus, Menu, X } from "lucide-react";
import { useState } from "react"; 
import { useAuth } from "../contexts/authContext";

export default function SideBar() {
  const { usuario } = useAuth();

  const logueado = !!usuario; 

  const [menuAbierto, setMenuAbierto] = useState(false);

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  return (
    <div className={`${style.SideBar} ${menuAbierto ? style.abierto : ""}`}>
      <button className={style.MenuToggle} onClick={toggleMenu}>
        {menuAbierto ? <X /> : <Menu />}
      </button>

      <div className={style.NavLinksContainer}>
        <p>Navegación</p>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${style.NavLink} ${isActive ? style.activo : ""}`
          }
          onClick={toggleMenu}
        >
          <House /> Inicio
        </NavLink>

        {logueado && (
          <>
            <NavLink
              to="/perfil"
              className={({ isActive }) =>
                `${style.NavLink} ${isActive ? style.activo : ""}`
              }
              onClick={toggleMenu}
            >
              <User /> Perfil
            </NavLink>

            <NavLink
              to="/crear-post"
              className={({ isActive }) =>
                `${style.NavLink} ${isActive ? style.activo : ""}`
              }
              onClick={toggleMenu}
            >
              <CirclePlus /> Crear Post
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
}