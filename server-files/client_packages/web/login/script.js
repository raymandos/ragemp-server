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
    if(userRegister.length <= 4) {//Валидация никнейма и вывод ошибки в спан
        return setErrorFor(textRegisterUsername, 'Username is too short', '#ff0000')
    } 
    if(passRegister.length <= 4) {//Валидация пароля и вывод ошибки в спан
        return setErrorFor(textRegisterPassword, 'Password is too short', '#ff0000')
    }
    mp.trigger('registerClient', JSON.stringify({userRegister, passRegister}))//Если всё гуд, то вызов на клиент ивента с внесёнными данными
}
//Функция которая будет заносить ошибку в спан.
//Первым аргументом указывается в какой именно, вторым аргументом - сообщение. Третьим - цвет
function setErrorFor(textPart, message, color) {
	textPart.innerHTML = message
	textPart.style.color = color
}
//Эта функция так же заносит в определенный спан ошибку.
//Но она срабатывает, когда вызывается с клиента на сервер, для валидации данных с БД.
function showError(textPart, message, color) {
	textPart.innerHTML = message
	textPart.style.color = color
}
//Не буду на этом заострять внимание. Этот кусок кода является как бы слайдером для перемещения
//Между формой регистрации и формой авторизации.
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
