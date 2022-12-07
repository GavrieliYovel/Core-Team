window.onload = () => {

    init();

    todayInput.value = new Date().toLocaleDateString();
    insertTable();

    addBoard.addEventListener("submit", (event) => {
        event.preventDefault();
        closeModel(addmodel);
        const postReq = { BoardName : newBoardName.value };
        const requestOptions = {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postReq) 
        };
        createBoard(requestOptions);
    });

    deleteBoard.addEventListener("submit", (event) => {
        event.preventDefault();
        closeModel(deletemodel);
        const requestOptions = {
            method: "DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({ id: boardId })
        };
        removeBoard(requestOptions);
    });

    editBoard.addEventListener("submit", (event) => {
        event.preventDefault();
        closeModel(editmodel);
        const editReq = { id : boardId , name : editBoardName.value };
        const requestOptions = {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editReq) 
        };
        updateBoard(requestOptions);
    });

    $(".tbody").on("click", "td[role=\"button\"]", function (e) {
        window.location = $(this).data("href") + "&email=" + userEmail; 
    });


    for (let i = 0; i < insertemail.length; i++) {
        insertemail[i].href += ("?email="+ userEmail);
    }

}

const todayInput    = document.getElementById('dash-daterange');
const insertemail   = document.getElementsByClassName('insertemail');
const dropZone      = document.getElementById('dropboards');

const addmodel      = document.getElementById('addboardmodel');
const addBoard      = document.getElementById('addboard');
const newBoardName  = document.getElementById('boardname_new');


const deletemodel   = document.getElementById('deleteboardmodel');
const deleteBoard   = document.getElementById('deleteboard');
const deletemsg     = document.getElementById('deletemsg');

const editmodel     = document.getElementById('editboardmodel');
const editBoard     = document.getElementById('editboard');
const editmsg       = document.getElementById('editmsg');
const editBoardName   = document.getElementById('boardname_edit');

let boardId;
let userEmail;
let deleteBoards    = document.getElementsByClassName('deleteboard');     //
let editBoards      = document.getElementsByClassName('editboard');       // they need to be a 'let'


function deleteB() {
    for (let i = 0; i < deleteBoards.length; i++) {
        deleteBoards[i].onclick = () => {
            boardId = deleteBoards[i].childNodes[0].innerHTML;
            deletemsg.innerHTML = "Are you sure you want to delete board no " + boardId + "?"
        };
    }
}

function editB() {
    for (let i = 0; i < editBoards.length; i++) {
        editBoards[i].onclick = () => {
            boardId = editBoards[i].childNodes[0].innerHTML;
            editmsg.innerHTML = "Edit board number " + boardId + "."
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
      if(pair[0] == "email") {
        userEmail = pair[1];
      }
    }
    if(!userEmail) {
      window.location = "./index";
    }
}

function insertTable() {

    fetch("http://localhost:3000/api/boards")      
    .then(response => response.json())       
    .then(boards => {
        for (const key in boards) {
            const elem = document.createElement('tr');
            elem.innerHTML = '<td role="button" data-href="./tasks?boardId=' + boards[key].BoardId + '">' + boards[key].BoardId +'</td>' 
            + '<td role="button" data-href="./tasks?boardId='+ boards[key].BoardId +'">' 
                + boards[key].BoardName
            + '</td>' 
            + '<td> <button type="button" class="btn p-0 editboard" data-bs-toggle="modal" data-bs-target="#editboardmodel"><p hidden>'
                + boards[key].BoardId 
            + '</p><i class="fa-regular fa-pen-to-square"></i></button></td>' 
            + '<td><button type="button" class="btn p-0 deleteboard" data-bs-toggle="modal" data-bs-target="#deleteboardmodel"><p hidden>' 
                + boards[key].BoardId 
            + '</p><i class="fa-regular fa-trash"></i></button></td>';
            dropZone.appendChild(elem);
        } 
        deleteBoards  = document.getElementsByClassName('deleteboard');
        deleteB(); 
        editBoards = document.getElementsByClassName('editboard'); 
        editB();  
    });
    
}

function removeBoard(requestOptions) {
    fetch("http://localhost:3000/api/boards/", requestOptions) 
    .then(response => response.text())       
    .then(resule => {
        alert(resule);
    });
}

function createBoard(requestOptions) {
    fetch("http://localhost:3000/api/boards", requestOptions)     
    .then(response => response.text())       
    .then(resule => {
        alert(resule);
    });
}

function updateBoard(requestOptions) {
    fetch("http://localhost:3000/api/boards", requestOptions)     
    .then(response => response.text())       
    .then(resule => {
        alert(resule);
    });
}