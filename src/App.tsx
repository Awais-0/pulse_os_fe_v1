/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, Outlet } from 'react-router-dom';
import { ConfigProvider, theme } from 'antd';
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

function DashboardLayout() {
  return (
    <div className="flex h-screen w-full mesh-gradient overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-hidden">
        <Outlet />
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

function ProtectedRoute() {
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

  return <Outlet />;
}

export default function App() {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
          colorPrimary: '#6366f1',
          borderRadius: 8,
          fontFamily: 'Inter, sans-serif',
        },
      }}
    >
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public Auth Routes */}
            <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
            <Route path="/signup" element={<PageWrapper><Signup /></PageWrapper>} />

            {/* 2. Nested Routing Setup for Protected Layouts */}
            <Route element={<ProtectedRoute />}>
              <Route element={<DashboardLayout />}>
                <Route path="/dashboard" element={<PageWrapper><Dashboard /></PageWrapper>} />
                <Route path="/productivity" element={<PageWrapper><Productivity /></PageWrapper>} />
                <Route path="/finance" element={<PageWrapper><Finance /></PageWrapper>} />
                <Route path="/health" element={<PageWrapper><Health /></PageWrapper>} />
                <Route path="/gaming" element={<PageWrapper><Gaming /></PageWrapper>} />
                <Route path="/media" element={<PageWrapper><Media /></PageWrapper>} />
                <Route path="/goals" element={<PageWrapper><Goals /></PageWrapper>} />
                <Route path="/settings" element={<PageWrapper><Settings /></PageWrapper>} />
                <Route path="/profile" element={<PageWrapper><Profile /></PageWrapper>} />
              </Route>
            </Route>

            {/* Fallbacks */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ConfigProvider>
  );
}