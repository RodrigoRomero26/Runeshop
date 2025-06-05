import { useShallow } from "zustand/shallow";
import { userStore } from "../store/userStore";
import type { IUsuarioDto } from "../types/DTOs/IUsuarioDto";
import { updateUsuario } from "../controllers/UsuarioController";
import Swal from "sweetalert2";
import type { IUsuarioGet } from "../types/IUsuarioGet";

export const useUser = () => {
	const { user, updateUser } = userStore((state) => ({
		user: state.user,
		updateUser: state.updateUser,
	}));

	const updateUserData = async (updatedUserData: IUsuarioDto) => {
		if (user) {
			updateUser(updatedUserData);
			try {
				const response = await updateUsuario(updatedUserData);
				return response;
			} catch (error) {
				updateUser(user);
				console.error("Error updating user:", error);
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

	return {
		user,
		updateUserData,
	};
};
