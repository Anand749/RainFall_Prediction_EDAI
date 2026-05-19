import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../contexts/AuthContext'
import LanguageSelector from '../components/common/LanguageSelector'
import ThemeToggle from '../components/common/ThemeToggle'
import './LoginPage.css'

export default function LoginPage() {
  const { t } = useTranslation()
  const { login } = useAuth()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (login(username, password)) {
      navigate('/dashboard')
    } else {
      setError(t('login.error'))
    }
  }

  return (
    <div className="login-page">
      <div className="login-bg" aria-hidden="true">
        <span className="cloud c1" />
        <span className="cloud c2" />
        <span className="rain-drop" />
      </div>
      <header className="login-top">
        <Link to="/" className="login-brand">{'\u{1F33E}'} Smart Farmer</Link>
        <div className="login-top-actions">
          <LanguageSelector />
          <ThemeToggle />
        </div>
      </header>
      <main className="login-card glass-card fade-in">
        <h1>{t('login.welcome')}</h1>
        <p className="login-sub">{t('login.title')}</p>
        <form onSubmit={handleSubmit} className="login-form">
          <label htmlFor="username">{t('login.username')}</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder={t('login.placeholder_user')}
            autoComplete="username"
            required
          />
          <label htmlFor="password">{t('login.password')}</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t('login.placeholder_pass')}
            autoComplete="current-password"
            required
          />
          {error && <p className="login-error" role="alert">{error}</p>}
          <button type="submit" className="btn btn-primary login-btn">{t('login.submit')}</button>
        </form>
        <p className="login-hint">Demo: admin123 / admin123</p>
        <Link to="/" className="login-back">{'\u2190'} {t('nav.home')}</Link>
      </main>
    </div>
  )
}
