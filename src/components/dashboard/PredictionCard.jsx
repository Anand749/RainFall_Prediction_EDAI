import { useTranslation } from 'react-i18next'
import './DashboardCards.css'

const CONFIDENCE_KEYS = {
  high: 'prediction.high_confidence',
  medium: 'prediction.medium_confidence',
  low: 'prediction.low_confidence',
}

export default function PredictionCard({ data, loading, hero = false }) {
  const { t } = useTranslation()

  if (loading) {
    return (
      <article className="dash-card card prediction-card">
        <div className="skeleton skeleton-title" />
        <div className="skeleton" style={{ height: 80 }} />
      </article>
    )
  }

  const confKey = CONFIDENCE_KEYS[data?.confidence] || CONFIDENCE_KEYS.medium

  return (
    <article className={`dash-card card prediction-card fade-in ${hero ? 'prediction-card-hero' : ''}`}>
      <header className="dash-card-header">
        <span className="dash-card-icon">{'\u{1F327}\uFE0F'}</span>
        <div>
          <h3>{t('prediction.title')}</h3>
          {hero && <span className="ml-badge">{t('dashboard.ml_model')}</span>}
        </div>
      </header>
      <div className="prediction-main">
        <div className="prediction-value">
          <span className="big-number">{data?.rainfall_mm ?? '\u2014'}</span>
          <span className="unit">{t('prediction.mm')}</span>
        </div>
        <span className="weather-icon-large" aria-hidden="true">{'\u26C8\uFE0F'}</span>
      </div>
      <div className="prediction-stats">
        <div className="stat-item">
          <span className="stat-label">{t('prediction.probability')}</span>
          <span className="stat-value">{data?.probability ?? 0}%</span>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${data?.probability ?? 0}%` }} />
          </div>
        </div>
        <div className="stat-item">
          <span className="stat-label">{t('prediction.confidence')}</span>
          <span className={`confidence-badge ${data?.confidence}`}>{t(confKey)}</span>
        </div>
      </div>
    </article>
  )
}
