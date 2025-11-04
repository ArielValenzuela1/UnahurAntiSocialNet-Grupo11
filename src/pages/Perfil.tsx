import BotonVerde from "../components/BotonVerde";
import CirculoLetra from "../components/CirculoLetra";
import style from "./Modules/Perfil.module.css";
import { User } from "lucide-react";
import { useAuth } from "../contexts/authContext";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Post } from "./Home";
import { CardPostHome } from "../components/CardPostHome";

export default function Perfil() {
  const { usuario } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = "http://localhost:3001";

  if (!usuario) {
    return <h1 className="w-100 text-center">Debes iniciar sesión para continuar</h1>;
  }

  const getPosts = async (): Promise<Post[]> => {
    const res = await fetch(`${API_URL}/posts?userId=${usuario.id}`);
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
    const fetchPosts = async () => {
      try {
        const data = await getPosts();
        setPosts(data);
      } catch (err) {
        console.error(err);
        setError("Error al cargar las publicaciones.");
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading)
    return (
      <div className="text-center mt-5 text-light">
        <div className="spinner-border text-info" role="status"></div>
        <p className="mt-2">Cargando publicaciones...</p>
      </div>
    );

  if (error)
    return (
      <div className="alert alert-danger text-center mt-5" role="alert">
        {error}
      </div>
    );

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
              <p>{new Date(usuario.createdAt).toLocaleDateString("es-ES", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}</p>
            </div>
          </div>
        </div>
      </div>

      <div className={`container py-5 centered mx-auto`} style={{ maxWidth: "700px" }}>
        <h2 className="mx-auto" style={{ maxWidth: "700px" }} >Mis Publicaciones</h2>
        <div >
          {posts.reverse().map((post) => (
            <CardPostHome key={post.id} post={post} />
          ))}
        </div>
        {posts.length === 0 &&
          <div className={style.publicacionesNoEncontradas}>
            <User size={60} />
            <p>Aún no has creado ninguna publicación</p>
            <Link to="/crear-post">
              <BotonVerde>Crear Primera Publicación</BotonVerde>
            </Link>
          </div>}

      </div>
    </>
  );
}