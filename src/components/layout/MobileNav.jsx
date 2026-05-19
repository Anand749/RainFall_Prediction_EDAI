import { useTranslation } from 'react-i18next'
import './MobileNav.css'

const ITEMS = [
  { id: 'overview', icon: '📊' },
  { id: 'map', icon: '🗺️' },
  { id: 'alerts', icon: '⚠️' },
  { id: 'crops', icon: '🌾' },
  { id: 'voice', icon: '🎤' },
]

export default function MobileNav({ activeSection, onNavigate }) {
  const { t } = useTranslation()
  const labels = {
    overview: t('nav.dashboard'),
    map: t('nav.map'),
    alerts: t('nav.alerts'),
    crops: t('nav.crops'),
    voice: t('voice.title'),
  }

  return (
    <nav className="mobile-nav glass-card" aria-label="Mobile navigation">
      {ITEMS.map((item) => (
        <button
          key={item.id}
          type="button"
          className={`mobile-nav-item ${activeSection === item.id ? 'active' : ''}`}
          onClick={() => onNavigate(item.id)}
        >
          <span className="mobile-nav-icon">{item.icon}</span>
          <span className="mobile-nav-label">{labels[item.id]}</span>
        </button>
      ))}
    </nav>
  )
}
