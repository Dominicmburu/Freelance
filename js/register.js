const loginLink = document.getElementById('login-link');
const registerLink = document.getElementById('register-link');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');   

const formTitle = document.getElementById('form-title');
const   
formContainer = document.getElementById('form-container');

registerLink.addEventListener('click', () => {
    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
    formTitle.textContent = 'Register';
});

loginLink.addEventListener('click', () => {
    registerForm.style.display = 'none';
    loginForm.style.display = 'block';
    formTitle.textContent = 'Login';
});