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
      body: JSON.stringify(deleteReq) 
    };
    console.log(requestOptions);
  });

  deleteT();

  for (let i = 0; i < insertemail.length; i++) {
    insertemail[i].href += ("?email="+ userEmail);
  }
}

const todayInput      = document.getElementById('dash-daterange');
const dropZoneTasks   = document.getElementById('droptasks');

const bar       = document.getElementById('bar');
const doughnut  = document.getElementById('doughnut');

const deletemodel   = document.getElementById('deletetaskmodel');
const deleteTasks   = document.getElementsByClassName('deletetask');
const deletetask    = document.getElementById('deleteboard');
const deletemsg     = document.getElementById('deletemsg');

const insertemail   = document.getElementsByClassName('insertemail');
const boardname     = document.getElementById('boardname');

let taskId;
let boardId;
let userEmail;



function deleteT() {
  for (let i = 0; i < deleteTasks.length; i++) {
    deleteTasks[i].onclick = () => {
        taskId = deleteTasks[i].childNodes[0].innerHTML;
        deletemsg.innerHTML = "Are you sure you want to delete task no " + taskId + "?"
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
    window.location = "./index.html";
  }
}

function insertTable() {

  fetch("http://localhost:3000/api/boards/" + boardId)      
  .then(response => response.json())       
  .then(board => {
    boardname.innerHTML = board.BoardName;

    for (const key in board) {
      const elem = document.createElement('tr');
      elem.innerHTML = '<td>'+ board.Tasks[key].TaskId +'</td>' + '<td>' +  board.Tasks[key].TaskName + '</td>'
      + '<td>' + board.Tasks[key].TaskDetails + '</td>' + '<td>' + board.Tasks[key].Status+ '</td>'
      + '<td>' + board.Tasks[key].TaskDetails.Priority + '</td>' + '<td>' + board.Tasks[key].TaskDetails.Type + '</td>'
      + '<td>' + board.Tasks[key].TaskDetails.Assignee + '</td>' + '<td>' + board.Tasks[key].TaskDetails.Creator + '</td>'
      + '<td> <button type="button" class="btn p-0 editboard" data-bs-toggle="modal" data-bs-target="#edittaskmodel"><p hidden>'
        + board.Tasks[key].TaskId
      + '</p><i class="fa-regular fa-pen-to-square"></i></button></td>' 
      + '<td><button type="button" class="btn p-0 deleteboard" data-bs-toggle="modal" data-bs-target="#deletetaskmodel"><p hidden>' 
        + board.Tasks[key].TaskId
      + '</p><i class="fa-regular fa-trash"></i></button></td>';
      dropZoneTasks.appendChild(elem);
    }

  });    
  
}