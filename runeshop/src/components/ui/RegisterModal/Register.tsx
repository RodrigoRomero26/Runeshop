import {
	useEffect,
	useState,
	type ChangeEvent,
	type FC,
	type FormEvent,
} from "react";
import styles from "./Register.module.css";
import { RegisterSchema } from "../../Schemas/RegisterSchema";
import { registerController } from "../../../controllers/AuthController";
import Swal from "sweetalert2";

interface registerProps {
	onCloseRegister: () => void;
}

export const Register: FC<registerProps> = ({ onCloseRegister }) => {
	const [formData, setFormData] = useState({
		nombreUsuario: "",
		nombre: "",
		apellido: "",
		email: "",
		dni: "",
		contrasenia: "",
	});

	const [errors, setErrors] = useState<Record<string, string>>({});

	const handleChange = async (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [`${name}`]: value }));

		try {
			await RegisterSchema.validateAt(name, { ...formData, [name]: value });
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

		try {
			await RegisterSchema.validate(formData, { abortEarly: false });
			const { user, error } = await registerController(formData);

			if (error) {
				Swal.fire({
					title: "Registro Erroneo",
					text: `Error: ${error}`,
					icon: "error",
				});
			} else if (user) {
				Swal.fire({
					title: "Registro Exitoso",
					text: `Usuario ${formData.nombreUsuario} registrado correctamente`,
					icon: "success",
				});
				onCloseRegister();
			}
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
		const hasEmptyFields = Object.values(formData).some(
			(value) => value.trim() === ""
		);
		return !hasErrors && !hasEmptyFields;
	};

	useEffect(() => {
		isFormValid();
	}, [formData]);

	return (
		<div className={styles.overlay}>
			<div className={styles.principalContainerRegister}>
				<div className={styles.containerDataRegister}>
					<div className={styles.containerTitleRegister}>
						<span className="material-symbols-outlined">person</span>
						<h1>Registrar usuario</h1>
					</div>
					<form
						onSubmit={handleSubmit}
						className={styles.containerInputRegister}>
						<div className={styles.inputContainer}>
							<input
								onChange={handleChange}
								type="text"
								name="nombreUsuario"
								placeholder="Nombre de usuario"
								value={formData.nombreUsuario}
							/>
							{errors.nombreUsuario && (
								<p className={styles.error}>{errors.nombreUsuario}</p>
							)}
						</div>
						<div className={styles.inputContainer}>
							<input
								onChange={handleChange}
								type="text"
								name="nombre"
								placeholder="Nombre"
								value={formData.nombre}
							/>
							{errors.nombre && <p className={styles.error}>{errors.nombre}</p>}
						</div>
						<div className={styles.inputContainer}>
							<input
								onChange={handleChange}
								type="text"
								name="apellido"
								placeholder="Apellido"
								value={formData.apellido}
							/>
							{errors.apellido && (
								<p className={styles.error}>{errors.apellido}</p>
							)}
						</div>
						<div className={styles.inputContainer}>
							<input
								onChange={handleChange}
								type="text"
								name="email"
								placeholder="Correo electrónico"
								value={formData.email}
							/>
							{errors.email && <p className={styles.error}>{errors.email}</p>}
						</div>
						<div className={styles.inputContainer}>
							<input
								onChange={handleChange}
								type="number"
								name="dni"
								placeholder="DNI"
								value={formData.dni}
							/>
							{errors.dni && <p className={styles.error}>{errors.dni}</p>}
						</div>
						<div className={styles.inputContainer}>
							<input
								onChange={handleChange}
								type="password"
								name="contrasenia"
								placeholder="Contraseña"
								value={formData.contrasenia}
							/>
							{errors.contrasenia && (
								<p className={styles.error}>{errors.contrasenia}</p>
							)}
						</div>
						<div className={styles.inputContainer}>
							<input
								onChange={handleChange}
								type="password"
								name="confirmPassword"
								placeholder="Confirmar Contraseña"
							/>
							{errors.confirmPassword && (
								<p className={styles.error}>{errors.confirmPassword}</p>
							)}
						</div>
						<div className={styles.containerButtonRegister}>
							<button
								className={styles.submitbtn}
								type="submit"
								disabled={!isFormValid()}>
								Registrarse
							</button>
							<button type="button" onClick={onCloseRegister}>
								Cancelar
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};
