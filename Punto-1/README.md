No encontre ningun el error lo unico fue que no se creado el boton para marcar las tareas como 
completadas

class Task {
    constructor(id, description, completed = false) { // Define el constructor de la clase Task con id, description y completed
        this.id = id; // Asigna el id de la tarea
        this.description = description; // Asigna la descripción de la tarea
        this.completed = completed; // Asigna si la tarea está completada o no (por defecto es false)
    }

    toggleComplete() { // Método para alternar el estado de completado de la tarea
        this.completed = !this.completed; // Invierte el valor de completed
    }
}

class TaskManager {
    constructor() { // Define el constructor de la clase TaskManager
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || []; // Carga las tareas desde localStorage o inicializa una lista vacía
        this.loadTasks(); // Llama al método loadTasks para renderizar las tareas
    }

    addTask(description) { // Método para agregar una nueva tarea
        const id = this.tasks.length ? this.tasks[this.tasks.length - 1].id + 1 : 1; // Calcula el id de la nueva tarea
        const task = new Task(id, description); // Crea una nueva instancia de Task
        this.tasks.push(task); // Añade la nueva tarea a la lista de tareas
        this.saveTasks(); // Guarda la lista de tareas en localStorage
        this.renderTasks(); // Renderiza la lista de tareas actualizada
    }

    deleteTask(id) { // Método para eliminar una tarea por su id
        this.tasks = this.tasks.filter(task => task.id !== id); // Filtra las tareas para eliminar la que tiene el id especificado
        this.saveTasks(); // Guarda la lista actualizada en localStorage
        this.renderTasks(); // Renderiza la lista de tareas actualizada
    }

    completedTask(id) { // Método para marcar una tarea como completada por su id
        this.tasks = this.tasks.map(task => task.id == id ? { ...task, completed: true } : task); // Marca la tarea con el id especificado como completada
        this.saveTasks(); // Guarda la lista actualizada en localStorage
        this.renderTasks(); // Renderiza la lista de tareas actualizada
    }

    toggleTaskComplete(id) { // Método para alternar el estado de completado de una tarea por su id
        const task = this.tasks.find(task => task.id === id); // Encuentra la tarea con el id especificado
        if (task) { // Si la tarea existe
            task.toggleComplete(); // Alterna el estado de completado de la tarea
            this.saveTasks(); // Guarda la lista actualizada en localStorage
            this.renderTasks(); // Renderiza la lista de tareas actualizada
        }
    }

    saveTasks() { // Método para guardar las tareas en localStorage
        localStorage.setItem('tasks', JSON.stringify(this.tasks)); // Convierte la lista de tareas a JSON y la guarda en localStorage
    }

    loadTasks() { // Método para cargar y renderizar las tareas desde localStorage
        this.renderTasks(); // Renderiza las tareas
    }

    renderTasks() { // Método para renderizar las tareas en el DOM
        const taskList = document.getElementById('task-list'); // Obtiene el elemento con id 'task-list'
        taskList.innerHTML = ''; // Limpia el contenido del elemento task-list
        this.tasks.forEach(task => { // Itera sobre las tareas
            const item = document.createElement('li'); // Crea un nuevo elemento li
            item.textContent = task.description; // Asigna el texto del li a la descripción de la tarea
            item.className = task.completed ? 'completed' : ''; // Asigna la clase 'completed' si la tarea está completada
            item.addEventListener('click', () => this.toggleTaskComplete(task.id)); // Agrega un evento de clic para alternar el estado de completado

            const deleteButton = document.createElement('button'); // Crea un botón para eliminar la tarea
            const completedButton = document.createElement('button'); // Crea un botón para marcar la tarea como completada
            completedButton.textContent = 'Completada'; // Asigna el texto del botón de completar
            deleteButton.textContent = 'Eliminar'; // Asigna el texto del botón de eliminar
            deleteButton.addEventListener('click', (e) => { // Agrega un evento de clic para eliminar la tarea
                e.stopPropagation(); // Evita que el evento se propague al elemento padre
                this.deleteTask(task.id); // Llama al método deleteTask con el id de la tarea
            });

            completedButton.addEventListener('click', (e) => { // Agrega un evento de clic para marcar la tarea como completada
                e.stopPropagation(); // Evita que el evento se propague al elemento padre
                this.completedTask(task.id); // Llama al método completedTask con el id de la tarea
            });

            item.appendChild(deleteButton); // Añade el botón de eliminar al li
            item.appendChild(completedButton); // Añade el botón de completar al li
            taskList.appendChild(item); // Añade el li al elemento task-list
        });
    }
}

document.addEventListener('DOMContentLoaded', () => { // Espera a que el DOM esté completamente cargado
    const taskManager = new TaskManager(); // Crea una nueva instancia de TaskManager

    document.getElementById('add-task').addEventListener('click', () => { // Agrega un evento de clic al botón de agregar tarea
        const newTask = document.getElementById('new-task').value; // Obtiene el valor del input de nueva tarea
        if (newTask) { // Si el valor no está vacío
            taskManager.addTask(newTask); // Llama al método addTask con la nueva tarea
            document.getElementById('new-task').value = ''; // Limpia el input de nueva tarea
        }
    });
});
