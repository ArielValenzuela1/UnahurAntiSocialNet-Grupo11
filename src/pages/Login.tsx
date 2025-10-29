import { UserPlus } from 'lucide-react';
import style from "./Login.module.css";

export default function Login() {
  return (
    <>
      <div className={`${style.fondoUnahur} inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br`}>
        <UserPlus />
      </div>
    </>
  )
}
