import checkComplete from "./Components/checkComplete.js";
import deleteIcon from "./Components/deleteIcon.js";

(() => {

    const btn = document.querySelector("[data-form-btn]");
    const input = document.querySelector("[data-form-input]");
    const list = document.querySelector("[data-list]");

    const isValidTask = (text) => {
        const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
        return regex.test(text);
    };

    const createTask = (event) => {
        event.preventDefault();

        const value = input.value.trim();

        if (value === "") {
            alert("Escribe una tarea");
            return;
        }

        if (!isValidTask(value)) {
            alert("La tarea no debe contener números");
            return;
        }

        const task = document.createElement("li");
        task.classList.add("card");

        const contTask = document.createElement("div");

        const titleTask = document.createElement("span");
        titleTask.classList.add("task");
        titleTask.innerText = value;

        contTask.appendChild(checkComplete());
        contTask.appendChild(titleTask);

        task.appendChild(contTask);
        task.appendChild(deleteIcon());

        list.appendChild(task);

        input.value = "";
    };

    btn.addEventListener("click", createTask);

})();