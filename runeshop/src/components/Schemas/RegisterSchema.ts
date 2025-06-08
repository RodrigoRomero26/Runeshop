import * as Yup from "yup";

export const RegisterSchema = Yup.object().shape({
	nombreUsuario: Yup.string()
		.min(4, "El nombre de usuario debe tener al menos 4 caracteres")
		.required("El nombre de usuario es obligatorio"),
	nombre: Yup.string()
		.min(2, "El nombre debe tener al menos 2 caracteres")
		.required("El nombre es obligatorio"),
	apellido: Yup.string()
		.min(2, "El apellido debe tener al menos 2 caracteres")
		.required("El apellido es obligatorio"),
	email: Yup.string()
		.required("El correo es obligatorio")
		.matches(
			/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
			"El correo no es válido"
		),
	dni: Yup.string()
		.matches(/^\d+$/, "El DNI debe contener solo números")
		.min(7, "El DNI debe tener al menos 7 dígitos")
		.max(10, "El DNI no puede tener más de 10 dígitos")
		.required("El DNI es obligatorio"),
	contrasenia: Yup.string()
		.min(6, "La contraseña debe tener al menos 6 caracteres")
		.required("La contraseña es obligatoria"),
	confirmPassword: Yup.string()
		.oneOf([Yup.ref("contrasenia")], "Las contraseñas no coinciden")
		.required("Debes confirmar la contraseña"),
});
