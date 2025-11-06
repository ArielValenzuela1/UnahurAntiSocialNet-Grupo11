import { NavLink } from "react-router-dom";
import style from "./Modules/SideBar.module.css";
import { House, User, CirclePlus, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/authContext";
import { motion } from "framer-motion";

interface SideBarProps {
  onSelectTag?: (tag: string | null) => void;
}

export default function SideBar({ onSelectTag }: SideBarProps) {
  const { usuario } = useAuth();
  const logueado = !!usuario;
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [tags, setTags] = useState<{ name: string; count: number }[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  const handleInicioClick = () => {
    if (location.pathname === "/") {
      window.location.reload();
    } else {
      setMenuAbierto(false);
    }
  };

  useEffect(() => {
    fetch("http://localhost:3001/posts")
      .then((res) => res.json())
      .then((data) => {
        const tagMap: Record<string, number> = {};
        data.forEach((post: any) => {
          post.Tags?.forEach((t: any) => {
            tagMap[t.name] = (tagMap[t.name] || 0) + 1;
          });
        });
        const tagList = Object.entries(tagMap).map(([name, count]) => ({
          name,
          count,
        }));
        setTags(tagList);
      })
      .catch((err) => console.error("Error al cargar tags:", err));
  }, []);

  const handleClick = (tag: string) => {
    const newTag = selectedTag === tag ? null : tag;
    setSelectedTag(newTag);
    onSelectTag?.(newTag);
  };

  return (
    <div className={`${style.SideBar} ${menuAbierto ? style.abierto : ""}`}>
      <button className={style.MenuToggle} onClick={toggleMenu}>
        {menuAbierto ? <X /> : <Menu />}
      </button>

      <div className={style.NavLinksContainer}>
        <p>Navegación</p>
        <motion.div whileHover={{ x: 5 }} whileTap={{ scale: 0.98 }}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${style.NavLink} ${isActive ? style.activo : ""}`
            }
            onClick={handleInicioClick}
          >
            <House /> Inicio
          </NavLink>
        </motion.div>

        {logueado && (
          <>
            <motion.div whileHover={{ x: 5 }} whileTap={{ scale: 0.98 }}>
              <NavLink
                to="/perfil"
                className={({ isActive }) =>
                  `${style.NavLink} ${isActive ? style.activo : ""}`
                }
                onClick={toggleMenu}
              >
                <User /> Perfil
              </NavLink>
            </motion.div>

            <motion.div whileHover={{ x: 5 }} whileTap={{ scale: 0.98 }}>
              <NavLink
                to="/crear-post"
                className={({ isActive }) =>
                  `${style.NavLink} ${isActive ? style.activo : ""}`
                }
                onClick={toggleMenu}
              >
                <CirclePlus /> Crear Post
              </NavLink>
            </motion.div>
          </>
        )}
        <hr className="text-secondary my-3" />
        <p>Etiquetas</p>
        <div className="d-flex flex-column gap-2 mt-3">
          {tags.map((t) => (
            <button
              key={t.name}
              onClick={() => handleClick(t.name)}
              className="border-0 text-start px-2 py-1 rounded"
              style={{
                backgroundColor:
                  selectedTag === t.name
                    ? "rgba(4, 47, 46, 0.8)"
                    : "rgba(4, 47, 46, 0.5)",
                color: "#6EE7B7",
                border: "1px solid rgba(16, 185, 129, 0.4)",
                fontSize: "0.85rem",
                cursor: "pointer",
                transition: "all 0.2s ease-in-out",
              }}
            >
              #{t.name} ({t.count})
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
