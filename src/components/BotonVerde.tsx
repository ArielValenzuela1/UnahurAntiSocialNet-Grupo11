import { motion } from "framer-motion";
import type { BotonVerdeProps } from "../contexts/interfaces";

export default function BotonVerde({ children, ocupa100, onClick }: BotonVerdeProps
) {
    return (
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <button
                type="submit"
                className={`fw-medium text-dark btn btn-success ${ocupa100 ? 'w-100' : ''}`}
                onClick={onClick}>
                {children}
            </button>
        </motion.div>
    )
}
