// ============================================
// PFHR - Configuration and Shared Utilities
// ============================================

// API Configuration
// The API key is loaded from env.js - see env.js.example for setup instructions
// If ENV is not defined, show a warning in the console
if (typeof ENV === 'undefined') {
    console.warn('⚠️ ENV not defined. Please create env.js from env.js.example with your TMDB API key.');
}
const API_KEY = (typeof ENV !== 'undefined' && ENV.TMDB_API_KEY) ? ENV.TMDB_API_KEY : '';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';
const BACKDROP_URL = 'https://image.tmdb.org/t/p/w780';

// ============ UTILITY FUNCTIONS ============

/**
 * Get current user from localStorage
 */
function getCurrentUser() {
    const userStr = localStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
}

/**
 * Update current user in localStorage
 */
function updateCurrentUser(user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
}

/**
 * Format date to Spanish locale
 */
function formatDate(dateString) {
    if (!dateString) return 'Fecha desconocida';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });
}

/**
 * Show loading spinner
 */
function showLoading() {
    const loadingSpinner = document.getElementById('loading-spinner');
    const errorMessage = document.getElementById('error-message');
    
    if (loadingSpinner) {
        loadingSpinner.classList.remove('hidden');
    }
    if (errorMessage) {
        errorMessage.style.display = 'none';
    }
}

/**
 * Hide loading spinner
 */
function hideLoading() {
    const loadingSpinner = document.getElementById('loading-spinner');
    
    if (loadingSpinner) {
        loadingSpinner.classList.add('hidden');
    }
}

// ============ TOAST NOTIFICATION SYSTEM ============

/**
 * Show toast notification
 * @param {string} message - The message to display
 * @param {string} type - Type of toast: 'success', 'error', 'info', 'warning'
 */
function showToast(message, type = 'info') {
    // Create toast container if it doesn't exist
    let toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toast-container';
        toastContainer.className = 'toast-container';
        document.body.appendChild(toastContainer);
    }
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    // Icon based on type
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };
    
    const icon = icons[type] || icons.info;
    
    toast.innerHTML = `
        <i class="fas ${icon} toast-icon"></i>
        <span class="toast-message">${message}</span>
    `;
    
    // Add to container
    toastContainer.appendChild(toast);
    
    // Trigger animation
    setTimeout(() => {
        toast.classList.add('toast-show');
    }, 10);
    
    // Auto dismiss after 3 seconds
    setTimeout(() => {
        toast.classList.remove('toast-show');
        toast.classList.add('toast-hide');
        
        // Remove from DOM after animation
        setTimeout(() => {
            toast.remove();
            
            // Remove container if empty
            if (toastContainer.children.length === 0) {
                toastContainer.remove();
            }
        }, 300);
    }, 3000);
}
