import LogoInicio from "./LogoInicio";
import GestorDeSesion from "./GestorDeSesion";
import style from "./Modules/NavBar.module.css";
import { NavLink } from "react-router-dom";

export default function NavBar() {
  const handleInicioClick = () => {
    if (location.pathname === "/")
      window.location.reload();
  };
  return (
    <div className= {`${style.NavBar} sticky-top`}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${style.NavLink} ${isActive ? style.activo : ""}`
          }
          onClick={handleInicioClick}
        >
          <LogoInicio/>
        </NavLink>
        <GestorDeSesion />
    </div>
  )
}