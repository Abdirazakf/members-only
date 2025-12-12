# Members Only 🔒

A full-stack anonymous messaging platform where users can post messages anonymously to the public, but authenticated members can see who wrote each post. Built with React, Express.js, PostgreSQL, and deployed on Railway.

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://members-only-1.up.railway.app/)
[![Node.js](https://img.shields.io/badge/node.js-18+-green)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/postgresql-14+-blue)](https://www.postgresql.org/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## 🚀 Live Demo

**[View Live Application](https://members-only-1.up.railway.app/)**

## ✨ Features

### 🎭 Anonymous Posting
- Create and share messages without revealing your identity to the public
- Posts appear anonymous to non-members
- Authenticated members can see the author's real name

### 👥 Circle-Based Communities
- Create private circles with secure passcodes
- Join existing circles to participate in exclusive discussions
- Multiple circles per user for different communities

### 🔐 Authentication & Security
- Secure user authentication with Passport.js
- Password hashing with bcrypt
- Session-based authentication with PostgreSQL session store
- Protected routes and API endpoints

### 💬 Real-Time Messaging
- Create titled messages with character limits (100 chars for title, 255 for message)
- View messages in reverse chronological order
- Relative timestamps (e.g., "2 hours ago", "Just now")
- Loading states and error handling

### 🎨 Modern UI/UX
- Dark theme with slate color palette
- Responsive design for mobile, tablet, and desktop
- Smooth animations with Framer Motion
- Loading skeletons and spinners
- Toast notifications for user feedback

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **React Router** - Client-side routing
- **Zustand** - State management
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Animations
- **React Hot Toast** - Toast notifications
- **Lucide React** - Icon library
- **Vite** - Build tool

### Backend
- **Node.js** - Runtime environment
- **Express.js 5** - Web framework
- **PostgreSQL** - Database
- **Passport.js** - Authentication
- **Express Validator** - Input validation
- **bcryptjs** - Password hashing
- **Express Session** - Session management
- **connect-pg-simple** - PostgreSQL session store
- **CORS** - Cross-origin resource sharing

### Deployment
- **Railway** - Hosting platform
- **PostgreSQL on Railway** - Managed database

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- npm or yarn package manager

## 🔧 Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/Abdirazakf/members-only.git
cd members-only
```

### 2. Install dependencies

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd ../frontend
npm install
```

### 3. Environment Variables

**Backend (.env):**
Create a `.env` file in the `backend` directory:
```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/members_only

# Session Secret
SESSION_SECRET=your-super-secret-session-key-change-this

# Environment
NODE_ENV=dev
PORT=3000
```

**Production (.env):**
```env
# Database (Railway provides this)
DATABASE_URL=postgresql://...

# Session Secret (Generate a secure random string)
SESSION_SECRET=your-production-secret

# Environment
NODE_ENV=prod
PORT=3000

# Production Database (for migrations)
PROD_DB=postgresql://...
```

### 4. Database Setup

Run the database migration script:
```bash
cd backend
node db/populatedb.js
```

This creates the following tables:
- `users` - User accounts
- `circles` - Community groups
- `messages` - User posts
- `user_circles` - Many-to-many relationship between users and circles
- `session` - Session storage (auto-created)

### 5. Run Development Servers

**Backend (Port 3000):**
```bash
cd backend
node ./app.js
```

**Frontend (Port 5173):**
```bash
cd frontend
npm start
```

Visit `http://localhost:5173` to see the application.

## 📦 Build for Production

### Frontend Build
```bash
cd frontend
npm run build
```

This creates optimized production files in `frontend/dist/`

### Backend Production
The backend serves the frontend build in production mode:
```bash
cd backend
NODE_ENV=prod
```

## 🗄️ Database Schema

### Users Table
```sql
users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
```

### Circles Table
```sql
circles (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description VARCHAR(255),
  passcode VARCHAR(255) NOT NULL,
  created_by INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
```

### Messages Table
```sql
messages (
  id SERIAL PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  text VARCHAR(255) NOT NULL,
  user_id INTEGER REFERENCES users(id),
  circle_id INTEGER REFERENCES circles(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
```

### User_Circles Table (Junction)
```sql
user_circles (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  circle_id INTEGER REFERENCES circles(id),
  joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, circle_id)
)
```

## 🔌 API Endpoints

### Authentication
- `POST /api/login` - User login
- `POST /api/sign-up` - User registration
- `GET /api/auth/status` - Check authentication status
- `POST /api/auth/logout` - User logout

### Circles
- `GET /api/circle/list` - Get user's circles
- `POST /api/circle/create` - Create new circle
- `POST /api/circle/join` - Join existing circle

### Messages
- `POST /api/message/create` - Create new message
- `GET /api/message/circle/:circleId` - Get messages for a circle

## 📁 Project Structure

```
members-only/
├── backend/
│   ├── config/
│   │   └── passport.js          # Passport authentication config
│   ├── controllers/
│   │   ├── authController.js    # Auth endpoints
│   │   ├── circleController.js  # Circle CRUD operations
│   │   ├── loginController.js   # Login logic
│   │   ├── messageController.js # Message operations
│   │   └── signupController.js  # User registration
│   ├── db/
│   │   ├── pool.js             # PostgreSQL connection pool
│   │   ├── populatedb.js       # Database migration script
│   │   └── queries.js          # Database queries
│   ├── routes/
│   │   ├── authRouter.js       # Auth routes
│   │   ├── circleRouter.js     # Circle routes
│   │   ├── loginRouter.js      # Login routes
│   │   ├── messageRouter.js    # Message routes
│   │   └── signupRouter.js     # Signup routes
│   ├── .gitignore
│   ├── app.js                  # Express app setup
│   ├── package.json
│   └── railway.json            # Railway deployment config
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/
│   │   │   │   └── AnimatedList.jsx  # Animated list component
│   │   │   ├── AuthRoute.jsx         # Protected route wrapper
│   │   │   ├── Footer.jsx            # Footer component
│   │   │   ├── GuestRoute.jsx        # Guest-only route wrapper
│   │   │   ├── Modal.jsx             # Message creation modal
│   │   │   ├── Navbar.jsx            # Navigation bar
│   │   │   └── Post.jsx              # Message post card
│   │   ├── pages/
│   │   │   ├── AuthHome.jsx          # Authenticated user dashboard
│   │   │   ├── CreateCircle.jsx      # Circle creation page
│   │   │   ├── GuestHome.jsx         # Landing page
│   │   │   ├── Homepage.jsx          # Route switch page
│   │   │   ├── Info.jsx              # Learn more page
│   │   │   ├── JoinCircle.jsx        # Join circle page
│   │   │   ├── Login.jsx             # Login page
│   │   │   └── SignUp.jsx            # Registration page
│   │   ├── states/
│   │   │   └── useAuthStore.js       # Zustand auth store
│   │   ├── App.jsx                   # Main app component
│   │   ├── index.css                 # Global styles
│   │   ├── main.jsx                  # Entry point
│   │   └── reset.css                 # CSS reset
│   ├── .gitignore
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── vite.config.js
│
└── README.md
```

## 🎨 Design System

### Colors
- **Primary Blue**: `#3a4df7` (buttons, accents)
- **Hover Blue**: `#2d3ec7`
- **Background**: `slate-950`
- **Cards**: `slate-800/30` or `slate-800/50`
- **Borders**: `slate-700/50` or `slate-700/30`
- **Text**: `white` (primary), `slate-400` (secondary), `slate-500` (muted)

### Components
- **Buttons**: `rounded-lg`, `h-10/h-12`, `font-bold`
- **Cards**: `rounded-xl`, `backdrop-blur-sm`, `border`, `shadow`
- **Inputs**: `rounded-lg`, `h-12`, `border-slate-600`, `bg-slate-700/50`
- **Loading**: `animate-pulse`, `bg-slate-700/50`

## 🚀 Deployment to Railway

### 1. Create Railway Project
1. Go to [Railway.app](https://railway.app)
2. Create a new project
3. Add PostgreSQL database

### 2. Configure Environment Variables
Add these to your Railway environment:
```
DATABASE_URL=(automatically provided)
SESSION_SECRET=your-production-secret
NODE_ENV=prod
PORT=3000
```

### 3. Deploy
```bash
# Connect Railway CLI
railway login

# Deploy
git push railway main
```

Railway will automatically:
- Install dependencies
- Run the build script (`npm run build`)
- Start the server (`npm start`)
- Serve frontend from `frontend/dist/`

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Abdirazak Farah**

- GitHub: [@Abdirazakf](https://github.com/Abdirazakf)
- Live Demo: [Members Only](https://members-only-1.up.railway.app/)

## 🙏 Acknowledgments

- [Railway](https://railway.app/) - Hosting platform
- [Tailwind CSS](https://tailwindcss.com/) - Styling framework
- [Lucide Icons](https://lucide.dev/) - Icon library
- [Reactbits](https://reactbits.dev/) - AnimatedList UI component

---

**Built with ❤️ by Abdirazak Farah**

