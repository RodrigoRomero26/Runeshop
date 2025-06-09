import { useUser } from "../../../hooks/useUser";
import { CartModalCards } from "../CartModalCards/CartModalCards";
import styles from "./CartScreenComponents.module.css";
import { useEffect, useState } from "react";

export const CartScreenComponents = () => {
    const { usercart, user } = useUser();
    const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);

    // Sumar precios del carrito
    const total = usercart && usercart.length > 0
        ? usercart.reduce(
            (sum, detalle) =>
                sum +
                ((detalle.precio_descuento ?? detalle.precio.precioVenta) * detalle.cantidad),
            0
        )
        : 0;

    // Obtener direcciones del usuario (estructura anidada)
    const direcciones = user?.usuariosDirecciones?.filter((d) => d.direccion.estado) ?? [];

    useEffect(() => {
        if (direcciones.length > 0 && selectedAddressId === null) {
            const id = direcciones[0]?.direccion?.id;
            setSelectedAddressId(typeof id === "number" ? id : null);
        }
    }, [direcciones, selectedAddressId]);

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
                            {direcciones.length === 0 && (
                                <option value="">No tienes direcciones guardadas</option>
                            )}
                            {direcciones.map((dir) => (
                                <option key={dir.direccion.id} value={dir.direccion.id}>
                                    {dir.direccion.direccion} - {dir.direccion.departamento} - {dir.direccion.provincia}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button
                        className={styles.summarySideContainerButton}
                        disabled={!usercart || usercart.length === 0 || !selectedAddressId}
                    >
                        Ir a pagar
                    </button>
                </div>
            </div>
        </div>
    );
};
