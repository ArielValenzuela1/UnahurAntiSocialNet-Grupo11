import { Link } from 'react-router-dom';
import { useContext} from "react";
import { useNavigate } from "react-router-dom";
import { UsuarioContext } from "./UsuarioContext";
import { LogIn } from 'lucide-react';
import CirculoLetra from './CirculoLetra';


export default function BotonSesion() {
  const navigate = useNavigate();
  const { usuario, setUsuario } = useContext(UsuarioContext);
  function CerrarSesion() {
    setUsuario({ id: 0, nickName: "", email: "",miembroDesde: "" ,logueado: false })
    navigate("/")
  }
  return (
    //Usar este colo color: #00D492
    <>
      {usuario.logueado ? (
        <div style={{ display: "flex" , alignItems: "center"}}>
          <Link to={"/perfil"}>
            <CirculoLetra letra={usuario.nickName[0]}/>
          </Link>
          <button onClick={CerrarSesion} style={{color: "red",backgroundColor: "transparent"}}>
            <LogIn />
          </button>
        </div>
      ) : (
        <Link to={"/login"} style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
          <LogIn size={20} />
          <p style={{ marginLeft: "10px" }}>Iniciar Sesion</p>
        </Link>
      )}
    </>

  )
}
