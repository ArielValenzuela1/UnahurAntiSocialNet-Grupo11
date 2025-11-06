import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import style from "./Modules/TagCard.module.css"
import { motion } from "framer-motion";
import type { Tag, TagSelectorProps } from "../contexts/interfaces";

export default function TagSelector({ selectedTags, setSelectedTags }: TagSelectorProps) {
    const [tags, setTags] = useState<Tag[]>([]);
    const [newTag, setNewTag] = useState("");

    useEffect(() => {
        fetch("http://localhost:3001/tags")
            .then(res => res.json())
            .then(data => setTags(data))
            .catch(err => console.error("Error al cargar etiquetas:", err));
    }, []);

    const toggleTag = (id: number) => {
        setSelectedTags((prev: number[]) => {
            const updated = prev.includes(id)
                ? prev.filter((t) => t !== id)
                : [...prev, id];
            console.log("Actualizados:", updated);
            return updated;
        });
    };

    return (
        <div className={`card mb-3 card-body ${style.cardTag}`}>
           <p> Etiquetas </p>

            <div className={style.tagsContainer}>
                {tags.map((tag) => (
                    <motion.div
                          key={tag.id}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.6 + tag.id * 0.05 }}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className={style.divTag}
                        >
                    <span
                        key={tag.id}
                        onClick={() => {
                            toggleTag(tag.id);
                            console.log(selectedTags)
                        }}
                        className={`${style.tagBadge} ${selectedTags.includes(tag.id) ? style.selected : ""}`}
                    >
                        #{tag.name}
                    </span>
                    </motion.div>
                ))}
            </div>



            <p className="text-secondary mb-1">Crear nueva etiqueta</p>
            <div className="input-group">
                <input
                    type="text"
                    className={`form-control text-light border-secondary ${style.inputBusqueda}`}
                    placeholder="nombre_etiqueta"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}/>
                <button
                    className="btn btn-success d-flex align-items-center gap-1"
                    type="button"
                    disabled={!newTag.trim()}
                    onClick={() => setNewTag("")}>
                    {/*Proximamente funcionalidad de crear tag*/}
                    <Plus size={16} /> Crear
                </button>
            </div>

        </div>
    );
}