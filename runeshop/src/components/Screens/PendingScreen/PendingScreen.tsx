import styles from "./PendingScreen.module.css";
import { Footer } from "../../ui/Footer/Footer";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userStore } from "../../../store/userStore";

export const PendingScreen = () => {
    const navigate = useNavigate();
    const [seconds, setSeconds] = useState(5);

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
        <div className={styles.containerPendingScreen}>
            <div className={styles.centerContentWrapper}>
                <div className={styles.containerPendingScreenContent}>
                    <div className={styles.pendingMessage}>
                        <h1>¡Pago pendiente!</h1>
                        <p>Tu pago está siendo procesado.</p>
                        <p>
                            Si pagaste con un método en efectivo, recuerda completar el pago para finalizar tu compra.
                        </p>
                        <p>
                            Serás redirigido al inicio en <b>{seconds}</b> segundo{seconds !== 1 && "s"}...
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};