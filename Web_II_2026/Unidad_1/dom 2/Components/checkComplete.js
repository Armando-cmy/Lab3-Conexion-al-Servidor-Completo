const checkComplete = () => {

    const icon = document.createElement("i");

    icon.classList.add("far", "fa-check-circle", "icon");

    icon.addEventListener("click", completeTask);

    return icon;
};

const completeTask = (event) => {

    const element = event.target;

    element.classList.toggle("fas");
    element.classList.toggle("completeIcon");

    const task = element.parentElement.querySelector(".task");

    task.classList.toggle("finishTask");

};

export default checkComplete;