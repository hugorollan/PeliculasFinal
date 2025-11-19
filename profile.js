// Profile Page JavaScript

// API Configuration
const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOTgxNWVjZTI4ZjcyNWJlZGRmY2Y3OGE0YzRjZGU0ZiIsIm5iZiI6MTc2MDQ1NjUxNS4xNDcsInN1YiI6IjY4ZWU2ZjQzNDYzMzQ0Yjg0MTlkZjQ3MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ejdXz4pm0dZn0OAVJvJ16R8SwNAa-MBkO_yttUiblLk';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

// Request Options
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
    }
};

// ============ UTILITY FUNCTIONS ============

/**
 * Get current user from localStorage
 */
function getCurrentUser() {
    const userStr = localStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
}

/**
 * Format date to month and year
 */
function formatMemberSince(dateString) {
    if (!dateString) return 'octubre de 2025';
    const date = new Date(dateString);
    const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 
                    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    return `${months[date.getMonth()]} de ${date.getFullYear()}`;
}

/**
 * Format date for display
 */
function formatDate(dateString) {
    if (!dateString) return 'Fecha desconocida';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });
}

// ============ PROFILE INITIALIZATION ============

/**
 * Initialize profile page
 */
async function initializeProfile() {
    const currentUser = getCurrentUser();
    
    // Redirect if not logged in
    if (!currentUser) {
        window.location.href = 'auth.html';
        return;
    }
    
    // Update profile header
    updateProfileHeader(currentUser);
    
    // Load user statistics
    await loadUserStatistics(currentUser);
    
    // Load favorites
    await loadUserFavorites(currentUser);
}

/**
 * Update profile header with user info
 */
function updateProfileHeader(user) {
    const avatarLetter = document.getElementById('avatar-letter');
    const profileName = document.getElementById('profile-name');
    const memberSinceDate = document.getElementById('member-since-date');
    
    if (avatarLetter) {
        avatarLetter.textContent = user.name.charAt(0).toUpperCase();
    }
    
    if (profileName) {
        profileName.textContent = user.name;
    }
    
    if (memberSinceDate) {
        memberSinceDate.textContent = formatMemberSince(user.createdAt);
    }
}

/**
 * Load user statistics
 */
async function loadUserStatistics(user) {
    const totalFavoritesEl = document.getElementById('total-favorites');
    const totalRatingsEl = document.getElementById('total-ratings');
    const movieRatingEl = document.getElementById('movie-rating');
    const tvRatingEl = document.getElementById('tv-rating');
    const movieRatingFill = document.getElementById('movie-rating-fill');
    const tvRatingFill = document.getElementById('tv-rating-fill');
    
    // Get favorites count
    const favoritesCount = user.favorites ? user.favorites.length : 0;
    
    if (totalFavoritesEl) {
        totalFavoritesEl.textContent = favoritesCount;
    }
    
    // Ratings are not implemented yet, so show 0
    if (totalRatingsEl) {
        totalRatingsEl.textContent = '0';
    }
    
    // Average ratings (placeholder - would need actual rating data)
    const avgMovieRating = 0;
    const avgTvRating = 0;
    
    if (movieRatingEl) {
        movieRatingEl.textContent = avgMovieRating.toFixed(1);
    }
    
    if (tvRatingEl) {
        tvRatingEl.textContent = avgTvRating.toFixed(1);
    }
    
    if (movieRatingFill) {
        movieRatingFill.style.width = `${(avgMovieRating / 10) * 100}%`;
    }
    
    if (tvRatingFill) {
        tvRatingFill.style.width = `${(avgTvRating / 10) * 100}%`;
    }
}

/**
 * Load user favorites
 */
async function loadUserFavorites(user) {
    const favoritesContainer = document.getElementById('profile-favorites-container');
    
    if (!favoritesContainer) return;
    
    // Check if user has favorites
    if (!user.favorites || user.favorites.length === 0) {
        favoritesContainer.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-heart"></i>
                <p>No tienes películas favoritas aún.</p>
                <a href="index.html" class="btn-primary-small">Explorar películas</a>
            </div>
        `;
        return;
    }
    
    // Clear container
    favoritesContainer.innerHTML = '';
    
    // Load first 6 favorites
    const favoritesToShow = user.favorites.slice(0, 6);
    
    try {
        // Fetch movie details for each favorite
        const moviePromises = favoritesToShow.map(movieId => 
            fetch(`${BASE_URL}/movie/${movieId}?language=es-ES`, options)
                .then(response => response.json())
                .catch(error => {
                    console.error(`Error loading movie ${movieId}:`, error);
                    return null;
                })
        );
        
        const movies = await Promise.all(moviePromises);
        
        // Filter out null results
        const validMovies = movies.filter(movie => movie !== null);
        
        if (validMovies.length === 0) {
            favoritesContainer.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-heart"></i>
                    <p>No se pudieron cargar tus películas favoritas.</p>
                </div>
            `;
            return;
        }
        
        // Create movie cards
        validMovies.forEach(movie => {
            const movieCard = createFavoriteMovieCard(movie);
            favoritesContainer.appendChild(movieCard);
        });
        
    } catch (error) {
        console.error('Error loading favorites:', error);
        favoritesContainer.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-exclamation-triangle"></i>
                <p>Error al cargar las películas favoritas.</p>
            </div>
        `;
    }
}

/**
 * Create favorite movie card element
 */
function createFavoriteMovieCard(movie) {
    const card = document.createElement('div');
    card.className = 'favorite-movie-card';
    
    const poster = document.createElement('div');
    poster.className = 'favorite-movie-poster';
    
    if (movie.poster_path) {
        const img = document.createElement('img');
        img.src = `${IMAGE_URL}${movie.poster_path}`;
        img.alt = movie.title;
        img.loading = 'lazy';
        poster.appendChild(img);
    }
    
    const info = document.createElement('div');
    info.className = 'favorite-movie-info';
    
    const title = document.createElement('div');
    title.className = 'favorite-movie-title';
    title.textContent = movie.title;
    
    const date = document.createElement('div');
    date.className = 'favorite-movie-date';
    date.textContent = formatDate(movie.release_date);
    
    info.appendChild(title);
    info.appendChild(date);
    
    card.appendChild(poster);
    card.appendChild(info);
    
    // Make card clickable (could open movie detail)
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => {
        // For now, just redirect to index
        window.location.href = `index.html#movie-${movie.id}`;
    });
    
    return card;
}

// ============ INITIALIZATION ============

// Check auth status and initialize profile on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeProfile();
});
