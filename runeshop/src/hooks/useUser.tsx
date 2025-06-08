import { userStore } from "../store/userStore";
import type { IUsuarioDto } from "../types/DTOs/IUsuarioDto";
import { getUsuario, updateUsuario } from "../controllers/UsuarioController";
import Swal from "sweetalert2";
import { useShallow } from "zustand/shallow";
import type { IDireccion } from "../types/IDireccion";
import { agregarDireccionController, eliminarDireccionController } from "../controllers/UsuarioDireccionesController";
import type { IDireccionDto } from "../types/DTOs/IDireccionDto";
import type { IProductoGet } from "../types/IProductoGet";

export const useUser = () => {
	const {
		user,
		updateUser,
		setUser,
		usercart,
		setUserCart,
		incrementProductQuantity,
		decrementProductQuantity,
		removeFromCart,
	} = userStore(
		useShallow((state) => ({
			user: state.user,
			updateUser: state.updateUser,
			setUser: state.setUser,
			usercart: state.usercart,
			setUserCart: state.setUserCart,
			incrementProductQuantity: state.incrementProductQuantity,
			decrementProductQuantity: state.decrementProductQuantity,
			removeFromCart: state.removeFromCart,
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

	const addProductToCart = async (product: IProductoGet, cantidad: number) => {
		setUserCart(product, cantidad);
		Swal.fire({
			title: "Producto agregado",
			text: `Se agregaron ${cantidad} "${product.modelo}" al carrito.`,
			icon: "success",
			confirmButtonText: "Ok",
		});
	};

	const showAmount = (productId: number) => {
		const producto = usercart?.find((p) => p.id === productId);
		if (producto) {
			return producto.cantidad;
		}
		return 0;
	};

	const removeProductFromCart = async (productId: number, productName:string) => {
		const result = await Swal.fire({
			title: "¿Eliminar producto?",
			text: `¿Estás seguro de eliminar "${productName}" del carrito?`,
			icon: "warning",
			showCancelButton: true,
			confirmButtonText: "Sí, eliminar",
			cancelButtonText: "Cancelar",
		});
		if (result.isConfirmed) {
			removeFromCart(productId);
			Swal.fire({
				title: "Eliminado",
				text: `"${productName}" fue eliminado del carrito.`,
				icon: "success",
				confirmButtonText: "Ok",
			});
		}
	};

	const safeDecrementProductQuantity = (productId: number) => {
		const producto = usercart?.find((p) => p.id === productId);
		if (producto && producto.cantidad > 1) {
			decrementProductQuantity(productId);
		}
	};

	return {
		user,
		getUser,
		updateUserData,
		addDirection,
		deleteDirection,
		usercart,
		setUserCart,
		incrementProductQuantity,
		decrementProductQuantity: safeDecrementProductQuantity,
		removeFromCart,
		showAmount,
		addProductToCart,
		removeProductFromCart,
	};
};
