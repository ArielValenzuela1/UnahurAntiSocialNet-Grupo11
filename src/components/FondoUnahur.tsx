import style from "./FondoUnahur.module.css";

interface FondoUnahurProps {
  children?: React.ReactNode;
  redondo?: Boolean; // 👈 nueva prop opcional
}

export default function FondoUnahur({ children, redondo }: FondoUnahurProps) {
  return (
    <div
      className={`${style.fondoUnaHur} d-inline-flex align-items-center justify-content-center p-3`}
      style={{
        borderRadius: redondo ? "50%" : "8px", //si no se pasa, queda sin borde redondeado
      }}
    >
      {children}
    </div>
  );
}
