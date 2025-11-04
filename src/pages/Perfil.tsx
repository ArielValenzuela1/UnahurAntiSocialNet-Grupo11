import BotonVerde from "../components/BotonVerde";
import CirculoLetra from "../components/CirculoLetra";
import style from "./Modules/Perfil.module.css";
import { User } from "lucide-react";
import { useAuth } from "../contexts/authContext";
import { Link } from "react-router-dom";

export default function Perfil() {
  const { usuario } = useAuth();

  if (!usuario) {
    return <h1 className="w-100 text-center">Debes iniciar sesión para continuar</h1>;
  }

  return (
    <>
      <div className={style.perfilHeader}>
        <CirculoLetra letra={usuario.nickName[0]} size={90} />
        <div>
          <h1>{usuario.nickName}</h1>
          <div className={style.statsContainer}>
            <div>
              <p className="text-secondary">Publicaciones</p>
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
              <p>{`${new Date(usuario.createdAt).getFullYear()}-${String(
                new Date(usuario.createdAt).getMonth() + 1
              ).padStart(2, "0")}`}</p>
            </div>
          </div>
        </div>
      </div>

      <div className={style.misPublicaciones}>
        <h2>Mis Publicaciones</h2>
        <div>
          <User size={60} />
          <p>Aún no has creado ninguna publicación</p>
          <Link to="/crear-post">
            <BotonVerde>Crear Primera Publicación</BotonVerde>
          </Link>
        </div>
      </div>
    </>
  );
}