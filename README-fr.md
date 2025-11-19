# TMDB - Films, Séries et Plus (Avec Système d'Authentification)

Une application web professionnelle de type clone TMDB (The Movie Database) qui permet d'explorer des films, séries et plus de contenu de divertissement. **Inclut maintenant un système complet d'Enregistrement et de Connexion utilisateur** utilisant Vanilla JavaScript et json-server.

## 🌟 Caractéristiques

### Fonctionnalités Principales
- **✨ Système d'Enregistrement et de Connexion**: Authentification complète des utilisateurs avec persistance des données
- **👤 Gestion de Sessions**: Maintenez votre session active en utilisant localStorage
- **🔒 Validation des Utilisateurs**: Système sécurisé de validation des identifiants
- **🎬 Recherche de Films**: Recherchez des films en temps réel en utilisant l'API TMDB
- **📺 Visualisation de Bandes-annonces**: Lecture de bandes-annonces YouTube intégrées
- **🔥 Sections Dynamiques**:
  - Tendances (Aujourd'hui / Cette semaine)
  - Films Populaires (Streaming / À la télé / À louer / Au cinéma)
  - Dernières Bandes-annonces
- **🎯 Basculeurs Interactifs**: Changez entre différentes catégories d'un seul clic
- **💳 Cartes de Films**: Visualisation professionnelle avec affiches, notes et dates
- **📱 Design Réactif**: Fonctionne parfaitement sur ordinateur, tablette et mobile

### Améliorations Professionnelles
- ✅ Structure HTML5 sémantique
- ✅ Accessibilité améliorée (labels ARIA, rôles, navigation au clavier)
- ✅ Animations et transitions fluides
- ✅ États de chargement et messages d'erreur
- ✅ SEO optimisé avec meta tags
- ✅ Footer professionnel avec liens
- ✅ Navigation collante
- ✅ Effets de survol sur tous les éléments interactifs
- ✅ Système d'authentification avec API REST simulée

## 🚀 Technologies Utilisées

### Frontend
- **HTML5**: Structure sémantique et accessible
- **CSS3**: Styles modernes avec variables CSS, animations et design réactif
- **JavaScript (ES6+ Vanilla)**: Logique d'application moderne avec async/await
- **API TMDB**: Intégration avec l'API de The Movie Database
- **Font Awesome**: Icônes professionnelles

### Backend (Simulé)
- **json-server**: API REST simulée pour le développement
- **db.json**: Base de données locale pour les utilisateurs enregistrés

## 📦 Installation et Configuration

### Prérequis
- **Node.js** (v14 ou supérieur) - [Télécharger ici](https://nodejs.org/)
- **npm** (fourni avec Node.js)
- Navigateur web moderne (Chrome, Firefox, Safari, Edge)
- Connexion Internet (pour charger les ressources externes et l'API TMDB)

### Étapes d'Installation

#### 1. Cloner le dépôt
```bash
git clone https://github.com/hugorollan/PeliculasFinal.git
cd PeliculasFinal
```

#### 2. Installer les dépendances
```bash
npm install
```

Cette commande installera:
- `json-server`: Pour simuler l'API REST backend
- `concurrently`: Pour exécuter plusieurs commandes simultanément

#### 3. Démarrer le serveur simulé (json-server)

**Option A: json-server seulement**
```bash
npm run server
```

Cela démarrera json-server à `http://localhost:3000`.
La base de données `db.json` sera surveillée automatiquement pour les changements.

**Option B: json-server + serveur HTTP (recommandé pour le développement)**
```bash
npm run dev
```

Cela démarrera:
- json-server à `http://localhost:3000` (API)
- serveur HTTP à `http://localhost:8080` (Frontend)

#### 4. Ouvrir l'application

Ouvrez votre navigateur et visitez:
- **Frontend**: `http://localhost:8080`
- **API**: `http://localhost:3000` (pour voir les données directement)

### Alternative: Serveur Python (si vous n'avez pas Node.js)

Si vous voulez juste voir l'application sans le système d'authentification:

```bash
python3 -m http.server 8080
# ou
python -m http.server 8080
```

**Note**: Sans json-server, les fonctions d'enregistrement et de connexion ne fonctionneront pas.

## 🎨 Structure du Projet

```
PeliculasFinal/
│
├── index.html          # Page principale avec films
├── auth.html           # Page de connexion et d'enregistrement
├── styles.css          # Styles principaux
├── auth-styles.css     # Styles pour l'authentification
├── script.js           # Logique des films et API TMDB
├── app.js              # Logique d'authentification
├── package.json        # Dépendances et scripts
├── db.json             # Base de données utilisateurs (json-server)
├── .gitignore          # Fichiers ignorés par Git
└── README.md           # Documentation
```

## 🔐 Système d'Authentification

### Caractéristiques du Système

1. **Enregistrement des Utilisateurs**:
   - Formulaire avec nom, email et mot de passe
   - Validation du format email
   - Confirmation du mot de passe
   - Vérification des utilisateurs en double

2. **Connexion**:
   - Connexion avec email et mot de passe
   - Validation des identifiants
   - Messages d'erreur informatifs

3. **Gestion de Sessions**:
   - Session sauvegardée dans `localStorage`
   - UI mise à jour selon l'état d'authentification
   - Bouton de déconnexion

### Flux d'Utilisation

1. **Première fois**: Cliquez sur "Rejoindre PFHR" → Complétez le formulaire d'enregistrement
2. **Utilisateurs existants**: Cliquez sur "Se connecter" → Entrez vos identifiants
3. **Session active**: Votre nom apparaîtra dans la navigation avec option de déconnexion

### Points de Terminaison API (json-server)

- `GET /usuarios` - Obtenir tous les utilisateurs
- `GET /usuarios?email=example@email.com` - Rechercher utilisateur par email
- `POST /usuarios` - Créer nouvel utilisateur
- `GET /usuarios/:id` - Obtenir utilisateur par ID

### Structure d'Utilisateur dans db.json

```json
{
  "usuarios": [
    {
      "id": 1,
      "name": "Jean Dupont",
      "email": "jean@example.com",
      "password": "123456",
      "createdAt": "2024-11-18T23:00:00.000Z"
    }
  ]
}
```

**⚠️ Note de Sécurité**: 
Dans cette implémentation de développement, les mots de passe sont stockés en texte brut. 
En production, vous devriez **TOUJOURS**:
- Hacher les mots de passe (bcrypt, argon2, etc.)
- Utiliser HTTPS
- Implémenter des tokens JWT ou sessions sécurisées
- Valider côté serveur

## 🔧 Configuration de l'API TMDB

Le projet utilise une clé API TMDB pré-configurée. Si vous avez besoin d'utiliser votre propre clé API:

1. Inscrivez-vous sur [TMDB](https://www.themoviedb.org/)
2. Obtenez votre clé API dans votre profil développeur
3. Remplacez la constante `API_KEY` dans `script.js`:

```javascript
const API_KEY = 'VOTRE_CLE_API_ICI';
```

## 📱 Design Réactif

L'application est optimisée pour:
- 📱 **Mobile** (< 480px): Layout d'une colonne, navigation adaptée
- 📱 **Tablettes** (480px - 1024px): Layout optimisé avec ajustements de taille
- 💻 **Ordinateur** (> 1024px): Layout complet avec toutes les fonctionnalités

## 🎯 Scripts npm Disponibles

```bash
# Démarrer json-server seulement (port 3000)
npm run server

# Démarrer json-server + serveur HTTP (développement complet)
npm run dev

# Démarrer serveur HTTP seulement (port 8080)
npm start
```

## 🛠️ Développement

### Modifier la Base de Données

Le fichier `db.json` est mis à jour automatiquement quand:
- Vous enregistrez un nouvel utilisateur
- json-server est en fonctionnement

Pour réinitialiser la base de données, éditez simplement `db.json`:

```json
{
  "usuarios": []
}
```

### Vérifier les Données

Vous pouvez voir tous les utilisateurs enregistrés en visitant:
```
http://localhost:3000/usuarios
```

## 🌐 Navigateurs Supportés

- ✅ Chrome (2 dernières versions)
- ✅ Firefox (2 dernières versions)
- ✅ Safari (2 dernières versions)
- ✅ Edge (2 dernières versions)

## 🐛 Résolution de Problèmes

### L'enregistrement ne fonctionne pas

**Problème**: Cliquer sur "Créer un Compte" ne fait rien.

**Solution**:
1. Vérifiez que json-server fonctionne: `npm run server`
2. Assurez-vous que `http://localhost:3000` est accessible
3. Vérifiez la console du navigateur (F12) pour les erreurs

### Erreur CORS

**Problème**: "CORS policy: No 'Access-Control-Allow-Origin' header"

**Solution**: 
json-server active CORS par défaut. Si vous avez encore des problèmes, assurez-vous de:
1. Accéder via `http://localhost:8080` (pas `file://`)
2. Redémarrer json-server

### Les bandes-annonces YouTube ne s'affichent pas

**Problème**: L'iframe de la bande-annonce apparaît vide ou avec erreur.

**Solution**:
1. Vérifiez votre connexion Internet
2. Certaines bandes-annonces peuvent être restreintes par région
3. Assurez-vous que YouTube n'est pas bloqué sur votre réseau

## 🤝 Contributions

Les contributions sont les bienvenues. Veuillez:

1. Fork le projet
2. Créer une branche pour votre fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est open source et disponible sous la licence MIT.

## 🙏 Remerciements

- [The Movie Database (TMDB)](https://www.themoviedb.org/) pour fournir l'API
- [json-server](https://github.com/typicode/json-server) pour l'API REST simulée
- [Font Awesome](https://fontawesome.com/) pour les icônes
- [Google Fonts](https://fonts.google.com/) pour la typographie Source Sans Pro

## 📞 Contact

Hugo Rollan - [@hugorollan](https://github.com/hugorollan)

Lien du Projet: [https://github.com/hugorollan/PeliculasFinal](https://github.com/hugorollan/PeliculasFinal)

---

⭐ Si vous aimez ce projet, donnez-lui une étoile sur GitHub!

## 📝 Instructions Étape par Étape (Pour Débutants)

### Commandes pour Exécuter l'Application

**Terminal/CMD/PowerShell:**

```bash
# 1. Naviguer vers le dossier du projet
cd PeliculasFinal

# 2. Installer les dépendances (seulement la première fois)
npm install

# 3. Démarrer l'application complète (API + Frontend)
npm run dev
```

**Maintenant ouvrez votre navigateur à:**
- Frontend: `http://localhost:8080`
- API: `http://localhost:3000/usuarios`

**Pour arrêter les serveurs:**
- Appuyez sur `Ctrl + C` dans le terminal

### Exemple d'Utilisation

1. **Créer un compte**:
   - Ouvrez `http://localhost:8080`
   - Cliquez sur "Rejoindre PFHR"
   - Complétez le formulaire:
     - Nom: "Marie Garcia"
     - Email: "marie@example.com"
     - Mot de passe: "123456"
   - Cliquez sur "Créer un Compte"

2. **Se connecter**:
   - Entrez votre email: "marie@example.com"
   - Entrez votre mot de passe: "123456"
   - Cliquez sur "Se connecter"

3. **Explorer les films**:
   - Recherchez des films dans la barre de recherche
   - Cliquez sur n'importe quel film pour voir les détails
   - Regardez les bandes-annonces YouTube intégrées

4. **Se déconnecter**:
   - Cliquez sur "Se déconnecter" dans la navigation