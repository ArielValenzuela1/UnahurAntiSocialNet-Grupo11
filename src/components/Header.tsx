import Buscador from "./Buscador";
import LogoInicio from "./LogoInicio";
import GestorDeSesion from "./GestorDeSesion";
import style from "./Header.module.css";


export default function Header() {
  return (
    <div className= {`${style.Header} sticky-top`}>
        <LogoInicio/>
        <Buscador/>
        <GestorDeSesion/>
    </div>
  )
}
