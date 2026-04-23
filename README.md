# FEEL EMPOWERED

Frontend-only demo for an online community and information platform focused on sexuality, health, and relationship topics for teens and emerging adults.

## Current Setup

This repository now runs entirely on the client.

- Authentication, profile updates, forum posts, and comments are stored in `localStorage`
- No backend or database connection is required
- Demo data is seeded automatically on first load

The local demo store lives in `src/services/demoStore.js`.

## Features

- Public content pages for home, resources, info, about, and quiz
- Sign up, log in, log out, profile update, and profile delete
- Forum post and comment create, edit, and delete flows
- Protected routes for forum, profile, and profile update pages

## Demo Notes

- Session state persists in the browser through `localStorage`
- Clearing browser storage resets the demo back to its seeded state
- Deleting a user keeps their old posts and replies visible with a deleted-user fallback

## Tech Stack

- React
- React Router
- Mantine
- Vite

## Structure

- `src/pages`: route-level screens
- `src/components`: shared UI pieces such as navbar, footer, posts, and comments
- `src/contexts`: session state and auth wiring
- `src/services`: localStorage-backed demo data layer

## Improvements Still Worth Doing

- Make page layouts responsive instead of relying on large fixed margins and widths
- Move inline styles into reusable styled components or CSS modules
- Add tests for the demo store and protected-route behavior
- Remove unused dependencies that are still listed in `package.json`
