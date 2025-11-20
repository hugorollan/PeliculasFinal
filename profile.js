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
    
    // Add logout button
    const logoutBtn = document.createElement('a');
    logoutBtn.className = 'nav-link btn-join';
    logoutBtn.href = '#';
    logoutBtn.innerHTML = '<i class="fas fa-sign-out-alt"></i> <span data-i18n="auth_logout_button">Cerrar sesión</span>';
    logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        handleProfileLogout();
    });
    navRight.appendChild(logoutBtn);
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
    
    // Load watched movies
    await loadWatchedMovies(currentUser);
    
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
        // Check if user has a custom avatar icon
        if (user.avatarIcon) {
            avatarLetter.innerHTML = `<i class="${user.avatarIcon}"></i>`;
            avatarLetter.style.fontSize = '3.5rem';
        } else {
            avatarLetter.textContent = user.name.charAt(0).toUpperCase();
            avatarLetter.style.fontSize = '3rem';
        }
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
 * Load user watched movies
 */
async function loadWatchedMovies(user) {
    const activityList = document.querySelector('.activity-list');
    
    if (!activityList) return;
    
    // Get watched movies
    const watchedMovies = user.watchedMovies || [];
    
    // Check if user has any watched movies
    if (watchedMovies.length === 0) {
        activityList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-clipboard-list"></i>
                <p data-i18n="profile_no_watched">${getTranslation('profile_no_watched')}</p>
            </div>
        `;
        return;
    }
    
    // Clear container
    activityList.innerHTML = '';
    
    // Sort by watched date (most recent first) and limit to first 10 items
    const sortedWatched = [...watchedMovies]
        .sort((a, b) => new Date(b.watchedAt) - new Date(a.watchedAt))
        .slice(0, 10);
    
    try {
        // Fetch details for each watched item
        const promises = sortedWatched.map(item => 
            fetch(`${BASE_URL}/${item.type}/${item.id}?language=es-ES`, profileOptions)
                .then(response => response.json())
                .then(data => ({ ...data, contentType: item.type, watchedAt: item.watchedAt }))
                .catch(error => {
                    console.error(`Error loading ${item.type} ${item.id}:`, error);
                    return null;
                })
        );
        
        const items = await Promise.all(promises);
        
        // Filter out null results
        const validItems = items.filter(item => item !== null);
        
        if (validItems.length === 0) {
            activityList.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-exclamation-triangle"></i>
                    <p>Error al cargar las películas vistas.</p>
                </div>
            `;
            return;
        }
        
        // Create activity items
        validItems.forEach(item => {
            const activityItem = createWatchedActivityItem(item, item.contentType);
            activityList.appendChild(activityItem);
        });
        
    } catch (error) {
        console.error('Error loading watched movies:', error);
        activityList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-exclamation-triangle"></i>
                <p>Error al cargar las películas vistas.</p>
            </div>
        `;
    }
}

/**
 * Create watched activity item element
 */
function createWatchedActivityItem(item, type = 'movie') {
    const activityItem = document.createElement('div');
    activityItem.className = 'activity-item';
    activityItem.dataset.itemId = item.id;
    activityItem.dataset.itemType = type;
    
    const icon = document.createElement('div');
    icon.className = 'activity-icon';
    icon.innerHTML = '<i class="fas fa-eye"></i>';
    
    const content = document.createElement('div');
    content.className = 'activity-content';
    
    const text = document.createElement('div');
    text.className = 'activity-text';
    const title = type === 'movie' ? item.title : item.name;
    text.innerHTML = `<strong>${getTranslation('mark_as_watched')}</strong>: ${title}`;
    
    const time = document.createElement('div');
    time.className = 'activity-time';
    time.textContent = formatTimeAgo(item.watchedAt);
    
    content.appendChild(text);
    content.appendChild(time);
    
    activityItem.appendChild(icon);
    activityItem.appendChild(content);
    
    // Make item clickable
    activityItem.style.cursor = 'pointer';
    activityItem.addEventListener('click', () => {
        window.location.href = `index.html#${type}-${item.id}`;
    });
    
    return activityItem;
}

/**
 * Format time ago (e.g., "hace 2 horas")
 */
function formatTimeAgo(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffSeconds < 60) return 'hace unos segundos';
    if (diffMinutes < 60) return `hace ${diffMinutes} minuto${diffMinutes !== 1 ? 's' : ''}`;
    if (diffHours < 24) return `hace ${diffHours} hora${diffHours !== 1 ? 's' : ''}`;
    if (diffDays < 7) return `hace ${diffDays} día${diffDays !== 1 ? 's' : ''}`;
    if (diffDays < 30) return `hace ${Math.floor(diffDays / 7)} semana${Math.floor(diffDays / 7) !== 1 ? 's' : ''}`;
    if (diffDays < 365) return `hace ${Math.floor(diffDays / 30)} mes${Math.floor(diffDays / 30) !== 1 ? 'es' : ''}`;
    return `hace ${Math.floor(diffDays / 365)} año${Math.floor(diffDays / 365) !== 1 ? 's' : ''}`;
}

/**
 * Create favorite movie/TV card element
 */
function createFavoriteMovieCard(item, type = 'movie') {
    const card = document.createElement('div');
    card.className = 'favorite-movie-card';
    card.dataset.itemId = item.id;
    card.dataset.itemType = type;
    
    const poster = document.createElement('div');
    poster.className = 'favorite-movie-poster';
    
    if (item.poster_path) {
        const img = document.createElement('img');
        img.src = `${IMAGE_URL}${item.poster_path}`;
        img.alt = type === 'movie' ? item.title : item.name;
        img.loading = 'lazy';
        poster.appendChild(img);
    }
    
    // Add delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'favorite-delete-btn';
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
    deleteBtn.title = 'Eliminar de favoritos';
    deleteBtn.setAttribute('aria-label', 'Eliminar de favoritos');
    
    // Handle delete button click
    deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        removeFavoriteFromProfile(item.id, type, card);
    });
    
    poster.appendChild(deleteBtn);
    
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

// ============ AVATAR MODAL FUNCTIONS ============

/**
 * Open avatar selection modal
 */
function openAvatarModal() {
    const modal = document.getElementById('avatar-modal');
    if (modal) {
        modal.style.display = 'flex';
    }
}

/**
 * Close avatar selection modal
 */
function closeAvatarModal() {
    const modal = document.getElementById('avatar-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

/**
 * Update user avatar
 */
async function updateUserAvatar(iconClass) {
    const currentUser = getCurrentUser();
    if (!currentUser) return;
    
    try {
        // Update user in json-server
        const response = await fetch(`http://localhost:3000/usuarios/${currentUser.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ avatarIcon: iconClass })
        });
        
        if (!response.ok) {
            throw new Error('Error al actualizar el avatar');
        }
        
        const updatedUser = await response.json();
        
        // Update localStorage
        updateCurrentUser(updatedUser);
        
        // Update UI
        updateProfileHeader(updatedUser);
        
        // Show success message
        showToast('Avatar actualizado correctamente', 'success');
        
        // Close modal
        closeAvatarModal();
        
    } catch (error) {
        console.error('Error updating avatar:', error);
        showToast('Error al actualizar el avatar', 'error');
    }
}

// ============ FAVORITES MANAGEMENT FUNCTIONS ============

/**
 * Remove favorite from profile
 */
async function removeFavoriteFromProfile(itemId, type, cardElement) {
    // Ask for confirmation
    if (!confirm('¿Estás seguro de que quieres eliminar este elemento de tus favoritos?')) {
        return;
    }
    
    const currentUser = getCurrentUser();
    if (!currentUser) return;
    
    try {
        // Determine which favorites array to update
        const favoritesKey = type === 'movie' ? 'favorites' : 'tvFavorites';
        const currentFavorites = currentUser[favoritesKey] || [];
        
        // Remove the item from favorites
        const updatedFavorites = currentFavorites.filter(id => id !== itemId);
        
        // Update user in json-server
        const response = await fetch(`http://localhost:3000/usuarios/${currentUser.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ [favoritesKey]: updatedFavorites })
        });
        
        if (!response.ok) {
            throw new Error('Error al eliminar de favoritos');
        }
        
        const updatedUser = await response.json();
        
        // Update localStorage
        updateCurrentUser(updatedUser);
        
        // Animate card removal
        cardElement.classList.add('favorite-card-removing');
        
        // Remove card after animation
        setTimeout(() => {
            cardElement.remove();
            
            // Check if favorites container is now empty
            const favoritesContainer = document.getElementById('profile-favorites-container');
            if (favoritesContainer && favoritesContainer.children.length === 0) {
                favoritesContainer.innerHTML = `
                    <div class="empty-state">
                        <i class="fas fa-heart"></i>
                        <p>No tienes películas o series favoritas aún.</p>
                        <a href="index.html" class="btn-primary-small">Explorar contenido</a>
                    </div>
                `;
            }
            
            // Update statistics
            loadUserStatistics(updatedUser);
            
        }, 300);
        
        // Show success message
        showToast('Eliminado de favoritos', 'success');
        
    } catch (error) {
        console.error('Error removing favorite:', error);
        showToast('Error al eliminar de favoritos', 'error');
    }
}

// ============ LOGOUT FUNCTION ============

/**
 * Handle logout from profile page
 */
function handleProfileLogout() {
    // Clear user session
    localStorage.removeItem('currentUser');
    
    // Redirect to index.html
    window.location.href = 'index.html';
}

// ============ INITIALIZATION ============

// Check auth status and initialize profile on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeProfile();
    
    // Setup avatar modal
    const profileAvatar = document.getElementById('profile-avatar');
    if (profileAvatar) {
        profileAvatar.addEventListener('click', openAvatarModal);
    }
    
    // Setup avatar modal close button
    const avatarModal = document.getElementById('avatar-modal');
    if (avatarModal) {
        const closeBtn = avatarModal.querySelector('.modal-close');
        const overlay = avatarModal.querySelector('.modal-overlay');
        
        if (closeBtn) {
            closeBtn.addEventListener('click', closeAvatarModal);
        }
        
        if (overlay) {
            overlay.addEventListener('click', closeAvatarModal);
        }
    }
    
    // Setup avatar selection buttons
    const avatarOptions = document.querySelectorAll('.avatar-option');
    avatarOptions.forEach(option => {
        option.addEventListener('click', () => {
            const iconClass = option.dataset.icon;
            updateUserAvatar(iconClass);
        });
    });
});
