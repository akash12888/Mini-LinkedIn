# Mini LinkedIn

A mini LinkedIn built with the latest technology stack.

**🌐 Live Demo:** [https://mini-linkedin-1-14v9.onrender.com](https://mini-linkedin-1-14v9.onrender.com)

## 🚀 Tech Stack

### Frontend
- **Vite 7** - Next-generation frontend build tool
- **React 19** - Latest React with improved performance and features
- **React Router v6** - Latest routing solution for React
- **Tailwind CSS v4** - Plugin-based approach using Vite plugin
- **Axios** - HTTP client for API requests
- **React Hot Toast** - Toast notifications for user feedback

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **JWT** - Authentication

## ✨ Key Features

- **Modern Setup**: Uses Vite 7 for lightning-fast development
- **Tailwind v4**: Plugin-based approach - no config files needed
- **React 19**: Latest React with improved performance
- **No PostCSS**: Tailwind v4 eliminates the need for PostCSS configuration
- **Full-stack**: Complete frontend and backend implementation
- **Toast Notifications**: Real-time user feedback for all actions
- **Error Handling**: Automatic error display with toast notifications

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB (local or Atlas)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mini-linkedin
   ```

2. **Install all dependencies**
   ```bash
   npm install
   ```
   This will install both frontend and backend dependencies.

3. **Set up environment variables**
   
   **Frontend (.env in frontend directory):**
   ```bash
   VITE_API_URL=http://localhost:5000/api
   VITE_APP_NAME=Mini LinkedIn
   VITE_APP_VERSION=1.0.0
   ```
   
   **Backend (.env in backend directory):**
   ```bash
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/mini-linkedin
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   NODE_ENV=development
   ```

4. **Start the development servers**
   ```bash
   # Terminal 1 - Start frontend
   cd frontend
   npm run dev
   
   # Terminal 2 - Start backend  
   cd backend
   npm run dev
   ```

### Available Scripts

From the root directory:
- `npm run install-frontend` - Install only frontend dependencies
- `npm run install-backend` - Install only backend dependencies

From the frontend directory:
- `npm run dev` - Start Vite development server on `http://localhost:3000`
- `npm run build` - Build for production
- `npm run preview` - Preview production build

From the backend directory:
- `npm run dev` - Start Express server on `http://localhost:5000`
- `npm start` - Start production server

## 🔧 Environment Variables

### Frontend
| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `http://localhost:5000/api` |
| `VITE_APP_NAME` | Application name | `Mini LinkedIn` |
| `VITE_APP_VERSION` | Application version | `1.0.0` |

### Backend
| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/mini-linkedin` |
| `JWT_SECRET` | JWT signing secret | `your-super-secret-jwt-key` |
| `NODE_ENV` | Environment mode | `development` |

## 🎨 Tailwind CSS v4

This project uses Tailwind CSS v4's plugin-based approach:

- No `tailwind.config.js` required
- No `postcss.config.js` required
- Uses Vite plugin: `@tailwindcss/vite` in vite.config.js
- Uses `@import "tailwindcss"` in CSS

## 🔔 Toast Notifications

The application uses React Hot Toast for user feedback:

### Features:
- **Automatic Error Display**: All API errors are automatically shown as toast notifications
- **Success Messages**: Successful actions show green success toasts
- **Loading States**: Long operations show loading toasts
- **Custom Styling**: Toasts are styled to match the app theme

### Usage:
```javascript
import { showSuccess, showError, showLoading } from '../utils/api';

// Show success message
showSuccess('Post created successfully!');

// Show error message
showError('Something went wrong');

// Show loading toast
const loadingToast = showLoading('Creating post...');
// Dismiss loading toast
dismissLoading(loadingToast);
```

### Error Handling:
- Network errors are automatically displayed
- Server errors show the actual error message
- Authentication errors redirect to login
- All errors are handled centrally through API interceptors

## 📁 Project Structure

```
mini-linkedin/
├── frontend/                 # Frontend React app
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/         # Page components
│   │   ├── context/       # React context
│   │   ├── utils/         # Utility functions (API, toasts)
│   │   └── index.css      # Tailwind v4 import
│   ├── package.json       # Frontend dependencies
│   ├── vite.config.js     # Vite configuration with Tailwind plugin
│   └── .env              # Frontend environment variables
├── backend/                # Backend Node.js app
│   ├── routes/           # API routes
│   ├── models/           # Database models
│   ├── middleware/       # Express middleware
│   ├── package.json      # Backend dependencies
│   └── .env             # Backend environment variables
└── package.json          # Root package.json with convenience scripts
```

## 🚀 Development

For development, you need to run both frontend and backend servers:

- **Frontend**: Runs on `http://localhost:3000` with hot module replacement enabled
- **Backend**: Runs on `http://localhost:5000` with API endpoints

Make sure both servers are running for the full application to work properly.

## 🔒 Security Notes

- Never commit `.env` files to version control
- Change the `JWT_SECRET` in production
- Use environment-specific MongoDB URIs
- Consider using a secrets management service in production
