import { getMercadoPagoLinkController } from "../../../controllers/MercadoPagoController";
import { useUser } from "../../../hooks/useUser";
import { CartModalCards } from "../CartModalCards/CartModalCards";
import styles from "./CartScreenComponents.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const CartScreenComponents = () => {
    const { usercart, user } = useUser();
    const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
    const navigate = useNavigate();

    const total = usercart && usercart.length > 0
        ? usercart.reduce(
            (sum, detalle) =>
                sum +
                ((detalle.precio_descuento ?? detalle.precio.precioVenta) * detalle.cantidad),
            0
        )
        : 0;

    const direcciones = user?.usuariosDirecciones?.filter((d) => d.direccion.estado) ?? [];

    useEffect(() => {
        if (direcciones.length > 0 && selectedAddressId === null) {
            const id = direcciones[0]?.direccion?.id;
            setSelectedAddressId(typeof id === "number" ? id : null);
        }
    }, [direcciones, selectedAddressId]);

    const handlePagar = async () => {
        if (!selectedAddressId || !usercart || usercart.length === 0) return;
        try {
            // Por cada detalle, agrega su id tantas veces como su cantidad
            const detallesId = usercart.flatMap(detalle =>
                Array(detalle.cantidad).fill(Number(detalle.id))
            );
            const link = await getMercadoPagoLinkController(selectedAddressId, detallesId);
            if (link) {
                window.location.href = link; 
            } else {
                alert("No se pudo obtener el link de pago.");
            }
        } catch (err) {
            alert("Error al iniciar el pago con Mercado Pago");
        }
    };

    if (!user) {
        return (
            <div className={styles.principalContainerCartScreenComponents}>
                <div className={styles.dataContainerCartScreenComponents}>
                    <div className={styles.cartSideContainer}>
                        <h2>Carrito</h2>
                        <div className={styles.warningMessage}>
                            Debes iniciar sesión para completar la compra.
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (direcciones.length === 0) {
        return (
            <div className={styles.principalContainerCartScreenComponents}>
                <div className={styles.dataContainerCartScreenComponents}>
                    <div className={styles.cartSideContainer}>
                        <h2>Carrito</h2>
                        <div className={styles.warningMessage}>
                            Debes registrar al menos una dirección antes de completar el pago.
                        </div>
                        <button
                            className={styles.summarySideContainerButton}
                            onClick={() => navigate("/userProfile")}
                        >
                            Ir a mi perfil
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.principalContainerCartScreenComponents}>
            <div className={styles.dataContainerCartScreenComponents}>
                <div className={styles.cartSideContainer}>
                    <div className={styles.cartSideContainerTitle}>
                        <h2>Carrito</h2>
                    </div>
                    <div className={styles.cartSideContainerCards}>
                        {usercart && usercart.length > 0 ? (
                            usercart.map((detalle) => (
                                <CartModalCards key={detalle.id} detalle={detalle} />
                            ))
                        ) : (
                            <p className={styles.emptyCart}>El carrito está vacío</p>
                        )}
                    </div>
                </div>
                <div className={styles.summarySideContainer}>
                    <div className={styles.summarySideContainerTitle}>
                        <h2>Resumen</h2>
                    </div>
                    <div className={styles.summarySideTableContainer}>
                        <table className={styles.summarySideTable}>
                            <tbody>
                                <tr>
                                    <td>Productos ({usercart ? usercart.length : 0})</td>
                                    <td>${total.toLocaleString("es-AR")}</td>
                                </tr>
                                <tr>
                                    <td>Entrega</td>
                                    <td>$0</td>
                                </tr>
                                <tr>
                                    <td><b>Total</b></td>
                                    <td><b>${total.toLocaleString("es-AR")}</b></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className={styles.addressSelectorContainer}>
                        <label htmlFor="addressSelect">Dirección de entrega:</label>
                        <select
                            id="addressSelect"
                            value={selectedAddressId ?? ""}
                            onChange={e => {
                                const value = e.target.value;
                                setSelectedAddressId(value === "" ? null : Number(value));
                            }}
                            className={styles.addressSelect}
                        >
                            {direcciones.map((dir) => (
                                <option key={dir.id} value={dir.id}>
                                    {dir.direccion.direccion} - {dir.direccion.departamento} - {dir.direccion.provincia}
                                </option>
                            ))}
                        </select>
                        <button
                            className={styles.summarySideContainerButton}
                            disabled={!usercart || usercart.length === 0 || !selectedAddressId}
                            onClick={handlePagar}
                        >
                            Ir a pagar
                        </button>
                    </div>
                    
                </div>
            </div>
        </div>
    );
};
