const inputUser  = document.getElementById('inputUser');
const addButton  = document.getElementById('addButton');
const container  = document.getElementById('containerAdded');

window.addEventListener('DOMContentLoaded', () => {
  const saved = JSON.parse(localStorage.getItem('tasks')) || [];
  saved.forEach(t => add(t.text, t.done));
});


function add(text, done = false) {
  if (!text) return;

  const wrapper = document.createElement('div');
  wrapper.className = 'containerInput';
  wrapper.innerHTML = `
      <input type="text" value="${text}" readonly>
      <button class="deleteButton">Delete</button>
      <input type="checkbox" class="marksdone">
  `;
  container.appendChild(wrapper);

  const deleteBtn = wrapper.querySelector('.deleteButton');
  const checkbox  = wrapper.querySelector('.marksdone');


  if (done) {
    checkbox.checked  = true;
    checkbox.disabled = true;
    deleteBtn.remove();
  }


  checkbox.addEventListener('change', () => {
    if (checkbox.checked) {
      checkbox.disabled = true;
      deleteBtn.remove();
    }
    save();
  });


  deleteBtn.addEventListener('click', e => {
    e.preventDefault();
    wrapper.remove();
    save();
  });

  save();
}


function save() {
  const tasks = [...container.querySelectorAll('.containerInput')].map(w => {
    return {
      text : w.querySelector('input[type="text"]').value,
      done : w.querySelector('.marksdone').checked
    };
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

addButton.addEventListener('click', () => {
  const text = inputUser.value.trim();
  if (text) {
    add(text);
    inputUser.value = '';
  }
});
