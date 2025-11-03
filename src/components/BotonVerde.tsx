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
            className={`btn btn-success ${ocupa100 ? 'w-100' : ''}`}
            style={{ fontWeight: "500", color: "#000" }}
            onClick={onClick}>
            {children}
        </button>
    )
}
