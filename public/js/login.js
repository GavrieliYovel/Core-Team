window.onload = () => {


    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const email = inputs[0].value;
        const pass  = inputs[1].value;
        
        //const user = getUser(email);
        const user = {
            email    : email,
            password : pass
        }

        if(user == null) {
            error.hidden = false;
        }
        else if (user.email == email && user.password == pass) {
            window.location = "boards?email=" + email;
        }
        else {
            error.hidden = false;
        }
    });
}

const form      = document.getElementById('sign-in');
const inputs    = document.getElementsByTagName('input');
const error     = document.getElementById('error');

function getUser(email) {
    try {
        const response =  fetch(`http://localhost:8081/api/login?email=${email}`);
        return response.json();
    } catch(error) {
        return null;
    }
}

init();

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
    // const user = getUser(userEmail);
    // if(user != null) {
    //     window.location = "./board.html?email=" + userEmail;
    // }
    if(userEmail) {
      window.location = "boards?email=" + userEmail;
    }
  }