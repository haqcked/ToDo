const addTodo = document.querySelector('.add');
const list = document.querySelector('.todos')
const search = document.querySelector('.search input')

const createTodo = todo => {
  const html = `
  <li class="list-group-item d-flex justify-content-between align-items-center">
    <span>${todo}</span>
    <i class="far fa-trash-alt delete"></i>
  </li>
  `;

  list.innerHTML += html;
};

addTodo.addEventListener('submit', e => {
  e.preventDefault();
  const todo = addTodo.add.value.trim();

  if(todo.length){
    createTodo(todo);
    addTodo.reset();
    saveData();
  }
});

// delete todos

list.addEventListener('click', e => {

  if(e.target.classList.contains('delete')){
    e.target.parentElement.remove();
    saveData();
  }
});

// search todos

const filterTodos = (term) => {
  Array.from(list.children)
    .filter((todo) => !todo.textContent.toLowerCase().includes(term))
    .forEach((todo) => todo.classList.add('filtered'));

    Array.from(list.children)
    .filter((todo) => todo.textContent.toLowerCase().includes(term))
    .forEach((todo) => todo.classList.remove('filtered'));
};

search.addEventListener('keyup', e => {
  const term = search.value.trim().toLowerCase();
  filterTodos(term);
});

// save and show data

function saveData(){
  localStorage.setItem('data', list.innerHTML);
}

function showTodo(){
  list.innerHTML = localStorage.getItem('data');
}

showTodo()
