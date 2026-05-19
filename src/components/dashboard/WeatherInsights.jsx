import { useTranslation } from 'react-i18next'
import MlCardBadge from './MlCardBadge'
import './DashboardCards.css'

const ITEMS = [
  { key: 'humidity', icon: '\u{1F4A7}', field: 'humidity', unit: '%' },
  { key: 'temperature', icon: '\u{1F321}\uFE0F', field: 'temperature', unit: '\u00B0C' },
  { key: 'wind_speed', icon: '\u{1F32A}\uFE0F', field: 'wind_speed', unit: 'km/h' },
  { key: 'cloud_cover', icon: '\u2601\uFE0F', field: 'cloud_cover', unit: '%' },
  { key: 'pressure', icon: '\u{1F4CA}', field: 'pressure', unit: 'hPa' },
]

export default function WeatherInsights({ data, loading, ml = false }) {
  const { t } = useTranslation()

  if (loading) {
    return (
      <article className="dash-card card">
        <div className="skeleton skeleton-title" />
        <div className="skeleton" style={{ height: 120 }} />
      </article>
    )
  }

  return (
    <article className={`dash-card card fade-in ${ml ? 'ml-output-card' : ''}`}>
      <header className="dash-card-header">
        <span className="dash-card-icon">{'\u{1F324}\uFE0F'}</span>
        <div className="dash-card-title-wrap">
          <h3>{t('weather.title')}</h3>
          {ml && <MlCardBadge />}
        </div>
      </header>
      <section className="weather-grid">
        {ITEMS.map((item) => (
          <article key={item.key} className="weather-item">
            <span className="weather-item-icon" aria-hidden="true">{item.icon}</span>
            <p className="weather-item-value">
              <span className="weather-item-number">{data?.[item.field] ?? '\u2014'}</span>
              <span className="weather-item-unit">{item.unit}</span>
            </p>
            <p className="weather-item-label">{t(`weather.${item.key}`)}</p>
          </article>
        ))}
      </section>
    </article>
  )
}
