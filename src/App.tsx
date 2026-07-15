/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './pages/Dashboard';
import { Productivity } from './pages/Productivity';
import { Goals } from './pages/Goals';
import { Finance } from './pages/Finance';
import { Health } from './pages/Health';
import { Gaming } from './pages/Gaming';
import { Media } from './pages/Media';
import { Settings } from './pages/Settings';
import { Profile } from './pages/Profile';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { motion, AnimatePresence } from 'motion/react';
import Loader from '@/src/components/CustomLoader';

import { AuthProvider, useAuth } from './contexts/AuthContext';

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-full mesh-gradient overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-hidden">
        {children}
      </main>
    </div>
  );
}

function PageWrapper({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.02 }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        className="h-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center mesh-gradient">
        <Loader />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Auth Routes */}
          <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
          <Route path="/signup" element={<PageWrapper><Signup /></PageWrapper>} />

          {/* Protected Life Tracker Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashboardLayout>
                <PageWrapper><Dashboard /></PageWrapper>
              </DashboardLayout>
            </ProtectedRoute>
          } />

          <Route path="/productivity" element={
            <ProtectedRoute>
              <DashboardLayout>
                <PageWrapper><Productivity /></PageWrapper>
              </DashboardLayout>
            </ProtectedRoute>
          } />

          <Route path="/finance" element={
            <ProtectedRoute>
              <DashboardLayout>
                <PageWrapper><Finance /></PageWrapper>
              </DashboardLayout>
            </ProtectedRoute>
          } />

          <Route path="/health" element={
            <ProtectedRoute>
              <DashboardLayout>
                <PageWrapper><Health /></PageWrapper>
              </DashboardLayout>
            </ProtectedRoute>
          } />

          <Route path="/gaming" element={
            <ProtectedRoute>
              <DashboardLayout>
                <PageWrapper><Gaming /></PageWrapper>
              </DashboardLayout>
            </ProtectedRoute>
          } />

          <Route path="/media" element={
            <ProtectedRoute>
              <DashboardLayout>
                <PageWrapper><Media /></PageWrapper>
              </DashboardLayout>
            </ProtectedRoute>
          } />

          <Route path="/goals" element={
            <ProtectedRoute>
              <DashboardLayout>
                <PageWrapper><Goals /></PageWrapper>
              </DashboardLayout>
            </ProtectedRoute>
          } />

          <Route path="/settings" element={
            <ProtectedRoute>
              <DashboardLayout>
                <PageWrapper><Settings /></PageWrapper>
              </DashboardLayout>
            </ProtectedRoute>
          } />

          <Route path="/profile" element={
            <ProtectedRoute>
              <DashboardLayout>
                <PageWrapper><Profile /></PageWrapper>
              </DashboardLayout>
            </ProtectedRoute>
          } />

          {/* Fallback */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
