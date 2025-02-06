# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


# Random User Profile Web App

## Overview
This project fetches user profiles from the [Random User API](https://randomuser.me/api/) and displays them in a grid format. Users can click on a profile to view and edit details dynamically. Additionally, users can reset changes and download the profile card as an image using `html2canvas`.

## Features
- Fetch and display user profiles.
- Show user details including:
  - Name
  - Profile Picture
  - Email
  - Location (City & Country)
- Inline editing of user details.
- Reset button to revert changes.
- Download profile as an image using `html2canvas`.

## Technologies Used
- React.js
- Tailwind CSS
- Random User API
- html2canvas (for downloading the profile card as an image)

## Installation & Setup
### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/random-user-profile.git
cd random-user-profile-web-app
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start the Development Server
```bash
npm run dev
```

The app will be available at `http://localhost:5173/` (if using Vite).

## Usage
1. Click on any user profile to view details.
2. Edit the user details directly in the form.
3. Click **Save Changes** to log updated details.
4. Click **Reset** to restore the original details.
5. Click **Download Profile as Image** to save the profile card.

## Dependencies
- `react`: UI framework
- `tailwindcss`: Styling framework
- `html2canvas`: Captures and downloads the profile card as an image

## API Used
- [Random User API](https://randomuser.me/api/) to fetch sample user profiles.
