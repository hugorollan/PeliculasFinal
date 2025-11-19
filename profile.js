// Profile Page JavaScript

// Request Options for profile page
const profileOptions = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
    }
};

// ============ UTILITY FUNCTIONS ============

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

// ============ PROFILE INITIALIZATION ============

/**
 * Hide navbar elements on profile page - show only username
 */
function hideNavbarElements(user) {
    const navRight = document.querySelector('.nav-right');
    if (!navRight) return;
    
    // Hide all existing elements in nav-right
    const favoritesBtn = document.getElementById('favorites-toggle-btn');
    if (favoritesBtn) {
        favoritesBtn.style.display = 'none';
    }
    
    const addBtn = document.querySelector('.icon-btn i.fa-plus');
    if (addBtn && addBtn.parentElement) {
        addBtn.parentElement.style.display = 'none';
    }
    
    const langBox = document.querySelector('.lang-box');
    if (langBox) {
        // Hide parent dropdown if exists
        const dropdown = langBox.closest('.dropdown');
        if (dropdown) {
            dropdown.style.display = 'none';
        } else {
            langBox.style.display = 'none';
        }
    }
    
    const loginLinks = document.querySelectorAll('.nav-right a[href="auth.html"]');
    loginLinks.forEach(link => {
        link.style.display = 'none';
    });
    
    const searchBtn = document.getElementById('search-toggle-btn');
    if (searchBtn) {
        searchBtn.style.display = 'none';
    }
    
    // Add username display
    const usernameDisplay = document.createElement('div');
    usernameDisplay.className = 'profile-username-nav';
    usernameDisplay.innerHTML = `
        <i class="fas fa-user-circle"></i>
        <span>${user.name}</span>
    `;
    navRight.appendChild(usernameDisplay);
}

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
    
    // Hide navbar elements on profile page
    hideNavbarElements(currentUser);
    
    // Update profile header
    updateProfileHeader(currentUser);
    
    // Load user statistics
    await loadUserStatistics(currentUser);
    
    // Load favorites
    await loadUserFavorites(currentUser);
    
    // Load watchlist
    await loadWatchlist(currentUser);
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
    
    // Get favorites count (including both movies and TV shows)
    let favoritesCount = 0;
    if (user.favorites) {
        favoritesCount += user.favorites.length || 0;
    }
    if (user.tvFavorites) {
        favoritesCount += user.tvFavorites.length || 0;
    }
    
    if (totalFavoritesEl) {
        totalFavoritesEl.textContent = favoritesCount;
    }
    
    // Calculate ratings statistics
    const ratingsCount = user.ratings ? user.ratings.length : 0;
    
    if (totalRatingsEl) {
        totalRatingsEl.textContent = ratingsCount;
    }
    
    // Separate ratings by type (movie vs TV)
    let movieRatings = [];
    let tvRatings = [];
    
    if (user.ratings && user.ratings.length > 0) {
        movieRatings = user.ratings.filter(r => r.type === 'movie');
        tvRatings = user.ratings.filter(r => r.type === 'tv');
    }
    
    // Calculate average rating for movies
    let avgMovieRating = 0;
    if (movieRatings.length > 0) {
        const totalScore = movieRatings.reduce((sum, rating) => sum + rating.score, 0);
        avgMovieRating = (totalScore / movieRatings.length) * 2; // Convert to scale of 10
    }
    
    // Calculate average rating for TV shows
    let avgTvRating = 0;
    if (tvRatings.length > 0) {
        const totalScore = tvRatings.reduce((sum, rating) => sum + rating.score, 0);
        avgTvRating = (totalScore / tvRatings.length) * 2; // Convert to scale of 10
    }
    
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
 * Load user favorites (both movies and TV shows)
 */
async function loadUserFavorites(user) {
    const favoritesContainer = document.getElementById('profile-favorites-container');
    
    if (!favoritesContainer) return;
    
    // Collect all favorites (movies and TV shows)
    const movieFavorites = user.favorites || [];
    const tvFavorites = user.tvFavorites || [];
    
    // Check if user has any favorites
    if (movieFavorites.length === 0 && tvFavorites.length === 0) {
        favoritesContainer.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-heart"></i>
                <p>No tienes películas o series favoritas aún.</p>
                <a href="index.html" class="btn-primary-small">Explorar contenido</a>
            </div>
        `;
        return;
    }
    
    // Clear container
    favoritesContainer.innerHTML = '';
    
    // Combine and limit to first 6 items total
    const allFavorites = [
        ...movieFavorites.slice(0, 6).map(id => ({ id, type: 'movie' })),
        ...tvFavorites.slice(0, 6).map(id => ({ id, type: 'tv' }))
    ].slice(0, 6);
    
    try {
        // Fetch details for each favorite
        const promises = allFavorites.map(item => 
            fetch(`${BASE_URL}/${item.type}/${item.id}?language=es-ES`, profileOptions)
                .then(response => response.json())
                .then(data => ({ ...data, contentType: item.type }))
                .catch(error => {
                    console.error(`Error loading ${item.type} ${item.id}:`, error);
                    return null;
                })
        );
        
        const items = await Promise.all(promises);
        
        // Filter out null results
        const validItems = items.filter(item => item !== null);
        
        if (validItems.length === 0) {
            favoritesContainer.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-heart"></i>
                    <p>No se pudieron cargar tus favoritos.</p>
                </div>
            `;
            return;
        }
        
        // Create cards
        validItems.forEach(item => {
            const card = createFavoriteMovieCard(item, item.contentType);
            favoritesContainer.appendChild(card);
        });
        
    } catch (error) {
        console.error('Error loading favorites:', error);
        favoritesContainer.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-exclamation-triangle"></i>
                <p>Error al cargar los favoritos.</p>
            </div>
        `;
    }
}

/**
 * Create favorite movie/TV card element
 */
function createFavoriteMovieCard(item, type = 'movie') {
    const card = document.createElement('div');
    card.className = 'favorite-movie-card';
    
    const poster = document.createElement('div');
    poster.className = 'favorite-movie-poster';
    
    if (item.poster_path) {
        const img = document.createElement('img');
        img.src = `${IMAGE_URL}${item.poster_path}`;
        img.alt = type === 'movie' ? item.title : item.name;
        img.loading = 'lazy';
        poster.appendChild(img);
    }
    
    const info = document.createElement('div');
    info.className = 'favorite-movie-info';
    
    const title = document.createElement('div');
    title.className = 'favorite-movie-title';
    title.textContent = type === 'movie' ? item.title : item.name;
    
    const date = document.createElement('div');
    date.className = 'favorite-movie-date';
    const releaseDate = type === 'movie' ? item.release_date : item.first_air_date;
    date.textContent = formatDate(releaseDate);
    
    info.appendChild(title);
    info.appendChild(date);
    
    card.appendChild(poster);
    card.appendChild(info);
    
    // Make card clickable
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => {
        window.location.href = `index.html#${type}-${item.id}`;
    });
    
    return card;
}

/**
 * Load user watchlist
 */
async function loadWatchlist(user) {
    const watchlistSection = document.querySelector('.profile-section:last-child');
    if (!watchlistSection) return;
    
    const watchlist = user.watchlist || [];
    
    // If no watchlist items, keep the empty state
    if (watchlist.length === 0) {
        return;
    }
    
    // Clear the section and rebuild with actual content
    const sectionHeader = watchlistSection.querySelector('.section-header');
    const emptyState = watchlistSection.querySelector('.empty-state');
    
    if (emptyState) {
        emptyState.remove();
    }
    
    // Create container for watchlist items
    const watchlistContainer = document.createElement('div');
    watchlistContainer.id = 'profile-watchlist-container';
    watchlistContainer.className = 'profile-movies-grid';
    watchlistSection.appendChild(watchlistContainer);
    
    // Limit to first 6 items
    const itemsToShow = watchlist.slice(0, 6);
    
    try {
        // Fetch details for each watchlist item
        const promises = itemsToShow.map(item => 
            fetch(`${BASE_URL}/${item.type}/${item.id}?language=es-ES`, profileOptions)
                .then(response => response.json())
                .then(data => ({ ...data, contentType: item.type }))
                .catch(error => {
                    console.error(`Error loading ${item.type} ${item.id}:`, error);
                    return null;
                })
        );
        
        const items = await Promise.all(promises);
        
        // Filter out null results
        const validItems = items.filter(item => item !== null);
        
        if (validItems.length === 0) {
            watchlistContainer.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-bookmark"></i>
                    <p>No se pudieron cargar los elementos de tu lista.</p>
                </div>
            `;
            return;
        }
        
        // Create cards
        validItems.forEach(item => {
            const card = createFavoriteMovieCard(item, item.contentType);
            watchlistContainer.appendChild(card);
        });
        
    } catch (error) {
        console.error('Error loading watchlist:', error);
        watchlistContainer.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-exclamation-triangle"></i>
                <p>Error al cargar tu lista.</p>
            </div>
        `;
    }
}

// ============ INITIALIZATION ============

// Check auth status and initialize profile on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeProfile();
});
