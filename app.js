// API Configuration for json-server
const API_URL = 'http://localhost:3000/usuarios';

// DOM Elements
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const loginFormContainer = document.getElementById('login-form-container');
const registerFormContainer = document.getElementById('register-form-container');
const showRegisterLink = document.getElementById('show-register');
const showLoginLink = document.getElementById('show-login');
const loginError = document.getElementById('login-error');
const registerError = document.getElementById('register-error');
const registerSuccess = document.getElementById('register-success');

// ============ UTILITY FUNCTIONS ============

/**
 * Show error message
 */
function showError(element, message) {
    element.textContent = message;
    element.style.display = 'flex';
}

/**
 * Hide error message
 */
function hideError(element) {
    element.style.display = 'none';
    element.textContent = '';
}

/**
 * Show success message
 */
function showSuccess(element, message) {
    element.textContent = message;
    element.style.display = 'flex';
}

/**
 * Hide success message
 */
function hideSuccess(element) {
    element.style.display = 'none';
    element.textContent = '';
}

/**
 * Validate email format
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Save user session to localStorage
 */
function saveUserSession(user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
}

/**
 * Get current user session from localStorage
 */
function getCurrentUser() {
    const userStr = localStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
}

/**
 * Clear user session from localStorage
 */
function clearUserSession() {
    localStorage.removeItem('currentUser');
}

// ============ AUTHENTICATION FUNCTIONS ============

/**
 * Register new user
 */
async function registerUser(name, email, password) {
    try {
        // Check if user already exists
        const response = await fetch(`${API_URL}?email=${encodeURIComponent(email)}`);
        
        if (!response.ok) {
            throw new Error('Error al verificar el correo electrónico');
        }
        
        const existingUsers = await response.json();
        
        if (existingUsers.length > 0) {
            throw new Error('Este correo electrónico ya está registrado');
        }
        
        // Create new user
        const newUser = {
            name: name.trim(),
            email: email.trim().toLowerCase(),
            password: password, // En producción, esto debería estar hasheado
            createdAt: new Date().toISOString(),
            favorites: []
        };
        
        const createResponse = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        });
        
        if (!createResponse.ok) {
            throw new Error('Error al crear la cuenta');
        }
        
        const createdUser = await createResponse.json();
        return createdUser;
        
    } catch (error) {
        console.error('Error in registerUser:', error);
        throw error;
    }
}

/**
 * Login user
 */
async function loginUser(email, password) {
    try {
        // Get users with matching email
        const response = await fetch(`${API_URL}?email=${encodeURIComponent(email.trim().toLowerCase())}`);
        
        if (!response.ok) {
            throw new Error('Error al verificar las credenciales');
        }
        
        const users = await response.json();
        
        if (users.length === 0) {
            throw new Error('Correo electrónico o contraseña incorrectos');
        }
        
        const user = users[0];
        
        // Verify password (en producción, comparar hashes)
        if (user.password !== password) {
            throw new Error('Correo electrónico o contraseña incorrectos');
        }
        
        // Return user without password
        const { password: _, ...userWithoutPassword } = user;
        return userWithoutPassword;
        
    } catch (error) {
        console.error('Error in loginUser:', error);
        throw error;
    }
}

// ============ EVENT HANDLERS ============

/**
 * Handle register form submission
 */
if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        hideError(registerError);
        hideSuccess(registerSuccess);
        
        const name = document.getElementById('register-name').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        const passwordConfirm = document.getElementById('register-password-confirm').value;
        
        // Validation
        if (!name.trim()) {
            showError(registerError, 'Por favor, ingresa tu nombre');
            return;
        }
        
        if (!email.trim()) {
            showError(registerError, 'Por favor, ingresa tu correo electrónico');
            return;
        }
        
        if (!isValidEmail(email)) {
            showError(registerError, 'Por favor, ingresa un correo electrónico válido');
            return;
        }
        
        if (password.length < 6) {
            showError(registerError, 'La contraseña debe tener al menos 6 caracteres');
            return;
        }
        
        if (password !== passwordConfirm) {
            showError(registerError, 'Las contraseñas no coinciden');
            return;
        }
        
        // Disable submit button
        const submitBtn = registerForm.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creando cuenta...';
        
        try {
            const user = await registerUser(name, email, password);
            
            showSuccess(registerSuccess, '¡Cuenta creada exitosamente! Redirigiendo al login...');
            registerForm.reset();
            
            // Redirect to login after 2 seconds
            setTimeout(() => {
                if (loginFormContainer && registerFormContainer) {
                    registerFormContainer.style.display = 'none';
                    loginFormContainer.style.display = 'block';
                    hideSuccess(registerSuccess);
                }
            }, 2000);
            
        } catch (error) {
            showError(registerError, error.message);
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fas fa-user-plus"></i> Crear Cuenta';
        }
    });
}

/**
 * Handle login form submission
 */
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        hideError(loginError);
        
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        
        // Validation
        if (!email.trim()) {
            showError(loginError, 'Por favor, ingresa tu correo electrónico');
            return;
        }
        
        if (!password) {
            showError(loginError, 'Por favor, ingresa tu contraseña');
            return;
        }
        
        // Disable submit button
        const submitBtn = loginForm.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Iniciando sesión...';
        
        try {
            const user = await loginUser(email, password);
            
            // Save session
            saveUserSession(user);
            
            // Redirect to main page
            window.location.href = 'index.html';
            
        } catch (error) {
            showError(loginError, error.message);
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Iniciar Sesión';
        }
    });
}

/**
 * Toggle between login and register forms
 */
if (showRegisterLink) {
    showRegisterLink.addEventListener('click', (e) => {
        e.preventDefault();
        loginFormContainer.style.display = 'none';
        registerFormContainer.style.display = 'block';
        hideError(loginError);
    });
}

if (showLoginLink) {
    showLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        registerFormContainer.style.display = 'none';
        loginFormContainer.style.display = 'block';
        hideError(registerError);
        hideSuccess(registerSuccess);
    });
}

// ============ INITIALIZATION ============

/**
 * Check if user is already logged in (for main page)
 */
function checkAuthStatus() {
    const currentUser = getCurrentUser();
    
    if (currentUser) {
        updateUIForAuthenticatedUser(currentUser);
    }
}

/**
 * Update UI for authenticated user
 */
function updateUIForAuthenticatedUser(user) {
    // Find the login/register links in navbar
    const navRight = document.querySelector('.nav-right');
    
    if (navRight) {
        // Remove login and register links
        const loginLink = navRight.querySelector('a[href="auth.html"]:not(.btn-join)');
        const joinBtn = navRight.querySelector('.btn-join');
        
        if (loginLink) loginLink.remove();
        if (joinBtn) joinBtn.remove();
        
        // Show favorites toggle button
        const favoritesToggleBtn = document.getElementById('favorites-toggle-btn');
        if (favoritesToggleBtn) {
            favoritesToggleBtn.style.display = 'block';
        }
        
        // Create user profile section
        const userProfile = document.createElement('div');
        userProfile.className = 'user-profile';
        
        const userAvatar = document.createElement('div');
        userAvatar.className = 'user-avatar';
        userAvatar.textContent = user.name.charAt(0).toUpperCase();
        
        const userName = document.createElement('span');
        userName.className = 'user-name';
        userName.textContent = user.name;
        
        const logoutBtn = document.createElement('button');
        logoutBtn.className = 'btn-logout';
        logoutBtn.innerHTML = '<i class="fas fa-sign-out-alt"></i> Cerrar Sesión';
        logoutBtn.addEventListener('click', handleLogout);
        
        userProfile.appendChild(userAvatar);
        userProfile.appendChild(userName);
        userProfile.appendChild(logoutBtn);
        
        navRight.appendChild(userProfile);
    }
}

/**
 * Handle logout
 */
function handleLogout() {
    clearUserSession();
    window.location.href = 'index.html';
}

// ============ AUTO-INITIALIZATION ============

// Check auth status on main page
if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
    document.addEventListener('DOMContentLoaded', checkAuthStatus);
}

// Redirect if already logged in on auth page
if (window.location.pathname.endsWith('auth.html')) {
    const currentUser = getCurrentUser();
    if (currentUser) {
        window.location.href = 'index.html';
    }
}
