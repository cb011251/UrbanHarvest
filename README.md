# Urban Harvest – Sustainable Web Application

Project Overview

Urban Harvest is a responsive multi-page web application focused on practical, low-waste living.  
It combines eco-friendly products, subscription plans, and a community blog space into a cohesive, accessible user interface.

The project demonstrates:

- Multi-page routing using React Router
- Lazy loading with Suspense
- Tailwind CSS v4 customization with theme variables
- Manual light/dark mode toggle
- Interactive components (modal, accordion, filtering, form validation)
- Accessible form validation and focus states
- Responsive design across mobile, tablet, and desktop
- Client-side data filtering and state management

This project is front-end only. No backend or database is connected.

======================================================

Tech Stack

- React (Vite)
- React Router DOM
- Tailwind CSS v4 (custom theme tokens)
- Iconify (@iconify/react)
- Vanilla client-side state management (useState, useMemo)

======================================================

Project Structure

src/

- components/
  - Navbar.jsx
  - Footer.jsx
  - Accordion.jsx
  - Modal.jsx
  - ProductCard.jsx
- pages/
  - Home.jsx
  - Products.jsx
  - Subscription.jsx
  - Community.jsx
  - About.jsx
  - NotFound.jsx
- data/
  - products.js
  - posts.js
  - impactStats.js
  - subscriptions.js
- App.jsx
- main.jsx
- index.css

======================================================

Theme & Tailwind Customization

The project uses CSS custom properties for theming.

Light mode:
--uh-primary
--uh-accent
--uh-secondary

Dark mode:
Applied via .dark class on the root element.

Tailwind v4 @theme tokens are mapped to CSS variables:

--color-primary
--color-accent
--color-secondary

Fonts are extended using custom font tokens inside @theme.

Manual dark mode toggle:

- Stored in localStorage
- Applies .dark class to <html>
- Updates meta theme-color dynamically

======================================================

Pages Overview

Home  
Hero section, impact stats, featured products, and modal-based quick view.

Products  
Filtering by:

- Category
- Search keyword
- In-stock toggle
- Minimum carbon score

Includes quick view modal with sustainability breakdown.

Subscription  
Plan selection cards + validated form:

- Name validation
- Email validation
- Consent checkbox
- Success modal

Community  
Blog-style grid layout:

- Category filter
- Search
- Modal post reader
- FAQ accordion

About  
Impact metrics, sourcing process, highlights, FAQ section.

NotFound  
Accessible 404 page with navigation actions.

======================================================

Accessibility Features

- Semantic HTML structure
- Skip-to-content link
- aria-invalid and aria-describedby for validation
- Focus-visible ring styles
- Accessible modals
- Descriptive alt attributes
- Keyboard-navigable controls
- Visible error and success indicators

======================================================

Interactive Components

- Modal (reusable)
- Accordion (expand/collapse FAQ)
- Product quick view modal
- Community post modal
- Filter system with live state updates
- Client-side validated subscription form

======================================================

Setup Instructions

1. Clone the repository

   git clone <repository-url>
   cd <project-folder>

2. Install dependencies

   npm install

3. Start development server

   npm run dev

4. Build for production

   npm run build

5. Preview production build

   npm run preview

======================================================

Deployment

This project can be deployed to:

- Netlify
- Vercel
- GitHub Pages

Example (Netlify):

1. Push repository to GitHub
2. Import project into Netlify
3. Build command: npm run build
4. Publish directory: dist

The deployed version must use HTTPS.

======================================================

Notes

- All data is stored in static JS files under src/data
- Built with scalability and reusability in mind

======================================================

End of README
