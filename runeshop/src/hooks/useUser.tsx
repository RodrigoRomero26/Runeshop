import { userStore } from "../store/userStore";
import type { IUsuarioDto } from "../types/DTOs/IUsuarioDto";
import { getUsuario, updateUsuario } from "../controllers/UsuarioController";
import Swal from "sweetalert2";
import { useShallow } from "zustand/shallow";
import type { IDireccion } from "../types/IDireccion";

export const useUser = () => {
	const { user, updateUser, setUser } = userStore(
		useShallow((state) => ({
			user: state.user,
			updateUser: state.updateUser,
			setUser: state.setUser,
		}))
	);

	const getUser = async (userId: number) => {
		if (!userId) return null;

		try {
			const response = await getUsuario(userId);
			if (response?.usuario) {
				setUser(response.usuario);
				return response.usuario;
			} else {
				console.error("No se encontró el usuario");
				return null;
			}
		} catch (error) {
			console.error("Error al obtener el usuario:", error);
			return null;
		}
	};

	const updateUserData = async (updatedUserData: IUsuarioDto) => {
		if (user) {
			const previous = { ...user };
			updateUser(updatedUserData);

			try {
				const response = await updateUsuario(updatedUserData);
				return response;
			} catch (error) {
				updateUser(previous);
				console.error("Error actualizando el usuario:", error);
				Swal.fire({
					title: "Error",
					text: "Hubo un problema al actualizar tus datos.",
					icon: "error",
					confirmButtonText: "Ok",
				});
				return null;
			}
		}
	};

	// A COMPLETAR: Función para agregar una dirección al usuario
	const addDirection = async (direccion: IDireccion) => {
		if (!user) {
			console.error("No hay usuario autenticado");
			return;
		}
		const updatedUser = { ...user, usuariosDirecciones: [...user.usuariosDirecciones, { direccion, estado: true }] };
		
		
		try {
			
			return updatedUser;
		} catch (error) {
			console.error("Error al agregar dirección:", error);
			Swal.fire({
				title: "Error",
				text: "Hubo un problema al agregar la dirección.",
				icon: "error",
				confirmButtonText: "Ok",
			});
			return null;
		}
	}

	// ✅ Retorno final fuera de cualquier condición
	return {
		user,
		getUser,
		updateUserData,
	};
};
