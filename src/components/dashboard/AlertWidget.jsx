import { useTranslation } from 'react-i18next'
import './AlertWidget.css'

export default function AlertWidget({ alerts, showBanner = true }) {
  const { t } = useTranslation()
  const active = alerts?.filter((a) => a.active) || []
  const critical = active.some((a) => a.severity === 'critical')

  if (!active.length && !critical) return null

  return (
    <aside id="section-alerts" className="alert-widget" aria-label={t('alerts.title')}>
      {showBanner && critical && (
        <div className="alert-widget-banner alert-blink" role="alert">
          <span aria-hidden="true">{'\u{1F6A8}'}</span>
          <p>{t('alerts.banner')}</p>
        </div>
      )}
      <ul className="alert-widget-list">
        {active.map((alert) => (
          <li key={alert.id} className={`alert-widget-item severity-${alert.severity}`}>
            <strong>{alert.title}</strong>
            <span>{alert.message}</span>
          </li>
        ))}
      </ul>
    </aside>
  )
}
