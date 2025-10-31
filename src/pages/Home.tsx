import { useEffect, useState } from "react";
import { CardPostHome } from "../components/CardPostHome";
import type { Post } from "../services/api";
import { getPosts } from "../services/api";

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(6);

  // Cargar publicaciones al montar el componente
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

  // Manejar “scroll infinito” (simulado)
  useEffect(() => {
    const handleScroll = () => {
      const bottom =
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 200;

      if (bottom && visibleCount < posts.length) {
        setVisibleCount((prev) => prev + 3);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [posts, visibleCount]);

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
    <div className="container py-5">
      {/* Hero principal */}
      <div className="text-center mb-5">
        <h1 className="fw-bold text-light mb-3">UnaHur Anti-Social Net</h1>
        <p className="text-secondary fs-5">
          Explorá publicaciones de la comunidad universitaria
        </p>
        <hr className="border-secondary w-50 mx-auto" />
      </div>

      {/* Lista de publicaciones */}
      <div className="mx-auto" style={{ maxWidth: "700px" }}>
        {posts.slice(0, visibleCount).map((post) => (
          <CardPostHome key={post.id} post={post} />
        ))}

        {visibleCount < posts.length && (
          <div className="text-center mt-4">
            <button
              onClick={() => setVisibleCount((prev) => prev + 3)}
              className="btn btn-outline-info"
            >
              Cargar más
            </button>
          </div>
        )}

        {posts.length === 0 && (
          <p className="text-center text-secondary mt-5">
            No hay publicaciones disponibles todavía.
          </p>
        )}
      </div>
    </div>
  );
}