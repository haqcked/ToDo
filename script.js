const addTodo = document.querySelector('.add');
const list = document.querySelector('.todos')
const search = document.querySelector('.search input')

const createTodo = todo => {
  const html = `
  <li>
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

  // if(term !== ''){
  //   addTodo.input.classList.add('expanded')
  // } else {
  //   addTodo.input.classlist.remove('expanded')
  // }

});
// ---------------------------
search.addEventListener("input", function () {
  const searchForm = this.closest('.search');

  if (this.value.trim() !== "") {
    searchForm.classList.add('expanded');
  } else {
    searchForm.classList.remove('expanded');
  }
});

search.addEventListener("focus", function () {
  const searchForm = this.closest('.search');
  searchForm.classList.add('expanded');
});

// save and show data

function saveData(){
  localStorage.setItem('data', list.innerHTML);
}

function showTodo(){
  list.innerHTML = localStorage.getItem('data');
}

showTodo()

// add a new function for later
