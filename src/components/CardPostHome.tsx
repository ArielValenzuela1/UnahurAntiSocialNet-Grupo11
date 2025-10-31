import React from "react";
import { Link } from "react-router-dom";
import type { Post } from "../services/api";
import { Eye, MessageCircle } from "lucide-react";

interface CardPostHomeProps {
  post: Post;
}

export const CardPostHome: React.FC<CardPostHomeProps> = ({ post }) => {
  const images = post.images ?? []; // evita undefined
  const imageCount = images.length;
  const maxImagesToShow = 3;

  return (
    <div className="card bg-dark text-light border border-secondary mb-4 shadow-sm">
      {/* Header - Usuario */}
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
              background: "linear-gradient(135deg, #10b981, #06b6d4)",
              color: "#0f172a",
              fontWeight: 700,
              fontSize: "1.2rem",
            }}
          >
            {post.user?.nickName.charAt(0).toUpperCase()}
          </div>
          <div>
            <h6 className="mb-0 text-emerald-400">{post.user?.nickName}</h6>
            {post.createdAt && (
              <small className="text-muted">
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

      {/* Descripción */}
      <div className="card-body pt-1">
        <p className="mb-3" style={{ whiteSpace: "pre-wrap" }}>
          {post.description}
        </p>

        {/* Imágenes */}
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
                  style={{ objectFit: "cover", maxHeight: "400px" }}
                />
                {/* Overlay +N */}
                {index === maxImagesToShow - 1 && imageCount > maxImagesToShow && (
                  <Link
                    to={`/post/${post.id}`}
                    className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center text-decoration-none"
                    style={{
                      backgroundColor: "rgba(0, 0, 0, 0.6)",
                      borderRadius: "0.375rem",
                    }}
                  >
                    <span className="text-white fs-4 fw-bold">
                      +{imageCount - maxImagesToShow}
                    </span>
                  </Link>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="card-footer bg-transparent border-0 d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center text-muted gap-2">
          <MessageCircle size={18} />
          <span>{post.commentCount || 0}</span>
        </div>

        <Link
          to={`/post/${post.id}`}
          className="btn btn-sm btn-outline-info d-flex align-items-center gap-1"
        >
          <Eye size={16} />
          Ver más
        </Link>
      </div>
    </div>
  );
};