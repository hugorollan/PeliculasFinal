// YouTube video ID validation regex (11 characters, alphanumeric with _ and -)
const YOUTUBE_VIDEO_ID_REGEX = /^[a-zA-Z0-9_-]{11}$/;

// Diccionario de Traducciones
const TRANSLATIONS = {
    'es': {
        nav_movies: 'Películas',
        nav_series: 'Series',
        nav_people: 'Gente',
        nav_more: 'Más',
        nav_login: 'Iniciar sesión',
        nav_join: 'Únete a PFHR',
        hero_title: 'Te damos la bienvenida.',
        hero_subtitle: 'Millones de películas, series y gente por descubrir. Explora ya.',
        search_btn: 'Buscar',
        search_placeholder: 'Buscar una película, serie, persona...',
        section_favorites: 'Mis Favoritos',
        section_trending: 'Tendencias',
        section_popular: 'Populares',
        section_trailers: 'Últimos Tráilers',
        time_day: 'Hoy',
        time_week: 'Esta semana',
        cat_streaming: 'Streaming',
        cat_tv: 'En TV',
        cat_rent: 'En Alquiler',
        cat_theaters: 'En Cines',
        empty_favorites: 'No tienes películas favoritas aún.',
        // Movies dropdown
        movies_popular: 'Popular',
        movies_now_playing: 'En cartelera',
        movies_upcoming: 'Próximamente',
        movies_top_rated: 'Mejor puntuadas',
        // TV Shows dropdown
        tv_popular: 'Popular',
        tv_airing_today: 'En emisión hoy',
        tv_on_the_air: 'En televisión',
        tv_top_rated: 'Mejor puntuadas',
        // People dropdown
        people_popular: 'Popular',
        // More dropdown
        more_debates: 'Debates',
        more_leaderboard: 'Tabla de clasificación',
        more_support: 'Soporte',
        // Auth forms
        auth_login_title: 'Iniciar Sesión',
        auth_login_subtitle: 'Accede a tu cuenta para disfrutar de todas las funcionalidades',
        auth_email_label: 'Correo Electrónico',
        auth_password_label: 'Contraseña',
        auth_login_button: 'Iniciar Sesión',
        auth_no_account: '¿No tienes cuenta?',
        auth_register_link: 'Regístrate aquí',
        auth_register_title: 'Crear Cuenta',
        auth_register_subtitle: 'Únete a nuestra comunidad de amantes del cine',
        auth_name_label: 'Nombre Completo',
        auth_confirm_password_label: 'Confirmar Contraseña',
        auth_register_button: 'Crear Cuenta',
        auth_have_account: '¿Ya tienes cuenta?',
        auth_login_link: 'Inicia sesión aquí',
        auth_email_placeholder: 'tu@email.com',
        auth_password_placeholder: 'Tu contraseña',
        auth_name_placeholder: 'Tu nombre completo',
        auth_password_min_placeholder: 'Mínimo 6 caracteres',
        auth_confirm_password_placeholder: 'Repite tu contraseña',
        auth_logout_button: 'Cerrar Sesión',
        // Footer translations
        footer_about: 'Acerca de PFHR',
        footer_support: 'Contactar con el soporte',
        footer_api: 'API',
        footer_blog: 'Blog',
        footer_participate: 'Participa',
        footer_forums: 'Foros de discusión',
        footer_contribute: 'Contribuir',
        footer_guide: 'Guía de contribución',
        footer_community: 'Comunidad',
        footer_guidelines: 'Directrices',
        footer_twitter: 'Twitter',
        footer_facebook: 'Facebook',
        footer_legal: 'Legal',
        footer_terms: 'Términos de uso',
        footer_privacy: 'Política de privacidad',
        footer_copyright: '© 2025 PFHR. Todos los derechos reservados.',
        // About modal
        about_modal_title: 'Acerca de PFHR',
        about_lead: 'PFHR es una plataforma web moderna dedicada a los amantes del cine y las series de televisión.',
        about_what_title: '¿Qué es PFHR?',
        about_what_text: 'PFHR (Películas, Films, Hollywood & Reviews) es una aplicación web que te permite explorar, descubrir y organizar tu contenido audiovisual favorito. Con una interfaz intuitiva y elegante, puedes acceder a información detallada sobre miles de películas, series de televisión y personalidades del mundo del entretenimiento.',
        about_features_title: 'Características principales',
        about_feature_search: 'Búsqueda avanzada:',
        about_feature_search_desc: 'Encuentra fácilmente películas, series y personas',
        about_feature_info: 'Información detallada:',
        about_feature_info_desc: 'Sinopsis, reparto, valoraciones y más',
        about_feature_trends: 'Tendencias:',
        about_feature_trends_desc: 'Mantente al día con lo más popular',
        about_feature_favorites: 'Lista de favoritos:',
        about_feature_favorites_desc: 'Guarda tus películas y series preferidas',
        about_feature_trailers: 'Tráilers:',
        about_feature_trailers_desc: 'Visualiza tráilers directamente en la plataforma',
        about_feature_recommendations: 'Recomendaciones:',
        about_feature_recommendations_desc: 'Descubre contenido similar a tus favoritos',
        about_tech_title: 'Tecnología',
        about_tech_text: 'PFHR está construido con las últimas tecnologías web y utiliza la API de The Movie Database (TMDB) para proporcionar información actualizada y precisa sobre el contenido audiovisual.',
        about_mission_title: 'Nuestra misión',
        about_mission_text: 'Hacer que la experiencia de descubrir y disfrutar contenido audiovisual sea más accesible, organizada y placentera para todos los usuarios.',
        about_version: 'Versión:',
        about_updated: 'Última actualización:',
        about_date: 'Noviembre 2024',
        // Support modal
        support_modal_title: 'Contactar con el soporte',
        support_intro: '¿Tienes alguna pregunta o necesitas ayuda? Completa el formulario y nos pondremos en contacto contigo lo antes posible.',
        support_name_label: 'Nombre completo *',
        support_email_label: 'Email *',
        support_reason_label: 'Motivo de consulta *',
        support_subject_label: 'Asunto *',
        support_message_label: 'Mensaje *',
        support_name_placeholder: 'Tu nombre',
        support_email_placeholder: 'tu@email.com',
        support_subject_placeholder: 'Asunto de tu consulta',
        support_message_placeholder: 'Describe tu consulta con el mayor detalle posible...',
        support_reason_select: 'Selecciona un motivo',
        support_reason_technical: 'Problema técnico',
        support_reason_account: 'Problema con mi cuenta',
        support_reason_suggestion: 'Sugerencia o mejora',
        support_reason_content: 'Contenido faltante o incorrecto',
        support_reason_billing: 'Consulta sobre facturación',
        support_reason_other: 'Otro',
        support_submit_btn: 'Enviar consulta',
        support_cancel_btn: 'Cancelar',
        // Project info modal
        project_info_link: 'Pulse para más información del proyecto',
        project_modal_title: 'Información del Proyecto',
        project_designer_title: 'Diseñador del Proyecto',
        project_designer_name: 'Hugo Rollán Agudo',
        project_linkedin: 'LinkedIn',
        project_instagram: 'Instagram',
        project_error_loading: 'Error al cargar la información del proyecto.',
        // Movie/TV details modal
        movie_user_score: 'Puntuación<br>de usuarios',
        movie_overview: 'Vista general',
        movie_no_synopsis: 'No hay sinopsis disponible.',
        movie_director: 'Director',
        movie_screenplay: 'Screenplay',
        movie_story: 'Story',
        movie_trailer: 'Tráiler',
        movie_main_cast: 'Reparto principal',
        movie_no_cast: 'No hay información de reparto disponible.',
        movie_reviews: 'Reseñas',
        movie_review_by: 'Una reseña de',
        movie_written_by: 'Escrito por',
        movie_no_reviews: 'No hay reseñas disponibles.',
        movie_recommendations: 'Recomendaciones',
        movie_no_recommendations: 'No hay recomendaciones disponibles.',
        movie_additional_info: 'Información adicional',
        movie_original_title: 'Título original',
        movie_status: 'Estado',
        movie_status_released: 'Estrenada',
        movie_status_ended: 'Finalizada',
        movie_status_returning: 'En emisión',
        movie_original_language: 'Idioma original',
        movie_budget: 'Presupuesto',
        movie_revenue: 'Ingresos',
        movie_seasons: 'Número de temporadas',
        movie_episodes: 'Número de episodios',
        movie_keywords: 'Palabras clave'
    },
    'en': {
        nav_movies: 'Movies',
        nav_series: 'TV Shows',
        nav_people: 'People',
        nav_more: 'More',
        nav_login: 'Login',
        nav_join: 'Join PFHR',
        hero_title: 'Welcome.',
        hero_subtitle: 'Millions of movies, TV shows and people to discover. Explore now.',
        search_btn: 'Search',
        search_placeholder: 'Search for a movie, tv show, person...',
        section_favorites: 'My Favorites',
        section_trending: 'Trending',
        section_popular: 'Popular',
        section_trailers: 'Latest Trailers',
        time_day: 'Today',
        time_week: 'This Week',
        cat_streaming: 'Streaming',
        cat_tv: 'On TV',
        cat_rent: 'For Rent',
        cat_theaters: 'In Theaters',
        empty_favorites: 'You haven\'t added any favorites yet.',
        // Movies dropdown
        movies_popular: 'Popular',
        movies_now_playing: 'Now Playing',
        movies_upcoming: 'Upcoming',
        movies_top_rated: 'Top Rated',
        // TV Shows dropdown
        tv_popular: 'Popular',
        tv_airing_today: 'Airing Today',
        tv_on_the_air: 'On The Air',
        tv_top_rated: 'Top Rated',
        // People dropdown
        people_popular: 'Popular',
        // More dropdown
        more_debates: 'Discussions',
        more_leaderboard: 'Leaderboard',
        more_support: 'Support',
        // Auth forms
        auth_login_title: 'Sign In',
        auth_login_subtitle: 'Access your account to enjoy all features',
        auth_email_label: 'Email Address',
        auth_password_label: 'Password',
        auth_login_button: 'Sign In',
        auth_no_account: 'Don\'t have an account?',
        auth_register_link: 'Sign up here',
        auth_register_title: 'Create Account',
        auth_register_subtitle: 'Join our community of movie lovers',
        auth_name_label: 'Full Name',
        auth_confirm_password_label: 'Confirm Password',
        auth_register_button: 'Create Account',
        auth_have_account: 'Already have an account?',
        auth_login_link: 'Sign in here',
        auth_email_placeholder: 'your@email.com',
        auth_password_placeholder: 'Your password',
        auth_name_placeholder: 'Your full name',
        auth_password_min_placeholder: 'Minimum 6 characters',
        auth_confirm_password_placeholder: 'Repeat your password',
        auth_logout_button: 'Sign Out',
        // Footer translations
        footer_about: 'About PFHR',
        footer_support: 'Contact Support',
        footer_api: 'API',
        footer_blog: 'Blog',
        footer_participate: 'Get Involved',
        footer_forums: 'Discussion Forums',
        footer_contribute: 'Contribute',
        footer_guide: 'Contribution Guide',
        footer_community: 'Community',
        footer_guidelines: 'Guidelines',
        footer_twitter: 'Twitter',
        footer_facebook: 'Facebook',
        footer_legal: 'Legal',
        footer_terms: 'Terms of Use',
        footer_privacy: 'Privacy Policy',
        footer_copyright: '© 2025 PFHR. All rights reserved.',
        // About modal
        about_modal_title: 'About PFHR',
        about_lead: 'PFHR is a modern web platform dedicated to movie and TV series lovers.',
        about_what_title: 'What is PFHR?',
        about_what_text: 'PFHR (Películas, Films, Hollywood & Reviews) is a web application that allows you to explore, discover and organize your favorite audiovisual content. With an intuitive and elegant interface, you can access detailed information about thousands of movies, TV series and entertainment industry personalities.',
        about_features_title: 'Main Features',
        about_feature_search: 'Advanced Search:',
        about_feature_search_desc: 'Easily find movies, series and people',
        about_feature_info: 'Detailed Information:',
        about_feature_info_desc: 'Synopsis, cast, ratings and more',
        about_feature_trends: 'Trending:',
        about_feature_trends_desc: 'Stay up to date with the most popular',
        about_feature_favorites: 'Favorites List:',
        about_feature_favorites_desc: 'Save your favorite movies and series',
        about_feature_trailers: 'Trailers:',
        about_feature_trailers_desc: 'Watch trailers directly on the platform',
        about_feature_recommendations: 'Recommendations:',
        about_feature_recommendations_desc: 'Discover content similar to your favorites',
        about_tech_title: 'Technology',
        about_tech_text: 'PFHR is built with the latest web technologies and uses The Movie Database (TMDB) API to provide up-to-date and accurate information about audiovisual content.',
        about_mission_title: 'Our Mission',
        about_mission_text: 'Make the experience of discovering and enjoying audiovisual content more accessible, organized and enjoyable for all users.',
        about_version: 'Version:',
        about_updated: 'Last updated:',
        about_date: 'November 2024',
        // Support modal
        support_modal_title: 'Contact Support',
        support_intro: 'Do you have any questions or need help? Fill out the form and we will get back to you as soon as possible.',
        support_name_label: 'Full Name *',
        support_email_label: 'Email *',
        support_reason_label: 'Reason for inquiry *',
        support_subject_label: 'Subject *',
        support_message_label: 'Message *',
        support_name_placeholder: 'Your name',
        support_email_placeholder: 'your@email.com',
        support_subject_placeholder: 'Subject of your inquiry',
        support_message_placeholder: 'Describe your inquiry in as much detail as possible...',
        support_reason_select: 'Select a reason',
        support_reason_technical: 'Technical issue',
        support_reason_account: 'Account problem',
        support_reason_suggestion: 'Suggestion or improvement',
        support_reason_content: 'Missing or incorrect content',
        support_reason_billing: 'Billing inquiry',
        support_reason_other: 'Other',
        support_submit_btn: 'Submit inquiry',
        support_cancel_btn: 'Cancel',
        // Project info modal
        project_info_link: 'Click for more project information',
        project_modal_title: 'Project Information',
        project_designer_title: 'Project Designer',
        project_designer_name: 'Hugo Rollán Agudo',
        project_linkedin: 'LinkedIn',
        project_instagram: 'Instagram',
        project_error_loading: 'Error loading project information.',
        // Movie/TV details modal
        movie_user_score: 'User<br>Score',
        movie_overview: 'Overview',
        movie_no_synopsis: 'No synopsis available.',
        movie_director: 'Director',
        movie_screenplay: 'Screenplay',
        movie_story: 'Story',
        movie_trailer: 'Trailer',
        movie_main_cast: 'Main Cast',
        movie_no_cast: 'No cast information available.',
        movie_reviews: 'Reviews',
        movie_review_by: 'A review by',
        movie_written_by: 'Written by',
        movie_no_reviews: 'No reviews available.',
        movie_recommendations: 'Recommendations',
        movie_no_recommendations: 'No recommendations available.',
        movie_additional_info: 'Additional Information',
        movie_original_title: 'Original Title',
        movie_status: 'Status',
        movie_status_released: 'Released',
        movie_status_ended: 'Ended',
        movie_status_returning: 'Returning Series',
        movie_original_language: 'Original Language',
        movie_budget: 'Budget',
        movie_revenue: 'Revenue',
        movie_seasons: 'Number of Seasons',
        movie_episodes: 'Number of Episodes',
        movie_keywords: 'Keywords'
    },
    'fr': {
        nav_movies: 'Films',
        nav_series: 'Séries',
        nav_people: 'Personnes',
        nav_more: 'Plus',
        nav_login: 'Se connecter',
        nav_join: 'Rejoindre PFHR',
        hero_title: 'Bienvenue.',
        hero_subtitle: 'Des millions de films, séries et personnes à découvrir. Explorez maintenant.',
        search_btn: 'Rechercher',
        search_placeholder: 'Rechercher un film, une série, une personne...',
        section_favorites: 'Mes Favoris',
        section_trending: 'Tendances',
        section_popular: 'Populaires',
        section_trailers: 'Dernières Bandes-annonces',
        time_day: "Aujourd'hui",
        time_week: 'Cette semaine',
        cat_streaming: 'Streaming',
        cat_tv: 'À la télé',
        cat_rent: 'À louer',
        cat_theaters: 'Au cinéma',
        empty_favorites: "Vous n'avez pas encore ajouté de favoris.",
        // Movies dropdown
        movies_popular: 'Populaire',
        movies_now_playing: 'À l\'affiche',
        movies_upcoming: 'À venir',
        movies_top_rated: 'Les mieux notés',
        // TV Shows dropdown
        tv_popular: 'Populaire',
        tv_airing_today: 'Diffusé aujourd\'hui',
        tv_on_the_air: 'À la télévision',
        tv_top_rated: 'Les mieux notés',
        // People dropdown
        people_popular: 'Populaire',
        // More dropdown
        more_debates: 'Débats',
        more_leaderboard: 'Classement',
        more_support: 'Support',
        // Auth forms
        auth_login_title: 'Se connecter',
        auth_login_subtitle: 'Accédez à votre compte pour profiter de toutes les fonctionnalités',
        auth_email_label: 'Adresse e-mail',
        auth_password_label: 'Mot de passe',
        auth_login_button: 'Se connecter',
        auth_no_account: "Vous n'avez pas de compte?",
        auth_register_link: 'Inscrivez-vous ici',
        auth_register_title: 'Créer un compte',
        auth_register_subtitle: 'Rejoignez notre communauté d\'amateurs de cinéma',
        auth_name_label: 'Nom complet',
        auth_confirm_password_label: 'Confirmer le mot de passe',
        auth_register_button: 'Créer un compte',
        auth_have_account: 'Vous avez déjà un compte?',
        auth_login_link: 'Connectez-vous ici',
        auth_email_placeholder: 'votre@email.com',
        auth_password_placeholder: 'Votre mot de passe',
        auth_name_placeholder: 'Votre nom complet',
        auth_password_min_placeholder: 'Minimum 6 caractères',
        auth_confirm_password_placeholder: 'Répétez votre mot de passe',
        auth_logout_button: 'Se déconnecter',
        // Footer translations
        footer_about: 'À propos de PFHR',
        footer_support: 'Contacter le support',
        footer_api: 'API',
        footer_blog: 'Blog',
        footer_participate: 'Participer',
        footer_forums: 'Forums de discussion',
        footer_contribute: 'Contribuer',
        footer_guide: 'Guide de contribution',
        footer_community: 'Communauté',
        footer_guidelines: 'Directives',
        footer_twitter: 'Twitter',
        footer_facebook: 'Facebook',
        footer_legal: 'Légal',
        footer_terms: "Conditions d'utilisation",
        footer_privacy: 'Politique de confidentialité',
        footer_copyright: '© 2025 PFHR. Tous droits réservés.',
        // About modal
        about_modal_title: 'À propos de PFHR',
        about_lead: 'PFHR est une plateforme web moderne dédiée aux amateurs de cinéma et de séries télévisées.',
        about_what_title: 'Qu\'est-ce que PFHR?',
        about_what_text: 'PFHR (Películas, Films, Hollywood & Reviews) est une application web qui vous permet d\'explorer, de découvrir et d\'organiser votre contenu audiovisuel favori. Avec une interface intuitive et élégante, vous pouvez accéder à des informations détaillées sur des milliers de films, séries télévisées et personnalités du monde du divertissement.',
        about_features_title: 'Caractéristiques principales',
        about_feature_search: 'Recherche avancée:',
        about_feature_search_desc: 'Trouvez facilement des films, séries et personnes',
        about_feature_info: 'Informations détaillées:',
        about_feature_info_desc: 'Synopsis, casting, notes et plus',
        about_feature_trends: 'Tendances:',
        about_feature_trends_desc: 'Restez à jour avec le plus populaire',
        about_feature_favorites: 'Liste de favoris:',
        about_feature_favorites_desc: 'Sauvegardez vos films et séries préférés',
        about_feature_trailers: 'Bandes-annonces:',
        about_feature_trailers_desc: 'Regardez les bandes-annonces directement sur la plateforme',
        about_feature_recommendations: 'Recommandations:',
        about_feature_recommendations_desc: 'Découvrez du contenu similaire à vos favoris',
        about_tech_title: 'Technologie',
        about_tech_text: 'PFHR est construit avec les dernières technologies web et utilise l\'API de The Movie Database (TMDB) pour fournir des informations à jour et précises sur le contenu audiovisuel.',
        about_mission_title: 'Notre mission',
        about_mission_text: 'Rendre l\'expérience de découverte et de plaisir du contenu audiovisuel plus accessible, organisée et agréable pour tous les utilisateurs.',
        about_version: 'Version:',
        about_updated: 'Dernière mise à jour:',
        about_date: 'Novembre 2024',
        // Support modal
        support_modal_title: 'Contacter le support',
        support_intro: 'Avez-vous des questions ou besoin d\'aide? Remplissez le formulaire et nous vous recontacterons dès que possible.',
        support_name_label: 'Nom complet *',
        support_email_label: 'E-mail *',
        support_reason_label: 'Motif de la demande *',
        support_subject_label: 'Sujet *',
        support_message_label: 'Message *',
        support_name_placeholder: 'Votre nom',
        support_email_placeholder: 'votre@email.com',
        support_subject_placeholder: 'Sujet de votre demande',
        support_message_placeholder: 'Décrivez votre demande avec le plus de détails possible...',
        support_reason_select: 'Sélectionnez un motif',
        support_reason_technical: 'Problème technique',
        support_reason_account: 'Problème avec mon compte',
        support_reason_suggestion: 'Suggestion ou amélioration',
        support_reason_content: 'Contenu manquant ou incorrect',
        support_reason_billing: 'Demande de facturation',
        support_reason_other: 'Autre',
        support_submit_btn: 'Envoyer la demande',
        support_cancel_btn: 'Annuler',
        // Project info modal
        project_info_link: 'Cliquez pour plus d\'informations sur le projet',
        project_modal_title: 'Informations sur le projet',
        project_designer_title: 'Concepteur du projet',
        project_designer_name: 'Hugo Rollán Agudo',
        project_linkedin: 'LinkedIn',
        project_instagram: 'Instagram',
        project_error_loading: 'Erreur lors du chargement des informations du projet.',
        // Movie/TV details modal
        movie_user_score: 'Score<br>utilisateur',
        movie_overview: 'Aperçu',
        movie_no_synopsis: 'Aucun synopsis disponible.',
        movie_director: 'Réalisateur',
        movie_screenplay: 'Scénario',
        movie_story: 'Histoire',
        movie_trailer: 'Bande-annonce',
        movie_main_cast: 'Distribution principale',
        movie_no_cast: 'Aucune information de distribution disponible.',
        movie_reviews: 'Critiques',
        movie_review_by: 'Une critique de',
        movie_written_by: 'Écrit par',
        movie_no_reviews: 'Aucune critique disponible.',
        movie_recommendations: 'Recommandations',
        movie_no_recommendations: 'Aucune recommandation disponible.',
        movie_additional_info: 'Informations supplémentaires',
        movie_original_title: 'Titre original',
        movie_status: 'Statut',
        movie_status_released: 'Sorti',
        movie_status_ended: 'Terminé',
        movie_status_returning: 'Série en cours',
        movie_original_language: 'Langue originale',
        movie_budget: 'Budget',
        movie_revenue: 'Recettes',
        movie_seasons: 'Nombre de saisons',
        movie_episodes: 'Nombre d\'%C3%A9pisodes',
        movie_keywords: 'Mots-clés'
    },
    'de': {
        nav_movies: 'Filme',
        nav_series: 'Serien',
        nav_people: 'Personen',
        nav_more: 'Mehr',
        nav_login: 'Anmelden',
        nav_join: 'Bei PFHR anmelden',
        hero_title: 'Willkommen.',
        hero_subtitle: 'Millionen von Filmen, Serien und Personen zu entdecken. Jetzt erkunden.',
        search_btn: 'Suchen',
        search_placeholder: 'Nach Film, Serie oder Person suchen...',
        section_favorites: 'Meine Favoriten',
        section_trending: 'Trends',
        section_popular: 'Beliebt',
        section_trailers: 'Neueste Trailer',
        time_day: 'Heute',
        time_week: 'Diese Woche',
        cat_streaming: 'Streaming',
        cat_tv: 'Im TV',
        cat_rent: 'Zum Ausleihen',
        cat_theaters: 'Im Kino',
        empty_favorites: 'Sie haben noch keine Favoriten hinzugefügt.',
        // Movies dropdown
        movies_popular: 'Beliebt',
        movies_now_playing: 'Aktuell im Kino',
        movies_upcoming: 'Demnächst',
        movies_top_rated: 'Am besten bewertet',
        // TV Shows dropdown
        tv_popular: 'Beliebt',
        tv_airing_today: 'Heute ausgestrahlt',
        tv_on_the_air: 'Im Fernsehen',
        tv_top_rated: 'Am besten bewertet',
        // People dropdown
        people_popular: 'Beliebt',
        // More dropdown
        more_debates: 'Diskussionen',
        more_leaderboard: 'Bestenliste',
        more_support: 'Support',
        // Auth forms
        auth_login_title: 'Anmelden',
        auth_login_subtitle: 'Greifen Sie auf Ihr Konto zu, um alle Funktionen zu nutzen',
        auth_email_label: 'E-Mail-Adresse',
        auth_password_label: 'Passwort',
        auth_login_button: 'Anmelden',
        auth_no_account: 'Haben Sie kein Konto?',
        auth_register_link: 'Hier registrieren',
        auth_register_title: 'Konto erstellen',
        auth_register_subtitle: 'Werden Sie Teil unserer Filmliebhaber-Community',
        auth_name_label: 'Vollständiger Name',
        auth_confirm_password_label: 'Passwort bestätigen',
        auth_register_button: 'Konto erstellen',
        auth_have_account: 'Haben Sie bereits ein Konto?',
        auth_login_link: 'Hier anmelden',
        auth_email_placeholder: 'ihre@email.com',
        auth_password_placeholder: 'Ihr Passwort',
        auth_name_placeholder: 'Ihr vollständiger Name',
        auth_password_min_placeholder: 'Mindestens 6 Zeichen',
        auth_confirm_password_placeholder: 'Passwort wiederholen',
        auth_logout_button: 'Abmelden',
        // Footer translations
        footer_about: 'Über PFHR',
        footer_support: 'Support kontaktieren',
        footer_api: 'API',
        footer_blog: 'Blog',
        footer_participate: 'Mitmachen',
        footer_forums: 'Diskussionsforen',
        footer_contribute: 'Beitragen',
        footer_guide: 'Beitragsleitfaden',
        footer_community: 'Community',
        footer_guidelines: 'Richtlinien',
        footer_twitter: 'Twitter',
        footer_facebook: 'Facebook',
        footer_legal: 'Rechtliches',
        footer_terms: 'Nutzungsbedingungen',
        footer_privacy: 'Datenschutzrichtlinie',
        footer_copyright: '© 2025 PFHR. Alle Rechte vorbehalten.',
        // About modal
        about_modal_title: 'Über PFHR',
        about_lead: 'PFHR ist eine moderne Webplattform für Film- und Serienliebhaber.',
        about_what_title: 'Was ist PFHR?',
        about_what_text: 'PFHR (Películas, Films, Hollywood & Reviews) ist eine Webanwendung, mit der Sie Ihre Lieblings-Audioinhalte erkunden, entdecken und organisieren können. Mit einer intuitiven und eleganten Oberfläche können Sie auf detaillierte Informationen über Tausende von Filmen, Fernsehserien und Persönlichkeiten aus der Unterhaltungswelt zugreifen.',
        about_features_title: 'Hauptfunktionen',
        about_feature_search: 'Erweiterte Suche:',
        about_feature_search_desc: 'Finden Sie einfach Filme, Serien und Personen',
        about_feature_info: 'Detaillierte Informationen:',
        about_feature_info_desc: 'Zusammenfassung, Besetzung, Bewertungen und mehr',
        about_feature_trends: 'Trends:',
        about_feature_trends_desc: 'Bleiben Sie auf dem Laufenden mit dem Beliebtesten',
        about_feature_favorites: 'Favoritenliste:',
        about_feature_favorites_desc: 'Speichern Sie Ihre Lieblingsfilme und -serien',
        about_feature_trailers: 'Trailer:',
        about_feature_trailers_desc: 'Schauen Sie Trailer direkt auf der Plattform',
        about_feature_recommendations: 'Empfehlungen:',
        about_feature_recommendations_desc: 'Entdecken Sie ähnliche Inhalte zu Ihren Favoriten',
        about_tech_title: 'Technologie',
        about_tech_text: 'PFHR wurde mit den neuesten Webtechnologien entwickelt und nutzt die API von The Movie Database (TMDB), um aktuelle und genaue Informationen über Audioinhalte bereitzustellen.',
        about_mission_title: 'Unsere Mission',
        about_mission_text: 'Die Erfahrung des Entdeckens und Genießens von Audioinhalten für alle Benutzer zugänglicher, organisierter und angenehmer zu gestalten.',
        about_version: 'Version:',
        about_updated: 'Letzte Aktualisierung:',
        about_date: 'November 2024',
        // Support modal
        support_modal_title: 'Support kontaktieren',
        support_intro: 'Haben Sie Fragen oder benötigen Hilfe? Füllen Sie das Formular aus und wir melden uns so schnell wie möglich bei Ihnen.',
        support_name_label: 'Vollständiger Name *',
        support_email_label: 'E-Mail *',
        support_reason_label: 'Grund der Anfrage *',
        support_subject_label: 'Betreff *',
        support_message_label: 'Nachricht *',
        support_name_placeholder: 'Ihr Name',
        support_email_placeholder: 'ihre@email.com',
        support_subject_placeholder: 'Betreff Ihrer Anfrage',
        support_message_placeholder: 'Beschreiben Sie Ihre Anfrage so detailliert wie möglich...',
        support_reason_select: 'Grund auswählen',
        support_reason_technical: 'Technisches Problem',
        support_reason_account: 'Problem mit meinem Konto',
        support_reason_suggestion: 'Vorschlag oder Verbesserung',
        support_reason_content: 'Fehlender oder falscher Inhalt',
        support_reason_billing: 'Abrechnungsanfrage',
        support_reason_other: 'Andere',
        support_submit_btn: 'Anfrage senden',
        support_cancel_btn: 'Abbrechen',
        // Project info modal
        project_info_link: 'Klicken Sie für weitere Projektinformationen',
        project_modal_title: 'Projektinformationen',
        project_designer_title: 'Projektdesigner',
        project_designer_name: 'Hugo Rollán Agudo',
        project_linkedin: 'LinkedIn',
        project_instagram: 'Instagram',
        project_error_loading: 'Fehler beim Laden der Projektinformationen.',
        // Movie/TV details modal
        movie_user_score: 'Benutzer-<br>Bewertung',
        movie_overview: 'Überblick',
        movie_no_synopsis: 'Keine Zusammenfassung verfügbar.',
        movie_director: 'Regisseur',
        movie_screenplay: 'Drehbuch',
        movie_story: 'Geschichte',
        movie_trailer: 'Trailer',
        movie_main_cast: 'Hauptbesetzung',
        movie_no_cast: 'Keine Besetzungsinformationen verfügbar.',
        movie_reviews: 'Kritiken',
        movie_review_by: 'Eine Kritik von',
        movie_written_by: 'Geschrieben von',
        movie_no_reviews: 'Keine Kritiken verfügbar.',
        movie_recommendations: 'Empfehlungen',
        movie_no_recommendations: 'Keine Empfehlungen verfügbar.',
        movie_additional_info: 'Zusätzliche Informationen',
        movie_original_title: 'Originaltitel',
        movie_status: 'Status',
        movie_status_released: 'Veröffentlicht',
        movie_status_ended: 'Beendet',
        movie_status_returning: 'Laufende Serie',
        movie_original_language: 'Originalsprache',
        movie_budget: 'Budget',
        movie_revenue: 'Einnahmen',
        movie_seasons: 'Anzahl Staffeln',
        movie_episodes: 'Anzahl Episoden',
        movie_keywords: 'Schlüsselwörter'
    }
};

// Variable global de idioma (la API usa formato 'es-ES', 'en-US')
let currentApiLang = 'es-ES';

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

// Pagination State
let trendingCurrentPage = 1;
let popularCurrentPage = 1;
let trendingTotalPages = 1;
let popularTotalPages = 1;

// ============ UTILITY FUNCTIONS ============

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
 * Get translation for current language
 */
function getTranslation(key) {
    const lang = localStorage.getItem('preferredLanguage') || 'es';
    return TRANSLATIONS[lang]?.[key] || TRANSLATIONS['es'][key] || key;
}

/**
 * Get status translation
 */
function getStatusTranslation(status) {
    const lang = localStorage.getItem('preferredLanguage') || 'es';
    
    switch (status) {
        case 'Released':
            return getTranslation('movie_status_released');
        case 'Ended':
            return getTranslation('movie_status_ended');
        case 'Returning Series':
            return getTranslation('movie_status_returning');
        default:
            return status;
    }
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
    const url = `${BASE_URL}/${type}/${category}?language=${currentApiLang}&page=1`;
    
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
async function getTrendingMovies(timeWindow = 'day', page = 1, append = false) {
    const url = `${BASE_URL}/trending/movie/${timeWindow}?language=${currentApiLang}&page=${page}`;
    
    try {
        if (!append) {
            showLoading();
            trendingCurrentPage = 1;
        }
        
        const res = await fetch(url, options);
        
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const data = await res.json();
        
        if (append) {
            appendMovies(data.results, trendingContainer);
        } else {
            displayMovies(data.results, trendingContainer);
        }
        
        // Update pagination state
        trendingCurrentPage = page;
        trendingTotalPages = data.total_pages;
        
        // Show/hide load more button
        updateLoadMoreButton('trending', page, data.total_pages);
        
        hideLoading();
    } catch (error) {
        console.error('Error fetching trending movies:', error);
        showError();
    }
}

/**
 * Fetch popular movies
 */
async function getPopularMovies(page = 1, append = false) {
    const url = `${BASE_URL}/movie/popular?language=${currentApiLang}&page=${page}`;
    
    try {
        if (!append) {
            popularCurrentPage = 1;
        }
        
        const res = await fetch(url, options);
        
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const data = await res.json();
        
        if (append) {
            appendMovies(data.results, popularContainer);
        } else {
            displayMovies(data.results, popularContainer);
        }
        
        // Update pagination state
        popularCurrentPage = page;
        popularTotalPages = data.total_pages;
        
        // Show/hide load more button
        updateLoadMoreButton('popular', page, data.total_pages);
    } catch (error) {
        console.error('Error fetching popular movies:', error);
    }
}

/**
 * Fetch movies for trailers section
 */
async function getUpcomingMovies() {
    const url = `${BASE_URL}/movie/upcoming?language=${currentApiLang}&page=1`;
    
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
    const url = `${BASE_URL}/search/multi?language=${currentApiLang}&query=${encodeURIComponent(query)}&page=1`;
    
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
    const url = `${BASE_URL}/discover/movie?language=${currentApiLang}&with_keywords=${keywordId}&sort_by=popularity.desc&page=1`;
    
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
 * Append movies to container without clearing existing ones (for pagination)
 */
function appendMovies(movies, container) {
    if (!container) return;
    
    const fragment = document.createDocumentFragment();
    
    movies.forEach(movie => {
        const card = createMovieCard(movie, 'movie');
        if (card) {
            fragment.appendChild(card);
        }
    });
    
    container.appendChild(fragment);
}

/**
 * Update visibility of load more buttons
 */
function updateLoadMoreButton(section, currentPage, totalPages) {
    const buttonId = section === 'trending' ? 'load-more-trending' : 'load-more-popular';
    const button = document.getElementById(buttonId);
    
    if (button) {
        if (currentPage < totalPages) {
            button.style.display = 'flex';
            button.disabled = false;
        } else {
            button.style.display = 'none';
        }
    }
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
            
            const url = `${BASE_URL}/trending/all/day?language=${currentApiLang}`;
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
            const url = `${BASE_URL}/search/multi?language=${currentApiLang}&query=${encodeURIComponent(query)}&page=1`;
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
        // Skip project info link as it has its own handler
        if (link.id === 'project-info-link') {
            return;
        }
        
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
                // Removed alert message
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
    const url = `${BASE_URL}/${type}/${movieId}?language=${currentApiLang}`;
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
}

/**
 * Fetch movie credits
 */
async function fetchMovieCredits(movieId, type = 'movie') {
    const url = `${BASE_URL}/${type}/${movieId}/credits?language=${currentApiLang}`;
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
}

/**
 * Fetch movie reviews
 */
async function fetchMovieReviews(movieId, type = 'movie') {
    const url = `${BASE_URL}/${type}/${movieId}/reviews?language=${currentApiLang}&page=1`;
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
}

/**
 * Fetch movie videos
 */
async function fetchMovieVideos(movieId, type = 'movie') {
    const url = `${BASE_URL}/${type}/${movieId}/videos?language=${currentApiLang}`;
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
}

/**
 * Fetch movie recommendations
 */
async function fetchMovieRecommendations(movieId, type = 'movie') {
    const url = `${BASE_URL}/${type}/${movieId}/recommendations?language=${currentApiLang}&page=1`;
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
                        <span class="score-label">${getTranslation('movie_user_score')}</span>
                    </div>
                    
                    ${details.tagline ? `<div class="movie-tagline">${details.tagline}</div>` : ''}
                    
                    <div class="movie-overview-section">
                        <h3>${getTranslation('movie_overview')}</h3>
                        <p>${details.overview || getTranslation('movie_no_synopsis')}</p>
                    </div>
                    
                    <div class="movie-credits-featured">
                        ${director ? `
                            <div class="credit-item">
                                <h4>${director.name}</h4>
                                <p>${getTranslation('movie_director')}</p>
                            </div>
                        ` : ''}
                        ${screenplay.map(person => `
                            <div class="credit-item">
                                <h4>${person.name}</h4>
                                <p>${getTranslation('movie_screenplay')}</p>
                            </div>
                        `).join('')}
                        ${story.map(person => `
                            <div class="credit-item">
                                <h4>${person.name}</h4>
                                <p>${getTranslation('movie_story')}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>
        
        <div class="movie-detail-body">
            <!-- User Rating Section -->
            <div class="detail-section" id="user-rating-section">
                <h2>Tu Valoración</h2>
                <div class="star-rating-container">
                    <div class="star-rating" data-movie-id="${details.id}" data-content-type="${type}">
                        <i class="far fa-star star" data-rating="1"></i>
                        <i class="far fa-star star" data-rating="2"></i>
                        <i class="far fa-star star" data-rating="3"></i>
                        <i class="far fa-star star" data-rating="4"></i>
                        <i class="far fa-star star" data-rating="5"></i>
                    </div>
                    <span class="rating-text">Haz clic en una estrella para valorar</span>
                </div>
            </div>
            
            <!-- Add to Watchlist Section -->
            <div class="detail-section" id="watchlist-section">
                <h2>Mi Lista</h2>
                <button class="btn-add-to-watchlist" data-item-id="${details.id}" data-item-type="${type}">
                    <i class="fas fa-bookmark"></i>
                    <span>Añadir a mi lista</span>
                </button>
            </div>
            
            <!-- Trailer Section -->
            <!-- trailerKey is safe to use here as it's validated with YOUTUBE_VIDEO_ID_REGEX -->
            ${trailerKey ? `
                <div class="detail-section">
                    <h2>${getTranslation('movie_trailer')}</h2>
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
                <h2>${getTranslation('movie_main_cast')}</h2>
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
                ` : `<div class="no-content">${getTranslation('movie_no_cast')}</div>`}
            </div>
            
            <!-- Reviews Section -->
            <div class="detail-section">
                <h2>${getTranslation('movie_reviews')}</h2>
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
                                    <h4>${getTranslation('movie_review_by')} ${review.author}</h4>
                                    <div class="review-date">${getTranslation('movie_written_by')} ${review.author} ${formatDate(review.created_at)}</div>
                                </div>
                            </div>
                            <div class="review-content">
                                ${review.content}
                            </div>
                        </div>
                    `).join('')}
                ` : `<div class="no-content">${getTranslation('movie_no_reviews')}</div>`}
            </div>
            
            <!-- Recommendations Section -->
            <div class="detail-section">
                <h2>${getTranslation('movie_recommendations')}</h2>
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
                ` : `<div class="no-content">${getTranslation('movie_no_recommendations')}</div>`}
            </div>
            
            <!-- Additional Information -->
            <div class="detail-section">
                <h2>${getTranslation('movie_additional_info')}</h2>
                <div class="info-grid">
                    <div class="info-item">
                        <h4>${getTranslation('movie_original_title')}</h4>
                        <p>${type === 'movie' ? details.original_title : details.original_name}</p>
                    </div>
                    <div class="info-item">
                        <h4>${getTranslation('movie_status')}</h4>
                        <p>${getStatusTranslation(details.status)}</p>
                    </div>
                    <div class="info-item">
                        <h4>${getTranslation('movie_original_language')}</h4>
                        <p>${details.original_language.toUpperCase()}</p>
                    </div>
                    ${type === 'movie' ? `
                        <div class="info-item">
                            <h4>${getTranslation('movie_budget')}</h4>
                            <p>${budgetFormatted}</p>
                        </div>
                        <div class="info-item">
                            <h4>${getTranslation('movie_revenue')}</h4>
                            <p>${revenueFormatted}</p>
                        </div>
                    ` : `
                        <div class="info-item">
                            <h4>${getTranslation('movie_seasons')}</h4>
                            <p>${details.number_of_seasons || 'N/A'}</p>
                        </div>
                        <div class="info-item">
                            <h4>${getTranslation('movie_episodes')}</h4>
                            <p>${details.number_of_episodes || 'N/A'}</p>
                        </div>
                    `}
                </div>
            </div>
            
            <!-- Keywords Section -->
            ${keywords.keywords && keywords.keywords.length > 0 ? `
                <div class="detail-section">
                    <h2>${getTranslation('movie_keywords')}</h2>
                    <div class="keywords-list" id="keywords-list-container"></div>
                </div>
            ` : (keywords.results && keywords.results.length > 0 ? `
                <div class="detail-section">
                    <h2>${getTranslation('movie_keywords')}</h2>
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
    
    // Setup star rating interaction
    setupStarRating(details.id, type);
    
    // Setup watchlist button
    setupWatchlistButton(details.id, type);
}

// ============ RATING SYSTEM ============

/**
 * Setup star rating interaction for a movie/TV show
 */
function setupStarRating(itemId, type = 'movie') {
    const currentUser = getCurrentUser();
    const stars = document.querySelectorAll('.star-rating .star');
    const ratingText = document.querySelector('.rating-text');
    const starContainer = document.querySelector('.star-rating');
    
    if (!stars || stars.length === 0) return;
    
    // Check if user is logged in
    if (!currentUser) {
        if (ratingText) {
            ratingText.textContent = 'Inicia sesión para valorar';
        }
        return;
    }
    
    // Load user's existing rating if any
    const existingRating = getUserRatingForItem(currentUser, itemId, type);
    if (existingRating) {
        updateStarDisplay(stars, existingRating.score);
        if (ratingText) {
            ratingText.textContent = `Tu valoración: ${existingRating.score}/5 estrellas`;
        }
    }
    
    // Add hover effect
    stars.forEach(star => {
        star.addEventListener('mouseenter', () => {
            const rating = parseInt(star.getAttribute('data-rating'));
            updateStarDisplay(stars, rating, true);
        });
    });
    
    // Reset on mouse leave
    if (starContainer) {
        starContainer.addEventListener('mouseleave', () => {
            const currentRating = existingRating ? existingRating.score : 0;
            updateStarDisplay(stars, currentRating);
        });
    }
    
    // Handle click to save rating
    stars.forEach(star => {
        star.addEventListener('click', async () => {
            const rating = parseInt(star.getAttribute('data-rating'));
            await saveItemRating(itemId, rating, type);
        });
    });
}

/**
 * Update star display
 */
function updateStarDisplay(stars, rating, isHover = false) {
    stars.forEach(star => {
        const starRating = parseInt(star.getAttribute('data-rating'));
        if (starRating <= rating) {
            star.classList.remove('far');
            star.classList.add('fas');
            if (isHover) {
                star.style.color = '#f5c518';
            } else {
                star.style.color = '#21d07a';
            }
        } else {
            star.classList.remove('fas');
            star.classList.add('far');
            star.style.color = '';
        }
    });
}

/**
 * Get user's rating for a specific item (movie or TV)
 */
function getUserRatingForItem(user, itemId, type = 'movie') {
    if (!user.ratings || user.ratings.length === 0) return null;
    return user.ratings.find(rating => 
        rating.movieId === parseInt(itemId) && rating.type === type
    );
}

/**
 * Save item rating (movie or TV)
 */
async function saveItemRating(itemId, score, type = 'movie') {
    const currentUser = getCurrentUser();
    
    if (!currentUser) {
        showToast('Por favor, inicia sesión para valorar', 'warning');
        return;
    }
    
    try {
        // Initialize ratings array if it doesn't exist
        if (!currentUser.ratings) {
            currentUser.ratings = [];
        }
        
        // Check if rating already exists
        const existingRatingIndex = currentUser.ratings.findIndex(r => 
            r.movieId === parseInt(itemId) && r.type === type
        );
        
        const newRating = {
            movieId: parseInt(itemId),
            type: type,
            score: score,
            date: new Date().toISOString()
        };
        
        let updatedRatings;
        if (existingRatingIndex > -1) {
            // Update existing rating
            updatedRatings = [...currentUser.ratings];
            updatedRatings[existingRatingIndex] = newRating;
        } else {
            // Add new rating
            updatedRatings = [...currentUser.ratings, newRating];
        }
        
        // Update user in json-server
        const response = await fetch(`http://localhost:3000/usuarios/${currentUser.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ratings: updatedRatings })
        });
        
        if (!response.ok) {
            throw new Error('Error al guardar la valoración');
        }
        
        // Update localStorage
        currentUser.ratings = updatedRatings;
        updateCurrentUser(currentUser);
        
        // Update UI
        const stars = document.querySelectorAll('.star-rating .star');
        const ratingText = document.querySelector('.rating-text');
        updateStarDisplay(stars, score);
        if (ratingText) {
            ratingText.textContent = `Tu valoración: ${score}/5 estrellas`;
        }
        
        const itemType = type === 'movie' ? 'Película' : 'Serie';
        showToast(`¡${itemType} valorada con ${score} estrellas!`, 'success');
        
    } catch (error) {
        console.error('Error saving rating:', error);
        showToast('Hubo un error al guardar tu valoración. Por favor, verifica que json-server esté ejecutándose.', 'error');
    }
}

// ============ WATCHLIST FUNCTIONS ============

/**
 * Setup watchlist button in movie detail modal
 */
function setupWatchlistButton(itemId, type = 'movie') {
    const watchlistBtn = document.querySelector('.btn-add-to-watchlist');
    
    if (!watchlistBtn) return;
    
    const currentUser = getCurrentUser();
    
    // Check if user is logged in
    if (!currentUser) {
        watchlistBtn.innerHTML = '<i class="fas fa-lock"></i><span>Inicia sesión para añadir a tu lista</span>';
        watchlistBtn.disabled = true;
        return;
    }
    
    // Check if item is already in watchlist
    const isInWatchlist = currentUser.watchlist && 
        currentUser.watchlist.some(item => item.id === parseInt(itemId) && item.type === type);
    
    if (isInWatchlist) {
        watchlistBtn.innerHTML = '<i class="fas fa-check"></i><span>En mi lista</span>';
        watchlistBtn.classList.add('in-watchlist');
    }
    
    // Add click event
    watchlistBtn.addEventListener('click', async () => {
        await toggleWatchlist(itemId, type);
    });
}

/**
 * Toggle item in watchlist
 */
async function toggleWatchlist(itemId, type = 'movie') {
    const currentUser = getCurrentUser();
    
    if (!currentUser) {
        showToast('Por favor, inicia sesión para usar tu lista', 'warning');
        return;
    }
    
    try {
        // Initialize watchlist array if it doesn't exist
        if (!currentUser.watchlist) {
            currentUser.watchlist = [];
        }
        
        // Check if item is already in watchlist
        const itemIndex = currentUser.watchlist.findIndex(item => 
            item.id === parseInt(itemId) && item.type === type
        );
        
        let updatedWatchlist;
        let isAdding = false;
        
        if (itemIndex > -1) {
            // Remove from watchlist
            updatedWatchlist = currentUser.watchlist.filter((item, index) => index !== itemIndex);
        } else {
            // Add to watchlist
            updatedWatchlist = [...currentUser.watchlist, { id: parseInt(itemId), type: type }];
            isAdding = true;
        }
        
        // Update user in json-server
        const response = await fetch(`http://localhost:3000/usuarios/${currentUser.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ watchlist: updatedWatchlist })
        });
        
        if (!response.ok) {
            throw new Error('Error al actualizar la lista');
        }
        
        // Update localStorage
        currentUser.watchlist = updatedWatchlist;
        updateCurrentUser(currentUser);
        
        // Update button UI
        const watchlistBtn = document.querySelector('.btn-add-to-watchlist');
        if (watchlistBtn) {
            if (isAdding) {
                watchlistBtn.innerHTML = '<i class="fas fa-check"></i><span>En mi lista</span>';
                watchlistBtn.classList.add('in-watchlist');
                showToast('Añadido a tu lista', 'success');
            } else {
                watchlistBtn.innerHTML = '<i class="fas fa-bookmark"></i><span>Añadir a mi lista</span>';
                watchlistBtn.classList.remove('in-watchlist');
                showToast('Eliminado de tu lista', 'success');
            }
        }
        
    } catch (error) {
        console.error('Error toggling watchlist:', error);
        showToast('Error al actualizar tu lista', 'error');
    }
}

// ============ FAVORITES FUNCTIONS ============

/**
 * Toggle favorite status for a movie
 */
async function toggleFavorite(movieId) {
    const currentUser = getCurrentUser();
    
    // Check if user is logged in
    if (!currentUser) {
        showToast('Por favor, inicia sesión para agregar películas a favoritos', 'warning');
        setTimeout(() => {
            window.location.href = 'auth.html';
        }, 1000);
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
        showToast('Hubo un error al actualizar los favoritos. Por favor, verifica que json-server esté ejecutándose.', 'error');
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
            fetch(`${BASE_URL}/movie/${movieId}?language=${currentApiLang}`, options)
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

/**
 * Setup load more buttons
 */
function setupLoadMoreButtons() {
    const loadMoreTrending = document.getElementById('load-more-trending');
    const loadMorePopular = document.getElementById('load-more-popular');
    
    if (loadMoreTrending) {
        loadMoreTrending.addEventListener('click', async () => {
            loadMoreTrending.disabled = true;
            loadMoreTrending.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Cargando...';
            
            await getTrendingMovies(currentTrendingTime, trendingCurrentPage + 1, true);
            
            loadMoreTrending.innerHTML = '<i class="fas fa-plus-circle"></i> Cargar más';
        });
    }
    
    if (loadMorePopular) {
        loadMorePopular.addEventListener('click', async () => {
            loadMorePopular.disabled = true;
            loadMorePopular.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Cargando...';
            
            await getPopularMovies(popularCurrentPage + 1, true);
            
            loadMorePopular.innerHTML = '<i class="fas fa-plus-circle"></i> Cargar más';
        });
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
    setupProjectInfoModal();
    setupLanguageSelector();
    setupLoadMoreButtons();
    
    // Load language preference
    loadLanguagePreference();
    
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
        
        // Show error toast to user
        showToast('Hubo un error al enviar tu solicitud de soporte. Por favor, verifica que el servidor esté ejecutándose (json-server) e intenta de nuevo.', 'error');
    }
}

/**
 * Setup project info modal
 */
function setupProjectInfoModal() {
    const projectInfoLink = document.getElementById('project-info-link');
    const projectInfoModal = document.getElementById('project-info-modal');
    
    if (projectInfoLink && projectInfoModal) {
        projectInfoLink.addEventListener('click', async (e) => {
            e.preventDefault();
            await openProjectInfoModal();
        });
        
        // Close on overlay click
        const overlay = projectInfoModal.querySelector('.modal-overlay');
        if (overlay) {
            overlay.addEventListener('click', closeProjectInfoModal);
        }
        
        // Close on close button click
        const closeBtn = projectInfoModal.querySelector('.modal-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', closeProjectInfoModal);
        }
        
        // Close on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && projectInfoModal.style.display === 'block') {
                closeProjectInfoModal();
            }
        });
    }
}

/**
 * Open Project Info modal and load README content
 */
async function openProjectInfoModal() {
    const projectInfoModal = document.getElementById('project-info-modal');
    const readmeContent = document.getElementById('readme-content');
    
    if (projectInfoModal) {
        projectInfoModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Load README content based on selected language
        if (readmeContent) {
            try {
                const lang = localStorage.getItem('preferredLanguage') || 'es';
                const readmeFiles = {
                    'es': 'README.md',
                    'en': 'README-en.md',
                    'fr': 'README-fr.md',
                    'de': 'README-de.md'
                };
                const readmeFile = readmeFiles[lang] || 'README.md';
                
                const response = await fetch(readmeFile);
                const markdown = await response.text();
                
                // Convert markdown to HTML (simple conversion)
                readmeContent.innerHTML = convertMarkdownToHTML(markdown);
            } catch (error) {
                console.error('Error loading README:', error);
                const lang = localStorage.getItem('preferredLanguage') || 'es';
                const errorText = TRANSLATIONS[lang]?.project_error_loading || 'Error al cargar la información del proyecto.';
                readmeContent.innerHTML = `<p>${errorText}</p>`;
            }
        }
    }
}

/**
 * Close Project Info modal
 */
function closeProjectInfoModal() {
    const projectInfoModal = document.getElementById('project-info-modal');
    if (projectInfoModal) {
        projectInfoModal.style.display = 'none';
        document.body.style.overflow = '';
    }
}

/**
 * Simple markdown to HTML converter
 */
function convertMarkdownToHTML(markdown) {
    let html = markdown;
    
    // Headers
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
    
    // Bold
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    
    // Italic
    html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
    
    // Links
    html = html.replace(/\[([^\]]+)\]\(([^\)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
    
    // Code blocks
    html = html.replace(/```([^`]+)```/g, '<pre><code>$1</code></pre>');
    
    // Inline code
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
    
    // Lists (unordered)
    html = html.replace(/^\- (.+)$/gim, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
    
    // Line breaks
    html = html.replace(/\n\n/g, '</p><p>');
    html = '<p>' + html + '</p>';
    
    // Clean up extra tags
    html = html.replace(/<p><h/g, '<h');
    html = html.replace(/<\/h([1-6])><\/p>/g, '</h$1>');
    html = html.replace(/<p><ul>/g, '<ul>');
    html = html.replace(/<\/ul><\/p>/g, '</ul>');
    html = html.replace(/<p><pre>/g, '<pre>');
    html = html.replace(/<\/pre><\/p>/g, '</pre>');
    html = html.replace(/<p><\/p>/g, '');
    
    return html;
}

/**
 * Setup language selector
 */
function setupLanguageSelector() {
    const langOptions = document.querySelectorAll('.lang-dropdown a');
    const langBox = document.querySelector('.lang-box');
    
    langOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            e.preventDefault();
            const lang = e.target.dataset.lang || e.target.parentElement.dataset.lang;
            changeLanguage(lang, true);
        });
    });
}

/**
 * Change language and update UI
 */
function changeLanguage(lang, showNotification = false) {
    const langBox = document.querySelector('.lang-box');
    
    // 1. Guardar preferencia
    localStorage.setItem('preferredLanguage', lang);
    
    // 2. Actualizar botón visual
    const langMap = {
        'es': 'ES',
        'en': 'EN',
        'fr': 'FR',
        'de': 'DE'
    };
    
    if (langBox) {
        langBox.textContent = langMap[lang] || 'ES';
    }
    
    // 3. Definir idioma para la API (Mapeo simple)
    // Si es 'en', usa 'en-US', si no, 'es-ES'
    currentApiLang = lang === 'en' ? 'en-US' : 'es-ES';
    
    // 4. Traducir la Interfaz (UI)
    const texts = TRANSLATIONS[lang];
    if (texts) {
        // Traducir textos normales
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (texts[key]) el.textContent = texts[key];
        });
        
        // Traducir placeholders (inputs)
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (texts[key]) el.placeholder = texts[key];
        });
    }
    
    // 5. Recargar contenido de la API con el nuevo idioma
    console.log(`Reloading content in: ${currentApiLang}`);
    getTrendingMovies(currentTrendingTime);
    getPopularMovies();
    getUpcomingMovies();
    
    // Notificación (solo si se solicita)
    if (showNotification) {
        showLanguageNotification(lang);
    }
}

/**
 * Show language change notification
 */
function showLanguageNotification(lang) {
    const langMessages = {
        'es': 'Idioma: Español🇪🇸',
        'en': 'Language: English🇬🇧',
        'fr': 'Langue: Français🇫🇷',
        'de': 'Sprache: Deutsch🇩🇪'
    };
    
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: linear-gradient(to right, #1ed5a9, #01b4e4);
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 10001;
        font-weight: 600;
        animation: slideInRight 0.3s ease-out;
        min-width: 200px;
        text-align: center;
        white-space: nowrap;
    `;
    notification.textContent = langMessages[lang] || langMessages['es'];
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transition = 'opacity 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

/**
 * Load saved language preference
 */
function loadLanguagePreference() {
    const savedLang = localStorage.getItem('preferredLanguage') || 'es';
    changeLanguage(savedLang);
}

// Start the application when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

