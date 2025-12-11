# CodeLeap Network - Social Media Feed

A full-stack social media application developed as a technical test for CodeLeap. The project features a responsive feed with real-time interactions, persistent authentication, infinite scrolling, and a robust backend integration.

## 🚀 Features

### Core Features
- **CRUD Operations:** Create, Read, Update, and Delete posts seamlessly.
- **Authentication:** User login with persistent session (Redux Persist).
- **Responsive Design:** Fully optimized for Desktop and Mobile devices.

### 🌟 Bonus Features Implemented
- **Full-Stack Likes System:** Users can like/unlike posts with real-time updates and backend persistence (Many-to-Many relationship).
- **Infinite Scroll:** Automatic pagination when scrolling to the bottom of the feed.
- **Optimistic UI:** Instant visual feedback for interactions (Likes) before server confirmation.
- **Loading Skeletons:** Professional loading states for better UX.
- **Search & Filtering:** Real-time search by title, content, or username.
- **Animations:** Smooth transitions using Framer Motion (Entry animations, Menu dropdowns).
- **Toast Notifications:** feedback for success/error actions using Sonner.

---

## 🛠️ Tech Stack

### Frontend
- **React (Vite):** Fast and modern UI library.
- **TypeScript:** For type safety and better developer experience.
- **Redux Toolkit & Redux Persist:** State management with local storage persistence.
- **Styled Components:** Component-based CSS styling.
- **Framer Motion:** For complex animations.
- **Axios:** HTTP client for API requests.
- **React Intersection Observer:** For infinite scrolling logic.
- **Date-fns:** For "Time Ago" date formatting.

### Backend
- **Python & Django:** Robust backend framework.
- **Django REST Framework (DRF):** RESTful API creation.
- **SQLite:** Default database for development.

---

## 📦 Installation & Setup

### Prerequisites
- Node.js (v18+)
- Python (v3.10+)

### 1. Backend Setup (Django)

```bash
# Navigate to backend folder
cd codeleap-backend

# Create virtual environment (optional but recommended)
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install django djangorestframework django-cors-headers

# Run migrations
python manage.py makemigrations
python manage.py migrate

# Start the server
python manage.py runserver

The API will be available at http://127.0.0.1:8000/
```
---
### 2. Frontend Setup (React)
```bash
# Navigate to frontend folder (root)
cd codeleap-network

# Install dependencies
npm install

# Start development server
npm run dev

The app will be available at http://localhost:5173/
```
🎨 Key Architectural Decisions
To ensure scalability and maintainability, the project follows clean architecture principles:

Service Layer Pattern: All API calls are isolated in services/postsService.ts. The React components never call axios directly, they only request data from the service.

Custom Hooks: Logic for data fetching, pagination, and search is encapsulated in hooks/usePosts.ts, keeping the MainScreen clean and focused on UI.

Componentization: The UI is broken down into small, reusable, and single-responsibility components (e.g., PostCard, AppHeader, CreatePostForm, PostSkeleton).

Global Styles: Variables and shared UI components (Buttons, Inputs) are managed via styles/SharedStyles.ts to ensure consistency.

Mobile Optimization
Special attention was given to the mobile experience:

Touch-friendly: Larger tap targets for buttons, icons, and menus (Kebab menu).

Layout Adjustments: Metadata (time/author) stacks vertically on smaller screens to avoid overlap.

Toast Position: Notifications appear at the bottom with a specific offset to respect mobile navigation bars (Home Indicator on iOS).

Optimized Fonts: Font sizes adjusted for readability on small screens.


👤 Author
Alex Augusto Castro Boscariol
https://www.linkedin.com/in/alex-augusto-castro-boscariol-13651b1a4/
