let numOfTasks;

const btn = document.querySelector(".btn");
const list = document.querySelector(".list");

function addListItem(e) {
  if (e.key === "Enter" || e.pointerId === 1) {
    const task = document.querySelector(".task");

    if (list.childNodes.length === 0) numOfTasks = 0;
    else {
      numOfTasks = Number(list.lastChild.dataset.id);
    }

    if (task.value !== "") {
      const addedTask = document.createElement("div");
      addedTask.classList.add("element");
      addedTask.dataset.id = numOfTasks + 1;

      addedTask.innerHTML = `<input class="element-title" value="${task.value}"/>
              <button class="delete">Delete</button>`;
      list.appendChild(addedTask);

      const obTask = { id: addedTask.dataset.id, value: task.value };
      sendItemToBackend(obTask);
    }

    task.value = "";
  }
}

window.addEventListener("load", (e) => {
  getItemsFromBackend().then(({ todoList }) => {
    console.log(todoList);

    todoList.forEach((el) => {
      const addedTask = document.createElement("div");
      addedTask.classList.add("element");
      addedTask.dataset.id = el.id;
      addedTask.innerHTML = `<input class="element-title" value="${el.value}" />
		<button class="delete">Delete</button>`;
      list.appendChild(addedTask);
    });
  });
});

window.addEventListener("keydown", addListItem);
btn.addEventListener("click", addListItem);

list.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    e.target.closest(".element").remove();
    const removedEl = e.target.closest(".element").dataset.id;
    removeItemFromBackend(removedEl);
  }

  if (e.target.classList.contains("element-title")) {
    // console.log(e.target);
    e.target.classList.add("edit");
  }
});

window.addEventListener("click", (e) => {
  if (!e.target.classList.contains("edit")) {
    console.log("klik");
    const editTask = document.querySelector(".edit");
    if (editTask) {
      const patchedElement = editTask.closest(".element").dataset.id;
      patchItemToBackend({ id: patchedElement, value: editTask.value });
      editTask.classList.remove("edit");
    }
  }
});
