🌟 Smart Weekend Planner
An interactive web application that helps users plan their perfect weekend with intelligent activity suggestions, local discovery features, and seamless scheduling capabilities.
Show Image Show Image Show Image Show Image Show Image
✨ Features
🎯 Core Planning Features

Interactive Weekend Scheduler: Drag & drop activities between Saturday and Sunday
4 Dynamic Themes: Choose from Lazy Weekend, Adventure Mode, Family Time, or Balanced Blend
Visual Timeline: Clean, card-based schedule view with color-coded activities
Smart Analytics: Real-time duration tracking and mood distribution analysis

🔍 Smart Discovery System

Local Event Discovery: Find festivals, markets, yoga sessions, and cultural events
Restaurant Finder: Discover local dining options with cuisine types, ratings, and pricing
Places Explorer: Explore temples, nature spots, and tourist attractions
Intelligent Search: Real-time filtering by keywords, categories, and preferences
Rich Activity Details: Ratings, distances, operating hours, and pricing information

📍 Location Intelligence

Location-Aware Planning: Automatically suggests activities relevant to your area
Distance Calculation: Shows precise distances from your location
Maps Integration: One-click navigation to any activity location via Google Maps
Customizable Location: Easy location updates for different planning areas

🎨 Enhanced User Experience

Visual Richness: Emoji icons, color-coded categories, and smooth animations
Mood Tracking: Assign and track vibes (Happy, Relaxed, Energetic) for balanced weekends
Theme Consistency: All UI elements adapt to your chosen weekend style
Responsive Design: Perfect experience across desktop, tablet, and mobile devices

📤 Sharing & Export

Plan Sharing: Copy weekend plans as formatted text
Image Export: Generate and download beautiful weekend plan posters
Social Ready: Share-optimized content for social media platforms

🛠️ Tech Stack
Frontend

React 19.1.1 - Latest React with modern component-based architecture
React DOM 19.1.1 - React rendering library
React Router DOM 7.9.1 - Client-side routing and navigation
JavaScript ES6+ Modules - Modern syntax with ES module support

Build Tools

Vite 7.1.2 - Fast build tool and dev server
@vitejs/plugin-react 5.0.0 - React support for Vite
ESLint 9.33.0 - Code linting and quality assurance
PostCSS 8.5.6 - CSS processing and optimization
Autoprefixer 10.4.21 - Automatic CSS vendor prefixing

Styling

Tailwind CSS 3.4.17 - Utility-first CSS framework
CSS Gradients - Beautiful background effects
Responsive Grid - Mobile-first layout
Flexbox - Advanced alignment

UI & Icons

Lucide React 0.544.0 - Beautiful SVG icon library
Custom Components - Reusable UI elements

Backend & Services

Firebase 12.2.1 - Authentication, database, and hosting
Date-fns 4.1.0 - Modern date utility library
iCal 0.8.0 - Calendar integration

PWA & Testing

Vite Plugin PWA 1.0.3 - Service worker functionality
Vitest - Fast unit testing framework
React Testing Library 16.3.0 - Component testing
Jest 30.1.3 - JavaScript testing framework

🚀 Quick Start
Prerequisites

Node.js 18.0+
npm or yarn
Modern web browser

Installation

Clone the repository

bashgit clone [https://github.com/vivekpal/smart-weekend-planner.git](https://github.com/vivekpal24/GoPlanner---Assignment/)
cd smart-weekend-planner

Install dependencies

bashnpm install

Start development server

bashnpm run dev

Open browser
Navigate to http://localhost:5173

Available Scripts
CommandDescriptionnpm run devStart development servernpm run buildBuild for productionnpm run previewPreview production buildnpm run testRun testsnpm run lintLint code
Environment Setup
Create .env file:
env# Firebase Configuration
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Optional API Keys
VITE_MAPS_API_KEY=your_google_maps_api_key
VITE_DEFAULT_LOCATION=Una, Himachal Pradesh, IN
📱 Usage
1. Choose Your Theme
Select your weekend vibe:

😴 Lazy Weekend: Reading, movies, home activities
🏔️ Adventure Mode: Hiking, cycling, outdoor exploration
👨‍👩‍👧‍👦 Family Time: Picnics, games, cooking together
⚖️ Balanced Blend: Mix of wellness, social, and relaxation

2. Discover Activities

Click "Discover" to find local events, restaurants, and places
Search and filter by keywords
View ratings, distances, and pricing

3. Build Your Schedule

Drag activities to Saturday or Sunday
Use +Sat/+Sun buttons for quick adding
Reorganize by dragging between days

4. Share Your Plan

Copy as formatted text
Download as beautiful image
Export to calendar apps


🧪 Testing
bash# Run all tests
npm run test

# Run with coverage
npm run test -- --coverage

# Watch mode
npm run test -- --watch
Testing Stack:

Vitest for unit testing
React Testing Library for components
Jest DOM for custom matchers
