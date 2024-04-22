
window.addEventListener('load', () => {
    const addButton = document.querySelector("#btn-add");
    const saveButton = document.querySelector("#btn-salvar");
    const cancelButton = document.querySelector("#btn-cancelar");

    addButton.addEventListener('click', toggleModal);
    saveButton.addEventListener('click', saveTask);
    cancelButton.addEventListener('click', cancel);

    // Event delegation for dynamically added delete buttons
    const taskList = document.querySelector("#listaTarefa");
    taskList.addEventListener('click', (event) => {
        if (event.target.classList.contains('btn-delete')) {
            deleteTask(event.target.dataset.taskId);
        }
        if (event.target.classList.contains('form-check-input')) {
            setTask(event.target.dataset.taskId);
        }
    });
});

function toggleModal() {
    const modal = document.querySelector("#modal");
    modal.classList.toggle("modal-active");
}


function cancel(event) {
    event.preventDefault();
    const modal = document.querySelector("#modal");
    modal.classList.remove("modal-active");
}

function deleteTask(taskId) {
    
    // Recupera as tarefas do localStorage e as converte de volta para um array
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Filtra as tarefas para remover a tarefa com o taskId especificado
    const filteredTasks = tasks.filter(task => task.id != taskId);

    // Salva o novo array de tarefas de volta no localStorage
    localStorage.setItem('tasks', JSON.stringify(filteredTasks));

    loadTasks(); // Atualiza a lista de tarefas na telas

}

function setTask(taskId) {
    
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    
    const filteredTask = tasks.map(task => {
        if(task.id == taskId){
            task.done = !task.done
        }
        return task
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
    
    loadTasks(); // Atualiza a lista de tarefas na telas

}


// Função para carregar as tarefas do localStorage e renderizá-las na tela
function loadTasks() {
    const taskList = document.querySelector("#listaTarefa");
    taskList.innerHTML = ''; // Limpa a lista atual antes de carregar
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach((task) => {
        taskList.insertAdjacentHTML('beforeend', `
            <div class="itemtarefa ${task.done?'active':''}" id="tarefa-${task.id}">
                <div class="form-check">
                    <input data-task-id="${task.id}" ${task.done?'checked':''} class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                </div>
                <h3>${task.description}</h3>
                <button type="button" class="btn btn-danger btn-delete" data-task-id="${task.id}">Excluir</button>
            </div>
        `);
    });
}

// Função para salvar a tarefa
function saveTask(event) {
    let taskCounter = JSON.parse(localStorage.getItem('counter')) || 1;

    event.preventDefault();
    
    const taskInput = document.querySelector("#task");
    
    const currentTask = {
        id:taskCounter,
        description: taskInput.value.trim(),
        done:false
    }

    taskCounter++

    localStorage.setItem('counter', JSON.stringify(taskCounter));
    
    const errorMessage = document.getElementById("error-message");

    if (currentTask === '') {
        errorMessage.textContent = 'O campo não pode estar vazio';
        return;
    }

    errorMessage.textContent = '';
    const myLocalStoragetaks = localStorage.getItem('tasks')
    
    const tasks = JSON.parse(myLocalStoragetaks) || [];
    
    tasks.push(currentTask);
    
    localStorage.setItem('tasks', JSON.stringify(tasks));
    
    taskInput.value = ''; // Limpa o campo de entrada após salvar
    
    loadTasks(); // Atualiza a lista de tarefas na tela
}

// Inicializa a lista de tarefas ao carregar a página
document.addEventListener('DOMContentLoaded', loadTasks);

