// let arr = []

var url = "http://localhost:3000";

function signUpForm() {

    let name = document.getElementById("names").value;
    let email = document.getElementById("emails").value.toLowerCase();
    let gender = document.getElementById("gender").value;
    let phone = document.getElementById("phone").value;
    // let nationality = document.getElementById("Nationality").value;
    let password = document.getElementById("passwords").value;

    var user = {
        name: name,
        email: email,
        gender: gender,
        phone: phone,
        // nationality: nationality,
        password: password,
    }
    // arr.push(user)

    const Http = new XMLHttpRequest();
    Http.open("POST", url + "/signup");
    Http.setRequestHeader("Content-Type", "application/json");
    Http.send(JSON.stringify(user));

    Http.onreadystatechange = (e) => {
        console.log(Http.responseText)
        document.getElementById("show").innerHTML = Http.responseText;
        // alert(Http.responseText)

    }
    return false;

}



function LoginForm() {

    let loginEmail = document.getElementById("loginEmail").value;
    let loginPass = document.getElementById("loginPass").value;

 

    const Http = new XMLHttpRequest();
    Http.open("POST", url + "/login");
    Http.setRequestHeader("Content-type", "application/json")

    Http.send(JSON.stringify({
        email: loginEmail,
        password: loginPass
    }));

    Http.onreadystatechange = (e) => {
        console.log(Http.responseText);
        document.getElementById("daashbord").innerHTML = Http.responseText;
        // window.location.href = "profile.html"

    }
    return false;
}
