export interface User {
  id: number;
  nickName: string;
  email: string;
}

export interface PostImage {
  id: number;
  url: string;
}

export interface Post {
  id: number;
  description: string;
  createdAt?: string;
  userId: number;
  user?: User;
  images?: PostImage[];
  commentCount?: number;
}

const API_URL = "http://localhost:3001";

export async function getPosts(): Promise<Post[]> {
  const res = await fetch(`${API_URL}/posts`);
  if (!res.ok) throw new Error("Error al obtener publicaciones");

  const posts: Post[] = await res.json();

  // Cargar imágenes y usuarios asociados (si se necesita)
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
}