import { create } from "zustand";
import type { IUsuarioGet } from "../types/IUsuarioGet";
import type { IUsuarioDto } from "../types/DTOs/IUsuarioDto";
import type { IProductoGet } from "../types/IProductoGet";

export interface IProductoCarrito extends IProductoGet {
    cantidad: number;
}

interface IUserStore {
	user: IUsuarioGet | null;
	setUser: (usuario: IUsuarioGet) => void;
	userID: number | null;
	setUserID: (id: number) => void;
	updateUser: (updateduser: IUsuarioDto) => void;
	usercart: IProductoCarrito[] | null;
	setUserCart: (product: IProductoGet, cantidad: number) => void;
	incrementProductQuantity: (productId: number) => void;
	decrementProductQuantity: (productId: number) => void;
	removeFromCart: (productId: number) => void;
}

export const userStore = create<IUserStore>((set) => ({
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
	setUserCart: (product, cantidad) =>
		set((state) => {
			const currentCart = state.usercart ?? [];
			const index = currentCart.findIndex((p) => p.id === product.id);
			if (index !== -1) {
				const updatedCart = [...currentCart];
				updatedCart[index].cantidad += cantidad;
				return { usercart: updatedCart };
			}
			return { usercart: [...currentCart, { ...product, cantidad }] };
		}),
	incrementProductQuantity: (productId) =>
		set((state) => {
			const currentCart = state.usercart ?? [];
			const updatedCart = currentCart.map((p) =>
				p.id === productId ? { ...p, cantidad: p.cantidad + 1 } : p
			);
			return { usercart: updatedCart };
		}),
	decrementProductQuantity: (productId) =>
		set((state) => {
			const currentCart = state.usercart ?? [];
			const updatedCart = currentCart
				.map((p) =>
					p.id === productId ? { ...p, cantidad: p.cantidad - 1 } : p
				)
				.filter((p) => p.cantidad > 0); // Elimina si la cantidad llega a 0
			return { usercart: updatedCart };
		}),
	removeFromCart: (productId) =>
		set((state) => {
			const currentCart = state.usercart ?? [];
			const updatedCart = currentCart.filter((p) => p.id !== productId);
			return { usercart: updatedCart };
		}),
}));
