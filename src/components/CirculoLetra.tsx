import type { CirculoLetraProps } from "../contexts/interfaces";

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
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: size / 2,
        userSelect: "none",
      }}
    >
      {letra.toUpperCase()}
    </div>
  );
}