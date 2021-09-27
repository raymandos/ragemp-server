let textLoginUsername = document.getElementById('textLoginUsername');//Through the ID we show the path to Username span
let textLoginPassword = document.getElementById('textLoginPassword');//Through the ID we show the path to Password span
function checkLogin() {//Функция валидации данных
    let userLogin = document.getElementById("userLogin").value//Through the ID we show the path to the userLogin input and its value
    let passLogin = document.getElementById("passLogin").value//Through the ID we show the path to the passLogin input and its value
    setErrorFor(textLoginUsername, '', '#000')//Show error for certain cases
    setErrorFor(textLoginPassword, '', '#000')//Show error for certain cases
    if(userLogin.length <= 4) {//Username validation and show error for span
        return setErrorFor(textLoginUsername, 'Username is too short', '#ff0000')
    } 
    if(passLogin.length <= 4) {//Password validation and show error for span
        return setErrorFor(textLoginPassword, 'Password is too short', '#ff0000')
    }
    mp.trigger('loginClient', JSON.stringify({userLogin, passLogin}))//If everything's correct, call client event with the data
}

let textRegisterUsername = document.getElementById("textRegisterUsername")//Through the ID we show the path to Username span
let textRegisterPassword = document.getElementById("textRegisterPassword")//Through the ID we show the path to Password span
function checkRegister() {//Function to check entered data
    let userRegister = document.getElementById("userRegister").value.trim()//Through the ID we show the path to the userRegister input and its value
    let passRegister = document.getElementById("passRegister").value.trim()//Through the ID we show the path to the passRegister input and its value
    setErrorFor(textRegisterUsername, '', '#000')//Function to show error for certain cases
    setErrorFor(textRegisterPassword, '', '#000')//Function to show error for certain cases
    if(userRegister.length <= 4) {//Nickname validation and return error in span
        return setErrorFor(textRegisterUsername, 'Username is too short', '#ff0000')
    } 
    if(passRegister.length <= 4) {//Password validation and return error in span
        return setErrorFor(textRegisterPassword, 'Password is too short', '#ff0000')
    }
    mp.trigger('registerClient', JSON.stringify({userRegister, passRegister}))//If everything's correct, call client event with the data
}
//Function that sets error in span
//First argument shows which span, second shows message and the third shows colour
function setErrorFor(textPart, message, color) {
	textPart.innerHTML = message
	textPart.style.color = color
}
//Function that also sets error in span
//But it works when called from client side and checks data in the database
function showError(textPart, message, color) {
	textPart.innerHTML = message
	textPart.style.color = color
}
//This part creates a sliding script between login and register forms
let loginForm = document.getElementById("login")
let regForm = document.getElementById("register")
let btn = document.getElementById("btn")
function loginScroll() {
    loginForm.style.left = "-400px"
    regForm.style.left = "50px"
    btn.style.left = "110px"
}
function registeScroll() {
    loginForm.style.left = "50px"
    regForm.style.left = "450px"
    btn.style.left = "0"
}
