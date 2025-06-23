// Simple user storage
let users = [];

// Switch between forms
function showForm(formId) {
    document.querySelectorAll('.auth-section').forEach(section => {
        section.classList.add('hidden');
    });
    document.getElementById(formId).classList.remove('hidden');
    clearMessages();
}

// Clear all messages
function clearMessages() {
    document.querySelectorAll('.success-message, .error-message').forEach(msg => {
        msg.classList.remove('show');
    });
}

// Show message
function showMessage(id, text) {
    const element = document.getElementById(id);
    if (text) element.textContent = text;
    element.classList.add('show');
}

// Handle login logic
function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        showMessage('loginSuccess', `Welcome back, ${user.name}!`);
    } else {
        showMessage('loginEmailError', 'Invalid email or password');
    }
}

// Handle signup logic
function handleSignup(e) {
    e.preventDefault();
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // Simple validation
    if (password !== confirmPassword) {
        showMessage('confirmPasswordError', 'Passwords do not match');
        return;
    }
    
    if (users.find(u => u.email === email)) {
        showMessage('signupEmailError', 'Email already exists');
        return;
    }
    
    // Add user
    users.push({ name, email, password });
    showMessage('signupSuccess');
    
    // Switch to login after 2 seconds
    setTimeout(() => {
        showForm('loginForm');
        document.getElementById('loginEmail').value = email;
    }, 2000);
}

// Handle forgot password
function handleForgotPassword(e) {
    e.preventDefault();
    const email = document.getElementById('forgotEmail').value;
    showMessage('forgotPasswordSuccess');
}

// Add event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Form submit
    document.getElementById('loginFormElement').addEventListener('submit', handleLogin);
    document.getElementById('signupFormElement').addEventListener('submit', handleSignup);
    document.getElementById('forgotPasswordFormElement').addEventListener('submit', handleForgotPassword);

    // Navigation Routes
    document.getElementById('showSignup').addEventListener('click', () => showForm('signupForm'));
    document.getElementById('showLogin').addEventListener('click', () => showForm('loginForm'));
    document.getElementById('showForgotPassword').addEventListener('click', () => showForm('forgotPasswordForm'));
    document.getElementById('backToLogin').addEventListener('click', () => showForm('loginForm'));
});