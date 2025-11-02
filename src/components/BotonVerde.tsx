interface BotonVerdeProps {
  children?: React.ReactNode;          // La letra que va adentro
  ocupa100?: boolean;          // Tamaño del círculo en px (opcional)
}

export default function BotonVerde({children,ocupa100} : BotonVerdeProps
) {
    return (
        <button
        type="submit"
        className={`btn btn-success ${ocupa100 ? 'w-100' : ''}`}
        style={{ fontWeight: "500", color: "#000" }}>
            {children}
        </button>
    )
}
