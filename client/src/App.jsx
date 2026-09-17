import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';

// Pages
import LandingPage from './pages/LandingPage';
import GeneratorPage from './pages/GeneratorPage';
import TemplatesPage from './pages/TemplatesPage';
import DashboardPage from './pages/DashboardPage';
import MyReadmesPage from './pages/MyReadmesPage';
import GithubIntegrationPage from './pages/GithubIntegrationPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import SettingsPage from './pages/SettingsPage';
import PublicReadmePage from './pages/PublicReadmePage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import NotFoundPage from './pages/NotFoundPage';
import { ProtectedRoute, AdminRoute } from './routes/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Toaster position="bottom-right" richColors theme="dark" />
      <Routes>
        {/* Public & Core Generator Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/generator" element={<GeneratorPage />} />
        <Route path="/templates" element={<TemplatesPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/readme/:username/:slug" element={<PublicReadmePage />} />

        {/* Authenticated Dashboard Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/readmes" element={<MyReadmesPage />} />
          <Route path="/github" element={<GithubIntegrationPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>

        {/* Admin Route */}
        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<AdminDashboardPage />} />
        </Route>

        {/* Fallback 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
