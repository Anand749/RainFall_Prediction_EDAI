import { useTranslation } from 'react-i18next'
import './DashboardCards.css'

export default function CropRecommendations({ crops, loading, inPanel = false }) {
  const { t } = useTranslation()

  const grid = loading ? (
    <>
      <div className="skeleton skeleton-title" />
      <div className="crops-grid">
        {[1, 2, 3].map((i) => (
          <div key={i} className="skeleton card" style={{ height: 180 }} />
        ))}
      </div>
    </>
  ) : (
    <div className="crops-grid">
      {crops?.map((crop) => (
        <article
          key={crop.id}
          className="dash-card card crop-card fade-in"
          style={{ '--crop-color': crop.color }}
        >
          <header className="crop-header">
            <span className="crop-icon">{crop.icon}</span>
            <h4>{t(crop.nameKey)}</h4>
            <span className={`crop-suitability ${crop.suitability}`}>{crop.suitability}</span>
          </header>
          <p className="crop-detail">{crop.advice}</p>
          <p className="crop-detail"><strong>{t('crops.irrigation')}:</strong> {crop.irrigation}</p>
          <p className="crop-detail"><strong>{t('crops.fertilizer')}:</strong> {crop.fertilizer}</p>
          <p className="crop-detail"><strong>{t('crops.harvesting')}:</strong> {crop.harvesting}</p>
          <p className="crop-detail"><strong>{t('crops.protection')}:</strong> {crop.protection}</p>
        </article>
      ))}
    </div>
  )

  if (inPanel) {
    return (
      <>
        <header className="panel-header">
          <h2 className="panel-title">{t('crops.title')}</h2>
        </header>
        <div className="panel-body">{grid}</div>
      </>
    )
  }

  return (
    <section id="section-crops">
      <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '1rem' }}>{t('crops.title')}</h2>
      {grid}
    </section>
  )
}
