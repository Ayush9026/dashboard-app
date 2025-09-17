# Dashboard App

A modern, responsive dashboard application built with React, Redux, and Vite.

## Features

- 📊 Interactive Dashboard with Widget Management
- 🎨 Clean UI with Glassmorphism Effects
- 📱 Responsive Design
- ⚡ Fast Performance with Vite
- 🔄 Widget Addition/Removal
- 📈 Progress Bars and Charts
- 🎯 Category-based Widget Organization

## Live Demo

Visit the live demo: [https://yourusername.github.io/dashboard-app](https://ayush9026.github.io/dashboard-app/)

## Local Development

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/dashboard-app.git
cd dashboard-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

## Building for Production

```bash
npm run build
```

## Deployment to GitHub Pages

### Automatic Deployment (Recommended)

The project is configured with GitHub Actions for automatic deployment:

1. Push your code to the `main` or `master` branch
2. GitHub Actions will automatically build and deploy to GitHub Pages
3. Your app will be available at `https://yourusername.github.io/dashboard-app`

### Manual Deployment

You can also deploy manually using:

```bash
npm run deploy
```

## Project Structure

```
dashboard-app/
├── src/
│   ├── components/          # React components
│   │   ├── Dashboard.jsx    # Main dashboard component
│   │   ├── Category.jsx     # Category component
│   │   ├── Widget.jsx       # Widget component
│   │   └── AddWidgetModal.jsx # Add widget modal
│   ├── store/              # Redux store configuration
│   ├── data/               # Data and constants
│   └── App.css             # Global styles
├── .github/workflows/      # GitHub Actions workflows
└── dist/                   # Built files (auto-generated)
```

## Technologies Used

- **React 19** - UI Library
- **Redux Toolkit** - State Management
- **Vite** - Build Tool
- **Lucide React** - Icons
- **CSS3** - Styling with Glassmorphism effects

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
