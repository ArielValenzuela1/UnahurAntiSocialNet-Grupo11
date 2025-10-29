import { NavLink } from 'react-router-dom';
import style from "./NavBar.module.css";
import { House, User, CirclePlus } from 'lucide-react';

export default function NavBar() {
    const logueado = true;
    return (
        <div className={style.NavBar}>
            <p>Navegacion</p>
            <NavLink
                to="/"
                className={({ isActive }) =>
                    `${style.NavLink} ${isActive ? style.activo : ''}`
                }
            >
                <House /> Inicio
            </NavLink>
            {logueado && (
                <>
                    <NavLink
                        to="/perfil"
                        className={({ isActive }) =>
                            `${style.NavLink} ${isActive ? style.activo : ''}`
                        }
                    >
                        <User /> Perfil
                    </NavLink>

                    <NavLink
                        to="/crear-post"
                        className={({ isActive }) =>
                            `${style.NavLink} ${isActive ? style.activo : ''}`
                        }
                    >
                        <CirclePlus /> Crear Post
                    </NavLink>
                </>
            )}
        </div>
    );
}
