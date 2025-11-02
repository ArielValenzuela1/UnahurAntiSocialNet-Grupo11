import { useContext } from "react";
import BotonVerde from "../components/BotonVerde";
import CirculoLetra from "../components/CirculoLetra";
import style from "./Perfil.module.css";
import { User } from 'lucide-react';
import { UsuarioContext } from "../components/UsuarioContext";

export default function Perfil() {
  const { usuario } = useContext(UsuarioContext); 
  if(!usuario.logueado){
    return <h1 className="w-100 text-center">Debes iniciar sesion para continuar</h1>
  }
  return (
    <>
      <div className={style.perfilHeader}>
        <CirculoLetra letra={usuario.nickName[0]} size={90} />
        <div>
          <h1>{usuario.nickName}</h1>
          <div className={style.statsContainer}>
            <div>
              <p className="text-secondary">publicaciones</p>
              <p>0</p>
            </div>
            <div>
              <p className="text-secondary">Seguidores</p>
              <p>0</p>
            </div>
            <div>
              <p className="text-secondary">Siguiendo</p>
              <p>0</p>
            </div>
            <div>
              <p className="text-secondary">Miembro Desde</p>
              <p>{usuario.miembroDesde}</p>
            </div>
          </div>
        </div>
      </div>
      <div className={style.misPublicaciones}>
        <h2>Mis Publicaciones</h2>
        <div>
          <User size={60}/>
          <p>Aún no has creado ninguna publicación</p>
          <BotonVerde >
            Crear Primera Publicación
          </BotonVerde>
        </div>
      </div>
    </>
  )
}
