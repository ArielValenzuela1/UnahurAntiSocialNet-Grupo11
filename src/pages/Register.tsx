import { UserPlus } from 'lucide-react';
import style from "./Register.module.css";
import FondoUnahur from '../components/fondoUnahur';
import { Link } from 'react-router-dom';

export default function Register() {
    return (
        <>

            <div className={`d-flex align-items-center justify-content-center vh-100 text-light flex-column`}>

                <div className="text-center mb-4">
                    <FondoUnahur>
                        <UserPlus />
                    </FondoUnahur>
                    <p className={`mt-3 mb-1 text-light ${style.titulo}`}>UnaHur Anti-Social Net</p>
                    <p className="text-secondary mb-0">Crea tu cuenta</p>
                </div>

                <div className={`card p-4 ${style.cardForm}`} style={{ width: "100%", minWidth: "450px" }}>

                    <p className="card-title">Registrarse</p>
                    <p className={`card-subtitle mb-2 ${style.subtituloCard}`}>Elige un nickname único y original para tu cuenta</p>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="nickname" className="form-label">
                                Nickname
                            </label>
                            <input
                                type="text"
                                id="nickname"
                                className={`form-control text-light border-secondary ${style.inputColor}`}
                                placeholder="tu_nickname_unico"
                            />
                        </div>
                        <div className="form-text text-secondary">
                            <p>Este sera tu nombre de usuario en la red social</p>
                        </div>

                        <button type="submit" className={`btn btn-success w-100 ${style.btnIniciar}`}>
                            Registrarse
                        </button>
                    </form>

                    <div className="text-center mt-3">
                        <small className="text-secondary">
                            ¿Ya tienes cuenta?{" "}
                            <Link to="/login" className="text-info text-decoration-none">
                                Inicia sesión
                            </Link>
                        </small>
                    </div>
                </div>
            </div>
        </>
    )
}
