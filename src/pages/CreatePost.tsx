import { CircleFadingPlus, X, Image } from "lucide-react";
import style from "./CreatePost.module.css";
import { useState } from "react";

export default function CreatePost() {
  const [imagenes, setImagenes] = useState([""]);

  const cambiarValor = (index:number, value:string) => {
    const nuevasImg = [...imagenes];
    nuevasImg[index] = value;
    setImagenes(nuevasImg);
  };

  const eliminarImagen = (index:number) => {
    setImagenes((previo) => previo.filter((_, i) => i !== index));
  };

  const agregarImagen = () => {
    setImagenes((prev) => [...prev, ""]);
  };

  return (
    <div className="text-light">
      <h3>Crear Nueva Publicación</h3>
      <p className="text-secondary">Comparte tu contenido con la comunidad</p>

      <div className={`card mb-3 ${style.cardPost}`}> {/*Div crear Post */}
        <div className="card-body">
          <p>Contenido</p>
          <label htmlFor="description" className="form-label">Descripción *</label>
          <textarea
            id="description"
            className={`form-control text-light border-secondary ${style.formControl}`}
            placeholder="¿Qué quieres compartir?"
            rows={4} />

          {/*Crear imagenes */}
          <div className={`${style.divSeccionImagen}`}>
            <label htmlFor="Imágenes" className="form-label">Imágenes (opcional)</label>
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


        </div>
      </div>

      <div className="d-flex gap-3"> {/*Div botones */}
        <button type="button" className="btn btn-success d-flex align-items-center gap-2">
          <CircleFadingPlus /> Publicar
        </button>
        <button type="button" className="btn btn-secondary">
          Cancelar
        </button>
      </div>
    </div>
  );
};
