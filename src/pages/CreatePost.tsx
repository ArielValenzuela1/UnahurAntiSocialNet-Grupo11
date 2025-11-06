import { CircleFadingPlus, X, Image } from "lucide-react";
import style from "./Modules/CreatePost.module.css";
import { useState } from "react";
import BotonVerde from "../components/BotonVerde";
import { useAuth } from "../contexts/authContext";
import TagCard from "../components/TagCard";

export default function CreatePost() {
  const { usuario } = useAuth();
  const [selectedTags, setSelectedTags] = useState<number[]>([]);

  const [imagenes, setImagenes] = useState([""]);
  const [description, setDescripcion] = useState<string>("");

  const [error, setError] = useState<string | null>(null);
  const [mensaje, setMensaje] = useState<string | null>(null);


  const cambiarValor = (index: number, value: string) => {
    const nuevasImg = [...imagenes];
    nuevasImg[index] = value;
    setImagenes(nuevasImg);
  };

  const eliminarImagen = (index: number) => {
    setImagenes((previo) => previo.filter((_, i) => i !== index));
  };

  const agregarImagen = () => {
    setImagenes((prev) => [...prev, ""]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    console.log('Handle Submit');
    e.preventDefault();
    setError(null);

    if (!description) {
      setError("Por favor ingresa una descripción");
      setTimeout(() => setError(null), 3000);
      return;
    }
    const userId = usuario?.id;

    const nuevoPost = { description, userId, tagIds: selectedTags };

    fetch("http://localhost:3001/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nuevoPost),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("No se pudo crear la publicación");
        }
        return res.json();
      })
      .then((postCreado) => {
      const imagenesValidas = imagenes.filter((url) => url.trim() !== "");
      if (imagenesValidas.length === 0) return postCreado;
      // Crear cada imagen asociada al post creado
      return Promise.all(
        imagenesValidas.map((url) =>
          fetch("http://localhost:3001/postImages", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url, postId: postCreado.id }),
        })))
        .then(() => postCreado);
    })
    .then(() => {
      setMensaje("Post creado con éxito.");
      setDescripcion("");
      setImagenes([""]);
      setSelectedTags([]);
      setTimeout(() => setMensaje(null), 3000);
    })
      .catch(
        (e: any) => {
          setError(`${e.message} ${e.details}`)
          setTimeout(() => setError(null), 3000);
        }
      );
  };

  return (
    <div className={`${style.crearPost} mx-auto`}>
      <form onSubmit={handleSubmit} className={`text-light`}>
        <h3 className={style.tituloCrearPost}>Crear Nueva Publicación</h3>
        <p className="text-secondary">Comparte tu contenido con la comunidad</p>

        <div className={`card mb-3 card-body ${style.cardPost}`}>
          <p>Contenido del Post</p>
          <label htmlFor="description" className="form-label">Descripción *</label>
          <textarea
            id="description"
            className={`form-control text-light border-secondary ${style.formControl}`}
            placeholder="¿Qué quieres compartir?"
            value={description}
            rows={4}
            onChange={(e) => setDescripcion(e.target.value)} />

          {/*Crear imagenes */}
          <div className={`${style.divSeccionImagen}`}>
            <label className="form-label">Imágenes (opcional)</label>
            {imagenes.map((url, index) => (
              <div key={index} className={`input-group ${style.divCrearImagen}`}>

                <input type="text"
                  className={`form-control border-secondary ${style.inputUrlImagen}`}
                  placeholder="https://ejemplo.com/imagen.jpg"
                  aria-describedby="button-addon2"
                  value={url}
                  onChange={(e) => cambiarValor(index, e.target.value)} />

                <button className={`btn ${imagenes.length > 1 ? style.btnBorrarImagenAct : style.btnBorrarImagenDes}`}
                  type="button"
                  id="button-addon2"
                  onClick={() => eliminarImagen(index)}> <X /> </button>
              </div>
            ))}
            <button type="button"
              className={`btn btn-secondary ${style.botonAgregarImagen} ${imagenes.length < 10 ? "" : "disabled"}`}
              onClick={agregarImagen}> <Image /> Agregar otra imagen</button>
              {imagenes.length >= 10 ? (
              <p className="text-warning mt-2">
                Has alcanzado el máximo de 10 imágenes por publicación.
              </p> ):
              (<p/>)
            }
          </div>
        
          {mensaje && (
            <div className="alert alert-success text-center mt-3">{mensaje}</div>
          )}
          {error && (
            <div className="alert alert-danger text-center mt-3">{error}</div>
          )}
        </div>

        <TagCard selectedTags={selectedTags} setSelectedTags={setSelectedTags} />

        {/*Div botones*/}
        <div className="d-flex gap-3">
          <BotonVerde>
            <CircleFadingPlus /> Publicar
          </BotonVerde>

          <button type="button" className="btn btn-secondary">
            Cancelar
          </button>
        </div>

      </form>
    </div>
  );
};
