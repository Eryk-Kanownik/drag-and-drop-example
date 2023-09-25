const dragObjects = document.querySelectorAll(".drag-object");
const dropzones = document.querySelectorAll(".dz");

let draggedIndex = null;
let onEnterIndex = null;

let currentlyDragged = null;
let filter = null;

dragObjects.forEach((dragObject) => {
  dragObject.addEventListener("dragstart", (e) => {
    //hide element in currently appended box
    setTimeout(() => e.target.classList.add("hide"), 0);
    currentlyDragged = e.target;
  });

  dragObject.addEventListener("dragend", (e) => {
    e.target.parentNode.classList.remove("dz-drag-over");
    currentlyDragged.classList.remove("hide");
    currentlyDragged = null;
  });

  dragObject.addEventListener("dragenter", (e) => {
    draggedIndex = parseInt(currentlyDragged.parentNode.id);
    onEnterIndex = parseInt(e.target.parentNode.id);
    filter = e.toElement;
    dropzones[onEnterIndex].removeChild(e.toElement);
    dropzones[draggedIndex].removeChild(dropzones[draggedIndex].children[0]);
    dropzones[onEnterIndex].appendChild(currentlyDragged);
    dropzones[draggedIndex].appendChild(filter);
  });

  dragObject.addEventListener("drop", (e) => {
    draggedIndex = parseInt(currentlyDragged.parentNode.id);
    onEnterIndex = parseInt(e.target.parentNode.id);
    filter = e.toElement;
    dropzones[onEnterIndex].removeChild(e.toElement);
    dropzones[draggedIndex].removeChild(dropzones[draggedIndex].children[0]);
    dropzones[onEnterIndex].appendChild(currentlyDragged);
    dropzones[draggedIndex].appendChild(filter);
  });
});

dropzones.forEach((dz, index) => {
  dz.id = index;
  dz.addEventListener("dragenter", (e, index) => {
    onEnterIndex = index;
    dz.classList.add("dz-drag-over");
  });
  dz.addEventListener("dragover", (e) => {
    e.preventDefault();
  });
  dz.addEventListener("dragleave", () => {
    dz.classList.remove("dz-drag-over");
  });
  dz.addEventListener("drop", (e) => {
    e.preventDefault();
    if (
      e.toElement.classList[0] === "dz" &&
      e.toElement.children.length === 0
    ) {
      e.target.append(currentlyDragged);
    }
    dz.classList.remove("dz-drag-over");
  });
});
