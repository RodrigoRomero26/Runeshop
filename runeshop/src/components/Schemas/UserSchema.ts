import * as Yup from "yup";


export const UserSchema = Yup.object().shape({
    nombre: Yup.string()
        .min(2, "El nombre debe tener al menos 5 caracteres")
        .required("El nombre es obligatorio"),
    apellido: Yup.string()
        .min(2, "El apellido debe tener al menos 5 caracteres")
        .required("El apellido es obligatorio"),
    email: Yup.string()
        .required("El correo es obligatorio")
        .matches(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            "El correo no es válido"
        ),
    dni: Yup.number()
        .typeError("El DNI debe ser un número")
        .positive("El DNI debe ser un número positivo")
        .integer("El DNI debe ser un número entero")
        .min(1000000, "El DNI debe tener al menos 7 dígitos")
        .max(9999999999, "El DNI no puede tener más de 10 dígitos")
        .required("El DNI es obligatorio"),
})