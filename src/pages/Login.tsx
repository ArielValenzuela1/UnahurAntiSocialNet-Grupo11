import { LogIn } from 'lucide-react';
import style from "./Login.module.css";
import FondoUnahur from '../components/FondoUnahur';
import { Link } from 'react-router-dom';
import { useContext,useState } from "react";
import { UsuarioContext } from "../components/UsuarioContext";


export default function Login() {
  const { setUsuario } = useContext(UsuarioContext)!;
  const [nombre, setNombre] = useState("");

  function enviarForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setUsuario({ nombre, logueado: true });
  }

  return (
    <>
      <div className={`d-flex align-items-center justify-content-center vh-100 text-light flex-column`}>
        
        <div className="text-center mb-4">
            <FondoUnahur>
              <LogIn />
            </FondoUnahur>
            <p className={`mt-3 mb-1 text-light ${style.titulo}`}>UnaHur Anti-Social Net</p>
            <p className="text-secondary mb-0">Inicia sesión para continuar</p>
          </div>

        <div className={`card p-4 ${style.cardForm}`} style={{ width: "100%", minWidth: "450px" }}>
          
          <p className="card-title">Iniciar Sesión</p>
          <p className={`card-subtitle mb-2 ${style.subtituloCard}`}>Ingresa tu nickname y contraseña</p>
          <form onSubmit={enviarForm}>
            <div className="mb-3">
              <label htmlFor="nickname" className="form-label">
                Nickname
              </label>
              <input
                type="text"
                id="nickname"
                className={`form-control text-light border-secondary ${style.inputColor}`}
                placeholder="tu_nickname"
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                className={`form-control text-light border-secondary ${style.inputColor}`}
                placeholder="********"
              />
              <div className="form-text text-secondary">
                <p>La contraseña es: 123456</p>
              </div>
            </div>

            <button type="submit" className={`btn btn-success w-100 ${style.btnIniciar}`}>
              Iniciar Sesión
            </button>
          </form>

          <div className="text-center mt-3">
            <small className="text-secondary">
              ¿No tienes cuenta?{" "}

              <Link to="/register" className="text-info text-decoration-none">
                Regístrate
              </Link>

            </small>
          </div>
        </div>
      </div>
    </>
  )
}
