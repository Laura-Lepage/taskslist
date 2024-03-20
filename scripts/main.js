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

function updateTaskList() {
    // Vider divNoTaskTube avant d'ajouter les tâches triées
    divNoTaskTube.innerHTML = '';

    // Ajouter les tâches triées à divNoTaskTube
    taskTubeTable.forEach((task, index) => {
        divNoTaskTube.innerHTML += `<details data-index="${index}">
                                        <summary>
                                            <span class="left">
                                                <input type="checkbox" class="checkbox">${task.task}
                                            </span>
                                            <span class="right">${task.date}<button class="cross">❌</button></span>
                                        </summary>${task.description}
                                    </details>`;
    });
}

addButton.addEventListener('click', function(){
    // Vérifier si les champs "nom de la tâche" et "date" sont remplis
    if(taskName.value.trim() !== '' && taskDate.value.trim() !== ''){
        // Si les champs sont remplis, exécuter le code pour ajouter la tâche
        checkChild(divNoTaskTube, pNoTaskTube)

        // Ajouter la tâche au tableau taskTubeTable
        taskTubeTable.push({task: taskName.value, date: taskDate.value, description: taskArea.value})

        // Trier le tableau taskTubeTable par date de la plus proche à la plus éloignée
        taskTubeTable.sort((a, b) => new Date(a.date) - new Date(b.date))

        // Afficher la tâche dans divNoTaskTube
        updateTaskList()

        // Sauvegarder taskTubeTable dans le localStorage
        localStorage.setItem('taskTubeTable', JSON.stringify(taskTubeTable));

        // Réinitialiser les champs de saisie
        taskName.value = ""
        taskDate.value = ""
        taskArea.value = ""

        // Vérifier à nouveau s'il y a des éléments enfants dans divNoTaskTube
        checkChild(divNoTaskTube, pNoTaskTube)
    } else {
        // Si les champs ne sont pas remplis, afficher un message d'erreur ou effectuer une autre action
        alert("Veuillez remplir les champs 'Nom de la tâche' et 'Date' avant d'ajouter une tâche.")
    }
})

divNoTaskTube.addEventListener('click', function(e){
    if(e.target.classList.contains("checkbox")){
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
    if(e.target.classList.contains("cross")){
        // Récupérer l'index de la tâche dans le tableau taskTubeTable
        let index = e.target.closest('details').getAttribute('data-index')
        // Supprimer la tâche de l'interface utilisateur
        e.target.parentElement.parentElement.parentElement.remove()
        // Supprimer la tâche de taskTubeTable
        taskTubeTable.splice(index, 1)
        checkChild(divNoTaskTube, pNoTaskTube)
    }
})

// Charger les tâches à partir du localStorage au chargement de la page
window.addEventListener('load', function() {
    // Vérifier si des tâches sont déjà stockées dans le localStorage
    if (localStorage.getItem('taskTubeTable')) {
        // Si des tâches sont trouvées, les charger dans le tableau taskTubeTable
        taskTubeTable = JSON.parse(localStorage.getItem('taskTubeTable'));
        // Mettre à jour la liste des tâches affichée
        updateTaskList();
    }

    // Vérifier si des tâches terminées sont déjà stockées dans le localStorage
    if (localStorage.getItem('taskDoneTable')) {
        // Si des tâches terminées sont trouvées, les charger dans le tableau taskDoneTable
        taskDoneTable = JSON.parse(localStorage.getItem('taskDoneTable'));
    }
});



