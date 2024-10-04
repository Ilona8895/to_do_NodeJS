function sendItemToBackend(item) {
  fetch("http://127.0.0.1:8888/todo/add", {
    method: "POST",
    body: JSON.stringify(item),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

function getItemsFromBackend() {
  return fetch("http://127.0.0.1:8888/todo").then((res) => res.json());
}

function removeItemFromBackend(item) {
  fetch("http://127.0.0.1:8888/todo/remove", {
    method: "POST",
    body: JSON.stringify(item),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

const btn = document.querySelector(".btn");
const list = document.querySelector(".list");

window.addEventListener("load", (e) => {
  getItemsFromBackend().then(({ todoList }) => {
    console.log(todoList);
    todoList.forEach((el) => {
      const addedTask = document.createElement("div");
      addedTask.classList.add("element");
      addedTask.dataset.id = el.id;
      addedTask.innerHTML = `<h3 class="element-title">${el.value}</h3>
		<button class="delete">Delete</button>`;
      list.appendChild(addedTask);
    });
  });
});

btn.addEventListener("click", (e) => {
  const task = document.querySelector(".task");
  const numOfTasks = document.querySelectorAll(".element").length;

  if (task.value !== "") {
    const addedTask = document.createElement("div");
    addedTask.classList.add("element");
    addedTask.dataset.id = numOfTasks + 1;

    addedTask.innerHTML = `<h3 class="element-title">${task.value}</h3>
			<button class="delete">Delete</button>`;
    list.appendChild(addedTask);
    list.style.display = "block";
    const obTask = { id: addedTask.dataset.id, value: task.value };
    sendItemToBackend(obTask);
  }

  task.value = "";
});

list.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    e.target.closest(".element").remove();
    const removedEl = e.target.closest(".element").dataset.id;
    removeItemFromBackend({ id: removedEl });
  }

  if (list.childNodes.length === 0) list.style.display = "none";
});
