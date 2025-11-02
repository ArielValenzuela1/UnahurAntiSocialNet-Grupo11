interface CirculoLetraProps {
  letra: string;          // La letra que va adentro
  size?: number;          // Tamaño del círculo en px (opcional)
  colorFondo?: string;    // Color de fondo (opcional)
  colorLetra?: string;    // Color de la letra (opcional)
}

export default function CirculoLetra({
  letra,
  size = 50,
  colorLetra = "#fff",
}: CirculoLetraProps) {
  return (
    <div
      style={{
        background: "linear-gradient(155deg,rgba(87, 199, 133, 1) 1%, rgba(37, 142, 184, 1) 88%)",
        width: size,
        minWidth: size,
        height: size,
        color: colorLetra,
        borderRadius: "50%",          // Hace que sea circular
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "bold",
        fontSize: size / 2,           // Ajusta tamaño de la letra
        userSelect: "none",           // Evita seleccionar la letra
      }}
    >
      {letra}
    </div>
  );
}