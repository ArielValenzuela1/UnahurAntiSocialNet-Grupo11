import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import type { Post } from "./Home";
import style from "./Modules/Post.module.css";
import CirculoLetra from "../components/CirculoLetra";
import BotonVerde from "../components/BotonVerde";
import { Send } from "lucide-react";
import { Carousel } from "react-bootstrap";
import CardComentario from "../components/CardComentario";
import ImageWithFallback from "../components/ImageWithFallback";


interface Comment {
  id: number;
  content: string;
  createdAt: Date;
  User: {
    id: number;
    nickName: string;
  };
}

export default function Post() {
  const { postId } = useParams();
  const { usuario } = useAuth();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = "http://localhost:3001";

  useEffect(() => {
    const fetchPostData = async () => {
      if (!postId) return;
      setLoading(true);
      setError(null);
      try {
        const [postRes, commentsRes] = await Promise.all([
          fetch(`${API_URL}/posts/${postId}`),
          fetch(`${API_URL}/comments/post/${postId}`),
        ]);

        if (!postRes.ok) throw new Error("Post no encontrado");

        let postData: Post = await postRes.json();
        const commentsData = commentsRes.ok ? await commentsRes.json() : [];

        const [userRes, imagesRes] = await Promise.all([
          fetch(`${API_URL}/users/${postData.UserId}`),
          fetch(`${API_URL}/postimages/post/${postData.id}`),
        ]);

        const userData = userRes.ok ? await userRes.json() : undefined;
        const imagesData = imagesRes.ok ? await imagesRes.json() : [];

        setPost({ ...postData, User: userData, images: imagesData });
        setComments(commentsData);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPostData();
  }, [postId]);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !usuario || !post) return;

    try {
      const res = await fetch(`${API_URL}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: newComment,
          userId: usuario.id,
          postId: post.id,
        }),
      });

      if (!res.ok) throw new Error("No se pudo publicar el comentario");

      const newCommentData = await res.json();

      setComments([...comments, { ...newCommentData, User: { nickName: usuario.nickName } }]);
      setNewComment("");
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (loading)
    return (
      <div className="text-center mt-5 text-light">
        <div className="spinner-border text-info" role="status"></div>
        <p className="mt-2">Cargando publicación...</p>
      </div>
    );

  if (error || !post)
    return (
      <div className="alert alert-danger text-center mt-5" role="alert">
        {error || "No se pudo cargar la publicación."}
      </div>
    );

  return (
    <div className={`mx-auto ${style.postContainer}`}>
      <div className={style.postCard}>
        <Link
          to={`/user/${post.User?.id}`}
          className={`card-header d-flex align-items-center text-decoration-none gap-3 ${style.cardHeader}`}
        >
          <CirculoLetra size={40} letra={post.User?.nickName[0]} />
          <div>
            <p className={style.nickName}>{post.User?.nickName}</p>
            {post.createdAt && (
              <small className={style.date}>
                {new Date(post.createdAt).toLocaleDateString("es-ES", {
                  hour: "numeric", minute: "numeric",
                  day: "numeric", month: "short", year: "numeric"
                })}
              </small>
            )}
          </div>
        </Link>

        <div className={`card-body ${style.cardBody}`}>
          <p className={style.description}>{post.description}</p>
          {post.images && post.images.length > 0 && (
            <Carousel interval={null} className={style.carousel}>
              {post.images.map((image) => (
                <Carousel.Item key={image.id}>
                  <ImageWithFallback clasStyle={`d-block w-100 ${style.carouselImage}`}
                    src={image.url}
                    alt="Imagen del post"/>
                </Carousel.Item>
              ))}
            </Carousel>

          )}
          {post.Tags && post.Tags.length > 0 && (
            <div className={`d-flex flex-wrap gap-2 ${style.tagContainer}`}>
              {post.Tags.map((tag) => (
                <span key={tag.id} className={style.tagBadge}>
                  #{tag.name}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className={style.postCard}>
        <div className={`card-body ${style.cardBody}`}>
          <h5 className="mb-3">Comentarios ({comments.length})</h5>

          {comments.length == 0 ? <p className="text-secondary">Sé el primero en comentar!!!</p> : <p/>}

          {usuario && (
            <form onSubmit={handleCommentSubmit} className="d-flex gap-2 mb-4">
              <input
                type="text"
                className={`form-control ${style.commentInput}`}
                placeholder="Escribe tu comentario..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <BotonVerde onClick={() => { }}>
                <Send size={18} />
              </BotonVerde>
            </form>
          )}
        </div>
      </div>
      <div className={style.commentsList}>
        {comments.length > 0 ? (
          comments.map((comment) => 
          <CardComentario key={comment.id} content={comment.content} createdAt={comment.createdAt} User={comment.User} />)
        ) : (
          <p/>
        )}
      </div>
    </div>
  );
}