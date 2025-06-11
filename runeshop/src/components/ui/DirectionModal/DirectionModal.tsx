import React, {
	useEffect,
	useState,
	type ChangeEvent,
	type FC,
	type FormEvent,
} from "react";
import styles from "./DirectionModal.module.css";
import {
	fetchDepartamentos,
	fetchProvincias,
} from "../../../controllers/UbicacionesControler";
import Swal from "sweetalert2";
import { DirectionModalSchema } from "../../Schemas/DirectionModalSchema";
import { useUser } from "../../../hooks/useUser";

interface directionModalProps {
	onCloseDirectionModal: () => void;
}

export const DirectionModal: FC<directionModalProps> = ({
	onCloseDirectionModal,
}) => {
	const [provincias, setProvincias] = useState<string[]>([]);
	const [departamentos, setDepartamentos] = useState<string[]>([]);
	const {addDirection} = useUser();

	const [formData, setFormData] = useState({
		pais: "Argentina",
		provincia: "",
		departamento: "",
		codigoPostal: "",
		direccion: "",
		numero: "",
	});

	const [errors, setErrors] = useState<Record<string, string>>({});

	useEffect(() => {
		const loadProvincias = async () => {
			const data = await fetchProvincias();
			setProvincias(data);
		};
		loadProvincias();
	}, []);

	useEffect(() => {
		const loadDepartamentos = async () => {
			if (formData.provincia) {
				const data = await fetchDepartamentos(formData.provincia);
				setDepartamentos(data);
			} else {
				setDepartamentos([]);
			}
			setFormData((prev) => ({ ...prev, departamento: "" }));
			setErrors((prev) => {
				const newErrors = { ...prev };
				delete newErrors.departamento;
				return newErrors;
			});
		};
		loadDepartamentos();
	}, [formData.provincia]);

	const handleChange = async (
		e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));

		try {
			await DirectionModalSchema.validateAt(name, {
				...formData,
				[name]: value,
			});
			setErrors((prev) => {
				const newErrors = { ...prev };
				delete newErrors[name];
				return newErrors;
			});
		} catch (err: any) {
			setErrors((prev) => ({ ...prev, [name]: err.message }));
		}
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		const direccionCompleta = `${formData.direccion} ${formData.numero}`.trim();

		const formDataApi = {
			pais: formData.pais,
			provincia: formData.provincia,
			departamento: formData.departamento,
			codigoPostal: formData.codigoPostal,
			direccion: direccionCompleta,
		};

		try {
			await DirectionModalSchema.validate(formData, { abortEarly: false });
			addDirection(formDataApi);
			console.log("Datos enviados:", formDataApi);
			Swal.fire({
				title: "Dirección guardada",
				text: `Dirección registrada correctamente`,
				icon: "success",
			});
			onCloseDirectionModal();
		} catch (err: any) {
			const validationErrors: Record<string, string> = {};
			err.inner.forEach((error: any) => {
				validationErrors[error.path] = error.message;
			});
			setErrors(validationErrors);
		}
	};

	const isFormValid = () => {
		const hasErrors = Object.keys(errors).length > 0;
		const hasEmptyFields = Object.entries(formData).some(
			([_, value]) => value.toString().trim() === ""
		);
		return !hasErrors && !hasEmptyFields;
	};

	return (
		<div className={styles.overlay}>
			<div className={styles.principalContainerDirection}>
				<div className={styles.containerDataDirection}>
					<div className={styles.containerTitleDirection}>
						<span className="material-symbols-outlined">location_on</span>
						<h1>Registrar dirección</h1>
					</div>
					<form
						onSubmit={handleSubmit}
						className={styles.containerInputDirection}>
						<div className={styles.inputContainer}>
							<input
								type="text"
								name="pais"
								placeholder="País"
								value={formData.pais}
								readOnly
							/>
							{errors.pais && <p className={styles.error}>{errors.pais}</p>}
						</div>
						<div className={styles.inputContainer}>
							<select
								name="provincia"
								value={formData.provincia}
								onChange={handleChange}>
								<option value="">Seleccionar provincia</option>
								{provincias.map((prov) => (
									<option key={prov} value={prov}>
										{prov}
									</option>
								))}
							</select>
							{errors.provincia && (
								<p className={styles.error}>{errors.provincia}</p>
							)}
						</div>
						<div className={styles.inputContainer}>
							<select
								name="departamento"
								value={formData.departamento}
								onChange={handleChange}>
								<option value="">Seleccionar departamento</option>
								{departamentos.map((dep) => (
									<option key={dep} value={dep}>
										{dep}
									</option>
								))}
							</select>
							{errors.departamento && (
								<p className={styles.error}>{errors.departamento}</p>
							)}
						</div>
						<div className={styles.inputContainer}>
							<input
								type="number"
								name="codigoPostal"
								placeholder="Código Postal"
								value={formData.codigoPostal}
								onChange={handleChange}
							/>
							{errors.codigoPostal && (
								<p className={styles.error}>{errors.codigoPostal}</p>
							)}
						</div>
						<div className={styles.inputContainer}>
							<input
								type="text"
								name="direccion"
								placeholder="Calle"
								value={formData.direccion}
								onChange={handleChange}
							/>
							{errors.direccion && (
								<p className={styles.error}>{errors.direccion}</p>
							)}
						</div>
						<div className={styles.inputContainer}>
							<input
								type="number"
								name="numero"
								placeholder="Número"
								value={formData.numero}
								onChange={handleChange}
							/>
							{errors.numero && <p className={styles.error}>{errors.numero}</p>}
						</div>
						<div className={styles.containerButtonDirection}>
							<button
								onClick={() => console.log(formData)}
								className={styles.submitbtn}
								type="submit"
								disabled={!isFormValid()}>
								Guardar
							</button>
							<button type="button" onClick={onCloseDirectionModal}>
								Cancelar
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};
