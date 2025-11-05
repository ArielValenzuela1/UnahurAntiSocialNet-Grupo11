import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Post } from "../pages/Home";
import { Eye, MessageCircle } from "lucide-react";
import style from "./Modules/CardPostHome.module.css";
import CirculoLetra from "./CirculoLetra";

interface CardPostHomeProps {
  post: Post;
}

export const CardPostHome: React.FC<CardPostHomeProps> = ({ post }) => {
  const [commentCount, setCommentCount] = useState<number>(0);

  useEffect(() => {
    fetch(`http://localhost:3001/comments/post/${post.id}`)
      .then(res => res.json())
      .then(data => setCommentCount(data.length))
      .catch(() => setCommentCount(0));
  }, [post.id]);

  const images = post.images ?? [];
  const maxImagesToShow = 2;
  const imageCount = images.length;
  const visualImages = images.slice(0, maxImagesToShow)


  return (
    <div
      className={`card text-light border border-secondary mb-4 shadow-sm ${style.contenedor}`}
    >
      <Link
        to={`/user/${post.UserId}`}
        className="card-header d-flex align-items-center text-decoration-none gap-3"
      >
        <CirculoLetra size={40} letra={post.User?.nickName[0]} />
        <div>
          <p className={style.nickName}>
            {post.User?.nickName}
          </p>
          {post.createdAt && (
            <small className={style.date}>
              {new Date(post.createdAt).toLocaleDateString("es-ES", {
                hour: "numeric",
                minute:"numeric",
                day: "numeric",
                month: "short",
                year: "numeric"
              })}
            </small>
          )}
        </div>
      </Link>

      <div className="card-body pt-1">
        <p>
          {post.description}
        </p>

        {imageCount > 0 && (
          <div className={`mt-3 ${imageCount === 1 ? "" : "row g-1"}`}>
            {visualImages.map((image, index) => (
              <div
                key={image.id}
                className={imageCount > 1 ? "col-6 position-relative" : ""}
              >
                <div className={style.divImg}>
                <img
                  src={image.url}
                  alt={`Post ${index + 1}`}
                  className={`img-fluid rounded w-100 ${style.imagePost}`}
                />
                </div>
                {index === maxImagesToShow - 1 && imageCount > maxImagesToShow && (
                  <Link
                    to={`/post/${post.id}`}
                    className={style.linkOverlay}
                    onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.95)")}
                    onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
                    onTouchStart={(e) => (e.currentTarget.style.transform = "scale(0.95)")}
                    onTouchEnd={(e) => (e.currentTarget.style.transform = "scale(1)")}
                  >
                    <span
                      className="text-white fs-4 fw-bold"
                      style={{
                        transition: "transform 0.25s ease-in-out",
                      }}
                    >
                      +{imageCount - maxImagesToShow}
                    </span>
                  </Link>
                )}
              </div>
            ))}
          </div>
        )}

        {post.Tags && post.Tags.length > 0 && (
          <div className="d-flex flex-wrap gap-2 mt-3">
            {post.Tags.map((tag) => (
              <span
                key={tag.id}
                className="px-2 py-1 rounded"
                style={{
                  backgroundColor: "rgba(4, 47, 46, 0.5)",
                  color: "#6EE7B7",
                  border: "1px solid rgba(16, 185, 129, 0.4)",
                  fontSize: "0.85rem",
                }}
              >
                #{tag.name}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="card-footer bg-transparent border-0 d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center text-muted gap-2">
          <MessageCircle size={18} style={{ color: "#E2E8E4" }} />
          <span style={{ color: "#E2E8E4" }}>{commentCount}</span>
        </div>

        <Link
          to={`/post/${post.id}`}
          className="btn btn-sm btn-outline-info d-flex align-items-center gap-1"
          style={{
            transition: "all 0.2s ease-in-out",
          }}
        >
          <Eye size={16} />
          Ver más
        </Link>
      </div>
    </div>
  );
};