import { Link } from "react-router-dom";
import CirculoLetra from "./CirculoLetra";
import style from "./Modules/CardComentario.module.css"

interface ComentarioProps {
    content: string;
    createdAt: Date;
    User: {
        id: number;
        nickName: string;
    }
}

export default function CardComentario({ content, createdAt, User }: ComentarioProps) {
    const comment = { content, createdAt, User };

    return (
        <div className={`${style.postCard} `}>
            <div className={`card-header d-flex align-items-center text-decoration-none gap-3`}>
                <Link
                    to={`/user/${comment.User.id}`}
                    className="card-header d-flex align-items-center text-decoration-none gap-3"
                >
                    <CirculoLetra size={40} letra={comment.User?.nickName[0]} />
                    <div>
                        <p className={style.nickName}>
                            {comment.User?.nickName}
                        </p>
                        {comment.createdAt && (
                            <small className={style.date}>
                                {new Date(comment.createdAt).toLocaleDateString("es-ES", {
                                    hour: "numeric",
                                    minute: "numeric",
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric"
                                })}
                            </small>
                        )}
                    </div>
                </Link>
            </div>
            <div className={`card-body pt-1 ${style.commentBody}`}>
                <p className={style.commentContent}>{comment.content}</p>
            </div>
        </div>
    );
}

