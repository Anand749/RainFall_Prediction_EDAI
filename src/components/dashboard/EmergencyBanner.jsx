import { useTranslation } from 'react-i18next'
import { helplineNumbers } from '../../data/mockData'
import './DashboardCards.css'

export default function EmergencyBanner({ alerts, showBanner = true }) {
  const { t } = useTranslation()
  const active = alerts?.filter((a) => a.active) || []
  const critical = active.some((a) => a.severity === 'critical')

  return (
    <section id="section-alerts" className="emergency-section">
      {showBanner && critical && (
        <div className="emergency-banner alert-blink" role="alert">
          <span className="emergency-banner-icon">{'\u{1F6A8}'}</span>
          <p className="emergency-banner-text">{t('alerts.banner')}</p>
        </div>
      )}

      {active.map((alert) => (
        <article key={alert.id} className="card" style={{ marginBottom: '1rem', borderLeft: '4px solid var(--danger)' }}>
          <h4 style={{ color: 'var(--danger)', marginBottom: '0.5rem' }}>{alert.title}</h4>
          <p style={{ fontSize: '0.95rem' }}>{alert.message}</p>
        </article>
      ))}

      <article className="dash-card card">
        <header className="dash-card-header">
          <span className="dash-card-icon">{'\u{1F4DE}'}</span>
          <h3>{t('alerts.helpline')}</h3>
        </header>
        <section className="helpline-grid">
          {helplineNumbers.map((h) => (
            <a key={h.number} href={`tel:${h.number.replace(/[^0-9]/g, '')}`} className="helpline-item">
              <span>{h.icon}</span>
              <span>
                <strong>{h.name}</strong>
                <br />
                <span className="helpline-number">{h.number}</span>
              </span>
            </a>
          ))}
        </section>
      </article>

      <article className="dash-card card" style={{ marginTop: '1rem' }}>
        <header className="dash-card-header">
          <span className="dash-card-icon">{'\u{1F3DB}\uFE0F'}</span>
          <h3>{t('alerts.disaster_mgmt')}</h3>
        </header>
        <p className="crop-detail">{t('alerts.evacuation')}: Contact your district disaster management office immediately if water levels rise.</p>
      </article>

      <article className="dash-card card" style={{ marginTop: '1rem' }}>
        <header className="dash-card-header">
          <span className="dash-card-icon">{'\u{1F6E1}\uFE0F'}</span>
          <h3>{t('alerts.safety_title')}</h3>
        </header>
        <ul className="safety-list">
          {['tip1', 'tip2', 'tip3', 'tip4', 'tip5', 'tip6', 'tip7', 'tip8'].map((tip) => (
            <li key={tip}>{t(`alerts.safety_tips.${tip}`)}</li>
          ))}
        </ul>
      </article>
    </section>
  )
}
