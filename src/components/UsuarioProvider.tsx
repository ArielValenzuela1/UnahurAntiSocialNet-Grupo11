import { useState, useEffect } from "react";
import { UsuarioContext } from "./UsuarioContext";
import type { Usuario } from "./UsuarioContext";

interface UsuarioProviderProps {
  children?: React.ReactNode;
}

export default function UsuarioProvider({ children }: UsuarioProviderProps) {
  const [usuario, setUsuario] = useState<Usuario>({
    id: 0, nickName: "", email: "", miembroDesde: "", logueado: false
  });
  useEffect(() => {
    const usuarioGuardado = JSON.parse(localStorage.getItem("user")!);
    if (usuarioGuardado) {
      console.log("Usuario cargado desde localStorage:", usuarioGuardado);
      setUsuario(usuarioGuardado);
    }
  }, [])


  return (
    <UsuarioContext.Provider value={{ usuario, setUsuario }}>
      {children}
    </UsuarioContext.Provider>
  );
}
