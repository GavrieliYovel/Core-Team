window.onload = () => {

    todayInput.value = new Date().toLocaleDateString();
    insertTable();
    insertUser();
    addBoard.addEventListener("submit", (event) => {
        event.preventDefault();
        closeModel(addmodel);
        const postReq = { boardName : newboardName.value };
        const requestOptions = {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postReq)
        };
        createBoard(requestOptions);
        document.location.reload();
    });

    deleteBoard.addEventListener("submit", (event) => {
        event.preventDefault();
        closeModel(deletemodel);
        const deleteReq = { boardId : boardId};
        const requestOptions = {
            method: "DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body : JSON.stringify(deleteReq)
        };
        removeBoard(requestOptions);
        document.location.reload();
    });

    editBoard.addEventListener("submit", (event) => {
        event.preventDefault();
        closeModel(editmodel);
        const editReq = { boardId : boardId , boardName : editboardName.value };
        const requestOptions = {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editReq)
        };
        updateBoard(requestOptions);
        document.location.reload();
    });

    $(".tbody").on("click", "td[role=\"button\"]", function (e) {
        window.location = $(this).data("href");
    });



}

const todayInput    = document.getElementById('dash-daterange');
const dropZone      = document.getElementById('dropboards');

const addmodel      = document.getElementById('addboardmodel');
const addBoard      = document.getElementById('addboard');
const newboardName  = document.getElementById('boardname_new');


const deletemodel   = document.getElementById('deleteboardmodel');
const deleteBoard   = document.getElementById('deleteboard');
const deletemsg     = document.getElementById('deletemsg');

const editmodel     = document.getElementById('editboardmodel');
const editBoard     = document.getElementById('editboard');
const editmsg       = document.getElementById('editmsg');
const editboardName   = document.getElementById('boardname_edit');

let boardId;
let userEmail;
let deleteBoards    = document.getElementsByClassName('deleteboard');
let editBoards      = document.getElementsByClassName('editboard');


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
    fetch("http://localhost:3030/api/session/checkUser")
        .then(response => response.json())
        .then(user => {
            console.log(user);
            setUser(user);
        });
}

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
            editmsg.innerHTML = "Edit board number " + boardId + ".";
            const fillEditform = document.getElementById(boardId);
            editboardName.value = fillEditform.childNodes[1].innerHTML;
        };
    }
}

function closeModel(model) {
    model.childNodes[1].childNodes[1].childNodes[1].childNodes[1].childNodes[3].click();
}



function insertTable() {

    fetch("http://localhost:3030/api/boards")
    .then(response => response.json())
    .then(boards => {
        for (const key in boards) {
            const elem = document.createElement('tr');
            elem.id = boards[key].boardId;
            if (isManager == true) {
                elem.innerHTML = '<td role="button" data-href="./tasks?boardId=' + boards[key].boardId + '">' + boards[key].boardId +'</td>'
                    + '<td role="button" data-href="./tasks?boardId='+ boards[key].boardId +'">'
                    + boards[key].boardName
                    + '</td>'
                    + '<td> <button type="button" class="btn p-0 editboard" data-bs-toggle="modal" data-bs-target="#editboardmodel"><p hidden>'
                    + boards[key].boardId
                    + '</p><i class="fa-regular fa-pen-to-square"></i></button></td>'
                    + '<td><button type="button" class="btn p-0 deleteboard" data-bs-toggle="modal" data-bs-target="#deleteboardmodel"><p hidden>'
                    + boards[key].boardId
                    + '</p><i class="fa-regular fa-trash"></i></button></td>';
            }
            else {
                elem.innerHTML = '<td role="button" data-href="./tasks?boardId=' + boards[key].boardId + '">' + boards[key].boardId +'</td>'
                    + '<td role="button" data-href="./tasks?boardId='+ boards[key].boardId +'">'
                    + boards[key].boardName
                    + '</td>'
                    + '<td> <button type="button" class="btn p-0 editboard" data-bs-toggle="modal" data-bs-target="#editboardmodel"><p hidden>'
                    + boards[key].boardId
                    + '</p><i class="fa-regular fa-pen-to-square"></i></button></td>';
            }
            dropZone.appendChild(elem);
        }
        deleteBoards  = document.getElementsByClassName('deleteboard');
        deleteB();
        editBoards = document.getElementsByClassName('editboard');
        editB();
    });
};

function removeBoard(requestOptions) {
    fetch("http://localhost:3030/api/boards/", requestOptions)
    .then(response => response.text());
}

function createBoard(requestOptions) {
    fetch("http://localhost:3030/api/boards", requestOptions)
    .then(response => response.text());

}

function updateBoard(requestOptions) {
    fetch("http://localhost:3030/api/boards", requestOptions)
    .then(response => response.text());
}
