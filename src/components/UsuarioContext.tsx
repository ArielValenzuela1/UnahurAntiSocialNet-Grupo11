import { createContext } from "react";

export interface Usuario {
  nombre: string;
  logueado: boolean;
}

export interface UsuarioContextType {
  usuario: Usuario;
  setUsuario: React.Dispatch<React.SetStateAction<Usuario>>;
}
// Puede ser undefined al inicio, por eso usamos este tipo
export const UsuarioContext = createContext<UsuarioContextType>({
  usuario: { nombre: "", logueado: false },
  setUsuario: () => {}, // función vacía por defecto
});
