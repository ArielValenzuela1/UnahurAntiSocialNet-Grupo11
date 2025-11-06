import { useState } from "react";
import type { ImageFallBack } from "../contexts/interfaces";

export default function ImageWithFallback({ src, alt, clasStyle, fallback } : ImageFallBack) {
  const [imgSrc, setImgSrc] = useState(src);

  const handleError = () => {
    // Si falla la imagen original, usamos el fallback o una imagen por defecto
    setImgSrc(
      fallback || "https://placehold.co/600x400?text=Imagen+no+disponible"
    );
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={`${clasStyle}`}
      onError={handleError}
    />
  );
}