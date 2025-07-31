# ANDHRAY Official Page

## Overview

This is a comprehensive, modern artist website for ANDHRAY built as a single HTML file with complete functionality. The site features a professional design inspired by Amelie Lens's minimalist aesthetic, includes full client-side content management, multi-language support (6 languages), and all the essential features for a professional music artist presentation including booking forms, gallery management, social media integration, and career milestones.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Single-file dynamic website**: Complete HTML/CSS/JavaScript implementation in one index.html file
- **Database-powered content management**: Full CRUD operations using PostgreSQL database via REST API
- **Edit mode interface**: Toggle-able edit mode with inline editing and admin panel
- **Responsive design**: Mobile-first approach with modern CSS practices
- **External dependencies**: FontAwesome icons loaded via CDN

### Backend Architecture
- **Node.js API Server**: Express.js REST API serving database operations
- **PostgreSQL Database**: Neon serverless PostgreSQL for data persistence
- **Drizzle ORM**: Type-safe database operations and schema management
- **Static File Serving**: API server also serves the frontend HTML/CSS/JS

### Technology Stack
- **Frontend**: HTML5, CSS3, Vanilla JavaScript with async/await API calls
- **Backend**: Node.js, Express.js, Drizzle ORM, @neondatabase/serverless
- **Database**: PostgreSQL (Neon serverless) with structured tables for all content types
- **FontAwesome 6.5.0**: Icon library for UI elements

## Key Components

### Hero Section
- **Purpose**: Full-screen landing area with artist branding
- **Design**: Large typography with dramatic styling, inspired by Amelie Lens site
- **Content**: Artist name "ANDHRAY", genre subtitle, and navigation links
- **Styling**: Responsive font sizes, dramatic letter spacing, gradient background

### News Section
- **Purpose**: Dynamic content showcase with videos and images
- **Design**: Grid layout with large banner images and embedded videos
- **Features**: Add/edit/delete functionality, mixed media support
- **Content**: Release announcements, live performances, press coverage

### Tour Section
- **Purpose**: Event listings and booking information
- **Design**: Clean list layout with event details and ticket links
- **Features**: Add/edit/delete tour dates, ticket integration
- **Content**: Upcoming performances, venues, and booking links

### Edit Mode Interface
- **Purpose**: Client-side content management system
- **Design**: Toggle-able edit mode with visual indicators
- **Features**: Inline editing, admin panel, data import/export
- **Security**: Client-side only, no backend authentication required

### Color System
- **CSS Custom Properties**: Centralized color management
- **Brand Colors**: 
  - Primary red (#ff3c38)
  - Secondary orange (#ff9f1c)
  - Accent yellow (#ffcc00)
  - Text white (#ffffff)
  - Background dark (#0d0d0d)

### Typography
- **Font Family**: Segoe UI sans-serif stack
- **Hierarchy**: Large headers (3rem) with proper line height (1.6)
- **Accessibility**: High contrast white text on dark background

## Data Flow

### Database-Driven Data Management
- **PostgreSQL Persistence**: All content data stored in PostgreSQL database tables
- **REST API Integration**: Frontend makes async fetch calls to backend API endpoints
- **Real-time Updates**: Edit mode saves changes directly to database via API
- **Data Structure**: Structured database tables with proper relationships and typing

### Content Types
- **News**: Mixed media posts with images and videos
- **Releases**: Discography with album artwork and release dates
- **Gallery**: Photo and video collections with titles
- **Events**: Tour dates with venues and ticket links
- **Milestones**: Career timeline with achievements
- **Industrial Projects**: Label and collaboration highlights

## External Dependencies

### CDN Resources
- **FontAwesome Icons**: `https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css`
  - **Purpose**: Provides icon library for UI elements
  - **Loading**: Synchronous CSS loading from CloudFlare CDN
  - **Fallback**: No offline fallback implemented

## Deployment Strategy

### Static Hosting Requirements
- **File Structure**: Single HTML file deployment
- **Server Requirements**: Any static web server (Apache, Nginx, or simple HTTP server)
- **No Build Process**: Direct file serving without compilation or bundling
- **CDN Dependency**: Requires internet connection for FontAwesome icons

### Performance Considerations
- **Inline CSS**: Eliminates additional HTTP requests but increases HTML file size
- **External CDN**: FontAwesome loading may impact initial page load
- **Mobile Optimization**: Responsive design with viewport configuration

### Scalability Notes
- Current structure is suitable for small static sites
- For larger sites, consider separating CSS into external files
- JavaScript functionality would require additional architecture decisions