import type { FC } from "react";
import styles from "./Login.module.css";

interface loginProps {
    onCloseLogin: () => void;
}

export const Login: FC<loginProps> = ({ onCloseLogin }) => {
    return (
        <div className={styles.principalContainerLogin}>
            <div className={styles.containerDataLogin}>
                <div className={styles.containerTitleLogin}>
                    <span className="material-symbols-outlined">person</span>
                    <h1>Iniciar Sesión</h1>
                </div>
                <div className={styles.containerInputLogin}>
                    <input type="text" placeholder="Correo electrónico" />
                    <input type="password" placeholder="Contraseña" />
                </div>
                <div className={styles.containerButtonLogin}>
                    <button>Acceder</button>
                    <button onClick={onCloseLogin}>Cancelar</button>
                </div>
                <div className={styles.containerRegisterLogin}>
                    <p>
                        ¿No tienes cuenta? <button>Registrate</button>
                    </p>
                </div>
            </div>
        </div>
    );
};
