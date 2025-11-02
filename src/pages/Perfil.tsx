import BotonVerde from "../components/BotonVerde";
import CirculoLetra from "../components/CirculoLetra";
import style from "./Perfil.module.css";
import { User } from 'lucide-react';

export default function Perfil() {
  return (
    <>
      <div className={style.perfilHeader}>
        <CirculoLetra letra='L' size={90} />
        <div>
          <h1>nombre Usuario</h1>
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
              <p>noviembre de 2025</p>
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
