import styles from "./SuccessScreen.module.css";
import { Footer } from "../../ui/Footer/Footer";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";// importa tu store de carrito
import { useUser } from "../../../hooks/useUser";
import { userStore } from "../../../store/userStore";

export const SuccessScreen = () => {
    const navigate = useNavigate();
    const [seconds, setSeconds] = useState(4);


    useEffect(() => {
        userStore.getState().clearCart();
        const interval = setInterval(() => {
            setSeconds((s) => s - 1);
        }, 1000);

        const timer = setTimeout(() => {
            navigate("/");
        }, 5000);

        return () => {
            clearInterval(interval);
            clearTimeout(timer);
        };
    }, [navigate]);

    return (
        <div className={styles.containerSuccessScreen}>
            <div className={styles.centerContentWrapper}>
                <div className={styles.containerSuccessScreenContent}>
                    <div className={styles.successMessage}>
                        <h1>¡Gracias por tu compra!</h1>
                        <p>Tu pedido ha sido procesado exitosamente.</p>
                        <p>
                            Recibirás un correo de confirmación con los detalles de tu compra.
                        </p>
                        <p>
                            Serás redirigido al inicio en <b>{seconds}</b> segundo{" "}
                            {seconds !== 1 && "s"}...
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};
