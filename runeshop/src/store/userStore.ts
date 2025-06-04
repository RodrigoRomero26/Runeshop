
import { create } from "zustand";
import type { IUsuarioGet } from "../types/IUsuarioGet";

interface IUserStore{
    user: IUsuarioGet | null
    setUser: (usuario: IUsuarioGet) => void
    userID: number | null
    setUserID: (id: number) => void
}

export const userStore = create<IUserStore>((set) => ({
    user: null,
    setUser: (usuario) => set(() => ({ user: usuario })),
    userID: null,
    setUserID: (id) => set(() => ({ userID: id })),
}))