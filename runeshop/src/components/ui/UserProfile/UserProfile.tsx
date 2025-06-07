import React, { useEffect, useState } from "react";
import styles from "./UserProfile.module.css";
import { DirectionModal } from "../DirectionModal/DirectionModal";
import { useUser } from "../../../hooks/useUser";
import Swal from "sweetalert2";

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
	const { user, updateUserData } = useUser();
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

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setUserData((prev) => ({ ...prev, [`${name}`]: value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
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
	};

	return (
		<div className={styles.principalContainerUserProfile}>
			<div className={styles.dataContainerUserProfile}>
				<div className={styles.userDataForm}>
					<div className={styles.userIconForm}>
						<span className="material-symbols-outlined">account_circle</span>
					</div>
					<div className={styles.userDataFormInputs}>
						<input
							type="text"
							name="nombreUsuario"
							onChange={handleInputChange}
							value={userData.nombreUsuario}
							placeholder="Nombre de usuario"
						/>
						<input
							type="text"
							name="nombre"
							onChange={handleInputChange}
							value={userData.nombre}
							placeholder="Nombre"
						/>
						<input
							type="text"
							name="apellido"
							onChange={handleInputChange}
							value={userData.apellido}
							placeholder="Apellido"
						/>
						<input
							type="text"
							name="email"
							onChange={handleInputChange}
							value={userData.email}
							placeholder="Correo electrónico"
						/>
						<input
							type="number"
							name="dni"
							onChange={handleInputChange}
							value={userData.dni!}
							placeholder="DNI"
						/>
					</div>
					<div className={styles.button}>
						<button onClick={handleSubmit} className={styles.button}>
							Guardar cambios
						</button>
					</div>
				</div>
				<div className={styles.userAdressesForm}>
					<h2>Direcciones registradas</h2>
					<div className={styles.userAdressesInformation}>
						{user?.usuariosDirecciones?.length ? (
							user?.usuariosDirecciones.map((direccion) => (
								<div className={styles.userAdresses}>
									<p>{`${direccion.direccion.direccion} - ${direccion.direccion.departamento} - ${direccion.direccion.provincia}`}</p>
									<div className={styles.userAdressesButtons}>
										<button className={styles.userAdressesEditButton}>
											<span className="material-symbols-outlined">edit</span>
										</button>
										<button className={styles.userAdressesDeleteButton}>
											<span className="material-symbols-outlined">delete</span>
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

