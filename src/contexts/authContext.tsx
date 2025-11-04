import type {ReactNode} from "react";
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export interface Usuario {
  id: string;
  nombre: string;
  nickName: string;
  email: string;
  createdAt: string;
  logueado: boolean;
}

export interface Tag {
    id: number;
    name: string;
}

interface AuthContextType {
  usuario: Usuario | null;
  cargando: boolean;
  login: (user: Usuario) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const stored = sessionStorage.getItem("usuario");
    if (stored) {
      try {
        const user = JSON.parse(stored);
        setUsuario(user);
      } catch (err) {
        console.error("Usuario corrupto:", err);
        sessionStorage.removeItem("usuario");
      }
    }
    setCargando(false);
  }, []);

  const login = (user: Usuario) => {
    const userConEstado = { ...user, logueado: true };
    setUsuario(userConEstado);
    sessionStorage.setItem("usuario", JSON.stringify(userConEstado));
  };

  const logout = () => {
    setUsuario(null);
    sessionStorage.removeItem("usuario");
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
}