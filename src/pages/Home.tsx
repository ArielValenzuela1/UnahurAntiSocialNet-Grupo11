import React, { useEffect, useState } from "react";
import { CardPostHome } from "../components/CardPostHome";

interface User {
  id: number;
  nickName: string;
  email: string;
}

interface PostImage {
  id: number;
  url: string;
}

interface Post {
  id: number;
  description: string;
  createdAt?: string;
  userId: number;
  user?: User;
  images?: PostImage[];
  commentCount?: number;
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(6);

  const API_URL = "http://localhost:3001";

  const getPosts = async (): Promise<Post[]> => {
    const res = await fetch(`${API_URL}/posts`);
    if (!res.ok) throw new Error("Error al obtener publicaciones");

    const posts: Post[] = await res.json();

    const enriched = await Promise.all(
      posts.map(async (post) => {
        try {
          const [userRes, imagesRes] = await Promise.all([
            fetch(`${API_URL}/users/${post.userId}`),
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
      <div className="text-center mb-5">
        <h1 className="fw-bold text-light mb-3">UnaHur Anti-Social Net</h1>
        <p className="text-secondary fs-5">
          Explorá publicaciones de la comunidad universitaria
        </p>
        <hr className="border-secondary w-50 mx-auto" />
      </div>

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