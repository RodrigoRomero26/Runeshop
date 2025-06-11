
import { create } from "zustand";

interface IFiltersStore {
	genero: string[];
	tipoIndumentaria: string[];
	categorias: string[];
	marcas: string[];
	talles: number[];
	precioMin: number | "";
	precioMax: number | "";
	order: string;
	modelo: string;

	toggleGenero: (genero: string) => void;
	toggleTipoIndumentaria: (tipo: string) => void;
	toggleCategoria: (categoria: string) => void;
	toggleMarca: (marca: string) => void;
	toggleTalle: (talle: number) => void;
	setPrecioMin: (min: number | "") => void;
	setPrecioMax: (max: number | "") => void;
	resetFilters: () => void;
	setMarcaUnica: (marca: string) => void;
	setOrder: (order: string) => void;
	setModelo: (modelo: string) => void;
}

export const filtersStore = create<IFiltersStore>((set, get) => ({
	genero: [],
	tipoIndumentaria: [],
	categorias: [],
	marcas: [],
	talles: [],
	precioMin: "",
	precioMax: "",
	order: "",
	modelo: "",

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

	toggleCategoria: (categoria: string) =>
		set((state) => ({
			categorias: state.categorias.includes(categoria)
				? state.categorias.filter((c) => c !== categoria)
				: [...state.categorias, categoria],
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
	setMarcaUnica: (marca: string) =>
		set(() => ({
			marcas: [marca],
			genero: [],
			tipoIndumentaria: [],
			categorias: [],
			talles: [],
			precioMin: "",
			precioMax: "",
		})),
	setOrder: (order) => set(() => ({ order })),
	setModelo: (modelo) => set(() => ({ modelo })),
}));
