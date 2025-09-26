import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider, useAuth } from '@/contexts/AuthContext.jsx';
import HomePage from '@/pages/HomePage';
import TrainerProfile from '@/pages/TrainerProfile';
import RegisterPage from '@/pages/RegisterPage';
import AdminLogin from '@/pages/admin/AdminLogin';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import Footer from '@/components/Footer';
import UserRegisterPage from './pages/UserRegisterPage';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/trainer/:id" element={<TrainerProfile />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/userRegistration" element={<UserRegisterPage/>}/>
              <Route path="/login" element={<Navigate to="/admin/login" replace />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route 
                path="/admin/dashboard" 
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
               <Route 
                path="/admin" 
                element={
                  <ProtectedRoute>
                    <Navigate to="/admin/dashboard" replace />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </main>
          <Footer />
          <Toaster />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;