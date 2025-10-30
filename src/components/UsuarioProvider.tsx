import { useState} from "react";
import { UsuarioContext } from "./UsuarioContext";
import type { Usuario } from "./UsuarioContext";

interface UsuarioProviderProps {
  children?: React.ReactNode;
}

export default function UsuarioProvider({ children }: UsuarioProviderProps) {
  const [usuario, setUsuario] = useState<Usuario>({
    nombre: "",
    logueado: false,
  });

  return (
    <UsuarioContext.Provider value={{ usuario, setUsuario }}>
      {children}
    </UsuarioContext.Provider>
  );
}
