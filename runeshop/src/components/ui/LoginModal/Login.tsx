import {
	useEffect,
	useState,
	type ChangeEvent,
	type FC,
	type FormEvent,
} from "react";
import styles from "./Login.module.css";
import { Register } from "../RegisterModal/Register";
import { useNavigate } from "react-router";
import { LoginSchema } from "../../Schemas/LoginSchema";
import { loginController } from "../../../controllers/AuthController";
import Swal from "sweetalert2";
import { userStore } from "../../../store/userStore";
import { getUsuario } from "../../../controllers/UsuarioController";
import { useUser } from "../../../hooks/useUser";

interface loginProps {
	onCloseLogin: () => void;
}

export const Login: FC<loginProps> = ({ onCloseLogin }) => {
	const [registerOpen, setRegisterOpen] = useState(false);
	const navigate = useNavigate();
	const setUserId = userStore((state) => state.setUserID);
	const setUser = userStore((state) => state.setUser);
	const user = userStore((state) => state.user);
	const { getUser } = useUser();

	const [formData, setFormData] = useState({
		nombreUsuario: "",
		contrasenia: "",
	});

	const [errors, setErrors] = useState<Record<string, string>>({});

	const handleChange = async (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [`${name}`]: value }));

		try {
			await LoginSchema.validateAt(name, { ...formData, [name]: value });
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
			await LoginSchema.validate(formData, { abortEarly: false });
			const response = await loginController(formData);
			if (response) {
				setUserId(response.id);
				const usuario = await getUser(response.id);
				setUser(usuario!); 
				if (usuario?.tipoUsuario === "ADMIN") {
					navigate("/admin");
				} else {
					navigate("/userProfile");
				}
			} else {
				Swal.fire({
					title: "Ingreso Erroneo",
					text: "Usuario o contraseña incorrectos",
					icon: "error",
				});
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

	const handleCloseRegister = () => {
		setRegisterOpen(false);
	};

	return (
		<div className={styles.overlay}>
			<div className={styles.principalContainerLogin}>
				<div className={styles.containerDataLogin}>
					<div className={styles.containerTitleLogin}>
						<span className="material-symbols-outlined">person</span>
						<h1>Iniciar Sesión</h1>
					</div>
					<div className={styles.containerInputLogin}>
						<div className={styles.inputContainer}>
							<input
								onChange={handleChange}
								type="text"
								name="nombreUsuario"
								placeholder="Nombre de usuario"
							/>
							{errors.nombreUsuario && (
								<p className={styles.error}>{errors.nombreUsuario}</p>
							)}
						</div>
						<div className={styles.inputContainer}>
							<input
								onChange={handleChange}
								type="password"
								name="contrasenia"
								placeholder="Contraseña"
							/>
							{errors.contrasenia && (
								<p className={styles.error}>{errors.contrasenia}</p>
							)}
						</div>
					</div>
					<div className={styles.containerButtonLogin}>
						<button
							className={styles.submitbtn}
							disabled={!isFormValid()}
							onClick={handleSubmit}>
							Acceder
						</button>
						<button className={styles.submitbtn} onClick={onCloseLogin}>
							Cancelar
						</button>
					</div>
					<div className={styles.containerRegisterLogin}>
						<p>
							¿No tienes cuenta?{" "}
							<button onClick={() => setRegisterOpen(true)}>Registrate</button>
						</p>
					</div>
				</div>

				{registerOpen && <Register onCloseRegister={handleCloseRegister} />}
			</div>
		</div>
	);
};
