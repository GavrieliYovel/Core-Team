window.onload = () => {


    form.addEventListener("submit", (event) => {
        event.preventDefault();
        console.log("sessiontest");
        const email = inputs[0].value;
        const pass  = inputs[1].value;

        //const user = getUser(email);
        const user = {
            userEmail    : email,
            userPassword : pass
        }
        const requestOptions = {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        };
        fetch(`https://core-team.onrender.com/api/session/login`, requestOptions)
            .then(async response => {
                const res = await response.text();
                console.log(res);
                if (res == "Success") {
                    window.location = "./boards";
                } else {
                    error.hidden = false;
                }
            });


    });
}

const form      = document.getElementById('sign-in');
const inputs    = document.getElementsByTagName('input');
const error     = document.getElementById('error');

// function getUser(email) {
//     try {
//         const response =  fetch(`https://core-team.onrender.com/api/login?email=${email}`);
//         return response.json();
//     } catch(error) {
//         return null;
//     }
// }

// //init();
//
// function init() {
//     const paramString = window.location.href.split('?')[1];
//     const queryString = new URLSearchParams(paramString);
//     for (let pair of queryString.entries()) {
//       if(pair[0] == "boardId") {
//         boardId = pair[1];
//       }
//       if(pair[0] == "email") {
//         userEmail = pair[1];
//       }
//     }
//     // const user = getUser(userEmail);
//     // if(user != null) {
//     //     window.location = "./board.html?email=" + userEmail;
//     // }
//     if(userEmail) {
//       window.location = "boards?email=" + userEmail;
//     }
//   }
//
// function removeBoard(requestOptions) {
//     fetch("http://localhost:3030/api/boards/", requestOptions)
//         .then(response => response.text());
// }
