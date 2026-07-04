import { AnimatePresence } from 'framer-motion';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import LandingPage from './pages/LandingPage';
import { AuthProvider } from './context/AuthContext';
import { useEffect } from "react";
import RegisterPage from './pages/RegisterPage';


function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </AnimatePresence>
  )
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", 
    });
  }, [pathname]);

  return null;
}

function App() {

  return (
    <BrowserRouter>
    <AuthProvider>
      <ScrollToTop/>
        <AnimatedRoutes />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#0a0f2c',
              color: '#f8fafc',
              border: '1px solid rgba(255, 255, 255, 0.08)',
            },
            success: {
              iconTheme: { primary: '#8b5cf6', secondary: '#f8fafc' },
            },
            error: {
              iconTheme: { primary: '#ef4444', secondary: '#f8fafc' },
            },
          }}
        />
        </AuthProvider>
    </BrowserRouter>    
  )
}

export default App
