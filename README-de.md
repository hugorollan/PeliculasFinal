# PFHR - Películas Final

![PFHR Logo](https://img.shields.io/badge/PFHR-Movies%20%26%20TV-blue)
![Version](https://img.shields.io/badge/version-1.0.0-green)
![License](https://img.shields.io/badge/license-MIT-yellow)

## 🎬 Über das Projekt

**PFHR** (Películas, Films, Hollywood & Reviews) ist eine moderne Webanwendung für Film- und Serienliebhaber. Mit einer eleganten und intuitiven Benutzeroberfläche können Nutzer Tausende von Filmen, TV-Serien und Persönlichkeiten aus der Unterhaltungswelt erkunden und entdecken.

### ✨ Hauptfunktionen

- **🔍 Erweiterte Suche**: Finden Sie ganz einfach Filme, Serien und Personen
- **📊 Detaillierte Informationen**: Zusammenfassung, Besetzung, Bewertungen und mehr
- **📈 Trends**: Bleiben Sie auf dem Laufenden mit den beliebtesten Inhalten
- **❤️ Favoritenliste**: Speichern Sie Ihre Lieblingsfilme und -serien
- **🎥 Trailer**: Schauen Sie Trailer direkt auf der Plattform
- **🤖 Empfehlungen**: Entdecken Sie ähnliche Inhalte zu Ihren Favoriten
- **🌐 Mehrsprachigkeit**: Verfügbar auf Spanisch, Englisch, Französisch und Deutsch
- **👤 Benutzerverwaltung**: Personalisierte Profile und Authentifizierung

## 🛠️ Verwendete Technologien

### Frontend
- **HTML5**: Semantische Struktur und Zugänglichkeit
- **CSS3**: Responsive Design und moderne Animationen
- **JavaScript ES6+**: Interaktivität und SPA-Funktionalität
- **Font Awesome**: Icons und Symbole

### API & Daten
- **TMDB API**: The Movie Database für Film- und Seriendaten
- **JSON Server**: Simulation der Backend-Authentifizierung

### Tools & Bibliotheken
- **Fetch API**: HTTP-Anfragen
- **LocalStorage**: Persistente lokale Datenspeicherung
- **CSS Grid & Flexbox**: Erweiterte Layouts
- **Intersection Observer**: Optimierte Bildladung

## 🚀 Installation & Ausführung

### Voraussetzungen
- Node.js (v14 oder höher)
- NPM oder Yarn
- Moderner Webbrowser

### Schritte zur Installation

1. **Repository klonen**
   ```bash
   git clone https://github.com/hugorollan/PeliculasFinal.git
   cd PeliculasFinal
   ```

2. **Abhängigkeiten installieren**
   ```bash
   npm install
   ```

3. **JSON Server starten (für Authentifizierung)**
   ```bash
   npm run auth-server
   ```

4. **Entwicklungsserver starten**
   ```bash
   npm start
   ```

5. **Browser öffnen**
   Navigieren Sie zu `http://localhost:3000`

## 🔧 Konfiguration

### TMDB API-Schlüssel
1. Erstellen Sie ein kostenloses Konto auf [TMDB](https://www.themoviedb.org/)
2. Generieren Sie einen API-Schlüssel
3. Ersetzen Sie `IHR_API_SCHLUESSEL` in `script.js`:
   ```javascript
   const API_KEY = 'IHR_API_SCHLUESSEL';
   ```

### Verfügbare NPM-Skripte
- `npm start`: Startet den Entwicklungsserver
- `npm run auth-server`: Startet den JSON Server für Authentifizierung
- `npm run build`: Erstellt eine Produktions-Build
- `npm test`: Führt Tests aus

## 📱 Verwendung

### Grundlegende Navigation
1. **Hauptseite**: Entdecken Sie Trends und beliebte Inhalte
2. **Suche**: Verwenden Sie die Suchleiste für spezifische Inhalte
3. **Kategorien**: Navigieren Sie durch Filme, Serien oder Personen
4. **Favoriten**: Speichern Sie interessante Inhalte für später

### Kontenverwaltung
1. **Registrierung**: Erstellen Sie ein neues Konto
2. **Anmeldung**: Greifen Sie auf Ihre personalisierten Funktionen zu
3. **Profil**: Verwalten Sie Ihre Informationen und Einstellungen
4. **Abmeldung**: Schließen Sie Ihre Sitzung sicher ab

### Favoriten hinzufügen
1. Klicken Sie auf ein Film-/Serienposter
2. Klicken Sie auf die Schaltfläche "❤️ Zu Favoriten hinzufügen"
3. Sehen Sie sich Ihre Favoriten im Abschnitt "Meine Favoriten" an

## 🌐 Mehrsprachige Unterstützung

PFHR unterstützt vier Sprachen:
- 🇪🇸 **Spanisch** (Standard)
- 🇬🇧 **Englisch**
- 🇫🇷 **Französisch**
- 🇩🇪 **Deutsch**

Die Sprache kann über den Selector in der oberen rechten Ecke geändert werden. Die Einstellung wird im lokalen Speicher gespeichert.

## 📂 Projektstruktur

```
PeliculasFinal/
├── 📄 index.html          # Hauptseite
├── 📄 auth.html           # Authentifizierung
├── 📄 profile.html        # Benutzerprofil
├── 📜 script.js           # Hauptlogik
├── 🎨 styles.css          # Allgemeine Stile
├── 🎨 layout.css          # Layout-Stile
├── 🎨 components.css      # Komponenten-Stile
├── 🎨 auth-styles.css     # Authentifizierungs-Stile
├── 🎨 profile-styles.css  # Profil-Stile
├── 🗄️ db.json             # JSON Server-Datenbank
├── 📦 package.json        # NPM-Abhängigkeiten
└── 📚 README*.md          # Dokumentation
```

## 🤝 Beiträge

Beiträge sind willkommen! Wenn Sie zur Verbesserung von PFHR beitragen möchten:

1. **Forken Sie das Repository**
2. **Erstellen Sie einen Feature-Branch** (`git checkout -b feature/AmazingFeature`)
3. **Committen Sie Ihre Änderungen** (`git commit -m 'Add some AmazingFeature'`)
4. **Pushen Sie zum Branch** (`git push origin feature/AmazingFeature`)
5. **Öffnen Sie einen Pull Request**

### Entwicklungsrichtlinien
- Folgen Sie den bestehenden Codierungsstandards
- Fügen Sie Kommentare für komplexe Funktionen hinzu
- Testen Sie Ihre Änderungen gründlich
- Aktualisieren Sie die Dokumentation bei Bedarf

## 🐛 Fehlerbehebung

### Häufige Probleme

**Problem**: API-Anfragen schlagen fehl
- **Lösung**: Überprüfen Sie Ihren TMDB API-Schlüssel
- **Lösung**: Überprüfen Sie Ihre Internetverbindung

**Problem**: JSON Server startet nicht
- **Lösung**: Überprüfen Sie, ob Port 3001 verfügbar ist
- **Lösung**: Führen Sie `npm install` erneut aus

**Problem**: Bilder werden nicht geladen
- **Lösung**: Überprüfen Sie die CORS-Konfiguration
- **Lösung**: Deaktivieren Sie Ad-Blocker temporär

**Problem**: Anmeldung funktioniert nicht
- **Lösung**: Stellen Sie sicher, dass JSON Server läuft
- **Lösung**: Löschen Sie localStorage und versuchen Sie es erneut

### Unterstützung erhalten
Wenn Sie weitere Hilfe benötigen:
- Überprüfen Sie die [Issues-Sektion](https://github.com/hugorollan/PeliculasFinal/issues)
- Erstellen Sie ein neues Issue mit detaillierter Beschreibung
- Verwenden Sie das Kontaktformular in der App

## 📄 Lizenz

Dieses Projekt steht unter der MIT-Lizenz. Siehe die [LICENSE](LICENSE) Datei für weitere Details.

## 👨‍💻 Autor

**Hugo Rollán Agudo**
- LinkedIn: [Hugo Rollán](https://linkedin.com/in/hugo-rollan)
- Instagram: [@hugo.rollan](https://instagram.com/hugo.rollan)
- E-Mail: hugorollanagudo@gmail.com

## 🙏 Danksagungen

- [TMDB](https://www.themoviedb.org/) für die umfassende Film- und Serien-API
- [Font Awesome](https://fontawesome.com/) für die wunderschönen Icons
- [JSON Server](https://github.com/typicode/json-server) für die einfache Backend-Simulation

## 🔄 Versionsgeschichte

### v1.0.0 (November 2024)
- ✨ Erste Veröffentlichung
- 🎬 Vollständige Film- und Seriensuche
- ❤️ Favoritensystem
- 👤 Benutzerverwaltung
- 🌐 Mehrsprachige Unterstützung (ES, EN, FR, DE)
- 📱 Responsive Design
- 🎥 Trailer-Integration

---

**Entwickelt mit ❤️ für Film- und Serienliebhaber**