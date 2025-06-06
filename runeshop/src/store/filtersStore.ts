// src/stores/filtersStore.ts
import { create } from "zustand";

interface IFiltersStore {
	genero: string[];
	tipoIndumentaria: string[];
	categorias: string[];
	marcas: string[];
	talles: number[];
	precioMin: number | "";
	precioMax: number | "";

	// Acciones
	toggleGenero: (genero: string) => void;
	toggleTipoIndumentaria: (tipo: string) => void;
	toggleCategoria: (categoria: string) => void;
	toggleMarca: (marca: string) => void;
	toggleTalle: (talle: number) => void;
	setPrecioMin: (min: number | "") => void;
	setPrecioMax: (max: number | "") => void;
	resetFilters: () => void;
}

export const filtersStore = create<IFiltersStore>((set, get) => ({
	genero: [],
	tipoIndumentaria: [],
	categorias: [],
	marcas: [],
	talles: [],
	precioMin: "",
	precioMax: "",

	toggleGenero: (g) =>
		set((state) => ({
			genero: state.genero.includes(g)
				? state.genero.filter((x) => x !== g)
				: [...state.genero, g],
		})),

	toggleTipoIndumentaria: (tipo) =>
		set((state) => ({
			tipoIndumentaria: state.tipoIndumentaria.includes(tipo)
				? state.tipoIndumentaria.filter((x) => x !== tipo)
				: [...state.tipoIndumentaria, tipo],
		})),

	toggleCategoria: (cat) =>
		set((state) => ({
			categorias: state.categorias.includes(cat)
				? state.categorias.filter((x) => x !== cat)
				: [...state.categorias, cat],
		})),

	toggleMarca: (marca) =>
		set((state) => ({
			marcas: state.marcas.includes(marca)
				? state.marcas.filter((x) => x !== marca)
				: [...state.marcas, marca],
		})),

	toggleTalle: (t) =>
		set((state) => ({
			talles: state.talles.includes(t)
				? state.talles.filter((x) => x !== t)
				: [...state.talles, t],
		})),

	setPrecioMin: (min) => set(() => ({ precioMin: min })),
	setPrecioMax: (max) => set(() => ({ precioMax: max })),
	resetFilters: () =>
		set(() => ({
			genero: [],
			tipoIndumentaria: [],
			categorias: [],
			marcas: [],
			talles: [],
			precioMin: "",
			precioMax: "",
		})),
}));
