import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { IUsuarioGet } from "../types/IUsuarioGet";
import type { IUsuarioDto } from "../types/DTOs/IUsuarioDto";

interface IUserStore {
	user: IUsuarioGet | null;
	setUser: (usuario: IUsuarioGet) => void;
	userID: number | null;
	setUserID: (id: number) => void;
	updateUser: (updateduser: IUsuarioDto) => void;
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
		}),
		{
			name: "user-storage",
		}
	)
);
