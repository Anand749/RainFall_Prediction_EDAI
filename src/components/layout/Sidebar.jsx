import { useTranslation } from 'react-i18next'
import './Sidebar.css'

const NAV_ITEMS = [
  { id: 'overview', icon: '📊', labelKey: 'nav.dashboard' },
  { id: 'map', icon: '🗺️', labelKey: 'nav.map' },
  { id: 'alerts', icon: '⚠️', labelKey: 'nav.alerts' },
  { id: 'crops', icon: '🌾', labelKey: 'nav.crops' },
  { id: 'history', icon: '📈', labelKey: 'nav.history' },
  { id: 'voice', icon: '🎤', labelKey: 'voice.title' },
]

export default function Sidebar({ activeSection, onNavigate, isOpen, onClose }) {
  const { t } = useTranslation()

  return (
  <>
    {isOpen && <button type="button" className="sidebar-overlay" onClick={onClose} aria-label="Close menu" />}
    <aside className={`sidebar glass-card ${isOpen ? 'open' : ''}`}>
      <nav className="sidebar-nav">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`sidebar-link ${activeSection === item.id ? 'active' : ''}`}
            onClick={() => { onNavigate(item.id); onClose?.() }}
          >
            <span className="sidebar-icon">{item.icon}</span>
            <span>{t(item.labelKey)}</span>
          </button>
        ))}
      </nav>
    </aside>
  </>
  )
}
