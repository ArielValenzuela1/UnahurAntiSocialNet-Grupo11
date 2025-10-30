import style from "./FondoUnahur.module.css";

interface FondoUnahurProps {
  children?: React.ReactNode;
}

export default function FondoUnahur({ children }: FondoUnahurProps) {
  return (
    <div className={` ${style.fondoUnaHur} d-inline-flex align-items-center justify-content-center p-3`}>
        {children}
    </div>
  )
}
