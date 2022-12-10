window.onload = () => {


    form.addEventListener("submit", (event) => {
        event.preventDefault();
        console.log("sessiontest");
        const email = inputs[0].value;
        const pass  = inputs[1].value;

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
        fetch(process.env.LOCAL_PATH + "/api/session/login", requestOptions)
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


