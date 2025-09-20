🌟 Smart Weekend Planner
An interactive web application that helps users plan their perfect weekend with intelligent activity suggestions, local discovery features, and seamless scheduling capabilities.
Show Image Show Image Show Image
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

🛠️ Technologies Used
Frontend Framework & Libraries

React 19.1.1 - Latest React with modern component-based architecture
React DOM 19.1.1 - React rendering library
React Router DOM 7.9.1 - Client-side routing and navigation
React Hooks - useState, useRef, useEffect for state management
JavaScript ES6+ Modules - Modern syntax with ES module support

Build Tools & Development

Vite 7.1.2 - Fast build tool and dev server
@vitejs/plugin-react 5.0.0 - React support for Vite
ESLint 9.33.0 - Code linting and quality assurance
PostCSS 8.5.6 - CSS processing and optimization
Autoprefixer 10.4.21 - Automatic CSS vendor prefixing

Styling & Design

Tailwind CSS 3.4.17 - Utility-first CSS framework for rapid UI development
CSS Gradients - Beautiful background effects and theme transitions
Responsive Grid - Mobile-first responsive layout system
Flexbox - Advanced layout and alignment

UI Components & Icons

Lucide React 0.544.0 - Beautiful, customizable SVG icon library

Icons used: Calendar, Clock, Plus, X, Share2, Download, MapPin, Search, Star, Navigation, and 20+ more


Custom Components - Reusable activity cards, modals, and interactive elements

Backend & Data Services

Firebase 12.2.1 - Backend-as-a-Service for authentication, database, and hosting
Date-fns 4.1.0 - Modern JavaScript date utility library
iCal 0.8.0 - Calendar integration and event handling

Progressive Web App

Vite Plugin PWA 1.0.3 - Service worker and PWA functionality
Offline Support - Cache strategies for offline usage
App-like Experience - Native app features in the browser

Testing & Quality

Vitest - Fast unit testing framework
@testing-library/react 16.3.0 - React component testing utilities
@testing-library/jest-dom 6.8.0 - Custom DOM testing matchers
Jest 30.1.3 - JavaScript testing framework
TypeScript Types - Type definitions for React and React DOM

Interactive Features

HTML5 Drag & Drop API - Native drag and drop functionality
Canvas API - Dynamic image generation for sharing
Web APIs Integration - Clipboard API, File Download API
Event Handling - Advanced user interaction management
Calendar Integration - Export to calendar applications

Data Management

Firebase Realtime Database - Cloud-based data storage and sync
Local State Management - React hooks for application state
Date Manipulation - Advanced date/time handling with date-fns
iCal Export - Calendar event generation and export
Dynamic Data Filtering - Real-time search and filtering capabilities

🚀 Getting Started
Prerequisites

Node.js 18.0 or higher
npm or yarn package manager
Modern web browser with JavaScript enabled

Installation

Clone the repository

bashgit clone https://github.com/yourusername/smart-weekend-planner.git
cd smart-weekend-planner

Install dependencies

bashnpm install
# or
yarn install

Start the development server

bashnpm run dev
# or
yarn dev

Open your browser
Navigate to http://localhost:5173 to view the application (Vite default port).

Available Scripts
bash# Development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run tests
npm run test

# Lint code for quality and consistency
npm run lint
Build for Production
bashnpm run build
This creates an optimized build in the dist folder ready for deployment.
Firebase Setup (Optional)
If you want to use Firebase features:

Create a Firebase project at https://console.firebase.google.com
Install Firebase CLI:

bashnpm install -g firebase-tools

Login to Firebase:

bashfirebase login

Initialize Firebase in your project:

bashfirebase init
