import * as Yup from "yup";

export const DirectionModalSchema = Yup.object().shape({
	pais: Yup.string().required("El país es obligatorio").default("Argentina"),
	provincia: Yup.string().required("La provincia es obligatoria"),
	departamento: Yup.string().required("El departamento es obligatorio"),
	codigoPostal: Yup.number()
		.required("El código postal es obligatorio")
		.typeError("El código postal debe ser un número")
		.positive("El código postal debe ser un número positivo")
		.integer("El código postal debe ser un número entero"),
	direccion: Yup.string()
		.required("La dirección es obligatoria")
		.min(3, "La dirección debe tener al menos 3 caracteres"),
	numero: Yup.number()
		.transform((value, originalValue) =>
			originalValue === "" ? undefined : value
		)
		.required("El número es obligatorio")
		.typeError("El número debe ser un valor numérico"),
});
