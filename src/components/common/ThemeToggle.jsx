import { useTranslation } from 'react-i18next'
import { useTheme } from '../../contexts/ThemeContext'
import './ThemeToggle.css'

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme()
  const { t } = useTranslation()

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={isDark ? t('nav.lightMode') : t('nav.darkMode')}
      title={isDark ? t('nav.lightMode') : t('nav.darkMode')}
    >
      <span className="theme-icon">{isDark ? '☀️' : '🌙'}</span>
    </button>
  )
}
