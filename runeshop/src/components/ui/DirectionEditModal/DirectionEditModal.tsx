import React, {
	useEffect,
	useState,
	type ChangeEvent,
	type FC,
	type FormEvent,
} from "react";
import styles from "./DirectionEditModal.module.css";
import {
	fetchDepartamentos,
	fetchProvincias,
} from "../../../controllers/UbicacionesControler";
import Swal from "sweetalert2";
import { DirectionModalSchema } from "../../Schemas/DirectionModalSchema";
import { useUser } from "../../../hooks/useUser";
import type { IDireccion } from "../../../types/IDireccion";

interface directionModalProps {
	onCloseDirectionEditModal: () => void;
    addressToEdit?: IDireccion
}
type DirectionFormData = {
    id: number;
    pais: string;
    provincia: string;
    departamento: string;
    codigoPostal: string;
    direccion: string;
    numero: number;
};


export const DirectionEditModal: FC<directionModalProps> = ({
	onCloseDirectionEditModal,
    addressToEdit
}) => {
	const [provincias, setProvincias] = useState<string[]>([]);
	const [departamentos, setDepartamentos] = useState<string[]>([]);
	const { editDirection} = useUser();

    useEffect(() => {
		const loadProvincias = async () => {
			const data = await fetchProvincias();
			setProvincias(data);
		};
		loadProvincias();
	}, []);


	const [errors, setErrors] = useState<Record<string, string>>({});

	function splitDireccion(direccionCompleta: string = "") {
    const lastSpace = direccionCompleta.trim().lastIndexOf(" ");
    if (lastSpace === -1) return { calle: direccionCompleta, numero: "" };
    return {
        calle: direccionCompleta.slice(0, lastSpace),
        numero: direccionCompleta.slice(lastSpace + 1)
    };
}
const { calle, numero } = splitDireccion(addressToEdit?.direccion);
const [formData, setFormData] = useState({
        id: addressToEdit?.id!,
        estado: addressToEdit?.estado!,
		pais: "Argentina",
		provincia: addressToEdit?.provincia || "",
        departamento: addressToEdit?.departamento || "",
        codigoPostal: addressToEdit?.codigoPostal || "",
        direccion: calle || "",
        numero: numero || "",

		
	});
const [prevProvincia, setPrevProvincia] = useState(addressToEdit?.provincia || "");

useEffect(() => {
    const loadDepartamentos = async () => {
        if (formData.provincia) {
            const data = await fetchDepartamentos(formData.provincia);
            setDepartamentos(data);
        } else {
            setDepartamentos([]);
        }
    };
    loadDepartamentos();

    if (prevProvincia !== formData.provincia) {
        setFormData((prev) => ({ ...prev, departamento: "" }));
        setErrors((prev) => {
            const newErrors = { ...prev };
            delete newErrors.departamento;
            return newErrors;
        });
        setPrevProvincia(formData.provincia);
    }
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
            id: formData.id,
            estado: formData.estado,
			pais: formData.pais,
			provincia: formData.provincia,
			departamento: formData.departamento,
			codigoPostal: formData.codigoPostal,
			direccion: direccionCompleta,
		};

		try {
			await DirectionModalSchema.validate(formData, { abortEarly: false });
			editDirection(formDataApi);
			console.log("Datos enviados:", formDataApi);
			Swal.fire({
				title: "Dirección editada",
				text: `Dirección editada correctamente`,
				icon: "success",
			});
			onCloseDirectionEditModal();
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
						<h1>Editar dirección</h1>
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
								className={styles.submitbtn}
								type="submit"
								disabled={!isFormValid()}>
								Guardar
							</button>
							<button type="button" onClick={onCloseDirectionEditModal}>
								Cancelar
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};
