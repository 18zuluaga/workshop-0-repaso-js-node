Explicación: Añade un manejador de eventos de clic al botón con el id fetch-posts. Cuando el botón es clickeado, se llama a la función fetchPosts().
Conceptos Aplicados:
Eventos en JavaScript: Utiliza el método addEventListener para manejar eventos de usuario.
Funciones de Flecha: () => fetchPosts() es una función de flecha que sirve como callback para el evento de clic.

document.getElementById('fetch-posts').addEventListener('click', () => {
    fetchPosts();
});

Definición: La función fetchPosts es una función de flecha que se encarga de realizar una solicitud HTTP a la URL dada.
Uso de fetch: Realiza una solicitud de red a la URL especificada (https://jsonplaceholder.typicode.com/posts) para obtener datos.
Promesas y .then():
Primera .then(): Verifica si la respuesta de la red es exitosa (código de estado HTTP 200-299). Si no es exitosa, lanza un error.
Segunda .then(): Convierte la respuesta de la red a formato JSON usando response.json() y pasa los datos a displayPosts.
.catch(): Captura cualquier error que ocurra durante la solicitud o el procesamiento de la respuesta y pasa el error a displayError.

const fetchPosts = () => {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(posts => {
            displayPosts(posts);
        })
        .catch(error => {
            displayError(error);
        });
};


Explicación:
Definición: La función displayPosts es una función de flecha que recibe un array de posts y los muestra en el DOM.
Manipulación del DOM: Obtiene el elemento con el id post-list, limpia su contenido y luego itera sobre cada post.
Creación de Elementos: Para cada post, crea un nuevo elemento <li>, establece su contenido al título del post y lo añade a postList.
Conceptos Aplicados:
Manipulación del DOM: Usa métodos del DOM como getElementById, createElement, appendChild y innerHTML para actualizar la interfaz de usuario.

const displayError = (error) => {
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = `Error: ${error.message}`;
};




Explicación:
Definición: La función displayError es una función de flecha que recibe un objeto de error y muestra un mensaje de error en el DOM.
Manipulación del DOM: Obtiene el elemento con el id error-message y establece su contenido al mensaje del error.
Conceptos Aplicados:
Manipulación del DOM: Usa getElementById y textContent para mostrar mensajes de error en la interfaz de usuario.
Depuración: Captura y muestra mensajes de error para ayudar en la depuración.



const displayError = (error) => {
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = `Error: ${error.message}`;
};
