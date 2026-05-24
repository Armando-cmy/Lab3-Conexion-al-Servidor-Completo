import { peliculaServices } from "../service/pelicula-service.js";
import { peliculaServices } from "../service/productos-service.js";

const obtenerInformacion = async () => {

    const url = new URL(window.location);

    const id = url.searchParams.get("id");
    const inputNombre = document.querySelector("[data-nombre]");
    const inputPrecio = document.querySelector("[data-precio]");
    const inputDescripcion = document.querySelector("[data-descripcion]");

    try {
        const pelicula = await peliculaServices.Pelicula(id);
        inputNombre.value = pelicula.nombre;
        inputPrecio.value = pelicula.precio;
        inputDescripcion.value = pelicula.descripcion;

    } catch (error) {

        console.log(error);

        alert("Ocurrió un error al cargar la pelicula");

    }

};

obtenerInformacion();
const formulario = document.querySelector("[data-form]");

formulario.addEventListener("submit", async (event) => {

    event.preventDefault();

    const url = new URL(window.location);
    const id = url.searchParams.get("id");
    const nombre = document.querySelector("[data-nombre]").value;
    const precio = document.querySelector("[data-precio]").value;
    const descripcion = document.querySelector("[data-descripcion]").value;

    try {
        await peliculaServices.actualizarPelicula(
            id,
            nombre,
            precio,
            descripcion
        );

        alert("Pelicula actualizada correctamente");
        window.location.href = "../screens/lista_pelicula.html";

    } catch (error) {

        console.log(error);

        alert("Ocurrió un error al actualizar la pelicula");

    }

});