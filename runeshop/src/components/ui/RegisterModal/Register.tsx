import type { FC } from "react";
import styles from "./Register.module.css";

interface registerProps{
    onCloseRegister: () => void;
}

export const Register: FC<registerProps> = ({ onCloseRegister }) => {
    return (
        <div className={styles.overlay}>
            <div className={styles.principalContainerRegister}>
                <div className={styles.containerDataRegister}>
                    <div className={styles.containerTitleRegister}>
                        <span className="material-symbols-outlined">person</span>
                        <h1>Registrar usuario</h1>
                    </div>
                    <div className={styles.containerInputRegister}>
                        <input type="text" placeholder="Nombre" />
                        <input type="text" placeholder="Correo electrónico" />
                        <input type="password" placeholder="Contraseña" />
                        <input type="password" placeholder="Confirmar Contraseña" />
                    </div>
                    <div className={styles.containerButtonRegister}>
                        <button>Registrarse</button>
                        <button onClick={onCloseRegister}>Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
    );
}