# Entertainment Web App 🎬

## Overview
This project is a modern, responsive entertainment web application built with React and TypeScript, leveraging Supabase for backend services including authentication and data storage. Users can browse a wide variety of movies and TV series, discover trending content, and manage their personal bookmarks.

## Features
*   **User Authentication**: Secure sign-up and login functionality powered by Supabase Auth.
*   **Content Browsing**: Explore an extensive catalog of movies and TV series categorized for easy navigation.
*   **Trending Section**: Stay updated with the most popular and currently trending entertainment.
*   **Search Functionality**: Efficiently search for specific titles across the entire content library.
*   **Bookmark Management**: Easily bookmark favorite movies and TV series for quick access later.
*   **Responsive Design**: A seamless user experience across various devices and screen sizes, implemented with Tailwind CSS.
*   **Robust Data Fetching**: Utilizes React Query for efficient data management, caching, and state synchronization.

## Getting Started
To get this project up and running on your local machine, follow these simple steps.

### Installation
🚀 **Clone the Repository:**
```bash
git clone https://github.com/Isaacayomi/Entertainment-web-app.git
```

📦 **Navigate to Project Directory:**
```bash
cd entertainment-web-app
```

⚙️ **Install Dependencies:**
```bash
npm install
# or
yarn install
```

### Environment Variables
This project uses Supabase for its backend services. You'll need to configure your Supabase project URL and public API key.

Create a `.env` file in the root of your project and add the following variables:

```
VITE_SUPABASE_URL="YOUR_SUPABASE_PROJECT_URL"
VITE_SUPABASE_ANON_KEY="YOUR_SUPABASE_ANON_KEY"
```

*   `VITE_SUPABASE_URL`: Your Supabase project URL (e.g., `https://abcdefg1234.supabase.co`).
*   `VITE_SUPABASE_ANON_KEY`: Your Supabase public "anon" key.

**Note**: Ensure your Supabase `catalog` table is set up with appropriate RLS (Row Level Security) policies to allow authenticated users to read and update `isBookmarked` status. Also, set up authentication via email/password in your Supabase project.

### Running the Application
Once the dependencies are installed and environment variables are set, you can start the development server:

```bash
npm run dev
# or
yarn dev
```

The application will typically be available at `http://localhost:5173`.

## Usage
Upon launching the application, you will be greeted by the login/sign-up page.

1.  **Sign Up**: If you are a new user, navigate to the "Sign up" page, provide your email and password to create an account.
2.  **Login**: Once registered, log in with your credentials.
3.  **Browse Content**: After logging in, you'll land on the homepage, which displays trending content and recommended movies and TV series.
4.  **Navigation**: Use the sidebar/navbar to switch between "Home", "Movies", "TV Series", and "Bookmarked" content.
5.  **Search**: Use the search bar at the top to find specific titles.
6.  **Bookmark**: Click the bookmark icon on any movie or TV series card to add or remove it from your bookmarked list.

## Technologies Used

| Technology         | Description                                     |
| :----------------- | :---------------------------------------------- |
| **React**          | A JavaScript library for building user interfaces |
| **TypeScript**     | A typed superset of JavaScript that compiles to plain JavaScript |
| **Vite**           | A fast build tool for modern web projects         |
| **Tailwind CSS**   | A utility-first CSS framework for rapid UI development |
| **Supabase**       | Open-source Firebase alternative for backend services (Auth, Database) |
| **React Query**    | Powerful asynchronous state management for React |
| **React Router DOM** | Declarative routing for React applications     |
| **React Hook Form**| Performant and flexible forms with easy validation |
| **Swiper**         | Modern touch slider for carousels and galleries   |
| **ESLint**         | Pluggable JavaScript linter for code quality     |
| **Prettier**       | Opinionated code formatter                        |

## Contributing
We welcome contributions to enhance this entertainment web app! If you're looking to contribute, please follow these guidelines:

1.  🍴 **Fork the repository.**
2.  ✨ **Clone your forked repository** to your local machine.
3.  🌿 **Create a new branch** for your feature or bug fix: `git checkout -b feature/your-feature-name` or `git checkout -b bugfix/issue-description`.
4.  💻 **Make your changes**, ensuring they adhere to the project's coding style and standards.
5.  🧪 **Write and run tests** (if applicable) to ensure your changes work as expected and don't introduce regressions.
6.  💾 **Commit your changes** with a clear and concise message: `git commit -m "feat: Add new feature"`.
7.  ⬆️ **Push your changes** to your forked repository: `git push origin feature/your-feature-name`.
8.  🤝 **Open a Pull Request** to the `main` branch of the original repository. Provide a detailed description of your changes.

## Author Info
**Isaacayomi**
*   LinkedIn: [Your_LinkedIn_Profile]
*   Twitter: [Your_Twitter_Handle]
*   Portfolio: [Your_Portfolio_Website]

---

[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-17181C?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React Query](https://img.shields.io/badge/React_Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white)](https://tanstack.com/query/latest)
[![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)](https://eslint.org/)
[![Prettier](https://img.shields.io/badge/Prettier-F7BA3E?style=for-the-badge&logo=prettier&logoColor=white)](https://prettier.io/)

[![Readme was generated by Dokugen](https://img.shields.io/badge/Readme%20was%20generated%20by-Dokugen-brightgreen)](https://www.npmjs.com/package/dokugen)