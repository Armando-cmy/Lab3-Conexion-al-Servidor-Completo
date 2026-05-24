const API_BASE_URL = 'http://127.0.0.1/api1/peliculas.php';

// LISTAR PELICULAS
const listarPeliculas = () => {
    return fetch(API_BASE_URL)
        .then(response => {
            if (!response.ok) throw new Error('Error al obtener peliculas');
            return response.json();
        });
};

// CREAR PELICULA
const crearPelicula = (nombre, edad, descripcion) => {
    return fetch(API_BASE_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nombre,
            edad,
            descripcion
        })
    })
    .then(response => {
        if (!response.ok) throw new Error('Error al crear pelicula');
        return response.json();
    });
};

// ELIMINAR PELICULA
const eliminarPelicula = (id) => {
    return fetch(`${API_BASE_URL}?id=${id}`, {
        method: "DELETE"
    })
    .then(response => {
        if (!response.ok) throw new Error('Error al eliminar pelicula');
        return response.json();
    });
};

// ACTUALIZAR PELICULA
const actualizarPelicula = (id, nombre) => {
    return fetch(API_BASE_URL, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id,
            nombre,
            
        })
    })
    .then(response => {
        if (!response.ok) throw new Error('Error al actualizar pelicula');
        return response.json();
    });
};

// OBTENER UNA PELICULA
const Pelicula = (id) => {
    return fetch(`${API_BASE_URL}?id=${id}`)
        .then(response => {
            if (!response.ok) throw new Error('Pelicula no encontrada');
            return response.json();
        });
};

// EXPORTAR FUNCIONES
export const peliculaServices = {
    listarPeliculas,
    crearPelicula,
    eliminarPelicula,
    actualizarPelicula,
    Pelicula
};