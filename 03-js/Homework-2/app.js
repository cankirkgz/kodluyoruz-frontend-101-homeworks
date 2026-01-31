const STORAGE_KEY = "todo-items-v1";

const taskInput = document.getElementById("task");
const addBtn = document.getElementById("addBtn");
const listEl = document.getElementById("list");

const successToastEl = document.getElementById("successToast");
const errorToastEl = document.getElementById("errorToast");

function showToast(type) {
  if (type === "success") {
    window.jQuery(successToastEl).toast("show");
    return;
  }
  window.jQuery(errorToastEl).toast("show");
}

function normalizeText(text) {
  return String(text || "").trim().replace(/\s+/g, " ");
}

function loadItems() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return null;
    return parsed;
  } catch {
    return null;
  }
}

function saveItems(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

function getItemsFromDOM() {
  const items = [];
  listEl.querySelectorAll("li").forEach((li) => {
    const textEl = li.querySelector(".text");
    const text = textEl ? textEl.textContent : "";
    const checked = li.classList.contains("checked");
    items.push({ text, checked });
  });
  return items;
}

function createLi({ text, checked }) {
  const li = document.createElement("li");
  if (checked) li.classList.add("checked");

  const span = document.createElement("span");
  span.className = "text";
  span.textContent = text;

  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "close-btn";
  btn.setAttribute("aria-label", "Sil");
  btn.textContent = "×";

  li.appendChild(span);
  li.appendChild(btn);

  return li;
}

function renderInitial() {
  const stored = loadItems();
  const defaults = [
    { text: "3 Litre Su İç", checked: false },
    { text: "Ödevleri Yap", checked: false },
    { text: "En Az 3 Saat Kodlama Yap", checked: false },
    { text: "Yemek Yap", checked: false },
    { text: "50 Sayfa Kitap Oku", checked: false },
  ];

  const items = stored && stored.length ? stored : defaults;

  listEl.innerHTML = "";
  items.forEach((item) => listEl.appendChild(createLi(item)));
  saveItems(getItemsFromDOM());
}

function addNewItem() {
  const value = normalizeText(taskInput.value);
  if (!value) {
    showToast("error");
    taskInput.focus();
    return;
  }

  listEl.appendChild(createLi({ text: value, checked: false }));
  taskInput.value = "";
  taskInput.focus();

  saveItems(getItemsFromDOM());
  showToast("success");
}

addBtn.addEventListener("click", addNewItem);

taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addNewItem();
});

listEl.addEventListener("click", (e) => {
  const closeBtn = e.target.closest(".close-btn");
  if (closeBtn) {
    const li = closeBtn.closest("li");
    if (li) li.remove();
    saveItems(getItemsFromDOM());
    return;
  }

  const li = e.target.closest("li");
  if (!li) return;

  li.classList.toggle("checked");
  saveItems(getItemsFromDOM());
});

renderInitial();