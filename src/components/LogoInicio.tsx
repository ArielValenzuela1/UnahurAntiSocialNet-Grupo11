import FondoUnahur from "./FondoUnahur";
import logoUnaHur from "../assets/img/logo-UnaHur.png";
import style from "./LogoInicio.module.css";
export default function LogoInicio() {
  return (
    <div style={{ display: "inline-flex" }}>
      <div className={`${style.divLogo}`}>
        <FondoUnahur>
          <img className={`${style.logo}`} src={logoUnaHur} />
        </FondoUnahur>
      </div>
        <p className={`${style.redSocial}`}>UnaHur Anti-Social</p>
    </div>
  )
}
