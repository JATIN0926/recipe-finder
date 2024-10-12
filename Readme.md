# Recipe Finder Web App

## Overview

The **Recipe Finder Web App** allows users to search for recipes by ingredient or dish name, view detailed information about each recipe, and save their favorite recipes. The application is responsive and provides features such as light/dark mode toggling, recipe favoriting, and integration with external APIs like the Spoonacular API.

## Features

1. **Recipe Search**

   - Users can search for recipes by ingredient or dish name using the search bar.
   - The search queries an external API (Spoonacular API) to retrieve recipe data.

2. **Recipe List**

   - A list of recipes matching the search query is displayed in the form of cards.
   - Each recipe entry shows a thumbnail image, title, and brief description.

3. **Recipe Details**

   - Clicking on a recipe card shows detailed information, including ingredients, cooking instructions, and a larger image.

4. **Favorites**

   - Users can add or remove recipes from their favorites list, which is stored persistently using Redux and local storage.

5. **Dark/Light Mode Toggle**

   - The website supports dark and light themes, allowing users to toggle between the two modes.

6. **Responsive Design**
   - The app is fully responsive and works well on desktop, tablet, and mobile devices.

## Bonus Features

- **Pagination/Infinite Scrolling**: Implemented for recipe search results to handle large data sets.
- **Gmail Login & Slack Integration**: Users can log in using their Gmail account, and user details can be sent to a specific Slack channel via integration.
- **State Management**: Redux is used for managing application-wide states.

## Tech Stack

- **Frontend**: React (CRA), Redux , Tailwind css
- **API**: Spoonacular API
- **Authentication**: OAuth2 (Gmail Login) and also supports normal email-pass login
- **Slack Integration**: For user details sharing
- **Deployment**: Render

## Installation and Setup Instructions

### Prerequisites

Make sure you have the following installed:

- Node.js (v14.x or higher)
- npm or yarn
- A GitHub account
- API keys for Spoonacular/Edamam and Gmail OAuth credentials

### Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/recipe-finder.git
   ```
2. **Navigate to the project directory**:

```bash
  cd recipe-finder
```

3. **Install dependencies: Using npm:**:

   ```bash
   npm install
   ```

4. **Set up environment variables: Create a .env file in the root directory as well as in client directory and add your API keys and environment settings:**:

   _for client_

```bash
REACT_APP_FIREBASE_API_KEY=YOUR_FIREBASE_API_KEY
REACT_APP_SPOONACULAR_API_KEY=your-spoonacular-api-key
```

_for server(or root directory)_

```bash
MONGO_URI=your_mongo_uri_here
JWT_SECRET=your_jwt_secret_key_here
SLACK_WEBHOOK_URL=your_slack_webhook_url_here
```

5. **Run Project**:

- **For Server:** Go to Root directory then run **npm run dev**
- **For Client:** Go to client directory then run **npm start**

## Routes

- `/` - **Homepage**: Contains the search bar and recipe list.
- `/recipes` - **All Recipes Page**: Displays All recipes, each recipe in a card form.
- `/recipe/:id` - **Recipe Details Page**: Displays detailed information about a specific recipe.
- `/favourites` - **Favorites Page**: Shows the user’s saved favorite recipes.
- `/sign-in` - **Login Page**: Allows users to log in using Gmail or Google OAuth.
- `/sign-up` - **Signup Page**: Allows users to Register themselves using Gmail or Google OAuth.
