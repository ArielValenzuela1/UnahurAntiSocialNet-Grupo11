import { NavLink } from 'react-router-dom';
import style from "./SideBar.module.css";
import { House, User, CirclePlus, Menu, X } from 'lucide-react';
import { useState, useContext } from "react"; 
import { UsuarioContext } from "./UsuarioContext"; 

export default function SideBar() {
    const { usuario } = useContext(UsuarioContext); 
     //Codigo para testear el navbar sin registrarse 
    const [menuAbierto, setMenuAbierto] = useState(false); 

    const toggleMenu = () => {
        setMenuAbierto(!menuAbierto);
    };

    return (
       
        <div className={`${style.SideBar} ${menuAbierto ? style.abierto : ''}`}>

            <button className={style.MenuToggle} onClick={toggleMenu}>
                {menuAbierto ? <X /> : <Menu />}
            </button>

            <div className={style.NavLinksContainer}>
                <p>Navegacion</p>
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        `${style.NavLink} ${isActive ? style.activo : ''}`
                    }
                    onClick={toggleMenu} 
                >
                    <House /> Inicio
                </NavLink>

                {usuario.logueado && ( 
                    <>
                        <NavLink
                            to="/perfil"
                            className={({ isActive }) =>
                                `${style.NavLink} ${isActive ? style.activo : ''}`
                            }
                            onClick={toggleMenu} 
                        >
                            <User /> Perfil
                        </NavLink>

                        <NavLink
                            to="/crear-post"
                            className={({ isActive }) =>
                                `${style.NavLink} ${isActive ? style.activo : ''}`
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