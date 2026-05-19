import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../../contexts/AuthContext'
import LanguageSelector from '../common/LanguageSelector'
import ThemeToggle from '../common/ThemeToggle'
import './Navbar.css'

const D = 'div'

export default function Navbar({ onMenuToggle }) {
  const { t } = useTranslation()
  const { isAuthenticated, logout } = useAuth()
  const location = useLocation()
  const isLanding = location.pathname === '/'

  return (
    <nav className="navbar glass-card">
      <D className="navbar-inner container">
        <Link to="/" className="navbar-brand">
          <span className="brand-icon">🌾</span>
          <span className="brand-text">{t('app.title')}</span>
        </Link>
        <D className="navbar-actions">
          <LanguageSelector compact />
          <ThemeToggle />
          {!isLanding && isAuthenticated && (
            <button type="button" className="btn btn-sm btn-outline nav-logout" onClick={logout}>
              {t('nav.logout')}
            </button>
          )}
          {isLanding && (
            <>
              <Link to="/login" className="btn btn-sm btn-outline">{t('nav.login')}</Link>
              <Link to="/dashboard" className="btn btn-sm btn-primary">{t('nav.dashboard')}</Link>
            </>
          )}
          {!isLanding && (
            <button type="button" className="menu-toggle" onClick={onMenuToggle} aria-label="Menu">
              ☰
            </button>
          )}
        </D>
      </D>
    </nav>
  )
}
