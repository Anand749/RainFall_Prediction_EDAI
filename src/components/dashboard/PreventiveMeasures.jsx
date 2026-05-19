import { useTranslation } from 'react-i18next'
import { helplineNumbers } from '../../data/mockData'
import './DashboardCards.css'
import './PreventiveMeasures.css'

export default function PreventiveMeasures({ inPanel = false }) {
  const { t } = useTranslation()

  const inner = (
    <>
      <p className="preventive-sub">{t('landing.emergency_desc')}</p>

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

      <div className="preventive-grid">
        <article className="dash-card card">
          <header className="dash-card-header">
            <span className="dash-card-icon">{'\u{1F3DB}\uFE0F'}</span>
            <h3>{t('alerts.disaster_mgmt')}</h3>
          </header>
          <p className="crop-detail">
            {t('alerts.evacuation')}: Contact your district disaster management office immediately if water levels rise.
          </p>
        </article>

        <article className="dash-card card">
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
      </div>
    </>
  )

  if (inPanel) {
    return (
      <>
        <header className="panel-header">
          <h2 className="panel-title">{t('alerts.title')}</h2>
        </header>
        <div className="panel-body preventive-panel-body">{inner}</div>
      </>
    )
  }

  return (
    <section id="section-preventive" className="preventive-section">
      <h2 className="preventive-heading">{t('alerts.title')}</h2>
      {inner}
    </section>
  )
}
