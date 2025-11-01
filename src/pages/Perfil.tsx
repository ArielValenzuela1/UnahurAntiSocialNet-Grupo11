import CirculoLetra from "../components/CirculoLetra";

export default function Perfil() {
  return (
    <>
      <div style={{display: "flex", alignItems: "center"}}>
        <CirculoLetra letra='L' size={100} />
        <div>
          <h3>nombre Usuario</h3>
          <div style={{display: "flex"}}>
            <div>
              <p>publicaciones</p>
              <p>cantidad</p>
            </div>
            <div>
              <p>Seguidores</p>
              <p>cantidad</p>
            </div>
            <div>
              <p>Siguiendo</p>
              <p>cantidad</p>
            </div>
            <div>
              <p>Miembro Desde</p>
              <p>fecha</p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h1>Mis Publicaciones</h1>
        <div>
          {/* icono */}
          <p>Aún no has creado ninguna publicación</p>
          <button></button>
        </div>
      </div>
    </>
  )
}
