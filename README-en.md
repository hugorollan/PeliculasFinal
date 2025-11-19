# TMDB - Movies, Series & More (With Authentication System)

A professional web application TMDB (The Movie Database) clone that allows you to explore movies, series, and more entertainment content. **Now includes a complete User Registration and Login system** using Vanilla JavaScript and json-server.

## 🌟 Features

### Main Functionalities
- **✨ Registration and Login System**: Complete user authentication with data persistence
- **👤 Session Management**: Keep your session active using localStorage
- **🔒 User Validation**: Secure credential validation system
- **🎬 Movie Search**: Real-time movie search using TMDB API
- **📺 Trailer Viewing**: Integrated YouTube trailer playback
- **🔥 Dynamic Sections**:
  - Trending (Today / This Week)
  - Popular Movies (Streaming / On TV / For Rent / In Theaters)
  - Latest Trailers
- **🎯 Interactive Toggles**: Switch between different categories with a single click
- **💳 Movie Cards**: Professional visualization with posters, ratings, and dates
- **📱 Responsive Design**: Works perfectly on desktop, tablet, and mobile

### Professional Improvements
- ✅ Semantic HTML5 structure
- ✅ Enhanced accessibility (ARIA labels, roles, keyboard navigation)
- ✅ Smooth animations and transitions
- ✅ Loading states and error messages
- ✅ SEO optimized with meta tags
- ✅ Professional footer with links
- ✅ Sticky navigation
- ✅ Hover effects on all interactive elements
- ✅ Authentication system with simulated REST API

## 🚀 Technologies Used

### Frontend
- **HTML5**: Semantic and accessible structure
- **CSS3**: Modern styles with CSS variables, animations and responsive design
- **JavaScript (ES6+ Vanilla)**: Modern application logic with async/await
- **TMDB API**: Integration with The Movie Database API
- **Font Awesome**: Professional icons

### Backend (Simulated)
- **json-server**: Simulated REST API for development
- **db.json**: Local database for registered users

## 📦 Installation and Setup

### Prerequisites
- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection (to load external resources and TMDB API)

### Installation Steps

#### 1. Clone the repository
```bash
git clone https://github.com/hugorollan/PeliculasFinal.git
cd PeliculasFinal
```

#### 2. Install dependencies
```bash
npm install
```

This command will install:
- `json-server`: To simulate the REST API backend
- `concurrently`: To run multiple commands simultaneously

#### 3. Start the simulated server (json-server)

**Option A: json-server only**
```bash
npm run server
```

This will start json-server at `http://localhost:3000`.
The `db.json` database will be automatically monitored for changes.

**Option B: json-server + HTTP server (recommended for development)**
```bash
npm run dev
```

This will start:
- json-server at `http://localhost:3000` (API)
- HTTP server at `http://localhost:8080` (Frontend)

#### 4. Open the application

Open your browser and visit:
- **Frontend**: `http://localhost:8080`
- **API**: `http://localhost:3000` (to view data directly)

### Alternative: Python Server (if you don't have Node.js)

If you just want to see the application without the authentication system:

```bash
python3 -m http.server 8080
# or
python -m http.server 8080
```

**Note**: Without json-server, registration and login functions will not work.

## 🎨 Project Structure

```
PeliculasFinal/
│
├── index.html          # Main page with movies
├── auth.html           # Login and registration page
├── styles.css          # Main styles
├── auth-styles.css     # Authentication styles
├── script.js           # Movies and TMDB API logic
├── app.js              # Authentication logic
├── package.json        # Dependencies and scripts
├── db.json             # User database (json-server)
├── .gitignore          # Files ignored by Git
└── README.md           # Documentation
```

## 🔐 Authentication System

### System Features

1. **User Registration**:
   - Form with name, email, and password
   - Email format validation
   - Password confirmation
   - Duplicate user verification

2. **Login**:
   - Login with email and password
   - Credential validation
   - Informative error messages

3. **Session Management**:
   - Session saved in `localStorage`
   - UI updated according to authentication state
   - Logout button

### Usage Flow

1. **First time**: Click "Join TMDB" → Complete the registration form
2. **Existing users**: Click "Sign In" → Enter your credentials
3. **Active session**: Your name will appear in navigation with logout option

### API Endpoints (json-server)

- `GET /usuarios` - Get all users
- `GET /usuarios?email=example@email.com` - Search user by email
- `POST /usuarios` - Create new user
- `GET /usuarios/:id` - Get user by ID

### User Structure in db.json

```json
{
  "usuarios": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "password": "123456",
      "createdAt": "2024-11-18T23:00:00.000Z"
    }
  ]
}
```

**⚠️ Security Note**: 
In this development implementation, passwords are stored in plain text. 
In production, you should **ALWAYS**:
- Hash passwords (bcrypt, argon2, etc.)
- Use HTTPS
- Implement JWT tokens or secure sessions
- Validate on the server side

## 🔧 TMDB API Configuration

The project uses a pre-configured TMDB API key. If you need to use your own API key:

1. Register at [TMDB](https://www.themoviedb.org/)
2. Get your API key in your developer profile
3. Replace the `API_KEY` constant in `script.js`:

```javascript
const API_KEY = 'YOUR_API_KEY_HERE';
```

## 📱 Responsive Design

The application is optimized for:
- 📱 **Mobile** (< 480px): Single column layout, adapted navigation
- 📱 **Tablets** (480px - 1024px): Optimized layout with size adjustments
- 💻 **Desktop** (> 1024px): Full layout with all features

## 🎯 Available npm Scripts

```bash
# Start json-server only (port 3000)
npm run server

# Start json-server + HTTP server (complete development)
npm run dev

# Start HTTP server only (port 8080)
npm start
```

## 🛠️ Development

### Modify the Database

The `db.json` file is automatically updated when:
- You register a new user
- json-server is running

To reset the database, simply edit `db.json`:

```json
{
  "usuarios": []
}
```

### Check Data

You can see all registered users by visiting:
```
http://localhost:3000/usuarios
```

## 🌐 Supported Browsers

- ✅ Chrome (latest 2 versions)
- ✅ Firefox (latest 2 versions)
- ✅ Safari (latest 2 versions)
- ✅ Edge (latest 2 versions)

## 🐛 Troubleshooting

### Registration doesn't work

**Problem**: Clicking "Create Account" does nothing.

**Solution**:
1. Verify that json-server is running: `npm run server`
2. Make sure `http://localhost:3000` is accessible
3. Check the browser console (F12) for errors

### CORS Error

**Problem**: "CORS policy: No 'Access-Control-Allow-Origin' header"

**Solution**: 
json-server enables CORS by default. If you still have problems, make sure to:
1. Access via `http://localhost:8080` (not `file://`)
2. Restart json-server

### YouTube trailers don't show

**Problem**: The trailer iframe appears empty or with error.

**Solution**:
1. Check your Internet connection
2. Some trailers may be region-restricted
3. Make sure YouTube is not blocked on your network

## 🤝 Contributions

Contributions are welcome. Please:

1. Fork the project
2. Create a branch for your feature (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT license.

## 🙏 Acknowledgments

- [The Movie Database (TMDB)](https://www.themoviedb.org/) for providing the API
- [json-server](https://github.com/typicode/json-server) for the simulated REST API
- [Font Awesome](https://fontawesome.com/) for the icons
- [Google Fonts](https://fonts.google.com/) for Source Sans Pro typography

## 📞 Contact

Hugo Rollan - [@hugorollan](https://github.com/hugorollan)

Project Link: [https://github.com/hugorollan/PeliculasFinal](https://github.com/hugorollan/PeliculasFinal)

---

⭐ If you like this project, give it a star on GitHub!

## 📝 Step-by-Step Instructions (For Beginners)

### Commands to Run the Application

**Terminal/CMD/PowerShell:**

```bash
# 1. Navigate to the project folder
cd PeliculasFinal

# 2. Install dependencies (only the first time)
npm install

# 3. Start the complete application (API + Frontend)
npm run dev
```

**Now open your browser at:**
- Frontend: `http://localhost:8080`
- API: `http://localhost:3000/usuarios`

**To stop the servers:**
- Press `Ctrl + C` in the terminal

### Usage Example

1. **Create an account**:
   - Open `http://localhost:8080`
   - Click "Join TMDB"
   - Complete the form:
     - Name: "Mary Garcia"
     - Email: "mary@example.com"
     - Password: "123456"
   - Click "Create Account"

2. **Sign in**:
   - Enter your email: "mary@example.com"
   - Enter your password: "123456"
   - Click "Sign In"

3. **Explore movies**:
   - Search for movies in the search bar
   - Click on any movie to see details
   - Watch integrated YouTube trailers

4. **Sign out**:
   - Click "Sign Out" in the navigation