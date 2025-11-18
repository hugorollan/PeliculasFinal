// API Configuration
const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOTgxNWVjZTI4ZjcyNWJlZGRmY2Y3OGE0YzRjZGU0ZiIsIm5iZiI6MTc2MDQ1NjUxNS4xNDcsInN1YiI6IjY4ZWU2ZjQzNDYzMzQ0Yjg0MTlkZjQ3MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ejdXz4pm0dZn0OAVJvJ16R8SwNAa-MBkO_yttUiblLk';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';
const BACKDROP_URL = 'https://image.tmdb.org/t/p/w780';

// DOM Elements
const trendingContainer = document.getElementById('trending-container');
const popularContainer = document.getElementById('popular-container');
const trailersContainer = document.getElementById('trailers-container');
const loadingSpinner = document.getElementById('loading-spinner');
const errorMessage = document.getElementById('error-message');
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

// Request Options
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
    }
};

// State Management
let currentTrendingTime = 'day';
let currentPopularCategory = 'streaming';
let currentTrailerCategory = 'streaming';

// ============ UTILITY FUNCTIONS ============

/**
 * Show loading spinner
 */
function showLoading() {
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
    if (loadingSpinner) {
        loadingSpinner.classList.add('hidden');
    }
}

/**
 * Show error message
 */
function showError() {
    hideLoading();
    if (errorMessage) {
        errorMessage.style.display = 'flex';
    }
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
 * Get rating color based on percentage
 */
function getRatingColor(percent) {
    if (percent >= 70) return '#21d07a'; // Green
    if (percent >= 40) return '#d2d531'; // Yellow
    return '#db2360'; // Red
}

/**
 * Create movie card element
 */
function createMovieCard(movie) {
    const { title, poster_path, vote_average, release_date, id } = movie;
    
    if (!poster_path) return null; // Skip movies without posters
    
    const percent = Math.round(vote_average * 10);
    const borderColor = getRatingColor(percent);
    const dateStr = formatDate(release_date);

    const card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('data-movie-id', id);
    
    card.innerHTML = `
        <div class="image-content">
            <img src="${IMAGE_URL + poster_path}" alt="${title}" loading="lazy">
            <div class="options-icon" aria-label="Opciones">
                <i class="fas fa-ellipsis-h"></i>
            </div>
            <div class="percent-circle" style="border-color: ${borderColor}">
                ${percent}<sup>%</sup>
            </div>
        </div>
        <div class="card-content">
            <h2 title="${title}">${title}</h2>
            <p>${dateStr}</p>
        </div>
    `;

    return card;
}

/**
 * Create trailer card element
 */
function createTrailerCard(movie) {
    const { title, backdrop_path, id } = movie;
    
    if (!backdrop_path) return null;

    const card = document.createElement('div');
    card.classList.add('trailer-card');
    card.setAttribute('data-movie-id', id);
    
    card.innerHTML = `
        <div class="trailer-thumbnail">
            <img src="${BACKDROP_URL + backdrop_path}" alt="${title}" loading="lazy">
            <div class="play-button" aria-label="Reproducir tráiler">
                <i class="fas fa-play"></i>
            </div>
        </div>
        <div class="trailer-info">
            <h3>${title}</h3>
            <p>Ver tráiler</p>
        </div>
    `;

    return card;
}

// ============ API FUNCTIONS ============

/**
 * Fetch trending movies
 */
async function getTrendingMovies(timeWindow = 'day') {
    const url = `${BASE_URL}/trending/movie/${timeWindow}?language=es-ES`;
    
    try {
        showLoading();
        const res = await fetch(url, options);
        
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const data = await res.json();
        displayMovies(data.results, trendingContainer);
        hideLoading();
    } catch (error) {
        console.error('Error fetching trending movies:', error);
        showError();
    }
}

/**
 * Fetch popular movies
 */
async function getPopularMovies() {
    const url = `${BASE_URL}/movie/popular?language=es-ES&page=1`;
    
    try {
        const res = await fetch(url, options);
        
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const data = await res.json();
        displayMovies(data.results, popularContainer);
    } catch (error) {
        console.error('Error fetching popular movies:', error);
    }
}

/**
 * Fetch movies for trailers section
 */
async function getUpcomingMovies() {
    const url = `${BASE_URL}/movie/upcoming?language=es-ES&page=1`;
    
    try {
        const res = await fetch(url, options);
        
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const data = await res.json();
        displayTrailers(data.results);
    } catch (error) {
        console.error('Error fetching upcoming movies:', error);
    }
}

/**
 * Search movies
 */
async function searchMovies(query) {
    if (!query.trim()) return;
    
    const url = `${BASE_URL}/search/movie?language=es-ES&query=${encodeURIComponent(query)}&page=1`;
    
    try {
        showLoading();
        const res = await fetch(url, options);
        
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const data = await res.json();
        
        if (data.results && data.results.length > 0) {
            displayMovies(data.results, trendingContainer);
            hideLoading();
            
            // Scroll to results
            trendingContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
            hideLoading();
            trendingContainer.innerHTML = '<p class="text-center" style="padding: 40px; color: var(--text-secondary);">No se encontraron resultados para tu búsqueda.</p>';
        }
    } catch (error) {
        console.error('Error searching movies:', error);
        showError();
    }
}

// ============ DISPLAY FUNCTIONS ============

/**
 * Display movies in container
 */
function displayMovies(movies, container) {
    if (!container) return;
    
    container.innerHTML = '';
    
    const fragment = document.createDocumentFragment();
    
    movies.forEach(movie => {
        const card = createMovieCard(movie);
        if (card) {
            fragment.appendChild(card);
        }
    });
    
    container.appendChild(fragment);
}

/**
 * Display trailers
 */
function displayTrailers(movies) {
    if (!trailersContainer) return;
    
    trailersContainer.innerHTML = '';
    
    const fragment = document.createDocumentFragment();
    
    // Take first 10 movies for trailers
    movies.slice(0, 10).forEach(movie => {
        const card = createTrailerCard(movie);
        if (card) {
            fragment.appendChild(card);
        }
    });
    
    trailersContainer.appendChild(fragment);
}

// ============ EVENT HANDLERS ============

/**
 * Handle toggle selector clicks
 */
function setupToggleSelectors() {
    // Trending toggle (Hoy / Esta semana)
    const trendingToggles = document.querySelectorAll('.trending-section .toggle-item');
    trendingToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            // Remove active class from all
            trendingToggles.forEach(t => {
                t.classList.remove('active');
                t.setAttribute('aria-selected', 'false');
            });
            
            // Add active class to clicked
            this.classList.add('active');
            this.setAttribute('aria-selected', 'true');
            
            // Get time window
            const timeWindow = this.getAttribute('data-time');
            currentTrendingTime = timeWindow;
            
            // Fetch new data
            getTrendingMovies(timeWindow);
        });
    });

    // Popular toggle
    const popularToggles = document.querySelectorAll('.popular-section .toggle-item');
    popularToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            popularToggles.forEach(t => {
                t.classList.remove('active');
                t.setAttribute('aria-selected', 'false');
            });
            
            this.classList.add('active');
            this.setAttribute('aria-selected', 'true');
            
            const category = this.getAttribute('data-category');
            currentPopularCategory = category;
            
            // For now, all categories show popular movies
            // In a full implementation, you'd fetch different data per category
            getPopularMovies();
        });
    });

    // Trailers toggle
    const trailerToggles = document.querySelectorAll('.latest-trailers-section .toggle-item');
    trailerToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            trailerToggles.forEach(t => {
                t.classList.remove('active');
                t.setAttribute('aria-selected', 'false');
            });
            
            this.classList.add('active');
            this.setAttribute('aria-selected', 'true');
            
            const category = this.getAttribute('data-trailer');
            currentTrailerCategory = category;
            
            // For now, all categories show upcoming movies
            getUpcomingMovies();
        });
    });
}

/**
 * Handle search form submission
 */
function setupSearchForm() {
    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const query = searchInput.value.trim();
            
            if (query) {
                searchMovies(query);
            }
        });
    }
}

/**
 * Setup keyboard accessibility for language box
 */
function setupAccessibility() {
    const langBox = document.querySelector('.lang-box');
    if (langBox) {
        langBox.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                // Language toggle functionality would go here
                console.log('Language toggle clicked');
            }
        });
    }
}

// ============ INITIALIZATION ============

/**
 * Initialize the application
 */
function init() {
    console.log('Initializing TMDB application...');
    
    // Setup event handlers
    setupToggleSelectors();
    setupSearchForm();
    setupAccessibility();
    
    // Load initial data
    getTrendingMovies('day');
    getPopularMovies();
    getUpcomingMovies();
    
    console.log('Application initialized successfully!');
}

// Start the application when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
