// API Configuration
const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOTgxNWVjZTI4ZjcyNWJlZGRmY2Y3OGE0YzRjZGU0ZiIsIm5iZiI6MTc2MDQ1NjUxNS4xNDcsInN1YiI6IjY4ZWU2ZjQzNDYzMzQ0Yjg0MTlkZjQ3MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ejdXz4pm0dZn0OAVJvJ16R8SwNAa-MBkO_yttUiblLk';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';
const BACKDROP_URL = 'https://image.tmdb.org/t/p/w780';

// YouTube video ID validation regex (11 characters, alphanumeric with _ and -)
const YOUTUBE_VIDEO_ID_REGEX = /^[a-zA-Z0-9_-]{11}$/;

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
let currentContentType = 'movie'; // Track whether we're showing movies or TV
let currentCategory = null; // Track current category being displayed

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
 * Create movie/TV card element
 */
function createMovieCard(item, type = 'movie') {
    const title = type === 'movie' ? item.title : item.name;
    const releaseDate = type === 'movie' ? item.release_date : item.first_air_date;
    const { poster_path, vote_average, id } = item;
    
    if (!poster_path) return null; // Skip items without posters
    
    const percent = Math.round(vote_average * 10);
    const borderColor = getRatingColor(percent);
    const dateStr = formatDate(releaseDate);
    
    // Check if item is in favorites
    const currentUser = getCurrentUser();
    const isFavorite = currentUser && currentUser.favorites && currentUser.favorites.includes(id);

    const card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('data-movie-id', id);
    card.setAttribute('data-content-type', type);
    card.style.cursor = 'pointer';
    
    card.innerHTML = `
        <div class="image-content">
            <img src="${IMAGE_URL + poster_path}" alt="${title}" loading="lazy">
            <button class="favorite-btn ${isFavorite ? 'favorite-active' : ''}" data-movie-id="${id}" aria-label="Agregar a favoritos">
                <i class="fas fa-heart"></i>
            </button>
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

    // Add click event to favorite button
    const favoriteBtn = card.querySelector('.favorite-btn');
    favoriteBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent card click event
        toggleFavorite(id);
    });

    // Add click event to open details
    card.addEventListener('click', () => {
        openMovieDetails(id, type);
    });

    return card;
}

/**
 * Create person card element
 */
function createPersonCard(person) {
    const { name, profile_path, known_for_department, id } = person;
    
    if (!profile_path) return null; // Skip people without profile photos
    
    const card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('data-person-id', id);
    card.style.cursor = 'pointer';
    
    card.innerHTML = `
        <div class="image-content">
            <img src="${IMAGE_URL + profile_path}" alt="${name}" loading="lazy">
            <div class="options-icon" aria-label="Opciones">
                <i class="fas fa-ellipsis-h"></i>
            </div>
        </div>
        <div class="card-content">
            <h2 title="${name}">${name}</h2>
            <p>${known_for_department || 'Actuación'}</p>
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
 * Fetch content by type (movie/tv) and category
 */
async function getContentByCategory(type = 'movie', category = 'popular', container = trendingContainer) {
    const url = `${BASE_URL}/${type}/${category}?language=es-ES&page=1`;
    
    try {
        showLoading();
        const res = await fetch(url, options);
        
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const data = await res.json();
        
        // Handle different types of content
        if (type === 'person') {
            displayPeople(data.results, container);
        } else {
            displayContent(data.results, container, type);
        }
        
        hideLoading();
        
        // Update section title based on content type and category
        updateSectionTitle(type, category);
    } catch (error) {
        console.error(`Error fetching ${type} ${category}:`, error);
        showError();
    }
}

/**
 * Update section title based on content type and category
 */
function updateSectionTitle(type, category) {
    const trendingTitle = document.getElementById('trending-title');
    if (!trendingTitle) return;
    
    let contentTypeLabel = '';
    if (type === 'movie') {
        contentTypeLabel = 'Películas';
    } else if (type === 'tv') {
        contentTypeLabel = 'Series';
    } else if (type === 'person') {
        contentTypeLabel = 'Personas';
    }
    
    const categoryLabels = {
        popular: 'Populares',
        now_playing: 'En cartelera',
        upcoming: 'Próximamente',
        top_rated: 'Mejor puntuadas',
        airing_today: 'En emisión hoy',
        on_the_air: 'En televisión'
    };
    
    const categoryLabel = categoryLabels[category] || 'Tendencias';
    trendingTitle.textContent = `${contentTypeLabel} ${categoryLabel}`;
}

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
 * Search movies and TV shows
 */
async function searchMovies(query) {
    if (!query.trim()) return;
    
    // Use multi search to find both movies and TV shows
    const url = `${BASE_URL}/search/multi?language=es-ES&query=${encodeURIComponent(query)}&page=1`;
    
    try {
        showLoading();
        const res = await fetch(url, options);
        
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const data = await res.json();
        
        if (data.results && data.results.length > 0) {
            // Filter to only show movies and TV shows (exclude people)
            const contentResults = data.results.filter(item => 
                item.media_type === 'movie' || item.media_type === 'tv'
            );
            
            if (contentResults.length > 0) {
                displaySearchResults(contentResults, trendingContainer);
                hideLoading();
                
                // Update section title
                const trendingTitle = document.getElementById('trending-title');
                if (trendingTitle) {
                    trendingTitle.textContent = 'Resultados de búsqueda';
                }
                
                // Scroll to results
                trendingContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } else {
                hideLoading();
                trendingContainer.innerHTML = '<p class="text-center" style="padding: 40px; color: var(--text-secondary);">No se encontraron resultados para tu búsqueda.</p>';
            }
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
            // Clear container consistently using replaceChildren
            const noResultsDiv = document.createElement('p');
            noResultsDiv.className = 'text-center';
            noResultsDiv.style.padding = '40px';
            noResultsDiv.style.color = 'var(--text-secondary)';
            noResultsDiv.textContent = `No se encontraron películas con la palabra clave "${keywordName}".`;
            trendingContainer.replaceChildren(noResultsDiv);
        }
    } catch (error) {
        console.error('Error searching movies by keyword:', error);
        showError();
    }
}

// ============ DISPLAY FUNCTIONS ============

/**
 * Display content (movies or TV shows) in container
 */
function displayContent(items, container, type = 'movie') {
    if (!container) return;
    
    container.innerHTML = '';
    
    const fragment = document.createDocumentFragment();
    
    items.forEach(item => {
        const card = createMovieCard(item, type);
        if (card) {
            fragment.appendChild(card);
        }
    });
    
    container.appendChild(fragment);
}

/**
 * Display search results with mixed content types (movies and TV shows)
 */
function displaySearchResults(items, container) {
    if (!container) return;
    
    container.innerHTML = '';
    
    const fragment = document.createDocumentFragment();
    
    items.forEach(item => {
        // Use the media_type from the search result to determine the content type
        const type = item.media_type === 'tv' ? 'tv' : 'movie';
        const card = createMovieCard(item, type);
        if (card) {
            fragment.appendChild(card);
        }
    });
    
    container.appendChild(fragment);
}

/**
 * Display movies in container (legacy support)
 */
function displayMovies(movies, container) {
    displayContent(movies, container, 'movie');
}

/**
 * Display people in container
 */
function displayPeople(people, container) {
    if (!container) return;
    
    container.innerHTML = '';
    
    const fragment = document.createDocumentFragment();
    
    people.forEach(person => {
        const card = createPersonCard(person);
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
    
    // Setup navbar search dropdown
    setupNavbarSearch();
}

/**
 * Setup navbar search dropdown functionality
 */
function setupNavbarSearch() {
    const searchToggleBtn = document.getElementById('search-toggle-btn');
    const searchDropdown = document.getElementById('search-dropdown');
    const navSearchInput = document.getElementById('nav-search-input');
    const searchTrendsList = document.getElementById('search-trends-list');
    
    if (!searchToggleBtn || !searchDropdown) return;
    
    // Create backdrop
    const backdrop = document.createElement('div');
    backdrop.className = 'search-backdrop';
    document.body.appendChild(backdrop);
    
    // Toggle search dropdown
    searchToggleBtn.addEventListener('click', async (e) => {
        e.stopPropagation();
        const isOpen = searchDropdown.style.display === 'block';
        
        if (isOpen) {
            closeSearchDropdown();
        } else {
            openSearchDropdown();
        }
    });
    
    // Open search dropdown
    async function openSearchDropdown() {
        searchDropdown.style.display = 'block';
        backdrop.classList.add('active');
        navSearchInput.focus();
        
        // Load trending searches
        await loadTrendingSearches();
    }
    
    // Close search dropdown
    function closeSearchDropdown() {
        searchDropdown.style.display = 'none';
        backdrop.classList.remove('active');
        navSearchInput.value = '';
    }
    
    // Close on backdrop click
    backdrop.addEventListener('click', closeSearchDropdown);
    
    // Close on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && searchDropdown.style.display === 'block') {
            closeSearchDropdown();
        }
    });
    
    // Handle search input
    if (navSearchInput) {
        navSearchInput.addEventListener('input', debounce(async (e) => {
            const query = e.target.value.trim();
            
            if (query.length >= 2) {
                await performNavSearch(query);
            } else {
                await loadTrendingSearches();
            }
        }, 300));
        
        navSearchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                const query = navSearchInput.value.trim();
                if (query) {
                    searchMovies(query);
                    closeSearchDropdown();
                    // Scroll to results
                    setTimeout(() => {
                        document.querySelector('.trending-section')?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                }
            }
        });
    }
    
    // Load trending searches
    async function loadTrendingSearches() {
        if (!searchTrendsList) return;
        
        try {
            searchTrendsList.innerHTML = '<div style="padding: 20px; text-align: center; color: var(--text-secondary);">Cargando tendencias...</div>';
            
            const url = `${BASE_URL}/trending/all/day?language=es-ES`;
            const res = await fetch(url, options);
            
            if (!res.ok) throw new Error('Error loading trends');
            
            const data = await res.json();
            displayTrendingSearches(data.results.slice(0, 10));
        } catch (error) {
            console.error('Error loading trending searches:', error);
            searchTrendsList.innerHTML = '<div style="padding: 20px; text-align: center; color: var(--text-secondary);">No se pudieron cargar las tendencias</div>';
        }
    }
    
    // Display trending searches
    function displayTrendingSearches(items) {
        if (!searchTrendsList) return;
        
        searchTrendsList.innerHTML = '';
        
        items.forEach(item => {
            const title = item.title || item.name;
            const type = item.media_type === 'movie' ? 'Película' : item.media_type === 'tv' ? 'Serie' : 'Persona';
            const year = item.release_date ? new Date(item.release_date).getFullYear() : 
                         item.first_air_date ? new Date(item.first_air_date).getFullYear() : '';
            
            const trendItem = document.createElement('div');
            trendItem.className = 'trend-item';
            trendItem.innerHTML = `
                <i class="fas fa-search search-icon"></i>
                <span class="trend-item-text">${title}</span>
                <span class="trend-item-info">${type}${year ? ' · ' + year : ''}</span>
            `;
            
            trendItem.addEventListener('click', () => {
                navSearchInput.value = title;
                searchMovies(title);
                closeSearchDropdown();
                setTimeout(() => {
                    document.querySelector('.trending-section')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            });
            
            searchTrendsList.appendChild(trendItem);
        });
    }
    
    // Perform search from navbar
    async function performNavSearch(query) {
        if (!searchTrendsList) return;
        
        try {
            const url = `${BASE_URL}/search/multi?language=es-ES&query=${encodeURIComponent(query)}&page=1`;
            const res = await fetch(url, options);
            
            if (!res.ok) throw new Error('Error searching');
            
            const data = await res.json();
            const results = data.results.filter(item => 
                item.media_type === 'movie' || item.media_type === 'tv' || item.media_type === 'person'
            ).slice(0, 10);
            
            displayTrendingSearches(results);
        } catch (error) {
            console.error('Error performing search:', error);
        }
    }
}

/**
 * Debounce function for search input
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
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

/**
 * Setup navigation dropdown handlers
 */
function setupNavigationDropdowns() {
    const dropdownLinks = document.querySelectorAll('.dropdown-content a');
    
    dropdownLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const type = link.getAttribute('data-type');
            const category = link.getAttribute('data-category');
            
            if (type && category) {
                // Update state
                currentContentType = type;
                currentCategory = category;
                
                // Fetch and display content
                getContentByCategory(type, category, trendingContainer);
                
                // Show trending section and hide others
                showTrendingSection();
                
                // Scroll to trending section
                document.querySelector('.trending-section').scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            } else {
                // Handle "Más" menu items without data attributes
                const linkText = link.textContent.trim();
                alert(`${linkText} - Próximamente`);
            }
        });
    });
}

/**
 * Show trending section and hide others
 */
function showTrendingSection() {
    const favoritesSection = document.getElementById('favorites-section');
    const trendingSection = document.querySelector('.trending-section');
    const popularSection = document.querySelector('.popular-section');
    const trailersSection = document.querySelector('.latest-trailers-section');
    
    if (favoritesSection) favoritesSection.style.display = 'none';
    if (trendingSection) trendingSection.style.display = 'block';
    if (popularSection) popularSection.style.display = 'block';
    if (trailersSection) trailersSection.style.display = 'block';
}

// ============ MOVIE DETAIL FUNCTIONS ============

/**
 * Open movie details modal
 */
async function openMovieDetails(movieId, type = 'movie') {
    if (!movieModal || !movieDetailContainer) return;
    
    // Show modal with loading state
    movieModal.style.display = 'block';
    movieDetailContainer.innerHTML = '<div class="loading-spinner"><div class="spinner"></div><p>Cargando detalles...</p></div>';
    document.body.style.overflow = 'hidden';
    
    try {
        // Fetch all required data in parallel
        const [details, credits, reviews, videos, recommendations, keywords] = await Promise.all([
            fetchMovieDetails(movieId, type),
            fetchMovieCredits(movieId, type),
            fetchMovieReviews(movieId, type),
            fetchMovieVideos(movieId, type),
            fetchMovieRecommendations(movieId, type),
            fetchMovieKeywords(movieId, type)
        ]);
        
        // Display the movie details
        displayMovieDetails({
            details,
            credits,
            reviews,
            videos,
            recommendations,
            keywords,
            type
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
        
        // Clear hash from URL
        window.history.pushState("", document.title, window.location.pathname + window.location.search);
    }
}

/**
 * Fetch movie details
 */
async function fetchMovieDetails(movieId, type = 'movie') {
    const url = `${BASE_URL}/${type}/${movieId}?language=es-ES`;
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
}

/**
 * Fetch movie credits
 */
async function fetchMovieCredits(movieId, type = 'movie') {
    const url = `${BASE_URL}/${type}/${movieId}/credits?language=es-ES`;
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
}

/**
 * Fetch movie reviews
 */
async function fetchMovieReviews(movieId, type = 'movie') {
    const url = `${BASE_URL}/${type}/${movieId}/reviews?language=es-ES&page=1`;
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
}

/**
 * Fetch movie videos
 */
async function fetchMovieVideos(movieId, type = 'movie') {
    const url = `${BASE_URL}/${type}/${movieId}/videos?language=es-ES`;
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
}

/**
 * Fetch movie recommendations
 */
async function fetchMovieRecommendations(movieId, type = 'movie') {
    const url = `${BASE_URL}/${type}/${movieId}/recommendations?language=es-ES&page=1`;
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
}

/**
 * Fetch movie keywords
 */
async function fetchMovieKeywords(movieId, type = 'movie') {
    const url = `${BASE_URL}/${type}/${movieId}/keywords`;
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
}

/**
 * Display movie details in modal
 */
function displayMovieDetails(data) {
    const { details, credits, reviews, videos, recommendations, keywords, type = 'movie' } = data;
    
    // Get title and date based on content type
    const title = type === 'movie' ? details.title : details.name;
    const releaseDate = type === 'movie' ? details.release_date : details.first_air_date;
    
    // Format runtime (movies have runtime, TV shows have episode_run_time)
    let runtimeStr = '';
    if (type === 'movie' && details.runtime) {
        const hours = Math.floor(details.runtime / 60);
        const minutes = details.runtime % 60;
        runtimeStr = `${hours}h ${minutes}m`;
    } else if (type === 'tv' && details.episode_run_time && details.episode_run_time.length > 0) {
        runtimeStr = `${details.episode_run_time[0]}m`;
    }
    
    // Format date
    const releaseYear = releaseDate ? new Date(releaseDate).getFullYear() : '';
    const releaseDateFormatted = formatDate(releaseDate);
    
    // Format rating
    const votePercent = Math.round(details.vote_average * 10);
    const ratingColor = getRatingColor(votePercent);
    
    // Format budget and revenue (only for movies)
    const budgetFormatted = type === 'movie' && details.budget ? `$${details.budget.toLocaleString('es-ES')}` : 'N/A';
    const revenueFormatted = type === 'movie' && details.revenue ? `$${details.revenue.toLocaleString('es-ES')}` : 'N/A';
    
    // Get director and key crew
    const director = credits.crew.find(person => person.job === 'Director');
    const screenplay = credits.crew.filter(person => person.job === 'Screenplay').slice(0, 2);
    const story = credits.crew.filter(person => person.job === 'Story').slice(0, 2);
    
    // Get trailer video (prefer YouTube trailers and teasers)
    let trailerKey = null;
    if (videos.results && videos.results.length > 0) {
        // Find YouTube video, prioritizing trailers and teasers
        const youtubeVideos = videos.results.filter(video => video.site === 'YouTube');
        const trailer = youtubeVideos.find(video => 
            video.type === 'Trailer' || video.type === 'Teaser'
        ) || youtubeVideos[0];
        
        // Validate trailerKey with regex to ensure it's safe for URL embedding
        if (trailer && trailer.key && YOUTUBE_VIDEO_ID_REGEX.test(trailer.key)) {
            trailerKey = trailer.key;
        }
    }
    
    // Build HTML
    let html = `
        <div class="movie-detail-header" style="background-image: url('${details.backdrop_path ? BACKDROP_URL + details.backdrop_path : ''}');">
            <div class="movie-detail-header-content">
                <div class="movie-poster-large">
                    <img src="${details.poster_path ? IMAGE_URL + details.poster_path : ''}" alt="${title}">
                </div>
                <div class="movie-info-main">
                    <div class="movie-title-section">
                        <h1>${title} <span class="movie-title-year">(${releaseYear})</span></h1>
                    </div>
                    
                    <div class="movie-facts">
                        <span>${releaseDateFormatted}</span>
                        ${details.genres.length > 0 ? `<span class="separator"></span>` : ''}
                        ${details.genres.map(g => g.name).join(', ')}
                        ${runtimeStr ? `<span class="separator"></span><span>${runtimeStr}</span>` : ''}
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
            <!-- trailerKey is safe to use here as it's validated with YOUTUBE_VIDEO_ID_REGEX -->
            ${trailerKey ? `
                <div class="detail-section">
                    <h2>Tráiler</h2>
                    <div class="trailer-player">
                        <iframe
                            width="100%"
                            height="500"
                            src="https://www.youtube.com/embed/${trailerKey}?rel=0"
                            title="YouTube video player"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowfullscreen
                            referrerpolicy="strict-origin-when-cross-origin"
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
                        ${recommendations.results.slice(0, 10).map(item => {
                            const itemTitle = item.title || item.name;
                            return `
                                <div class="recommendation-card" data-movie-id="${item.id}" data-content-type="${type}">
                                    ${item.backdrop_path ? `
                                        <div class="recommendation-image">
                                            <img src="${BACKDROP_URL + item.backdrop_path}" alt="${itemTitle}">
                                        </div>
                                    ` : ''}
                                    <div class="recommendation-info">
                                        <div class="recommendation-title">${itemTitle}</div>
                                        <div class="recommendation-rating">${Math.round(item.vote_average * 10)}%</div>
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                ` : '<div class="no-content">No hay recomendaciones disponibles.</div>'}
            </div>
            
            <!-- Additional Information -->
            <div class="detail-section">
                <h2>Información adicional</h2>
                <div class="info-grid">
                    <div class="info-item">
                        <h4>Título original</h4>
                        <p>${type === 'movie' ? details.original_title : details.original_name}</p>
                    </div>
                    <div class="info-item">
                        <h4>Estado</h4>
                        <p>${details.status === 'Released' ? 'Estrenada' : (details.status === 'Ended' ? 'Finalizada' : (details.status === 'Returning Series' ? 'En emisión' : details.status))}</p>
                    </div>
                    <div class="info-item">
                        <h4>Idioma original</h4>
                        <p>${details.original_language.toUpperCase()}</p>
                    </div>
                    ${type === 'movie' ? `
                        <div class="info-item">
                            <h4>Presupuesto</h4>
                            <p>${budgetFormatted}</p>
                        </div>
                        <div class="info-item">
                            <h4>Ingresos</h4>
                            <p>${revenueFormatted}</p>
                        </div>
                    ` : `
                        <div class="info-item">
                            <h4>Número de temporadas</h4>
                            <p>${details.number_of_seasons || 'N/A'}</p>
                        </div>
                        <div class="info-item">
                            <h4>Número de episodios</h4>
                            <p>${details.number_of_episodes || 'N/A'}</p>
                        </div>
                    `}
                </div>
            </div>
            
            <!-- Keywords Section -->
            ${keywords.keywords && keywords.keywords.length > 0 ? `
                <div class="detail-section">
                    <h2>Palabras clave</h2>
                    <div class="keywords-list" id="keywords-list-container"></div>
                </div>
            ` : (keywords.results && keywords.results.length > 0 ? `
                <div class="detail-section">
                    <h2>Palabras clave</h2>
                    <div class="keywords-list" id="keywords-list-container"></div>
                </div>
            ` : '')}
        </div>
    `;
    
    movieDetailContainer.innerHTML = html;
    
    // Populate keywords using safe DOM methods
    const keywordsArray = keywords.keywords || keywords.results || [];
    if (keywordsArray.length > 0) {
        const keywordsListContainer = movieDetailContainer.querySelector('#keywords-list-container');
        if (keywordsListContainer) {
            keywordsArray.forEach(keyword => {
                const badge = document.createElement('span');
                badge.className = 'keyword-badge';
                badge.setAttribute('data-keyword-id', keyword.id);
                badge.setAttribute('data-keyword-name', keyword.name);
                badge.textContent = keyword.name;
                keywordsListContainer.appendChild(badge);
            });
        }
    }
    
    // Add click events to recommendation cards
    const recommendationCards = movieDetailContainer.querySelectorAll('.recommendation-card');
    recommendationCards.forEach(card => {
        card.addEventListener('click', () => {
            const movieId = card.getAttribute('data-movie-id');
            const contentType = card.getAttribute('data-content-type');
            openMovieDetails(movieId, contentType);
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

// ============ FAVORITES FUNCTIONS ============

/**
 * Get current user from localStorage (imported from app.js context)
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
 * Toggle favorite status for a movie
 */
async function toggleFavorite(movieId) {
    const currentUser = getCurrentUser();
    
    // Check if user is logged in
    if (!currentUser) {
        alert('Por favor, inicia sesión para agregar películas a favoritos');
        window.location.href = 'auth.html';
        return;
    }
    
    try {
        // Initialize favorites array if it doesn't exist
        if (!currentUser.favorites) {
            currentUser.favorites = [];
        }
        
        // Check if movie is already in favorites
        const favoriteIndex = currentUser.favorites.indexOf(movieId);
        let updatedFavorites;
        
        if (favoriteIndex > -1) {
            // Remove from favorites
            updatedFavorites = currentUser.favorites.filter(id => id !== movieId);
        } else {
            // Add to favorites
            updatedFavorites = [...currentUser.favorites, movieId];
        }
        
        // Update user in json-server
        const response = await fetch(`http://localhost:3000/usuarios/${currentUser.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ favorites: updatedFavorites })
        });
        
        if (!response.ok) {
            throw new Error('Error al actualizar favoritos');
        }
        
        // Update localStorage
        currentUser.favorites = updatedFavorites;
        updateCurrentUser(currentUser);
        
        // Update UI - find all favorite buttons for this movie and update them
        const favoriteButtons = document.querySelectorAll(`.favorite-btn[data-movie-id="${movieId}"]`);
        favoriteButtons.forEach(btn => {
            if (favoriteIndex > -1) {
                btn.classList.remove('favorite-active');
            } else {
                btn.classList.add('favorite-active');
            }
        });
        
        // If we're viewing favorites section, reload it
        const favoritesSection = document.getElementById('favorites-section');
        if (favoritesSection && favoritesSection.style.display !== 'none') {
            loadFavorites();
        }
        
    } catch (error) {
        console.error('Error toggling favorite:', error);
        alert('Hubo un error al actualizar los favoritos. Por favor, verifica que json-server esté ejecutándose.');
    }
}

/**
 * Load and display user's favorite movies
 */
async function loadFavorites() {
    const currentUser = getCurrentUser();
    const favoritesContainer = document.getElementById('favorites-container');
    const favoritesEmpty = document.getElementById('favorites-empty');
    
    if (!currentUser) {
        return;
    }
    
    // Initialize favorites array if it doesn't exist
    if (!currentUser.favorites || currentUser.favorites.length === 0) {
        favoritesContainer.innerHTML = '';
        favoritesEmpty.style.display = 'flex';
        return;
    }
    
    try {
        favoritesEmpty.style.display = 'none';
        favoritesContainer.innerHTML = '<div class="loading-spinner"><div class="spinner"></div><p>Cargando favoritos...</p></div>';
        
        // Fetch details for all favorite movies
        const moviePromises = currentUser.favorites.map(movieId => 
            fetch(`${BASE_URL}/movie/${movieId}?language=es-ES`, options)
                .then(res => res.ok ? res.json() : null)
        );
        
        const movies = await Promise.all(moviePromises);
        const validMovies = movies.filter(movie => movie !== null);
        
        if (validMovies.length === 0) {
            favoritesContainer.innerHTML = '';
            favoritesEmpty.style.display = 'flex';
            return;
        }
        
        displayMovies(validMovies, favoritesContainer);
        
    } catch (error) {
        console.error('Error loading favorites:', error);
        favoritesContainer.innerHTML = '<p style="padding: 40px; color: var(--text-secondary); text-align: center;">Error al cargar favoritos.</p>';
    }
}

/**
 * Toggle favorites section visibility
 */
function toggleFavoritesSection() {
    const favoritesSection = document.getElementById('favorites-section');
    const trendingSection = document.querySelector('.trending-section');
    const popularSection = document.querySelector('.popular-section');
    const trailersSection = document.querySelector('.latest-trailers-section');
    
    if (!favoritesSection) return;
    
    if (favoritesSection.style.display === 'none') {
        // Show favorites, hide other sections
        favoritesSection.style.display = 'block';
        trendingSection.style.display = 'none';
        popularSection.style.display = 'none';
        trailersSection.style.display = 'none';
        
        // Load favorites
        loadFavorites();
    } else {
        // Hide favorites, show other sections
        favoritesSection.style.display = 'none';
        trendingSection.style.display = 'block';
        popularSection.style.display = 'block';
        trailersSection.style.display = 'block';
    }
}

// ============ INITIALIZATION ============

/**
 * Initialize the application
 */
function init() {
    console.log('Initializing PFHR application...');
    
    // Setup event handlers
    setupToggleSelectors();
    setupSearchForm();
    setupAccessibility();
    setupNavigationDropdowns();
    setupModalHandlers();
    setupFavoritesToggle();
    setupInfoModals();
    
    // Load initial data
    getTrendingMovies('day');
    getPopularMovies();
    getUpcomingMovies();
    
    // Handle deep linking - check if URL has a movie hash
    handleDeepLinking();
    
    console.log('Application initialized successfully!');
}

/**
 * Handle deep linking from URL hash
 */
function handleDeepLinking() {
    const hash = window.location.hash;
    
    // Check if hash matches pattern #movie-{id}
    if (hash && hash.startsWith('#movie-')) {
        const movieId = hash.replace('#movie-', '');
        
        // Validate that we have a valid numeric ID
        if (movieId && !isNaN(movieId)) {
            // Open movie details automatically
            openMovieDetails(movieId, 'movie');
        }
    }
}

/**
 * Setup favorites toggle button
 */
function setupFavoritesToggle() {
    const favoritesToggleBtn = document.getElementById('favorites-toggle-btn');
    
    if (favoritesToggleBtn) {
        // Show button if user is logged in
        const currentUser = getCurrentUser();
        if (currentUser) {
            favoritesToggleBtn.style.display = 'block';
        }
        
        // Add click event
        favoritesToggleBtn.addEventListener('click', toggleFavoritesSection);
    }
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

// ============ INFO MODALS (ABOUT & SUPPORT) ============

/**
 * Setup info modals (About and Support)
 */
function setupInfoModals() {
    // About modal
    const aboutLink = document.getElementById('about-link');
    const aboutModal = document.getElementById('about-modal');
    
    if (aboutLink && aboutModal) {
        aboutLink.addEventListener('click', (e) => {
            e.preventDefault();
            openAboutModal();
        });
        
        // Close on overlay click
        const overlay = aboutModal.querySelector('.modal-overlay');
        if (overlay) {
            overlay.addEventListener('click', closeAboutModal);
        }
        
        // Close on close button click
        const closeBtn = aboutModal.querySelector('.modal-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', closeAboutModal);
        }
        
        // Close on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && aboutModal.style.display === 'block') {
                closeAboutModal();
            }
        });
    }
    
    // Support modal
    const supportLink = document.getElementById('support-link');
    const supportModal = document.getElementById('support-modal');
    const supportForm = document.getElementById('support-form');
    const supportSuccess = document.getElementById('support-success');
    
    if (supportLink && supportModal) {
        supportLink.addEventListener('click', (e) => {
            e.preventDefault();
            openSupportModal();
        });
        
        // Close on overlay click
        const overlay = supportModal.querySelector('.modal-overlay');
        if (overlay) {
            overlay.addEventListener('click', closeSupportModal);
        }
        
        // Close on close button click
        const closeBtn = supportModal.querySelector('.modal-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', closeSupportModal);
        }
        
        // Cancel button
        const cancelBtn = document.getElementById('support-cancel');
        if (cancelBtn) {
            cancelBtn.addEventListener('click', closeSupportModal);
        }
        
        // Close success message
        const closeSuccessBtn = document.getElementById('close-success');
        if (closeSuccessBtn) {
            closeSuccessBtn.addEventListener('click', closeSupportModal);
        }
        
        // Handle form submission
        if (supportForm) {
            supportForm.addEventListener('submit', (e) => {
                e.preventDefault();
                handleSupportFormSubmit(e);
            });
        }
        
        // Close on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && supportModal.style.display === 'block') {
                closeSupportModal();
            }
        });
    }
}

/**
 * Open About modal
 */
function openAboutModal() {
    const aboutModal = document.getElementById('about-modal');
    if (aboutModal) {
        aboutModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

/**
 * Close About modal
 */
function closeAboutModal() {
    const aboutModal = document.getElementById('about-modal');
    if (aboutModal) {
        aboutModal.style.display = 'none';
        document.body.style.overflow = '';
    }
}

/**
 * Open Support modal
 */
function openSupportModal() {
    const supportModal = document.getElementById('support-modal');
    const supportForm = document.getElementById('support-form');
    const supportSuccess = document.getElementById('support-success');
    
    if (supportModal) {
        supportModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Reset form and show it
        if (supportForm) {
            supportForm.reset();
            supportForm.style.display = 'block';
        }
        
        // Hide success message
        if (supportSuccess) {
            supportSuccess.style.display = 'none';
        }
    }
}

/**
 * Close Support modal
 */
function closeSupportModal() {
    const supportModal = document.getElementById('support-modal');
    const supportForm = document.getElementById('support-form');
    
    if (supportModal) {
        supportModal.style.display = 'none';
        document.body.style.overflow = '';
        
        // Reset form
        if (supportForm) {
            supportForm.reset();
        }
    }
}

/**
 * Handle support form submission
 */
async function handleSupportFormSubmit(e) {
    const supportForm = document.getElementById('support-form');
    const supportSuccess = document.getElementById('support-success');
    
    // Get form data
    const formData = {
        name: document.getElementById('support-name').value,
        email: document.getElementById('support-email').value,
        reason: document.getElementById('support-reason').value,
        subject: document.getElementById('support-subject').value,
        message: document.getElementById('support-message').value,
        timestamp: new Date().toISOString(),
        status: 'open'
    };
    
    try {
        // Send ticket data to json-server
        const response = await fetch('http://localhost:3000/tickets', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        if (!response.ok) {
            throw new Error(`Error al enviar el ticket: ${response.status}`);
        }
        
        // Success - show success message
        if (supportForm && supportSuccess) {
            supportForm.style.display = 'none';
            supportSuccess.style.display = 'block';
        }
        
        console.log('Support ticket submitted successfully:', formData);
        
    } catch (error) {
        console.error('Error submitting support ticket:', error);
        
        // Show error alert to user
        alert('Hubo un error al enviar tu solicitud de soporte. Por favor, verifica que el servidor esté ejecutándose (json-server) e intenta de nuevo.');
    }
}

// Start the application when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

