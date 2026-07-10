const API_URL = 'http://localhost:5000/api/users';

let isLoginMode = true;

const authForm = document.getElementById('auth-form');
const authTitle = document.getElementById('auth-title');
const authBtn = document.getElementById('auth-btn');
const toggleAuthBtn = document.getElementById('toggle-auth-btn');
const nameInput = document.getElementById('nameInput');
const emailInput = document.getElementById('emailInput');
const passwordInput = document.getElementById('passwordInput');

toggleAuthBtn.addEventListener('click', () => {
    isLoginMode = !isLoginMode;
    if (isLoginMode) {
        authTitle.innerText = 'Login';
        authBtn.innerText = 'Login';
        toggleAuthBtn.innerText = "Don't have an account? Register";
        nameInput.style.display = 'none';
        nameInput.required = false;
    } else {
        authTitle.innerText = 'Register';
        authBtn.innerText = 'Register';
        toggleAuthBtn.innerText = 'Already have an account? Login';
        nameInput.style.display = 'block';
        nameInput.required = true;
    }
});

authForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const endpoint = isLoginMode ? '/login' : '/register';
    const payload = {
        email: emailInput.value,
        password: passwordInput.value
    };

    if (!isLoginMode) {
        payload.name = nameInput.value;
    }

    try {
        const response = await fetch(API_URL + endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('userInfo', JSON.stringify(data));
            window.location.href = 'index.html';
        } else {
            alert(data.message);
        }
    } catch (error) {
        alert('Something went wrong. Please check if the server is running.');
    }
});