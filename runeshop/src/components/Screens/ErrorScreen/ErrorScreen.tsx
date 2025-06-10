import styles from "./ErrorScreen.module.css";
import { Footer } from "../../ui/Footer/Footer";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const ErrorScreen = () => {
    const navigate = useNavigate();
    const [seconds, setSeconds] = useState(6);

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds((s) => s - 1);
        }, 1000);

        const timer = setTimeout(() => {
            navigate("/");
        }, 6000);

        return () => {
            clearInterval(interval);
            clearTimeout(timer);
        };
    }, [navigate]);

    return (
        <div className={styles.containerErrorScreen}>
            <div className={styles.centerContentWrapper}>
                <div className={styles.containerErrorScreenContent}>
                    <div className={styles.errorMessage}>
                        <h1>¡Ocurrió un error!</h1>
                        <p>No pudimos procesar tu pago.</p>
                        <p>Por favor, intenta nuevamente o utiliza otro método de pago.</p>
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