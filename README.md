# NBA Team Duel 🏀

**NBA Team Duel** is an interactive single-page web application built with modern frontend technologies. It allows users to select their favorite NBA teams and battle them against randomly selected opponents, showcasing team matchups from a randomly chosen NBA season.

## Project Overview

This project is part of a frontend engineering take-home challenge for a role application. The challenge involved creating a single-page web application utilizing an external API, complete with multiple views, interactive UI, and unit testing.

## Features ✨

- Select up to 5 favorite NBA teams.
- Automated tournament against randomly selected opponent teams.
- Real-time matchup results fetched from the [Balldontlie API](https://www.balldontlie.io/).
- Tournament history tracking and results display.
- Smooth UI transitions powered by Framer Motion.
- Responsive design optimized for desktop and mobile browsers.

## Tech Stack 🛠️

- **React**
- **TypeScript**
- **Vite** (build tool)
- **TanStack Router** (client-side routing)
- **TanStack Query** (data fetching & caching)
- **Clerk** (authentication)
- **Supabase** (backend database)
- **Zustand** (state management)
- **Tailwind CSS** (styling)
- **Framer Motion** (animations)
- **Vitest** (unit testing)

## Setup & Installation 🚀

### Clone the Repository

```bash
git clone <repository-url>
cd nba-team-duel
```

### Install Dependencies

```bash
npm install
```

### Environment Variables

Create a `.env.local` file and populate it with your environment variables:

```env
VITE_CLERK_PUBLISHABLE_KEY=
VITE_CLERK_SECRET_KEY=
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_BALL_DONT_LIE_API_TOKEN=
```

### Running Locally

```bash
npm run dev
```

Open your browser to `http://localhost:5173`.

## Testing ✅

Unit tests are written using Vitest. Run tests with:

```bash
npm run test
```

## Deployment 🌐

The project is deployment-ready on Vercel.

- Build the project:

```bash
npm run build
```

- Preview the build locally:

```bash
npm run serve
```

- To deploy:

  - Create a new project on [Vercel](https://vercel.com/).
  - Add environment variables within the Vercel dashboard.
  - Deploy directly from GitHub or Bitbucket.

## Browser Compatibility 🌍

The app has been tested and confirmed working smoothly on:

- Chrome
- Firefox
- Safari (including mobile)

## Demo 🔗

Live demo is available at: [NBA Team Duel Website](https://nba-team-duel-7hin.vercel.app/)

## License 📄

Licensed under the MIT License.

---

Built with ❤️ by Omar Elnagdy for a Frontend Engineer role.
