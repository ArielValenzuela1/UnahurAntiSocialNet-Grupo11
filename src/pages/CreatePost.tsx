import { CircleFadingPlus } from "lucide-react";
import style from "./CreatePost.module.css"
export default function CreatePost() {
  return (
    <div className="text-light">
      <h3>Crear Nueva Publicación</h3>
      <p className="text-secondary">Comparte tu contenido con la comunidad</p>

      <div className={`card mb-3 ${style.cardPost}`}> {/*Div crear Post */}
        <div className="card-body">
        <label htmlFor="description" className="form-label">
          Descripción *
        </label>
        <textarea
          id="description"
          className={`form-control text-light border-secondary ${style.formControl}`}
          placeholder="¿Qué quieres compartir?"
          rows={4}
          style={{ resize: "none" }}
        />
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
}
