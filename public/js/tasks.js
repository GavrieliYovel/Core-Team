window.onload = () => {

  init();
  insertTable();

  todayInput.value = new Date().toLocaleDateString();
  new Chart(bar, {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
  });
  new Chart(doughnut, {
      type: 'doughnut',
      data : {
          labels: [
            'Red',
            'Blue',
            'Yellow'
          ],
          datasets: [{
            label: 'My First Dataset',
            data: [300, 150, 100],
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
              'rgb(255, 205, 86)'
            ],
            hoverOffset: 6
          }]
      }
  });


  deletetask.addEventListener("submit", (event) => {
    event.preventDefault();
    closeModel(deletemodel);
    const deleteReq = { BoardId : boardId, TaskId : taskId};
    const requestOptions = {
      method: "DELETE",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
      body: JSON.stringify(deleteReq)
    };
    removeTask(requestOptions);
    document.location.reload(true);
  });

  for (let i = 0; i < insertemail.length; i++) {
    insertemail[i].href += ("?email="+ userEmail);
  }

    addTasks.addEventListener("submit", (event) => {
        event.preventDefault();
        // const myFormData = new FormData(event.target);
        // const formDataObj = Object.fromEntries(myFormData.entries());
        // formDataObj.Tasks = myFormData.getAll('Tasks');
        // console.log(formDataObj);
        closeModel(addmodeltask);
        const postReq = {
            BoardId: boardId,
            TaskName : newTaskName.value,
            TaskDetails : Taskdetails_new.value,
            Status : Status_new.value,
            Priority : Priority_new.value,
            Type : Feature_new.value,
            Assignee : Taskassignee_new.value,
            Creator : userEmail,
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
        document.location.reload(true);
    });

    editTask.addEventListener("submit", (event) => {
        event.preventDefault();
        closeModel(editmodeltask);

        const editReq = {
            BoardId : boardId,
            TaskId : taskId,
            TaskName : editTaskName.value,
            TaskDetails : Taskdetails_edit.value,
            Status : Status_edit.value,
            Priority : Priority_edit.value,
            Type : Feature_edit.value,
            Assignee : Taskassignee_edit.value
        };
        const requestOptions = {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editReq)
        };
        // console.log(editReq)
        updateTask(requestOptions);
        document.location.reload(true);
    });

    csvBtn.addEventListener('click', (event) => {
        conTocsv();
    })
}

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

const insertemail   = document.getElementsByClassName('insertemail');
const boardname     = document.getElementById('boardname');

let taskId;
let boardId;
let userEmail;
let deleteTasks   = document.getElementsByClassName('deletetask');
let editTasks     = document.getElementsByClassName('edittask');




function deleteT() {
  for (let i = 0; i < deleteTasks.length; i++) {
    deleteTasks[i].onclick = () => {
        taskId = deleteTasks[i].childNodes[0].innerHTML;
        deletemsg.innerHTML = "Are you sure you want to delete task no " + taskId + "?"
      };
  }
}

function editT() {
    for (let i = 0; i < editTasks.length; i++) {
        editTasks[i].onclick = () => {
            taskId = editTasks[i].childNodes[0].innerHTML;
            editmsg.innerHTML = "Edit task no " + taskId + "."
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
      boardId = pair[1];
    }
    if(pair[0] == "email") {
      userEmail = pair[1];
    }
  }
  if(!userEmail) {
    window.location = "./index";
  }
}

function insertTable() {
    fetch("https://core-team.onrender.com/api/boards/" + boardId)
        .then(response => response.json())
        .then(board => {
            boardname.innerHTML = board.BoardName;
            for (const key in board.Tasks) {
                const elem = document.createElement('tr');
                elem.innerHTML = '<td>'+ board.Tasks[key].TaskId +'</td>' + '<td>' +  board.Tasks[key].TaskName + '</td>'
                    + '<td>' + board.Tasks[key].TaskDetails + '</td>' + '<td>' + board.Tasks[key].Status+ '</td>'
                    + '<td>' + board.Tasks[key].Priority + '</td>' + '<td>' + board.Tasks[key].Type + '</td>'
                    + '<td>' + board.Tasks[key].Assignee + '</td>' + '<td>' + board.Tasks[key].Creator + '</td>'
                    + '<td> <button type="button" class="btn p-0 edittask" data-bs-toggle="modal" data-bs-target="#edittaskmodel"><p hidden>'
                    + board.Tasks[key].TaskId
                    + '</p><i class="fa-regular fa-pen-to-square"></i></button></td>'
                    + '<td><button type="button" class="btn p-0 deletetask" data-bs-toggle="modal" data-bs-target="#deletetaskmodel"><p hidden>'
                    + board.Tasks[key].TaskId
                    + '</p><i class="fa-regular fa-trash"></i></button></td>';
                dropZoneTasks.appendChild(elem);
            }
            deleteTasks = document.getElementsByClassName('deletetask');
            deleteT();
            editTasks   = document.getElementsByClassName('edittask');
            editT();
        });
}
function createTasks(requestOptions) {
    fetch("https://core-team.onrender.com/api/boards/tasks", requestOptions)
    .then(response => response.text());
}
function updateTask(requestOptions) {
    fetch("https://core-team.onrender.com/api/boards/tasks", requestOptions)
    .then(response => response.text());
}

function removeTask(requestOptions) {
    fetch("https://core-team.onrender.com/api/boards/tasks", requestOptions)
    .then(response => response.text());
}

function conTocsv() {
  window.open("https://core-team.onrender.com/api/boards/csv/" + boardId, '_blank');
}
