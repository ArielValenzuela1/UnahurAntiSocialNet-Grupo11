import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import type { AuthContextType, AuthProviderProps, Usuario } from "./interfaces";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("usuario");
    if (stored) {
      try {
        const user = JSON.parse(stored);
        setUsuario(user);
      } catch (err) {
        console.error("Usuario corrupto:", err);
        localStorage.removeItem("usuario");
      }
    }
    setCargando(false);
  }, []);

  const login = (user: Usuario) => {
    const userConEstado = { ...user, logueado: true };
    setUsuario(userConEstado);
    localStorage.setItem("usuario", JSON.stringify(userConEstado));
  };

  const logout = () => {
    setUsuario(null);
    localStorage.removeItem("usuario");
  };

  return (
    <AuthContext.Provider value={{ usuario, cargando, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};