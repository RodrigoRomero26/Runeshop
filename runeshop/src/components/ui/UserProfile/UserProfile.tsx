import React, { useEffect, useState } from "react";
import styles from "./UserProfile.module.css";
import { DirectionModal } from "../DirectionModal/DirectionModal";
import { useUser } from "../../../hooks/useUser";
import Swal from "sweetalert2";
import { UserSchema } from "../../Schemas/UserSchema";

type UserData = {
	id: number;
	nombreUsuario: string;
	contraseña: string;
	nombre: string;
	apellido: string;
	email: string;
	dni: number;
	tipoUsuario: "USER" | "ADMIN";
};

export const UserProfile = () => {
	const [directionModalOpen, setDirectionModalOpen] = useState(false);
	const { user, updateUserData, getUser, deleteDirection } = useUser();
	const initialState: UserData = {
		id: 0,
		nombreUsuario: "",
		contraseña: "",
		nombre: "",
		apellido: "",
		email: "",
		dni: 0,
		tipoUsuario: "USER",
	};

	const [userData, setUserData] = useState<UserData>(initialState);
	const [errors, setErrors] = useState<Record<string, string>>({});

	useEffect(() => {
		const userId = localStorage.getItem("userId");
		if (userId) {
			getUser(Number(userId));
		}
	}, []);

	useEffect(() => {
		if (user) {
			setUserData({
				id: user.id,
				nombreUsuario: user.nombreUsuario || "",
				contraseña: user.contraseña || "",
				nombre: user.nombre || "",
				apellido: user.apellido || "",
				email: user.email || "",
				dni: user.dni,
				tipoUsuario: "USER",
			});
		}
	}, [user]);

	const handleCloseDirectionModal = () => {
		setDirectionModalOpen(false);
	};

	const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		setUserData((prev) => ({ ...prev, [name]: value }));

		try {
			await UserSchema.validateAt(name, { ...userData, [name]: value });
			setErrors((prev) => {
				const newErrors = { ...prev };
				delete newErrors[name];
				return newErrors;
			});
		} catch (err: any) {
			setErrors((prev) => ({ ...prev, [name]: err.message }));
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			await UserSchema.validate(userData, { abortEarly: false });
			const response = await updateUserData(userData);
			if (response && response.error) {
				Swal.fire({
					title: "Error",
					text: response.error || "Hubo un problema al actualizar tus datos.",
					icon: "error",
					showConfirmButton: true,
				});
			} else if (response) {
				Swal.fire({
					title: "¡Datos actualizados!",
					text: "Tu información fue guardada correctamente.",
					icon: "success",
					showConfirmButton: true,
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

	const handleDeleteDirection = (direccionId: number) => {
		Swal.fire({
			title: "¿Estás seguro?",
			text: "Esta acción desactivará la dirección.",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#d33",
			cancelButtonColor: "#3085d6",
			confirmButtonText: "Sí, eliminar",
			cancelButtonText: "Cancelar",
		}).then((result) => {
			if (result.isConfirmed) {
				deleteDirection(direccionId);
				Swal.fire(
					"Eliminada",
					"La dirección fue desactivada correctamente.",
					"success"
				);
			}
		});
	};

	const isFormValid = () => {
		const hasErrors = Object.keys(errors).length > 0;
		const hasEmptyFields = Object.values(userData).some((value) => {
			if (typeof value === "string") return value.trim() === "";
			if (typeof value === "number") return isNaN(value);
			return value == null; 
		});

		return !hasErrors && !hasEmptyFields;
	};

	useEffect(() => {
		isFormValid();
	}, [userData]);

	return (
		<div className={styles.principalContainerUserProfile}>
			<div className={styles.dataContainerUserProfile}>
				<div className={styles.userDataForm}>
					<div className={styles.userIconForm}>
						<span className="material-symbols-outlined">account_circle</span>
					</div>
					<div className={styles.userDataFormInputs}>
						<div className={styles.userDataField}>
							<label>Nombre de usuario</label>
							<p className={styles.readOnlyText}>{userData.nombreUsuario}</p>
						</div>
						<div className={styles.inputContainer}>
							<input
								type="text"
								name="nombre"
								onChange={handleInputChange}
								value={userData.nombre}
								placeholder="Nombre"
							/>
							{errors.nombre && <p className={styles.error}>{errors.nombre}</p>}
						</div>
						<div className={styles.inputContainer}>
							<input
								type="text"
								name="apellido"
								onChange={handleInputChange}
								value={userData.apellido}
								placeholder="Apellido"
							/>
							{errors.apellido && (
								<p className={styles.error}>{errors.apellido}</p>
							)}
						</div>
						<div className={styles.inputContainer}>
							<input
								type="text"
								name="email"
								onChange={handleInputChange}
								value={userData.email}
								placeholder="Correo electrónico"
							/>
							{errors.email && <p className={styles.error}>{errors.email}</p>}
						</div>
						<div className={styles.inputContainer}>
							<input
								type="number"
								name="dni"
								onChange={handleInputChange}
								value={userData.dni}
								placeholder="DNI"
							/>
							{errors.dni && <p className={styles.error}>{errors.dni}</p>}
						</div>
					</div>
					<div className={styles.button}>
						<button
							disabled={!isFormValid()}
							onClick={handleSubmit}
							className={styles.button}>
							Guardar cambios
						</button>
					</div>
				</div>
				<div className={styles.userAdressesForm}>
					<h2>Direcciones registradas</h2>
					<div className={styles.userAdressesInformation}>
						{user?.usuariosDirecciones?.filter((d) => d.direccion.estado)
							?.length ? (
							user.usuariosDirecciones
								.filter((d) => d.direccion.estado)
								.map((direccion) => (
									<div
										className={styles.userAdresses}
										key={direccion.direccion.id}>
										<p>{`${direccion.direccion.direccion} - ${direccion.direccion.departamento} - ${direccion.direccion.provincia}`}</p>
										<div className={styles.userAdressesButtons}>
											<button className={styles.userAdressesEditButton}>
												<span className="material-symbols-outlined">edit</span>
											</button>
											<button
												onClick={() => handleDeleteDirection(direccion.id!)}
												className={styles.userAdressesDeleteButton}>
												<span className="material-symbols-outlined">
													delete
												</span>
											</button>
										</div>
									</div>
								))
						) : (
							<p className={styles.noDirections}>
								No hay direcciones registradas.
							</p>
						)}
					</div>
					<div className={styles.button}>
						<button onClick={() => setDirectionModalOpen(true)}>
							{" "}
							Agregar dirección
						</button>
					</div>
				</div>
			</div>
			{directionModalOpen && (
				<DirectionModal onCloseDirectionModal={handleCloseDirectionModal} />
			)}
		</div>
	);
};
