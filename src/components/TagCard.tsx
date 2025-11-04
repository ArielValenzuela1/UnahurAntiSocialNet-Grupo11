import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import style from "./Modules/TagCard.module.css"
import type { Tag } from "../contexts/authContext";

interface TagSelectorProps {
  selectedTags: number[];
  setSelectedTags: React.Dispatch<React.SetStateAction<number[]>>;
}

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

    const handleCreateTag = async () => {
        const nombre = newTag.trim();
        if (!nombre) return;

        try {
            const res = await fetch("http://localhost:3001/tags", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nombre }),
            });
            const nueva = await res.json();
            setTags([...tags, nueva]);
            setSelectedTags([...selectedTags, nueva.id]); // selecciona automáticamente  
            setNewTag("");
        } catch (err) {
            console.error("Error al crear etiqueta:", err);
        }

    };

    return (
        <div className={`card mb-3 card-body ${style.cardTag}`}>
            Etiquetas existentes

            <div className={style.tagsContainer}>
                {tags.map((tag) => (
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
                ))}
            </div>



            <p className="text-secondary mb-1">Crear nueva etiqueta</p>
            <div className="input-group">
                <input
                    type="text"
                    className={`form-control text-light border-secondary ${style.inputBusqueda}`}
                    placeholder="nombre_etiqueta"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleCreateTag()}
                />
                <button
                    className="btn btn-success d-flex align-items-center gap-1"
                    type="button"
                    onClick={handleCreateTag}
                    disabled={!newTag.trim()}
                >
                    <Plus size={16} /> Crear
                </button>
            </div>

        </div>
    );
}