import type { ReactNode } from "react";


export interface BotonVerdeProps {
    children?: React.ReactNode;
    ocupa100?: boolean;
    onClick?: () => void;
}

export interface ComentarioProps {
    content: string;
    createdAt: Date;
    User: {
        id: number;
        nickName: string;
    }
}

export interface CardPostHomeProps {
  post: Post;
}

export interface CirculoLetraProps {
  letra: string;          // La letra que va adentro
  size?: number;          // Tamaño del círculo en px (opcional)
  colorFondo?: string;    // Color de fondo (opcional)
  colorLetra?: string;    // Color de la letra (opcional)
}

export interface FondoUnahurProps {
  children?: React.ReactNode;
  redondo?: Boolean; // 👈 nueva prop opcional
}

export interface ImageFallBack {
  src: string;
  alt: string;
  clasStyle: string;
  fallback?: string;
}

export interface TagSelectorProps {
  selectedTags: number[];
  setSelectedTags: React.Dispatch<React.SetStateAction<number[]>>;
}

export interface Usuario {
  id: string;
  nombre: string;
  nickName: string;
  email: string;
  createdAt: string;
  logueado?: boolean;
}

export interface Tag {
    id: number;
    name: string;
}

export interface AuthContextType {
  usuario: Usuario | null;
  cargando: boolean;
  login: (user: Usuario) => void;
  logout: () => void;
}

export interface AuthProviderProps {
  children: ReactNode;
}

export interface Post {
  id: number;
  description: string;
  UserId: number;
  User: {
    id: number;
    nickName: string;
    email: string;
  };
  Tags?: {
    id: number;
    name: string;
  }[];
  images?: {
    id: number;
    url: string;
  }[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Comment {
  id: number;
  content: string;
  createdAt: Date;
  User: {
    id: number;
    nickName: string;
  };
}
