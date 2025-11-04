import Buscador from "./Buscador";
import LogoInicio from "./LogoInicio";
import GestorDeSesion from "./GestorDeSesion";
import style from "./Modules/NavBar.module.css";

export default function NavBar() {
  return (
    <div className= {`${style.NavBar} sticky-top`}>
        <LogoInicio/>
        <Buscador/>
        <GestorDeSesion />
    </div>
  )
}