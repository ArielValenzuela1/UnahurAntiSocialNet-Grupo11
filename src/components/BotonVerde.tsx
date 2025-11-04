interface BotonVerdeProps {
    children?: React.ReactNode;
    ocupa100?: boolean;
    onClick?: () => void;
}

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
