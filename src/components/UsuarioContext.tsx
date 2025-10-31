import { createContext } from "react";

export interface Usuario {
  id: number;
  nickName: string;
  email: string;
  logueado: boolean;
}

export interface UsuarioContextType {
  usuario: Usuario;
  setUsuario: React.Dispatch<React.SetStateAction<Usuario>>;
}
// Puede ser undefined al inicio, por eso usamos este tipo
export const UsuarioContext = createContext<UsuarioContextType>({
  usuario: { id: 0, nickName: "", email: "", logueado: false },
  setUsuario: () => {}, // función vacía por defecto
});
