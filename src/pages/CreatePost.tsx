import { CircleFadingPlus, X, Image } from "lucide-react";
import style from "./Modules/CreatePost.module.css";
import { useState } from "react";
import BotonVerde from "../components/BotonVerde";
import { useAuth } from "../contexts/authContext";
import TagCard from "../components/TagCard";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';

interface Post {
  description: string;
  userId: string;
  tagIds: number[];
}

export default function CreatePost() {
  const navigate = useNavigate();
  const { usuario } = useAuth();
  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  const [noDescripcion, setNoDescripcion] = useState<boolean>(false)

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

  // Función para crear el post
  async function crearPost(nuevoPost: Post) {
    const res = await fetch("http://localhost:3001/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevoPost),
    });
    console.log(JSON.stringify(nuevoPost));

    if (!res.ok) throw new Error("No se pudo crear la publicación");

    return res.json();
  }

  // Función para crear las imágenes asociadas al post
  async function crearImagenes(postId: number, imagenes: string[]) {
    const imagenesValidas = imagenes.filter((url) => url.trim() !== "");

    if (imagenesValidas.length === 0) return;

    const requests = imagenesValidas.map((url) =>
      fetch("http://localhost:3001/postImages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, postId }),
      })
    );

    await Promise.all(requests);
  }

  // Función principal
  async function manejarCreacionPost(nuevoPost: Post) {
    try {
      const postCreado = await crearPost(nuevoPost);
      await crearImagenes(postCreado.id, imagenes);

      setMensaje("Post creado con éxito.");
      setDescripcion("");
      setImagenes([""]);
      setSelectedTags([]);

      setTimeout(() => setMensaje(null), 3000);
      setTimeout(() => navigate(`/post/${postCreado.id}`), 1000);
    } catch (e: any) {
      setError(`${e.message} ${e.details || ""}`);
      setTimeout(() => setError(null), 3000);
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    console.log('Handle Submit');
    e.preventDefault();
    setError(null);

    if (!description) {
      setError("Por favor ingresa una descripción");
      setNoDescripcion(true);
      setTimeout(() => setError(null), 3000);
      setTimeout(() => setNoDescripcion(false), 3000);
      return;
    }

    //esto no deberia pasar
    if (!usuario) {
      setError("Usuario no autenticado");
      setTimeout(() => setError(null), 3000);
      return;
    }
    const userId = usuario.id;

    const nuevoPost: Post = {
      description,
      userId: userId,
      tagIds: selectedTags,
    };

    manejarCreacionPost(nuevoPost)
  };

  return (
    <div className={`${style.crearPost} mx-auto`}>
      <form onSubmit={handleSubmit} className={`text-light`}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}>

          <h3 className={style.tituloCrearPost}>Crear Nueva Publicación</h3>
          <p style={{ color: "#90A1B9" }}>Comparte tu contenido con la comunidad</p>

        </motion.div>


        <motion.div
          className={`card mb-3 card-body ${style.cardPost}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}>

          <p>Contenido del Post</p>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}>

            <label htmlFor="description" className="form-label">Descripción *</label>
            <textarea
              id="description"
              className={`form-control text-light border-secondary ${style.formControl} ${noDescripcion ? style.formControlError : ""}`}
              placeholder="¿Qué quieres compartir?"
              value={description}
              rows={4}
              onChange={(e) => setDescripcion(e.target.value)} />

          </motion.div>

          {/*Crear imagenes */}
          <motion.div
            className={`${style.divSeccionImagen}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}>

            <label className="form-label">Imágenes (opcional)</label>
            {imagenes.map((url, index) => (
              <motion.div
                key={index}
                className={`input-group ${style.divCrearImagen}`}
                initial={{ opacity: 0, x: -20, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.2 }}>

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
              </motion.div>
            ))}
            <button type="button"
              className={`btn btn-secondary ${style.botonAgregarImagen} ${imagenes.length < 10 ? "" : "disabled"}`}
              onClick={agregarImagen}> <Image /> Agregar otra imagen</button>
            {imagenes.length >= 10 ? 
              <p className="text-warning mt-2">
                Has alcanzado el máximo de 10 imágenes por publicación.
              </p> :
              <p />
            }

          </motion.div>

          {mensaje && (
            <div className="alert alert-success text-center mt-3">{mensaje}</div>
          )}
          {error && (
            <div className="alert alert-danger text-center mt-3">{error}</div>
          )}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}>

          <TagCard selectedTags={selectedTags} setSelectedTags={setSelectedTags} />


          {/*Div botones*/}
          <div className="d-flex gap-3">
              <BotonVerde>
                <CircleFadingPlus /> Publicar
              </BotonVerde>
            

            <NavLink to="/">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}>
                <button type="button" className="btn btn-secondary">
                  Cancelar
                </button>
              </motion.div>
            </NavLink>

          </div>

        </motion.div>
      </form>
    </div>
  );
};
