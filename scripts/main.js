let taskName = document.querySelector("#taskname")
let taskDate = document.querySelector("#taskdate")
let taskArea = document.querySelector("#task_textarea")
let addButton = document.querySelector(".add")
let divNoTaskTube = document.querySelector(".notasktube")
let taskTable = []

addButton.addEventListener('click', function(){
    divNoTaskTube.innerHTML = ""

    taskTable.push({tâche:taskName.value, date:taskDate.value, description:taskArea.value})
    console.log(taskTable)

    divNoTaskTube.innerHTML += `<details data-index="${taskTable.length-1}"><summary><span class="left"><input type="checkbox" id="checkbox">${taskName.value}</span><span class="right">${taskDate.value}<button class="cross">❌</button></span></summary>${taskArea.value}</details>`

    taskName.value = ""
    taskDate.value = ""
    taskArea.value = ""

})

