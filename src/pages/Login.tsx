import { LogIn } from 'lucide-react';
import style from "./Login.module.css";

export default function Login() {
  return (
    <>

      <div className={`d-flex align-items-center justify-content-center vh-100 text-light flex-column`}>
        
        <div className="text-center mb-4">
            <div className={` ${style.fondoUnaHur} d-inline-flex align-items-center justify-content-center p-3`}>
              <LogIn />
            </div>
            <p className={`mt-3 mb-1 text-light ${style.titulo}`}>UnaHur Anti-Social Net</p>
            <p className="text-secondary mb-0">Inicia sesión para continuar</p>
          </div>

        <div className={`card p-4 ${style.cardForm}`} style={{ width: "100%", minWidth: "450px" }}>
          
          <p className="card-title">Iniciar Sesión</p>
          <p className={`card-subtitle mb-2 ${style.subtituloCard}`}>Ingresa tu nickname y contraseña</p>
          <form>
            <div className="mb-3">
              <label htmlFor="nickname" className="form-label">
                Nickname
              </label>
              <input
                type="text"
                id="nickname"
                className={`form-control text-light border-secondary ${style.inputColor}`}
                placeholder="tu_nickname"
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
              <div id="passwordHelp" className="form-text text-secondary">
                La contraseña es: 123456
              </div>
            </div>

            <button type="submit" className={`btn btn-success w-100 ${style.btnIniciar}`}>
              Iniciar Sesión
            </button>
          </form>

          <div className="text-center mt-3">
            <small className="text-secondary">
              ¿No tienes cuenta?{" "}
              <a href="/register" className="text-info text-decoration-none">
                Regístrate
              </a>
            </small>
          </div>
        </div>
      </div>
    </>
  )
}
