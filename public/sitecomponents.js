let navbar = `

`;

// romania :flag_ro:
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let cookies = decodedCookie.split(';');
    for(let i = 0; i < cookies.length; i++) {
        let cur = cookies[i];
        while (cur.charAt(0) == ' ') {
            cur = cur.substring(1);
        }
        if (cur.indexOf(name) == 0) {
            return cur.substring(name.length, cur.length);
        }
    }
    return "";
}
function deleteAllCookies() {
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}

function loadNavBar() {
    document.getElementById("navbar").innerHTML = navbar;
}

function setError(error) {
    document.getElementById("error").innerText = error;
}

function validatePage() {
    let email = getCookie("email");
    let password = getCookie("password");

    $.post("/signin", { "email": email, "password": password }, function(data, status) {
        console.log(document.cookie);
        console.log(data);
        if (!data.success) {
            logout();
        }
    })
}

function loginCookie(email, password) {
    document.cookie = `email=${email}`;
    document.cookie = `password=${password}`;
}

function login() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    $.post("/signin", { "email": email, "password": password }, function(data, status) {
        console.log(data);
        if (!data.success) {
            setError(data.error);
        }
        else {
            loginCookie(email, password);
            window.location = "/testingplace";
        }
    })
}
function logout() {
    deleteAllCookies();
    console.log(document.cookie);
    window.location = "/login";
}
function register() {
    let email = document.getElementById("email").value;
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirm-password").value;
    let gender = document.getElementById("gender").value;

    let birthdayDate = document.getElementById("birthday").value.split("-");
    let birthdayTimestamp = new Date(birthdayDate[2], birthdayDate[1] - 1, birthdayDate[0]).getTime();
    
    if (password != confirmPassword) {
        setError("Confirmed password doesn't match.");
        return;
    }

    let sentData = { "email": email, "username": username, "password": password, "gender": gender, "birthday": birthdayTimestamp };
    console.log(sentData);

    $.post("/signup", sentData, function(data, status) {
        console.log(data);
        if (!data.success) {
            setError(data.message);
        }
        else {
            loginCookie(email, password);
            window.location = "/testingplace";
        }
    })
}

function newServer(name, allowInvites) {
    let email = getCookie("email");
    let password = getCookie("password");

    $.post("/signin", {
        "email": email, "password": password,
        
        "name": name,
        "icon": "", 
        "allowInvites": allowInvites
    }, function(data, status) {
        //
    });;
}

function loadUserData() {
    let email = getCookie("email");
    let password = getCookie("password");

    $.post("/getUserData", {
        "email": email, "password": password,
    }, function(data, status) {
        currentUser = data;
    });
}

function loadServerBar() {

}