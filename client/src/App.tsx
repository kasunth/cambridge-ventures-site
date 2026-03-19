import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import VentureCapitalPage from './pages/VentureCapitalPage';
import RealEstatePage from './pages/RealEstatePage';
import CareersPage from './pages/CareersPage';
import AdminLogin from './admin/AdminLogin';
import AdminLayout from './admin/AdminLayout';
import { useContent } from './hooks/useContent';
import { ContactContent } from './types/content';

function PublicLayout() {
  const { data: contact } = useContent<ContactContent>('contact');

  return (
    <>
      <Navbar />
      <div className="pt-20">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/venture-capital" element={<VentureCapitalPage />} />
          <Route path="/real-estate" element={<RealEstatePage />} />
          <Route path="/careers" element={<CareersPage />} />
        </Routes>
      </div>
      <Footer content={contact} />
    </>
  );
}

function AppRoutes() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <>
      {isAdmin ? (
        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/*" element={<AdminLayout />} />
        </Routes>
      ) : (
        <PublicLayout />
      )}
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="top-right" />
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}
