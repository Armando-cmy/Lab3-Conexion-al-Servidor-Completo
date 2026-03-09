const deleteIcon = () => {

    const icon = document.createElement("i");

    icon.classList.add("fas", "fa-trash-alt", "deleteIcon");

    icon.addEventListener("click", deleteTask);

    return icon;
};

const deleteTask = (event) => {

    const parent = event.target.parentElement;

    parent.remove();

};

export default deleteIcon;