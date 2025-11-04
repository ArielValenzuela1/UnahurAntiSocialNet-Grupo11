import { UserPlus } from "lucide-react";
import style from "./Modules/Register.module.css";
import FondoUnahur from "../components/FondoUnahur";
import { Link } from "react-router-dom";
import { useState } from "react";
import BotonVerde from "../components/BotonVerde";

type Usuario = {
  id: number;
  nickName: string;
  email: string;
};

export default function Register() {
  const [nickName, setNickName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [mensaje, setMensaje] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleInvalid = (e: React.InvalidEvent<HTMLInputElement>) => {
    e.preventDefault();
    console.log(e.target.validationMessage);
    setError(e.target.validationMessage);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMensaje(null);

    if (!nickName && !email) {
      setError("Por favor ingresa un nickname y un email");
      return;
    }
    if (!nickName) {
      setError("Por favor ingresa un nickname");
      return;
    }
    if (!email) {
      setError("Por favor ingresa un email");
      return;
    }

    const nuevoUsuario = { nickName, email };

    fetch("http://localhost:3001/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nuevoUsuario),
    })
      .then((res) => {
        if (!res.ok) {
          return res
            .json()
            .then((err) => {
              throw new Error(err.message || "No se pudo crear el usuario");
            })
            .catch(() => {
              throw new Error(
                "No se pudo crear el usuario. Nickname o email quizás ya existen."
              );
            });
        }
        return res.json();
      })
      .then((usuarioCreado: Usuario) => {
        setMensaje(`Usuario ${usuarioCreado.nickName} creado con éxito.`);
        setNickName("");
        setEmail("");
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .catch((e: any) => setError(`${e.message}`));
  };

  return (
    <>
      <div
        className={`d-flex align-items-center justify-content-center vh-100 text-light flex-column`}
      >
        <div className="text-center mb-4">
          <FondoUnahur>
            <UserPlus />
          </FondoUnahur>
          <p className={`mt-3 mb-1 text-light ${style.titulo}`}>
            UnaHur Anti-Social Net
          </p>
          <p className="text-secondary mb-0">Crea tu cuenta</p>
        </div>

        <div
          className={`card p-4 ${style.cardForm}`}
          style={{ width: "100%", maxWidth: "450px" }}
        >
          <p className="card-title">Registrarse</p>
          <p className={`card-subtitle mb-2 ${style.subtituloCard}`}>
            Elige un nickname único y original para tu cuenta
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="nickname" className="form-label">
                Nickname
              </label>
              <input
                type="text"
                id="nickname"
                className={`form-control text-light border-secondary ${style.inputColor}`}
                placeholder="tu_nickname_unico"
                value={nickName}
                onChange={(e) => setNickName(e.target.value)}
              />
              { }
              <label htmlFor="Email" className="form-label mt-3">
                Email
              </label>
              <input
                type="email"
                id="email"
                className={`form-control text-light border-secondary ${style.inputColor}`}
                placeholder="tu_email@gmail.com"
                value={email}
                onInvalid={handleInvalid}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-text text-secondary">
              <p>Este sera tu nombre de usuario en la red social</p>
            </div>

            {mensaje && (
              <div className="alert alert-success text-center mt-3">{mensaje}</div>
            )}
            {error && (
              <div className="alert alert-danger text-center mt-3">{error}</div>
            )}
            
            <BotonVerde ocupa100>
              Registrarse
            </BotonVerde>
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
  );
}
