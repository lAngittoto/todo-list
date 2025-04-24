const inputUser = document.getElementById('inputUser');
const addButton = document.getElementById('addButton');
const container = document.getElementById('containerAdded');
const deleteButton = document.querySelector('.deleteButton');

window.addEventListener('DOMContentLoaded', () => {
  // Load tasks from localStorage if available
  (JSON.parse(localStorage.getItem('tasks')) || []).forEach(text => add(text));
});

function add(text) {
  if (!text) return;  // Avoid adding empty tasks

  // Insert new task into container
  const taskHTML = `
    <div class="containerInput">
      <input type="text" value="${text}" readonly>
      <button class="deleteButton">Delete</button>
      <input type="checkbox" class="marksdone">
    </div>`;

  container.insertAdjacentHTML('beforeend', taskHTML);

  const currentTask = container.lastElementChild;
  
  // Add checkbox change event
  const checkbox = currentTask.querySelector('.marksdone');
  checkbox.addEventListener('change', () => {
    if (checkbox.checked) {
      checkbox.disabled = true;
      const deleteBtn = currentTask.querySelector('.deleteButton');
      deleteBtn.remove();
    }
  });

  // Add delete button event listener
  const deleteBtn = currentTask.querySelector('.deleteButton');
  deleteBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const task = e.target.closest('.containerInput');
    task.remove();
    save();
  });

  // Save tasks after adding a new one
  save();
}

function save() {
  // Save tasks to localStorage
  const tasks = [...container.querySelectorAll('input[type="text"]')].map(input => input.value);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

addButton.addEventListener('click', () => {
  const text = inputUser.value.trim();
  if (text) {
    add(text);
    inputUser.value = ''; // Clear the input field
  }
});
