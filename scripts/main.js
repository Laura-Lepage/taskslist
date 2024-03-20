let taskName = document.querySelector("#taskname")
let taskDate = document.querySelector("#taskdate")
let taskArea = document.querySelector("#task_textarea")
let addButton = document.querySelector(".add")
let divNoTaskTube = document.querySelector(".notasktube")
let pNoTaskTube = document.querySelector(".pnotasktube")
let divNoTaskDone = document.querySelector(".notaskdone")
let pNoTaskDone = document.querySelector(".pnotaskdone")
let taskTubeTable = []
let taskDoneTable = []

function checkChild(whichdiv, whichp){
    if (whichdiv.childElementCount !== 0){
        whichp.innerHTML = ``
    } else {
        whichp.innerHTML = `No task in the tube`
    }
}

addButton.addEventListener('click', function(){
    checkChild(divNoTaskTube, pNoTaskTube)

    taskTubeTable.push({task:taskName.value, date:taskDate.value, description:taskArea.value})
    console.log(taskTubeTable)

    divNoTaskTube.innerHTML += `<details data-index="${taskTubeTable.length-1}"><summary><span class="left"><input type="checkbox" class="checkbox">${taskName.value}</span><span class="right">${taskDate.value}<button class="cross">❌</button></span></summary>${taskArea.value}</details>`

    taskName.value = ""
    taskDate.value = ""
    taskArea.value = ""

    checkChild(divNoTaskTube, pNoTaskTube)

})

divNoTaskTube.addEventListener('click', function(e){
    if (e.target.classList.contains("checkbox")){
        // Récupérer l'index de la tâche dans le tableau taskTubeTable
        let index = e.target.closest('details').getAttribute('data-index')
        // Déplacer la tâche de taskTubeTable à taskDoneTable
        taskDoneTable.push(taskTubeTable[index])
        // Supprimer la tâche de l'interface utilisateur
        e.target.parentElement.parentElement.parentElement.remove()
        // Supprimer la tâche de taskTubeTable
        taskTubeTable.splice(index, 1)
        console.log(taskDoneTable)
        checkChild(divNoTaskTube, pNoTaskTube)
        
        divNoTaskDone.innerHTML += `<details><summary>${taskDoneTable[taskDoneTable.length-1].task}</summary></details>`
        checkChild(divNoTaskDone, pNoTaskDone)
        
    }
    if (e.target.classList.contains("cross")){
        // Récupérer l'index de la tâche dans le tableau taskTubeTable
        let index = e.target.closest('details').getAttribute('data-index')
        // Supprimer la tâche de l'interface utilisateur
        e.target.parentElement.parentElement.parentElement.remove()
        // Supprimer la tâche de taskTubeTable
        taskTubeTable.splice(index, 1)
        checkChild(divNoTaskTube, pNoTaskTube)
    }
})



