import { userStore } from "../store/userStore";
import type { IUsuarioDto } from "../types/DTOs/IUsuarioDto";
import { getUsuario, updateUsuario } from "../controllers/UsuarioController";
import Swal from "sweetalert2";
import { useShallow } from "zustand/shallow";
import type { IDireccion } from "../types/IDireccion";
import { agregarDireccionController, eliminarDireccionController } from "../controllers/UsuarioDireccionesController";
import type { IDireccionDto } from "../types/DTOs/IDireccionDto";

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

	const addDirection = async (direccion: IDireccionDto) => {
		if (!user) {
			console.error("No hay usuario autenticado");
			return;
		}

		try {
			await agregarDireccionController(user.id, direccion);
			getUser(user.id);
			Swal.fire({
				title: "Dirección agregada",
				text: "La dirección se ha agregado correctamente.",
				icon: "success",
				confirmButtonText: "Ok",
			});
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
	};
	
	const deleteDirection = async (direccionId: number) => {
		if (!user) {
			console.error("No hay usuario autenticado");
			return;
		}
		try{
			await eliminarDireccionController(direccionId);
			getUser(user.id);
			Swal.fire({
				title: "Dirección eliminada",
				text: "La dirección se ha eliminado correctamente.",
				icon: "success",
				confirmButtonText: "Ok",
			});
		} catch (error) {
			console.error("Error al eliminar dirección:", error);
			Swal.fire({
				title: "Error",
				text: "Hubo un problema al eliminar la dirección.",
				icon: "error",
				confirmButtonText: "Ok",
			});
			return null;
		}
	}

	return {
		user,
		getUser,
		updateUserData,
		addDirection,
		deleteDirection,
	};
};
