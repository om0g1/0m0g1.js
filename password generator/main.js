let password = "";
const minLength = document.getElementById("min");
const maxLenght = document.getElementById("max");
const passwordLabel = document.getElementById("password-label");
const generateBtn = document.getElementById("generate-btn");
const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789!@#$%*()_+-=";

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

generateBtn.onclick = () => {
    password = "";
    const length = getRndInteger(parseInt(minLength.value), parseInt(maxLenght.value));
    alert(length);
    for (let i = 0; i < length; i++) {
        password += characters[getRndInteger(0, characters.length - 1)];
    }
    passwordLabel.value = password;
}