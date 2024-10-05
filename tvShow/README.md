# TV Show App

This project is a simple TV Show search application built using Vue 3, TypeScript, and Vite. Users can search for TV shows based on titles or filter shows by genre. Detailed information about selected shows and episodes is displayed.

## Features

- Search TV shows by title
- Filter TV shows by genre
- View detailed show information, including ratings, genres, and episodes
- Responsive design for different screen sizes

## How to Use

You can search using the search button or the select box.
You can click on a show to view its details, and click on Home to return to the main page from the details page.

## Running Tests

To run the tests for this application, follow these steps:

1. Ensure you have all dependencies installed:

   ```bash
   npm install
   ```

2. Run the test command:

   ```bash
   npm run test
   ```

This will execute all the test suites and display the results in your terminal.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/aatay1/tvShow.git
   cd tv-show
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root of your project and add the following variable for the API base URL:

   ```bash
   VITE_API_BASE_URL=http://api.tvmaze.com
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Build the project for production:

   ```bash
   npm run build
   ```

6. Preview the production build:

   ```bash
   npm run preview
   ```
