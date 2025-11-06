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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            maxHeight: "500px",
            overflowY: "scroll",
            overflowX: "hidden", 
            paddingRight: "6px",

            scrollbarWidth: "none", // Lo mismo pero para distinto navegador
            msOverflowStyle: "none", // Lo mismo pero para distinto navegador
          }}
        >
          {tags.map((t) => (
            <motion.div
              key={t.name}
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.98 }}
            >
              <button
                onClick={() => handleClick(t.name)}
                className="border-0 text-start px-2 py-1 rounded d-flex justify-content-between align-items-center w-100"
                style={{
                  backgroundColor: "#0F172B",
                  cursor: "pointer",
                  transition: "all 0.2s ease-in-out",
                  color: "#fff",
                  whiteSpace: "normal", 
                  
                }}
              >
                <span
                  className="rounded"
                  style={{
                    backgroundColor: "rgba(4, 47, 46, 0.5)",
                    color: "#6EE7B7",
                    border: "1px solid rgba(16, 185, 129, 0.4)",
                    fontSize: "0.85rem",
                    padding: "0.25rem 0.5rem",
                    flex: "1", 
                  }}
                >
                  #{t.name}
                </span>
                <span style={{ color: "#6EE7B7", marginLeft: "8px" }}>{t.count}</span>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
