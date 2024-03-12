window.addEventListener('load',()=>{
    
    let $btnAdd = document.querySelector("#btn-add")
    let $btnSalvar = document.querySelector("#btn-salvar")
    let $btnCancelar = document.querySelector("#btn-cancelar")

    $btnAdd.addEventListener('click',activeModal)
    $btnSalvar.addEventListener('click',salvarTarefa)
    $btnCancelar.addEventListener('click',cancelar)

})

function activeModal(){
    let $modal = document.querySelector("#modal")
    $modal.classList.toggle("modal-active")
}

function salvarTarefa(event){
    event.preventDefault()
    let $listaTarefa = document.querySelector("#listaTarefa")
    let $task = document.querySelector("#task")
    let tarefaAtual = $task.value
    $listaTarefa.innerHTML+=`<h3>${tarefaAtual}</h3>`
    
} 

function cancelar(event){
    event.preventDefault()
    let $modal = document.querySelector("#modal")
    $modal.classList.remove("modal-active")
}