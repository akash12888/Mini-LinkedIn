import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';

function AppRoutes() {
  const { user: authUser } = useAuth();

  return (
    <>
      <Navbar />
      <main className="w-full">
        <Routes>
          <Route path="/" element={authUser ? <Home /> : <Navigate to="/login" />} />
          <Route path="/login" element={!authUser ? <Login /> : <Navigate to="/" />} />
          <Route path="/register" element={!authUser ? <Register /> : <Navigate to="/" />} />
          <Route path="/profile/:userId" element={authUser ? <Profile /> : <Navigate to="/login" />} />
        </Routes>
      </main>
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#1f2937',
              color: '#fff',
              borderRadius: '8px',
              border: '1px solid #374151',
              fontSize: '14px',
              maxWidth: '350px',
            },
            success: {
              duration: 3000,
              style: { background: '#065f46', color: '#ecfdf5' },
              iconTheme: { primary: '#10b981', secondary: '#ecfdf5' },
            },
            error: {
              duration: 5000,
              style: { background: '#7f1d1d', color: '#fef2f2' },
              iconTheme: { primary: '#ef4444', secondary: '#fef2f2' },
            },
          }}
        />
      </Router>
    </AuthProvider>
  );
}
