window.onload = () => {

  init();
  insertTable();
  insertUser();
  instrCharts();
  todayInput.value = new Date().toLocaleDateString();


  deletetask.addEventListener("submit", (event) => {
    event.preventDefault();
    closeModel(deletemodel);
    const deleteReq = { boardId : currentBoardId, taskId : currentTaskId};
    const requestOptions = {
      method: "DELETE",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
      body: JSON.stringify(deleteReq)
    };
    removeTask(requestOptions);
    document.location.reload();
  });

    addTasks.addEventListener("submit", (event) => {
        event.preventDefault();
        closeModel(addmodeltask);
        const postReq = {
            boardId: currentBoardId,
            taskName : newTaskName.value,
            taskDetails : Taskdetails_new.value,
            status : Status_new.value,
            priority : Priority_new.value,
            type : Feature_new.value,
            assignee : Taskassignee_new.value
        };
        console.log(postReq)
        const requestOptions = {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postReq)
        };
        createTasks(requestOptions);
        document.location.reload();
    });

    editTask.addEventListener("submit", (event) => {
        event.preventDefault();
        closeModel(editmodeltask);

        const editReq = {
            boardId : currentBoardId,
            taskId : currentTaskId,
            taskName : editTaskName.value,
            taskDetails : Taskdetails_edit.value,
            status : Status_edit.value,
            priority : Priority_edit.value,
            type : Feature_edit.value,
            assignee : Taskassignee_edit.value
        };
        const requestOptions = {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editReq)
        };
        updateTask(requestOptions);
        document.location.reload();
    });

    status_switch.addEventListener("change", (even) => {
        const checks = document.getElementById('status_checks');
        if(checks.hidden)
            checks.hidden = false
        else
            checks.hidden = true;
    });

    priority_switch.addEventListener("change", (even) => {
        const checks = document.getElementById('priority_checks');
        if(checks.hidden)
            checks.hidden = false
        else
            checks.hidden = true;
    });

    type_switch.addEventListener("change", (even) => {
        const checks = document.getElementById('type_checks');
        if(checks.hidden)
            checks.hidden = false
        else
            checks.hidden = true;
    });

    filermodel.addEventListener("submit", (event) => {
        event.preventDefault();
        let list = { boardId : currentBoardId };
        if(status_switch.checked == true) {
            const checkbox1 = document.getElementById('to-do');
            const checkbox2 = document.getElementById('in-progress');
            const checkbox3 = document.getElementById('done');
            if(checkbox1.checked)
                list[status_switch.value] = checkbox1.value;
            if(checkbox2.checked)
                list[status_switch.value] = checkbox2.value;
            if(checkbox3.checked)
                list[status_switch.value] = checkbox3.value;
        }

        if(priority_switch.checked == true) {
            const checkbox1 = document.getElementById('low');
            const checkbox2 = document.getElementById('medium');
            const checkbox3 = document.getElementById('high');
            if(checkbox1.checked)
                list[priority_switch.value] = checkbox1.value;
            if(checkbox2.checked)
                list[priority_switch.value] = checkbox2.value;
            if(checkbox3.checked)
                list[priority_switch.value] = checkbox3.value;
        }

        if(type_switch.checked == true) {
            const checkbox1 = document.getElementById('bug');
            const checkbox2 = document.getElementById('feature');
            if(checkbox1.checked)
                list[type_switch.value] = checkbox1.value;
            if(checkbox2.checked)
                list[type_switch.value] = checkbox2.value;

        }
        const Assignee = document.getElementById('filterAssignee');
        if(Assignee.value != "") {
            list['assignee'] = Assignee.value;
        }
        const requestOptions = {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(list)
        };
        filterTasks(requestOptions);
    })


    csvBtn.addEventListener('click', (event) => {
        conTocsv();
    })
}

const filermodel      = document.getElementById('filermodel');
const status_switch   = document.getElementById('status_switch');
const priority_switch = document.getElementById('priority_switch');
const type_switch     = document.getElementById('type_switch');

const todayInput    = document.getElementById('dash-daterange');
const dropZoneTasks = document.getElementById('droptasks');

const bar           = document.getElementById('bar');
const doughnut      = document.getElementById('doughnut');
const csvBtn        = document.getElementById("csv");

/*********************CreateTask**************************/

const addmodeltask      = document.getElementById('addtaskmodel');
const addTasks          = document.getElementById('addtask');
const newTaskName       = document.getElementById('taskname_new');
const Taskdetails_new   = document.getElementById('taskdetails_new');
const Status_new        = document.getElementById('status_new');
const Priority_new      = document.getElementById('priority_new');
const Feature_new       = document.getElementById('feature_new');
const Taskassignee_new  = document.getElementById('taskassignee_new');

/*********************EditTask**************************/

const editmodeltask     = document.getElementById('edittaskmodel');
const editTask          = document.getElementById('edittask');
const editmsg           = document.getElementById('editmsg');
const editTaskName      = document.getElementById('taskname_edit');
const Taskdetails_edit  = document.getElementById('taskdetails_edit');
const Status_edit       = document.getElementById('status_edit');
const Priority_edit     = document.getElementById('priority_edit');
const Feature_edit      = document.getElementById('feature_edit');
const Taskassignee_edit = document.getElementById('taskassignee_edit');







/***********************deleteTask************************/
const deletemodel   = document.getElementById('deletetaskmodel');
const deletetask    = document.getElementById('deleteboard');
const deletemsg     = document.getElementById('deletemsg');

const boardname     = document.getElementById('boardname');

let currentTaskId;
let currentBoardId;
let userEmail;
let deleteTasks   = document.getElementsByClassName('deletetask');
let editTasks     = document.getElementsByClassName('edittask');




function deleteT() {
  for (let i = 0; i < deleteTasks.length; i++) {
    deleteTasks[i].onclick = () => {
        currentTaskId = deleteTasks[i].childNodes[0].innerHTML;
        deletemsg.innerHTML = "Are you sure you want to delete task no " + currentTaskId + "?"
      };
  }
}

function editT() {
    for (let i = 0; i < editTasks.length; i++) {
        editTasks[i].onclick = () => {
            currentTaskId = editTasks[i].childNodes[0].innerHTML;
            editmsg.innerHTML = "Edit task no " + currentTaskId + ".";
            const fillEditform = document.getElementById(currentTaskId);
            editTaskName.value      = fillEditform.childNodes[1].innerHTML;
            Taskdetails_edit.value  = fillEditform.childNodes[2].innerHTML;
            Taskassignee_edit.value = fillEditform.childNodes[6].innerHTML;

            switch (fillEditform.childNodes[3].innerHTML) {
                case "To-Do":
                    Status_edit.childNodes[1].selected = true;
                    break;
                case "in-progress":
                    Status_edit.childNodes[3].selected = true;
                    break;
                case "Done":
                    Status_edit.childNodes[5].selected = true;
                    break;
            }
            switch (fillEditform.childNodes[4].innerHTML) {
                case "Low":
                    Priority_edit.childNodes[1].selected = true;
                    break;
                case "Medium":
                    Priority_edit.childNodes[3].selected = true;
                    break;
                case "High":
                    Priority_edit.childNodes[5].selected = true;
                    break;
            }
            switch (fillEditform.childNodes[5].innerHTML) {
                case "Bug":
                    Feature_edit.childNodes[1].selected = true;
                    break;
                case "Feature":
                    Feature_edit.childNodes[3].selected = true;
                    break;
            }
        };
    }
}

function closeModel(model) {
  model.childNodes[1].childNodes[1].childNodes[1].childNodes[1].childNodes[3].click();
}

function init() {
  const paramString = window.location.href.split('?')[1];
  const queryString = new URLSearchParams(paramString);
  for (let pair of queryString.entries()) {
    if(pair[0] == "boardId") {
        currentBoardId = pair[1];
    }
  }

}

const user_name = document.getElementById('user_name');
const cols      = document.getElementById('headers_permissions');
let   isManager = false;

function setUser(user) {
    user_name.innerHTML = user.name;
    if(user.role == 'Manager') {
        isManager = true;
        const delet = document.createElement('th');
        cols.appendChild(delet);
    }
}

function insertUser() {
    fetch(process.env.LOCAL_PATH + "/api/session/checkUser")
        .then(response => response.json())
        .then(user => {
            setUser(user);
        });
}


function loadTable(board) {
    dropZoneTasks.innerHTML = ""
    boardname.innerHTML = board.boardName;
    for (const key in board.tasks) {
        const elem = document.createElement('tr');
        elem.id = board.tasks[key].taskId;
        if (isManager == true) {
            elem.innerHTML = '<td>'+ board.tasks[key].taskId +'</td>' + '<td>' +  board.tasks[key].taskName + '</td>'
                + '<td>' + board.tasks[key].taskDetails + '</td>' + '<td>' + board.tasks[key].status+ '</td>'
                + '<td>' + board.tasks[key].priority + '</td>' + '<td>' + board.tasks[key].type + '</td>'
                + '<td>' + board.tasks[key].assignee + '</td>' + '<td>' + board.tasks[key].creator + '</td>'
                + '<td> <button type="button" class="btn p-0 edittask" data-bs-toggle="modal" data-bs-target="#edittaskmodel"><p hidden>'
                + board.tasks[key].taskId
                + '</p><i class="fa-regular fa-pen-to-square"></i></button></td>'
                + '<td><button type="button" class="btn p-0 deletetask" data-bs-toggle="modal" data-bs-target="#deletetaskmodel"><p hidden>'
                + board.tasks[key].taskId
                + '</p><i class="fa-regular fa-trash"></i></button></td>';
        }
        else {
            elem.innerHTML = '<td>'+ board.tasks[key].taskId +'</td>' + '<td>' +  board.tasks[key].taskName + '</td>'
                + '<td>' + board.tasks[key].taskDetails + '</td>' + '<td>' + board.tasks[key].status+ '</td>'
                + '<td>' + board.tasks[key].priority + '</td>' + '<td>' + board.tasks[key].type + '</td>'
                + '<td>' + board.tasks[key].assignee + '</td>' + '<td>' + board.tasks[key].creator + '</td>'
                + '<td> <button type="button" class="btn p-0 edittask" data-bs-toggle="modal" data-bs-target="#edittaskmodel"><p hidden>'
                + board.tasks[key].taskId
                + '</p><i class="fa-regular fa-pen-to-square"></i></button></td>';
        }
        dropZoneTasks.appendChild(elem);
    }
    deleteTasks = document.getElementsByClassName('deletetask');
    deleteT();
    editTasks   = document.getElementsByClassName('edittask');
    editT();
}


function insertTable() {
    fetch( process.env.LOCAL_PATH + "/api/boards/" + currentBoardId)
        .then(response => response.json())
        .then(board => {
            loadTable(board);
        });
}
function createTasks(requestOptions) {
    fetch( process.env.LOCAL_PATH + "/api/boards/tasks", requestOptions)
    .then(response => response.text())
        .then(result => {
            alert(result);
            insertTable();
        });
}
function updateTask(requestOptions) {
    fetch( process.env.LOCAL_PATH + "/api/boards/tasks", requestOptions)
    .then(response => response.text()
        .then(result => {
            alert(result);
            insertTable();
        }));
}
function removeTask(requestOptions) {
    fetch( process.env.LOCAL_PATH + "/api/boards/tasks", requestOptions)
    .then(response => response.text())
        .then(result => {
            alert(result);
            insertTable();
        });
}

function conTocsv() {
  window.open( process.env.LOCAL_PATH + "/api/boards/csv/" + currentBoardId, '_blank');
}

function instrCharts() {
    fetch( process.env.LOCAL_PATH + "/api/boards/statistics/" + currentBoardId)
        .then(response => response.json())
        .then(chars => {
            new Chart(doughnut, chars[0]);
            new Chart(bar, chars[1]);
        });

}

function filterTasks(requestOptions) {
    fetch(process.env.LOCAL_PATH + "/api/boards/tasks/filter", requestOptions)
        .then(response => response.json())
        .then(board => {
            loadTable(board);
        });
}




