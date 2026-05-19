import { useTranslation } from 'react-i18next'
import MlCardBadge from './MlCardBadge'
import './DashboardCards.css'

export default function RiskCard({ data, loading, ml = false }) {
  const { t } = useTranslation()
  const level = data?.level || 'medium'

  if (loading) {
    return (
      <article className="dash-card card">
        <div className="skeleton skeleton-title" />
        <div className="skeleton" style={{ height: 100 }} />
      </article>
    )
  }

  const labelKey = level === 'red_alert' ? 'risk.red_alert' : `risk.${level}`

  return (
    <article className={`dash-card card fade-in ${ml ? 'ml-output-card' : ''}`}>
      <header className="dash-card-header">
        <span className="dash-card-icon">{'\u26A0\uFE0F'}</span>
        <div className="dash-card-title-wrap">
          <h3>{t('risk.title')}</h3>
          {ml && <MlCardBadge />}
        </div>
      </header>
      <section className={`risk-indicator ${level}`}>
        <p className="risk-level-text">{t(labelKey)}</p>
        {data?.floodRisk && <p style={{ marginTop: '0.5rem', fontWeight: 600 }}>{'\u{1F30A}'} Flood Risk Detected</p>}
      </section>
      <p className="risk-advisory">
        <strong>{t('risk.advisory')}:</strong> {data?.advisory}
      </p>
    </article>
  )
}
