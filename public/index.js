window.addEventListener('DOMContentLoaded', (event) => {
    if (document.cookie != "") {
        document.getElementById("indexButton").innerText = "Request"
        document.getElementById("loginStatus").innerText = "Logged in as:"
        document.getElementById("loginKey").innerText = `Key: ${getCookie("key")}`
        document.getElementById("loginSecret").innerText = `Secret: ${getCookie("secret")}`
        document.getElementById("requestMy").innerText = "Request my"
        document.getElementById("selfProfile").href = `https://schoologyweb.vercel.app/self/${getCookie("key")}/${getCookie("secret")}/profile`
        document.getElementById("selfProfile").innerText = "Profile |"
        document.getElementById("selfUpdates").href = `https://schoologyweb.vercel.app/self/${getCookie("key")}/${getCookie("secret")}/updates`
        document.getElementById("selfUpdates").innerText = " Updates"
        document.getElementById("indexButtonOAuth").remove()
    } else {
        document.getElementById("signout").remove()
    }
})

function setCookie(cname, cvalue, exdays) {
    const d = new Date()
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
    let expires = "expires=" + d.toUTCString()
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/"
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function loginClick() {
    if (document.cookie == "") {
        window.location.href = "login.html"
    } else {
        window.location.href = "request.html"
    }
}

function loginOAuthClick() {
    window.location.href = "execute.html"
}

function login(form) {
    if (form.key.value == "" || form.secret.value == "") {
        alert("Please enter valid Schoology API credentials!")
    } else {
        setCookie("key", form.key.value, 365)
        setCookie("secret", form.secret.value, 365)
        window.location.href = "index.html"
    }
}

function request(form) {
    if (document.querySelector('input[name="type"]:checked') && form.userID.value != "") {
        if (document.querySelector('input[name="type"]:checked').value == "updates") {
            if (document.cookie) {
                window.location.href = `https://schoologyweb.vercel.app/request/${getCookie("key")}/${getCookie("secret")}/users/${form.userID.value}/${document.querySelector('input[name="type"]:checked').value}&start=0&limit=200`
            } else {
                window.location.href = `https://schoologyweb.vercel.app`
            }
        } else {
            window.location.href = `https://schoologyweb.vercel.app/request/${getCookie("key")}/${getCookie("secret")}/users/${form.userID.value}/${document.querySelector('input[name="type"]:checked').value}`
        }
    } else {
        alert("Invalid request!")
    }
}

function execute(form) {
    if (document.querySelector('input[name="type"]:checked') && form.userID.value != "") {
        window.location.href = `https://schoologyweb.vercel.app/execute/${form.district.value}?request=/users/${form.userID.value}/${document.querySelector('input[name="type"]:checked').value}`
    } else {
        alert("Invalid request!")
    }
}

function logout() {
    setCookie("key", "", -1)
    setCookie("secret", "", -1)
    window.location.reload()
}