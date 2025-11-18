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
const movieModal = document.getElementById('movie-modal');
const movieDetailContainer = document.getElementById('movie-detail-container');

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
    card.style.cursor = 'pointer';
    
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

    // Add click event to open movie details
    card.addEventListener('click', () => openMovieDetails(id));

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
    card.style.cursor = 'pointer';
    
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

    // Add click event to open movie details
    card.addEventListener('click', () => openMovieDetails(id));

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

/**
 * Sanitize text to prevent XSS attacks
 */
function sanitizeText(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Search movies by keyword
 */
async function searchMoviesByKeyword(keywordId, keywordName) {
    const url = `${BASE_URL}/discover/movie?language=es-ES&with_keywords=${keywordId}&sort_by=popularity.desc&page=1`;
    
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
            
            // Update section title to show keyword search (using textContent is safe)
            const trendingTitle = document.getElementById('trending-title');
            if (trendingTitle) {
                trendingTitle.textContent = `Películas con la palabra clave: "${keywordName}"`;
            }
            
            // Scroll to results
            trendingContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
            hideLoading();
            const noResultsDiv = document.createElement('p');
            noResultsDiv.className = 'text-center';
            noResultsDiv.style.padding = '40px';
            noResultsDiv.style.color = 'var(--text-secondary)';
            noResultsDiv.textContent = `No se encontraron películas con la palabra clave "${keywordName}".`;
            trendingContainer.innerHTML = '';
            trendingContainer.appendChild(noResultsDiv);
        }
    } catch (error) {
        console.error('Error searching movies by keyword:', error);
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

// ============ MOVIE DETAIL FUNCTIONS ============

/**
 * Open movie details modal
 */
async function openMovieDetails(movieId) {
    if (!movieModal || !movieDetailContainer) return;
    
    // Show modal with loading state
    movieModal.style.display = 'block';
    movieDetailContainer.innerHTML = '<div class="loading-spinner"><div class="spinner"></div><p>Cargando detalles...</p></div>';
    document.body.style.overflow = 'hidden';
    
    try {
        // Fetch all required data in parallel
        const [details, credits, reviews, videos, recommendations, keywords] = await Promise.all([
            fetchMovieDetails(movieId),
            fetchMovieCredits(movieId),
            fetchMovieReviews(movieId),
            fetchMovieVideos(movieId),
            fetchMovieRecommendations(movieId),
            fetchMovieKeywords(movieId)
        ]);
        
        // Display the movie details
        displayMovieDetails({
            details,
            credits,
            reviews,
            videos,
            recommendations,
            keywords
        });
    } catch (error) {
        console.error('Error loading movie details:', error);
        movieDetailContainer.innerHTML = '<div class="error-message"><i class="fas fa-exclamation-triangle"></i><p>Error al cargar los detalles de la película.</p></div>';
    }
}

/**
 * Close movie details modal
 */
function closeMovieDetails() {
    if (movieModal) {
        movieModal.style.display = 'none';
        document.body.style.overflow = '';
    }
}

/**
 * Fetch movie details
 */
async function fetchMovieDetails(movieId) {
    const url = `${BASE_URL}/movie/${movieId}?language=es-ES`;
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
}

/**
 * Fetch movie credits
 */
async function fetchMovieCredits(movieId) {
    const url = `${BASE_URL}/movie/${movieId}/credits?language=es-ES`;
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
}

/**
 * Fetch movie reviews
 */
async function fetchMovieReviews(movieId) {
    const url = `${BASE_URL}/movie/${movieId}/reviews?language=es-ES&page=1`;
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
}

/**
 * Fetch movie videos
 */
async function fetchMovieVideos(movieId) {
    const url = `${BASE_URL}/movie/${movieId}/videos?language=es-ES`;
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
}

/**
 * Fetch movie recommendations
 */
async function fetchMovieRecommendations(movieId) {
    const url = `${BASE_URL}/movie/${movieId}/recommendations?language=es-ES&page=1`;
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
}

/**
 * Fetch movie keywords
 */
async function fetchMovieKeywords(movieId) {
    const url = `${BASE_URL}/movie/${movieId}/keywords`;
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
}

/**
 * Display movie details in modal
 */
function displayMovieDetails(data) {
    const { details, credits, reviews, videos, recommendations, keywords } = data;
    
    // Format runtime
    const hours = Math.floor(details.runtime / 60);
    const minutes = details.runtime % 60;
    const runtimeStr = `${hours}h ${minutes}m`;
    
    // Format date
    const releaseYear = details.release_date ? new Date(details.release_date).getFullYear() : '';
    const releaseDateFormatted = formatDate(details.release_date);
    
    // Format rating
    const votePercent = Math.round(details.vote_average * 10);
    const ratingColor = getRatingColor(votePercent);
    
    // Format budget and revenue
    const budgetFormatted = details.budget ? `$${details.budget.toLocaleString('es-ES')}` : 'N/A';
    const revenueFormatted = details.revenue ? `$${details.revenue.toLocaleString('es-ES')}` : 'N/A';
    
    // Get director and key crew
    const director = credits.crew.find(person => person.job === 'Director');
    const screenplay = credits.crew.filter(person => person.job === 'Screenplay').slice(0, 2);
    const story = credits.crew.filter(person => person.job === 'Story').slice(0, 2);
    
    // Get trailer video (prefer YouTube trailers)
    let trailerKey = null;
    if (videos.results && videos.results.length > 0) {
        const trailer = videos.results.find(video => 
            video.site === 'YouTube' && (video.type === 'Trailer' || video.type === 'Teaser')
        ) || videos.results.find(video => video.site === 'YouTube') || videos.results[0];
        
        // Validate trailerKey (YouTube video IDs are 11 characters, alphanumeric with _ and -)
        if (trailer && trailer.site === 'YouTube' && trailer.key && /^[a-zA-Z0-9_-]{11}$/.test(trailer.key)) {
            trailerKey = trailer.key;
        }
    }
    
    // Build HTML
    let html = `
        <div class="movie-detail-header" style="background-image: url('${details.backdrop_path ? BACKDROP_URL + details.backdrop_path : ''}');">
            <div class="movie-detail-header-content">
                <div class="movie-poster-large">
                    <img src="${details.poster_path ? IMAGE_URL + details.poster_path : ''}" alt="${details.title}">
                </div>
                <div class="movie-info-main">
                    <div class="movie-title-section">
                        <h1>${details.title} <span class="movie-title-year">(${releaseYear})</span></h1>
                    </div>
                    
                    <div class="movie-facts">
                        <span>${releaseDateFormatted}</span>
                        ${details.genres.length > 0 ? `<span class="separator"></span>` : ''}
                        ${details.genres.map(g => g.name).join(', ')}
                        ${details.runtime ? `<span class="separator"></span><span>${runtimeStr}</span>` : ''}
                    </div>
                    
                    <div class="movie-user-score">
                        <div class="score-circle-large" style="border-color: ${ratingColor}">
                            <span class="score-number">${votePercent}</span>
                            <span class="score-percent">%</span>
                        </div>
                        <span class="score-label">Puntuación<br>de usuarios</span>
                    </div>
                    
                    ${details.tagline ? `<div class="movie-tagline">${details.tagline}</div>` : ''}
                    
                    <div class="movie-overview-section">
                        <h3>Vista general</h3>
                        <p>${details.overview || 'No hay sinopsis disponible.'}</p>
                    </div>
                    
                    <div class="movie-credits-featured">
                        ${director ? `
                            <div class="credit-item">
                                <h4>${director.name}</h4>
                                <p>Director</p>
                            </div>
                        ` : ''}
                        ${screenplay.map(person => `
                            <div class="credit-item">
                                <h4>${person.name}</h4>
                                <p>Screenplay</p>
                            </div>
                        `).join('')}
                        ${story.map(person => `
                            <div class="credit-item">
                                <h4>${person.name}</h4>
                                <p>Story</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>
        
        <div class="movie-detail-body">
            <!-- Trailer Section -->
            ${trailerKey ? `
                <div class="detail-section">
                    <h2>Tráiler</h2>
                    <div class="trailer-player">
                        <iframe
                            width="100%"
                            height="500"
                            src="https://www.youtube.com/embed/${trailerKey}"
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen
                            style="border-radius: 8px;">
                        </iframe>
                    </div>
                </div>
            ` : ''}
            
            <!-- Cast Section -->
            <div class="detail-section">
                <h2>Reparto principal</h2>
                ${credits.cast.length > 0 ? `
                    <div class="cast-scroller">
                        ${credits.cast.slice(0, 10).map(person => `
                            <div class="cast-card">
                                ${person.profile_path ? `
                                    <div class="cast-image">
                                        <img src="${IMAGE_URL + person.profile_path}" alt="${person.name}">
                                    </div>
                                ` : `
                                    <div class="cast-no-image">
                                        <i class="fas fa-user"></i>
                                    </div>
                                `}
                                <div class="cast-info">
                                    <div class="cast-name">${person.name}</div>
                                    <div class="cast-character">${person.character}</div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                ` : '<div class="no-content">No hay información de reparto disponible.</div>'}
            </div>
            
            <!-- Reviews Section -->
            <div class="detail-section">
                <h2>Reseñas</h2>
                ${reviews.results.length > 0 ? `
                    ${reviews.results.slice(0, 3).map(review => `
                        <div class="review-card">
                            <div class="review-header">
                                <div class="review-avatar">
                                    ${review.author_details.avatar_path ? `
                                        <img src="https://image.tmdb.org/t/p/w200${review.author_details.avatar_path}" alt="${review.author}">
                                    ` : `
                                        <div class="review-avatar-placeholder">
                                            ${review.author.charAt(0).toUpperCase()}
                                        </div>
                                    `}
                                </div>
                                <div class="review-author-info">
                                    <h4>Una reseña de ${review.author}</h4>
                                    <div class="review-date">Escrito por ${review.author} el ${formatDate(review.created_at)}</div>
                                </div>
                            </div>
                            <div class="review-content">
                                ${review.content}
                            </div>
                        </div>
                    `).join('')}
                ` : '<div class="no-content">No hay reseñas disponibles.</div>'}
            </div>
            
            <!-- Recommendations Section -->
            <div class="detail-section">
                <h2>Recomendaciones</h2>
                ${recommendations.results.length > 0 ? `
                    <div class="recommendations-scroller">
                        ${recommendations.results.slice(0, 10).map(movie => `
                            <div class="recommendation-card" data-movie-id="${movie.id}">
                                ${movie.backdrop_path ? `
                                    <div class="recommendation-image">
                                        <img src="${BACKDROP_URL + movie.backdrop_path}" alt="${movie.title}">
                                    </div>
                                ` : ''}
                                <div class="recommendation-info">
                                    <div class="recommendation-title">${movie.title}</div>
                                    <div class="recommendation-rating">${Math.round(movie.vote_average * 10)}%</div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                ` : '<div class="no-content">No hay recomendaciones disponibles.</div>'}
            </div>
            
            <!-- Additional Information -->
            <div class="detail-section">
                <h2>Información adicional</h2>
                <div class="info-grid">
                    <div class="info-item">
                        <h4>Título original</h4>
                        <p>${details.original_title}</p>
                    </div>
                    <div class="info-item">
                        <h4>Estado</h4>
                        <p>${details.status === 'Released' ? 'Estrenada' : details.status}</p>
                    </div>
                    <div class="info-item">
                        <h4>Idioma original</h4>
                        <p>${details.original_language.toUpperCase()}</p>
                    </div>
                    <div class="info-item">
                        <h4>Presupuesto</h4>
                        <p>${budgetFormatted}</p>
                    </div>
                    <div class="info-item">
                        <h4>Ingresos</h4>
                        <p>${revenueFormatted}</p>
                    </div>
                </div>
            </div>
            
            <!-- Keywords Section -->
            ${keywords.keywords.length > 0 ? `
                <div class="detail-section">
                    <h2>Palabras clave</h2>
                    <div class="keywords-list">
                        ${keywords.keywords.map(keyword => `
                            <span class="keyword-badge" data-keyword-id="${keyword.id}" data-keyword-name="${sanitizeText(keyword.name)}">${sanitizeText(keyword.name)}</span>
                        `).join('')}
                    </div>
                </div>
            ` : ''}
        </div>
    `;
    
    movieDetailContainer.innerHTML = html;
    
    // Add click events to recommendation cards
    const recommendationCards = movieDetailContainer.querySelectorAll('.recommendation-card');
    recommendationCards.forEach(card => {
        card.addEventListener('click', () => {
            const movieId = card.getAttribute('data-movie-id');
            openMovieDetails(movieId);
        });
    });
    
    // Add click events to keyword badges
    const keywordBadges = movieDetailContainer.querySelectorAll('.keyword-badge');
    keywordBadges.forEach(badge => {
        badge.addEventListener('click', () => {
            const keywordId = badge.getAttribute('data-keyword-id');
            const keywordName = badge.getAttribute('data-keyword-name');
            searchMoviesByKeyword(keywordId, keywordName);
            closeMovieDetails();
        });
    });
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
    setupModalHandlers();
    
    // Load initial data
    getTrendingMovies('day');
    getPopularMovies();
    getUpcomingMovies();
    
    console.log('Application initialized successfully!');
}

/**
 * Setup modal event handlers
 */
function setupModalHandlers() {
    if (movieModal) {
        // Close on overlay click
        const overlay = movieModal.querySelector('.modal-overlay');
        if (overlay) {
            overlay.addEventListener('click', closeMovieDetails);
        }
        
        // Close on close button click
        const closeBtn = movieModal.querySelector('.modal-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', closeMovieDetails);
        }
        
        // Close on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && movieModal.style.display === 'block') {
                closeMovieDetails();
            }
        });
    }
}

// Start the application when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
