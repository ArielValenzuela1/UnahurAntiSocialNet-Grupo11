import { LogIn } from "lucide-react";
import style from "./Login.module.css";
import FondoUnahur from "../components/FondoUnahur";
import { useContext, useState } from "react";
import { UsuarioContext, type Usuario } from "../components/UsuarioContext";
import { Link, useNavigate } from "react-router-dom";

type UsuarioDeLaAPI = {
  id: number;
  nickName: string;
  email: string;
};

export default function Login() {
  const { setUsuario } = useContext(UsuarioContext)!;
  const [nickName, setNickName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const passwordFija = "123456";

  function enviarForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (!nickName || !password) {
      setError("Por favor, completa tu Usuario y Contraseña");
      return;
    }

    if (password !== passwordFija) {
      setError("Contraseña incorrecta");
      setPassword("");
      return;
    }

    fetch(`http://localhost:3001/users?nickName=${nickName}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error al conectar con el servidor.");
        }
        return res.json();
      })
      .then((usuarios: UsuarioDeLaAPI[]) => {
        const usuarioEncontrado = usuarios.find(usuario => usuario.nickName === nickName);

        if(!usuarioEncontrado){
          setError(`El usuario "${nickName}" no existe.`);
          return;
        }

        const usuarioParaContexto: Usuario = {
          id: usuarioEncontrado.id,
          nickName: usuarioEncontrado.nickName,
          email: usuarioEncontrado.email,
          logueado: true,
        };
        
        setUsuario(usuarioParaContexto);
        localStorage.setItem("user", JSON.stringify(usuarioParaContexto));
        navigate("/Perfil");


      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .catch((err: any) => {
        setError(err.message || "Ocurrió un error inesperado.");
      });
  }

  return (
    <>
      <div
        className={`d-flex align-items-center justify-content-center vh-100 text-light flex-column`}
      >
        <div className="text-center mb-4">
          <FondoUnahur>
            <LogIn />
          </FondoUnahur>
          <p className={`mt-3 mb-1 text-light ${style.titulo}`}>
            UnaHur Anti-Social Net
          </p>
          <p className="text-secondary mb-0">Inicia sesión para continuar</p>
        </div>

        <div
          className={`card p-4 ${style.cardForm}`}
          style={{ width: "100%", minWidth: "450px" }}
        >
          <p className="card-title">Iniciar Sesión</p>
          <p className={`card-subtitle mb-2 ${style.subtituloCard}`}>
            Ingresa tu nickname y contraseña
          </p>
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
                value={nickName}
                onChange={(e) => setNickName(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="form-text text-secondary">
                <p>La contraseña es: 123456</p>
              </div>
            </div>

            {error && (
              <div className="alert alert-danger text-center mt-3">{error}</div>
            )}

            <button
              type="submit"
              className={`btn btn-success w-100 ${style.btnIniciar}`}
            >
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
  );
}
