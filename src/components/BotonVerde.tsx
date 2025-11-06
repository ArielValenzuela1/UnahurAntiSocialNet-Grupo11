import type { BotonVerdeProps } from "../contexts/interfaces";

export default function BotonVerde({ children, ocupa100, onClick }: BotonVerdeProps
) {
    return (
        <button
            type="submit"
            className={`fw-medium text-dark btn btn-success ${ocupa100 ? 'w-100' : ''}`}
            onClick={onClick}>
            {children}
        </button>
    )
}
