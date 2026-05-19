import { useTranslation } from 'react-i18next'
import MlCardBadge from './MlCardBadge'
import './DashboardCards.css'

const LEVELS = ['weak', 'normal', 'strong', 'extreme']

export default function MonsoonCard({ data, loading, ml = false }) {
  const { t } = useTranslation()
  const current = data?.intensity || 'normal'

  if (loading) {
    return (
      <article className="dash-card card">
        <div className="skeleton skeleton-title" />
        <div className="skeleton" style={{ height: 100 }} />
      </article>
    )
  }

  return (
    <article className={`dash-card card fade-in ${ml ? 'ml-output-card' : ''}`}>
      <header className="dash-card-header">
        <span className="dash-card-icon">{'\u{1F30A}'}</span>
        <div className="dash-card-title-wrap">
          <h3>{t('monsoon.title')}</h3>
          {ml && <MlCardBadge />}
        </div>
      </header>
      <p className="crop-detail" style={{ marginBottom: '0.75rem' }}>
        {t('monsoon.status')}: <strong>{data?.status}</strong> ({data?.progress}%)
      </p>
      <section className="monsoon-levels" aria-label={t('monsoon.title')}>
        {LEVELS.map((level) => (
          <div
            key={level}
            className={`monsoon-level ${level} ${current === level ? 'active' : ''}`}
          >
            {t(`monsoon.${level}`)}
          </div>
        ))}
      </section>
    </article>
  )
}
