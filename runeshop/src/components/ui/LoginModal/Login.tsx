import { useState, type FC } from "react";
import styles from "./Login.module.css";
import { Register } from "../RegisterModal/Register";
import { useNavigate } from "react-router";

interface loginProps {
  onCloseLogin: () => void;
}

export const Login: FC<loginProps> = ({ onCloseLogin }) => {
  const [registerOpen, setRegisterOpen] = useState(false);
  const navigate = useNavigate();

  const handleCloseRegister = () => {
    setRegisterOpen(false);
  };

  const handleLogin = () => {
    navigate("/userProfile");
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.principalContainerLogin}>
        <div className={styles.containerDataLogin}>
          <div className={styles.containerTitleLogin}>
            <span className="material-symbols-outlined">person</span>
            <h1>Iniciar Sesión</h1>
          </div>
          <div className={styles.containerInputLogin}>
            <input type="text" placeholder="Nombre de usuario" />
            <input type="password" placeholder="Contraseña" />
          </div>
          <div className={styles.containerButtonLogin}>
            <button onClick={handleLogin}>Acceder</button>
            <button onClick={onCloseLogin}>Cancelar</button>
          </div>
          <div className={styles.containerRegisterLogin}>
            <p>
              ¿No tienes cuenta?{" "}
              <button onClick={() => setRegisterOpen(true)}>Registrate</button>
            </p>
          </div>
        </div>

        {registerOpen && <Register onCloseRegister={handleCloseRegister} />}
      </div>
    </div>
  );
};
