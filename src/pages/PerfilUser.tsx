import BotonVerde from "../components/BotonVerde";
import CirculoLetra from "../components/CirculoLetra";
import style from "./Modules/Perfil.module.css";
import { User } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Post } from "./Home";
import { CardPostHome } from "../components/CardPostHome";
import type { Usuario } from "../contexts/authContext";
import { motion } from "framer-motion";


export default function Perfil() {
  const { userId } = useParams();
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = "http://localhost:3001";




  const getUser = async () => {
    const res = await fetch(`${API_URL}/users/${userId}`);
    if (!res.ok) throw new Error("Error al obtener usuario");
    const data = await res.json();
    setUsuario(data);
  };

  const getPosts = async (): Promise<Post[]> => {
    const res = await fetch(`${API_URL}/posts?userId=${userId}`);
    if (!res.ok) throw new Error("Error al obtener publicaciones");

    const posts: Post[] = await res.json();

    const enriched = await Promise.all(
      posts.map(async (post) => {
        try {
          const [userRes, imagesRes] = await Promise.all([
            fetch(`${API_URL}/posts/${post.UserId}`),
            fetch(`${API_URL}/postimages/post/${post.id}`),
          ]);

          const user = userRes.ok ? await userRes.json() : undefined;
          const images = imagesRes.ok ? await imagesRes.json() : [];

          return { ...post, user, images };
        } catch {
          return post;
        }
      })
    );

    return enriched;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getUser();
        const data = await getPosts();
        setPosts(data);
      } catch (err) {
        console.error(err);
        setError("Error al cargar la información.");
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 650);
      }
    };
    fetchData();
  }, []);

  if (loading)
    return (
      <div className="text-center mt-5 text-light">
        <div className="spinner-border text-info" role="status"></div>
        <p className="mt-2">Cargando perfil de {usuario?.nickName}...</p>
      </div>
    );

  if (error)
    return (
      <div className="alert alert-danger text-center mt-5" role="alert">
        {error}
      </div>
    );

  // Evita errores si el usuario aún no está cargado
  if (!usuario) return null;

  return (
    <>
      <div className={style.perfilHeader}>
        <CirculoLetra letra={usuario.nickName[0]} size={90} />
        <div>
          <h1>{usuario.nickName}</h1>
          <div className={style.statsContainer}>
            <div>
              <p className="text-secondary">Publicaciones</p>
              <p>{posts.length}</p>
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
              <p>
                {new Date(usuario.createdAt).toLocaleDateString("es-ES", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className={`container py-5 centered mx-auto`} style={{ maxWidth: "700px" }}>
        <h2 className="mx-auto" style={{ maxWidth: "700px" }}>
          Publicaciones de {usuario.nickName}
        </h2>
        <div>
          {posts.reverse().map((post) => (
            <CardPostHome key={post.id} post={post} />
          ))}
        </div>
        {posts.length === 0 && (
          <div className={style.publicacionesNoEncontradas}>
            <motion.div
              animate={{
                y: [0, -5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}>

              <User size={60} />

            </motion.div>
            <p>Aún no ah creo publicaciones</p>
          </div>
        )}
      </div>
    </>
  );
}