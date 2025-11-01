import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Post } from "../pages/Home";
import { Eye, MessageCircle } from "lucide-react";

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
  const imageCount = images.length;
  const maxImagesToShow = 4;

  return (
    <div
      className="card text-light border border-secondary mb-4 shadow-sm"
      style={{ background: "rgb(15, 23, 43)" }}
    >
      <div className="card-header bg-transparent border-0 d-flex align-items-center">
        <Link
          to={`/user/${post.userId}`}
          className="d-flex align-items-center text-decoration-none text-light"
        >
          <div
            className="rounded-circle p-2 d-flex align-items-center justify-content-center me-2"
            style={{
              width: "45px",
              height: "45px",
              background:
                "linear-gradient(155deg,rgba(87, 199, 133, 1) 1%, rgba(37, 142, 184, 1) 88%)",
              color: "#FFFFFF",
              fontWeight: 700,
              fontSize: "1.2rem",
            }}
          >
            {post.User?.nickName.charAt(0).toUpperCase()}
          </div>

          <div>
            <h6 className="mb-1 text-info fw-semibold fs-4">
              {post.User?.nickName}
            </h6>
            {post.createdAt && (
              <small>
                {new Date(post.createdAt).toLocaleDateString("es-ES", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </small>
            )}
          </div>
        </Link>
      </div>

      <div className="card-body pt-1">
        <p className="mb-3" style={{ whiteSpace: "pre-wrap", color: "#E2E8E4" }}>
          {post.description}
        </p>

        {imageCount > 0 && (
          <div className={`mt-3 ${imageCount === 1 ? "" : "row g-1"}`}>
            {images.slice(0, maxImagesToShow).map((image, index) => (
              <div
                key={image.id}
                className={imageCount > 1 ? "col-6 position-relative" : ""}
              >
                <img
                  src={image.url}
                  alt={`Post ${index + 1}`}
                  className="img-fluid rounded w-100"
                  style={{ objectFit: "cover", maxHeight: "300px" }}
                />

                {index === maxImagesToShow - 1 && imageCount > maxImagesToShow && (
                  <Link
                    to={`/post/${post.id}`}
                    className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center text-decoration-none"
                    style={{
                      backgroundColor: "rgba(0, 0, 0, 0.6)",
                      borderRadius: "0.375rem",
                      transition: "all 0.25s ease-in-out",
                      transform: "scale(1)",
                    }}
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