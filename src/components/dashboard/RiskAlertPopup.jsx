import { useTranslation } from 'react-i18next'
import './DashboardCards.css'

export default function RiskAlertPopup({ show, onClose }) {
  const { t } = useTranslation()
  if (!show) return null

  return (
    <div className="alert-popup-overlay" role="dialog" aria-modal="true">
      <article className="alert-popup">
        <h3>{'\u{1F6A8}'} {t('risk.red_alert')}</h3>
        <p>{t('risk.title')}: {t('risk.high')}</p>
        <p style={{ margin: '1rem 0', fontSize: '0.95rem' }}>{t('alerts.banner')}</p>
        <button type="button" className="btn btn-primary" onClick={onClose}>
          {t('common.ok')}
        </button>
      </article>
    </div>
  )
}
