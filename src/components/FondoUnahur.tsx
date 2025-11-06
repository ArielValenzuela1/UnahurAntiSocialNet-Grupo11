import type { FondoUnahurProps } from "../contexts/interfaces";
import style from "./Modules/FondoUnahur.module.css";

export default function FondoUnahur({ children }: FondoUnahurProps) {
  return (
    <div
      className={`${style.fondoUnaHur} d-inline-flex align-items-center justify-content-center p-3`}
    >
      {children}
    </div>
  );
}
