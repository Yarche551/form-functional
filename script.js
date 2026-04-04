// работа с элементами
let name = document.getElementById('name');
let username = document.getElementById('username');
let email = document.getElementById('email');
let password = document.getElementById('password');
let repeatPassword = document.getElementById('repeat-password');
let checkbox = document.getElementById('checkbox');
let flag = document.getElementById('flag');

// лейблы к инпутам
let labelName = document.getElementById('labelName-error');
let labelUsername = document.getElementById('labelUsername-error');
let labelEmail = document.getElementById('labelEmail-error');
let labelPassword = document.getElementById('labelPassword-error');
let labelRepeatPassword = document.getElementById('labelRepeatPassword-error');
let labelCheckbox = document.getElementById('labelCheckbox-error');

// для работы с popup и формой
let popupButton = document.querySelector('.popup-btn');
let popup = document.getElementById('popup');
let myForm = document.getElementById('form');

// для 6 пункта (из прошлой дз)
let mainTitle = document.querySelector('.main-title');
let fullNameBlock = document.querySelector('.form-name');
let emailBlock = document.querySelector('.form-email');
let repeatPasswordBlock = document.querySelector('.form-repeat-password');
let link = document.querySelector('.link');
let btn = document.getElementById('sign-up');


// для localStorage
let users = [];

// регистрация или вход
let isLogin = false;



function userCabinet(user) {
    mainTitle.innerText = `Welcome, ${user.name}!`;
    btn.innerText = 'Exit';
    btn.onclick = () => location.reload();

    document.querySelector('.main-text').remove();
    username.remove();
    password.remove();
    username.remove();
    name.remove();
    password.remove();

    // убрать все лейблы
    document.querySelectorAll('label').forEach(label => label.remove());
}

// log
function switchToLogin() {
    isLogin = true;
    btn.classList.add('sign-in');

    mainTitle.innerText = 'Log in to the system';
    link.innerText = 'Registration';
    link.style.cursor = 'pointer';

    fullNameBlock.remove();
    emailBlock.remove();
    repeatPasswordBlock.remove();
    checkbox.remove();
    labelCheckbox.remove();
    popup.remove();


    btn.innerText = 'Sign in';

    // флаг - вход
    if (btn.classList.contains('sign-in')) {
        btn.onclick = function () {

            // сброс ошибок
            labelUsername.style.display = 'none';
            username.classList.remove('border-error');
            labelPassword.style.display = 'none';
            password.classList.remove('border-error');

            if (!username.value) {
                labelUsername.style.display = 'block';
                labelUsername.innerText = 'Заполните поле username';
                username.classList.add('border-error');
                return;
            }

            if (!password.value) {
                labelPassword.style.display = 'block';
                labelPassword.innerText = 'Введите пароль';
                password.classList.add('border-error');
                return;
            }

            // поиск пользователя
            const user = users.find(u => u.username === username.value);
            if (!user) {
                labelUsername.style.display = 'block';
                labelUsername.innerText = 'Такой пользователь не зарегистрирован';
                username.classList.add('border-error');
                return;
            }

            if (user.password !== password.value) {
                labelPassword.style.display = 'block';
                labelPassword.innerText = 'Неверный пароль';
                password.classList.add('border-error');
                return;
            }

            userCabinet(user);
        }
    }
}

// reg
function switchToRegistration() {

    // флаг - регистрация
    isLogin = false;
    location.reload();
}

name.onkeydown = (e) => {
    let number = parseInt(e.key);
    if (!isNaN(number)) {
        return false;
    }
}

username.onkeydown = (e) => {
    if (e.key === '.' || e.key === ',') {
        return false;
    }
}


flag.onchange = () => {
    if (!flag.checked) {
        console.log('Не Согласен');
    } else {
        console.log('Согласен');
    }
}


link.onclick = function () {
    if (isLogin === false) {
        switchToLogin();
    } else {
        switchToRegistration();
    }
}


popupButton.addEventListener('click', function () {
    popup.style.display = 'none';
    myForm.reset();
    switchToLogin();
});


btn.addEventListener('click', () => {
    let hasError = false;
    isLogin = true;

    // name
    if (!name.value) {
        hasError = true;
        labelName.style.display = 'block';
        name.classList.add('border-error')
    } else {
        hasError = false;
        labelName.style.display = 'none';
        name.classList.remove('border-error')
    }

    // username
    let usernameRegex = /^[\w-]+$/;
    if (!username.value) {
        hasError = true;
        labelUsername.style.display = 'block';
        labelUsername.innerText = 'Заполните поле username';
        username.classList.add('border-error');
    } else if (!usernameRegex.test(username.value)) {
        hasError = true;
        labelUsername.style.display = 'block';
        labelUsername.innerText = 'Можно использовать только буквы, цифры, подчеркивание и тире';
        username.classList.add('border-error');
    } else {
        hasError = false;
        labelUsername.style.display = 'none';
        username.classList.remove('border-error');
    }

    // email
    if (!email.value) {
        hasError = true;
        labelEmail.style.display = 'block';
        email.classList.add('border-error');
    } else {
        if (!email.checkValidity()) {
            hasError = true;
            labelEmail.innerText = 'Введите корректный E-mail';
            labelEmail.style.display = 'block';
            email.classList.add('border-error');
        }
        else {
            hasError = false;
            labelEmail.style.display = 'none';
            email.classList.remove('border-error');
        }
    }

    // жесть с паролем
    let passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\.\<\>\&\%\#\@\=\-\?\!\~\+]).{8,}$/;
    if (!password.value) {
        hasError = true;
        labelPassword.innerText = 'Придумайте пароль';
        labelPassword.style.display = 'block';
        password.classList.add('border-error');
    } else if (!passwordRegex.test(password.value)) {
        hasError = true;
        labelPassword.innerText = 'Пароль должен быть не менее 8 символов и содержать хотя бы одну заглавную букву, одну цифру и один специальный символ';
        labelPassword.style.display = 'block';
        password.classList.add('border-error');
    } else {
        hasError = false;
        labelPassword.style.display = 'none';
        password.classList.remove('border-error');
    }

    // repeat password    
    if ((password.value.length >= 8) && (password.value === repeatPassword.value)) {
        hasError = false;
        labelRepeatPassword.style.display = 'none';
        repeatPassword.classList.remove('border-error');
    }
    if ((password.value.length >= 8) && (repeatPassword.value.length > 0) && (password.value !== repeatPassword.value)) {
        hasError = true;
        labelRepeatPassword.style.display = 'block';
        labelRepeatPassword.innerText = 'Пароли не совпадают';
        repeatPassword.classList.add('border-error');
    }
    if ((repeatPassword.value.length === 0) && (password.value.length >= 8)) {
        hasError = true;
        labelRepeatPassword.style.display = 'block';
        labelRepeatPassword.innerText = 'Повторите пароль';
        repeatPassword.classList.add('border-error');
    }


    // flag
    if (!flag.checked) {
        hasError = true;
        labelCheckbox.style.display = 'block';
    }

    if (!hasError) {
        popup.style.display = 'block';
        const user = {
            name: name.value,
            username: username.value,
            email: email.value,
            password: password.value
        };
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
        console.log(users);
    }



});
