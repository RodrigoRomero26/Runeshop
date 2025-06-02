import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
    nombreUsuario: Yup.string()
        .min(4, "El nombre de usuario debe tener al menos 4 caracteres")
        .required("El nombre de usuario es obligatorio"),
    contrasenia: Yup.string()
        .min(6, "La contraseña debe tener al menos 6 caracteres")
        .required("La contraseña es obligatoria"),
})