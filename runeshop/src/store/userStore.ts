import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { IUsuarioGet } from "../types/IUsuarioGet";
import type { IUsuarioDto } from "../types/DTOs/IUsuarioDto";
import type { IProductoGet } from "../types/IProductoGet";
import type { IDetalle } from "../types/IDetalle";

export interface IProductoCarrito extends IProductoGet {
    cantidad: number;
}

export interface IDetalleCarrito extends IDetalle {
    cantidad: number;
}

interface IUserStore {
	user: IUsuarioGet | null;
	setUser: (usuario: IUsuarioGet) => void;
	userID: number | null;
	setUserID: (id: number) => void;
	updateUser: (updateduser: IUsuarioDto) => void;
	usercart: IDetalleCarrito[] | null;
	setUserCart: (detalle: IDetalle, cantidad: number) => void;
	incrementProductQuantity: (detalleId: number) => void;
	decrementProductQuantity: (detalleId: number) => void;
	removeFromCart: (detalleId: number) => void;
	clearCart: () => void;
}

export const userStore = create<IUserStore>()(
    persist(
        (set, get) => ({
            user: null,
            setUser: (usuario) => set(() => ({ user: usuario })),
            userID: null,
            setUserID: (id) => set(() => ({ userID: id })),
            updateUser: (updateduser) =>
		set((state) => {
			if (!state.user) return { user: null };

			const isEqual = Object.keys(updateduser).every(
				(key) => (state.user as any)[key] === (updateduser as any)[key]
			);

			if (isEqual) {
				return {};
			}

			return {
				user: { ...state.user, ...updateduser, id: state.user.id },
			};
		}),
	usercart: null,
	setUserCart: (detalle, cantidad) =>
		set((state) => {
			const currentCart = state.usercart ?? [];
			const index = currentCart.findIndex((d) => d.id === detalle.id);
			if (index !== -1) {
				const updatedCart = [...currentCart];
				const cantidadActual = updatedCart[index].cantidad;
				const nuevaCantidad = cantidadActual + cantidad;
				if (nuevaCantidad > detalle.stock) {
					return { usercart: currentCart };
				}
				updatedCart[index].cantidad = nuevaCantidad;
				return { usercart: updatedCart };
			}
			if (cantidad > detalle.stock) {
				return { usercart: currentCart };
			}
			return { usercart: [...currentCart, { ...detalle, cantidad }] };
		}),
	incrementProductQuantity: (detalleId) =>
		set((state) => {
			const currentCart = state.usercart ?? [];
			const updatedCart = currentCart.map((d) => {
				if (d.id === detalleId) {
					if (d.cantidad < d.stock) {
						return { ...d, cantidad: d.cantidad + 1 };
					}
					return d;
				}
				return d;
			});
			return { usercart: updatedCart };
		}),
	decrementProductQuantity: (detalleId) =>
		set((state) => {
			const currentCart = state.usercart ?? [];
			const updatedCart = currentCart
				.map((d) =>
					d.id === detalleId ? { ...d, cantidad: d.cantidad - 1 } : d
				)
				.filter((d) => d.cantidad > 0);
			return { usercart: updatedCart };
		}),
	removeFromCart: (detalleId) =>
		set((state) => {
			const currentCart = state.usercart ?? [];
			const updatedCart = currentCart.filter((d) => d.id !== detalleId);
			return { usercart: updatedCart };
		}),
	clearCart: () => set({ usercart: null }),
        }),
        {
            name: "user-storage",
            partialize: (state) => ({
                usercart: state.usercart,
                user: state.user,
                userID: state.userID,
            }),
        }
    )
);
