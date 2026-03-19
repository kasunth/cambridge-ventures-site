import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  FiHome, FiDollarSign, FiMapPin, FiBriefcase,
  FiUsers, FiGrid, FiPhone, FiLogOut, FiExternalLink
} from 'react-icons/fi';
import HomeEditor from './pages/HomeEditor';
import VentureEditor from './pages/VentureEditor';
import RealEstateEditor from './pages/RealEstateEditor';
import CareersEditor from './pages/CareersEditor';
import TeamEditor from './pages/TeamEditor';
import ProjectsEditor from './pages/ProjectsEditor';
import ContactEditor from './pages/ContactEditor';

const sidebarLinks = [
  { label: 'Home Page', path: '/admin', icon: FiHome },
  { label: 'Venture Capital', path: '/admin/venture', icon: FiDollarSign },
  { label: 'Real Estate', path: '/admin/realestate', icon: FiMapPin },
  { label: 'Careers', path: '/admin/careers', icon: FiBriefcase },
  { label: 'Team Members', path: '/admin/team', icon: FiUsers },
  { label: 'Projects', path: '/admin/projects', icon: FiGrid },
  { label: 'Contact Info', path: '/admin/contact', icon: FiPhone },
];

export default function AdminLayout() {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-dark-600 text-white flex flex-col shrink-0">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gold-400 flex items-center justify-center text-white font-bold text-sm rounded">
              CV
            </div>
            <div>
              <div className="text-sm font-semibold">CMS Admin</div>
              <div className="text-xs text-gray-400">Content Manager</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 py-4">
          {sidebarLinks.map(link => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-3 px-6 py-3 text-sm transition-colors ${
                  isActive
                    ? 'bg-gold-400 text-white'
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <link.icon className="text-lg" />
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10 space-y-2">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors"
          >
            <FiExternalLink /> View Site
          </a>
          <button
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:text-red-400 transition-colors w-full"
          >
            <FiLogOut /> Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <Routes>
            <Route index element={<HomeEditor />} />
            <Route path="venture" element={<VentureEditor />} />
            <Route path="realestate" element={<RealEstateEditor />} />
            <Route path="careers" element={<CareersEditor />} />
            <Route path="team" element={<TeamEditor />} />
            <Route path="projects" element={<ProjectsEditor />} />
            <Route path="contact" element={<ContactEditor />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}
