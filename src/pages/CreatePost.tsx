import { CircleFadingPlus, X, Image } from "lucide-react";
import style from "./CreatePost.module.css";
import { useState } from "react";
import BotonVerde from "../components/BotonVerde";

export default function CreatePost() {
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
      return;
    }
    const userId = "2"; // ID de usuario fijo para este ejemplo
    const tagsIds: number[] = []; // Tags vacíos para este ejemplo

    const nuevoPost = {description, userId, tagsIds };

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
      .then(() => {
        setMensaje(`Post creado con éxito.`);
      })
      .catch(
        (e: any) => setError(`${e.message} ${e.details}`)
      );
  };

  return (
    <form onSubmit={handleSubmit} className="text-light">
      <h3>Crear Nueva Publicación</h3>
      <p className="text-secondary">Comparte tu contenido con la comunidad</p>

      <div className={`card mb-3 card-body ${style.cardPost}`}>
        <p>Contenido</p>
        <label htmlFor="description" className="form-label">Descripción *</label>
        <textarea
          id="description"
          className={`form-control text-light border-secondary ${style.formControl}`}
          placeholder="¿Qué quieres compartir?"
          rows={4}
          onChange={(e) => setDescripcion(e.target.value)} />

        {/*Crear imagenes */}
        <div className={`${style.divSeccionImagen}`}>
          <label className="form-label">Imágenes (opcional)</label>
          {imagenes.map((url, index) => (
            <div className={`input-group ${style.divCrearImagen}`}>

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
            className={`btn btn-secondary ${style.botonAgregarImagen}`}
            onClick={agregarImagen}> <Image /> Agregar otra imagen</button>
        </div>
        {mensaje && (
          <div className="alert alert-success text-center mt-3">{mensaje}</div>
        )}
        {error && (
          <div className="alert alert-danger text-center mt-3">{error}</div>
        )}
      </div>

      <div className="d-flex gap-3"> {/*Div botones */}
        <BotonVerde>
          <CircleFadingPlus /> Publicar
        </BotonVerde>

        <button type="button" className="btn btn-secondary">
          Cancelar
        </button>
      </div>
    </form>
  );
};
