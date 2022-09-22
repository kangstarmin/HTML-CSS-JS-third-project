const todoList = document.getElementById("todo-list")
const todoForm = document.getElementById("todo-form")
let todoArr = []

function displayTodos(){
  todoList.innerHTML = ""
  todoArr.forEach(function(aTodo){
    const todoItem = document.createElement("li")
    const todoCheckBtn = document.createElement("span")
    todoCheckBtn.classList.add("checkBtn")
    todoCheckBtn.innerHTML = `<i class="fa-solid fa-check"></i>`
    const todoDelBtn = document.createElement("span")
    todoDelBtn.classList.add("delBtn")
    todoDelBtn.innerHTML = `<i class="fa-solid fa-trash-can"></i>`
    todoDelBtn.title = "클릭 시 삭제"
    // todoCheckBtn.innerText = "x"
    todoCheckBtn.title = "클릭 시 완료"
    todoItem.innerText = aTodo.todoText
    todoItem.title = "클릭시 완료"
    todoCheckBtn.classList.add(aTodo.todoDone ? "done" : "yet")
    todoItem.appendChild(todoCheckBtn)
    todoItem.appendChild(todoDelBtn)

    todoDelBtn.addEventListener("click", function(){
      handleTodoDelBtnClick(aTodo.todoId)
    })

    todoCheckBtn.addEventListener("click", function(){
      handleTodoItemClick(aTodo.todoId)
    })
    todoList.appendChild(todoItem)
  })
}

function handleTodoDelBtnClick(clickedId){
  todoArr = todoArr.filter(function(aTodo){
    return aTodo.todoId !== clickedId
  })
  displayTodos()
  saveTodos()
}

function handleTodoItemClick(clickedId){
  todoArr = todoArr.map(function(aTodo){
    return aTodo.todoId !== clickedId ?
    aTodo : {...aTodo, todoDone: !aTodo.todoDone} 
  })
  displayTodos()
  saveTodos()
}

function saveTodos(){
  const todoString = JSON.stringify(todoArr)
  localStorage.setItem("myTodos", todoString)
}

function loadTodos(){
  const myTodos = localStorage.getItem("myTodos")
  todoArr = myTodos !== null ? JSON.parse(myTodos) : todoArr
  displayTodos()
}

todoForm.addEventListener("submit", function(e){
  e.preventDefault(e)
  
  const toBeAdded = {
    todoText : todoForm.todo.value,
    todoId : new Date().getTime(),
    todoDone : false
  }
  todoForm.todo.value = ""
  todoArr.push(toBeAdded)
  displayTodos()
  saveTodos()
})

loadTodos()