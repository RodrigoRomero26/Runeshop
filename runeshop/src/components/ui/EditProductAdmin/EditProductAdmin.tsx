import type { FC } from "react";
import { useState, useEffect } from "react";
import styles from "./EditProductAdmin.module.css";
import type { IProductoGet } from "../../../types/IProductoGet";
import type { ICategoria } from "../../../types/ICategoria";
import { getCategoriasController } from "../../../controllers/CategoriaController";
import { updateProductoController } from "../../../controllers/ProductoController";

const TIPOS_PRODUCTO = ["ZAPATILLA", "REMERA", "CAMPERA", "BOTIN", "PANTALON"];

const SEXOS = ["HOMBRE", "MUJER"];

interface EditProductAdminProps {
	producto: IProductoGet;
	onCloseEditProductAdmin: () => void;
	onSuccess?: () => void;
}

export const EditProductAdmin: FC<EditProductAdminProps> = ({
	producto,
	onCloseEditProductAdmin,
	onSuccess,
}) => {
	const [nombre, setNombre] = useState(producto.modelo);
	const [tipoProducto, setTipoProducto] = useState(producto.tipoProducto);
	const [sexo, setSexo] = useState(producto.sexo);
	const [categoria, setCategoria] = useState<ICategoria>(producto.categoria);
	const [categoriasDisponibles, setCategoriasDisponibles] = useState<
		ICategoria[]
	>([]);
	const [estado, setEstado] = useState(producto.estado);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState(false);

	useEffect(() => {
		const fetchCategorias = async () => {
			try {
				const cats = await getCategoriasController();
				setCategoriasDisponibles(cats || []);
			} catch {
				setCategoriasDisponibles([]);
			}
		};
		fetchCategorias();
	}, []);

	const handleCategoriaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedId = Number(e.target.value);
		const selectedCategoria = categoriasDisponibles.find(
			(cat) => cat.id === selectedId
		);
		if (selectedCategoria) setCategoria(selectedCategoria);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError(null);
		setSuccess(false);
		try {
			await updateProductoController({
				id: producto.id,
				modelo: nombre,
				tipoProducto,
				sexo,
				categoria,
				estado,
			});
			setSuccess(true);
			if (onSuccess) onSuccess();
			setTimeout(() => {
				onCloseEditProductAdmin();
			}, 1000);
		} catch (err) {
			setError("Error al actualizar el producto.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className={styles.overlay}>
			<div className={styles.principalContainerEditProductAdmin}>
				<form
					className={styles.containerDataEditProductAdmin}
					onSubmit={handleSubmit}>
					<div className={styles.containerTitleEditProductAdmin}>
						<h1>Editar producto</h1>
					</div>
					<div className={styles.containerInputEditProductAdmin}>
						<input
							type="text"
							name="Name"
							placeholder="Nombre"
							value={nombre}
							onChange={(e) => setNombre(e.target.value)}
							disabled={loading}
						/>
						<select
							name="Sexo"
							value={sexo}
							onChange={(e) => setSexo(e.target.value)}
							disabled={loading}>
							<option disabled value="">
								Sexo
							</option>
							{SEXOS.map((sex) => (
								<option key={sex} value={sex}>
									{sex}
								</option>
							))}
						</select>
						<select
							name="Type"
							value={tipoProducto}
							onChange={(e) => setTipoProducto(e.target.value)}
							disabled={loading}>
							<option disabled value="">
								Tipo de producto
							</option>
							{TIPOS_PRODUCTO.map((tipo) => (
								<option key={tipo} value={tipo}>
									{tipo}
								</option>
							))}
						</select>
						<select
							name="Category"
							value={categoria.id}
							onChange={handleCategoriaChange}
							disabled={loading}>
							<option disabled value="">
								Categoría
							</option>
							{categoriasDisponibles.map((cat) => (
								<option key={cat.id} value={cat.id}>
									{cat.nombre}
								</option>
							))}
						</select>
					</div>
					<div className={styles.containerCheckboxEditProductAdmin}>
						<label className={styles.checkboxLabel}>
							<input
								type="checkbox"
								name="available"
								id="habilitado"
								checked={estado}
								onChange={(e) => setEstado(e.target.checked)}
								disabled={loading}
							/>
							Habilitado
						</label>
					</div>
					{error && <div className={styles.errorMsg}>{error}</div>}
					{success && (
						<div className={styles.successMsg}>¡Producto actualizado!</div>
					)}
					<div className={styles.containerButtonEditProductAdmin}>
						<button type="submit" disabled={loading}>
							{loading ? "Guardando..." : "Guardar"}
						</button>
						<button
							type="button"
							onClick={onCloseEditProductAdmin}
							disabled={loading}>
							Cerrar
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
