let contador = 1;
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
    try {
        event.preventDefault()
        let $listaTarefa = document.querySelector("#listaTarefa")
        let $task = document.querySelector("#task")
        let tarefaAtual = $task.value
        if(tarefaAtual==''){
            throw 'O campo não pode estar vazio'
        }
        let $errorMessage = document.getElementById("error-message")
        $errorMessage.innerText = ''
        $listaTarefa.innerHTML+=`
        <div class="itemtarefa" id="tarefa-${contador}">
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
            </div>
            <h3>
                ${tarefaAtual}
            </h3>
            <button type="button" class="btn btn-danger" onclick="deletarTarefa('${'tarefa-'+contador}')">Excluir</button>
        </div>
        `
        contador++
        console.log(contador)
    } catch (error) {
        let $errorMessage = document.getElementById("error-message")
        $errorMessage.innerText = error
    }
    
} 

function cancelar(event){
    event.preventDefault()
    let $modal = document.querySelector("#modal")
    $modal.classList.remove("modal-active")
}

function deletarTarefa(id){
    let tarefaHtml = document.querySelector(`#${id}`)
    tarefaHtml.remove()
}