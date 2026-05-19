import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Navbar from '../components/layout/Navbar'
import LanguageSelector from '../components/common/LanguageSelector'
import { LANGUAGES } from '../config/config'
import { predictionData, riskData, cropRecommendations } from '../data/mockData'
import './LandingPage.css'

const FEATURE_KEYS = [
  'prediction', 'monsoon', 'risk', 'multilingual', 'voice', 'map', 'alerts', 'crops',
]
const FEATURE_ICONS = ['🌧️', '🌊', '⚠️', '🌐', '🎤', '🗺️', '🚨', '🌾']
const STEP_KEYS = ['step1', 'step2', 'step3', 'step4']

export default function LandingPage() {
  const { t } = useTranslation()

  return (
    <div className="landing">
      <Navbar />
      <section className="hero section">
        <div className="hero-bg" aria-hidden="true">
          <span className="cloud cloud-1" />
          <span className="cloud cloud-2" />
          <span className="cloud cloud-3" />
          {[...Array(12)].map((_, i) => (
            <span key={i} className="rain" style={{ left: `${i * 8 + 5}%`, animationDelay: `${i * 0.2}s` }} />
          ))}
        </div>
        <div className="container hero-content fade-in">
          <h1>{t('landing.hero_title')}</h1>
          <p className="hero-sub">{t('landing.hero_subtitle')}</p>
          <div className="hero-cta">
            <Link to="/login" className="btn btn-primary">{t('landing.hero_cta')}</Link>
            <Link to="/dashboard" className="btn btn-outline">{t('landing.hero_cta2')}</Link>
          </div>
        </div>
      </section>

      <section className="section about-section">
        <div className="container">
          <h2 className="section-title">{t('landing.about_title')}</h2>
          <p className="section-subtitle">{t('landing.about_desc')}</p>
        </div>
      </section>

      <section className="section features-section">
        <div className="container">
          <h2 className="section-title">{t('landing.features_title')}</h2>
          <div className="grid-4">
            {FEATURE_KEYS.map((key, i) => (
              <article key={key} className="feature-card card fade-in">
                <span className="feature-icon">{FEATURE_ICONS[i]}</span>
                <h3>{t(`landing.features.${key}`)}</h3>
                <p>{t(`landing.features.${key}_desc`)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section preview-section">
        <div className="container">
          <h2 className="section-title">{t('landing.features.prediction')} Preview</h2>
          <div className="preview-card glass-card">
            <div className="preview-stat">
              <span className="preview-value">{predictionData.rainfall_mm}</span>
              <span className="preview-label">{t('prediction.predicted_rainfall')} (mm)</span>
            </div>
            <div className="preview-stat">
              <span className="preview-value">{predictionData.probability}%</span>
              <span className="preview-label">{t('prediction.probability')}</span>
            </div>
            <div className="preview-stat">
              <span className={`preview-badge risk-${riskData.level}`}>{t(`risk.${riskData.level}`)}</span>
              <span className="preview-label">{t('risk.title')}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section how-section">
        <div className="container">
          <h2 className="section-title">{t('landing.how_title')}</h2>
          <div className="grid-4">
            {STEP_KEYS.map((step, i) => (
              <article key={step} className="step-card card">
                <span className="step-num">{i + 1}</span>
                <h3>{t(`landing.how_steps.${step}`)}</h3>
                <p>{t(`landing.how_steps.${step}_desc`)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section lang-section">
        <div className="container">
          <h2 className="section-title">{t('landing.lang_title')}</h2>
          <p className="section-subtitle">{t('landing.lang_desc')}</p>
          <div className="lang-chips">
            {LANGUAGES.map((l) => (
              <span key={l.code} className="lang-chip">{l.nativeName}</span>
            ))}
          </div>
          <LanguageSelector />
        </div>
      </section>

      <section className="section voice-section">
        <div className="container voice-demo glass-card">
          <h2 className="section-title">{t('landing.voice_title')}</h2>
          <p className="section-subtitle">{t('landing.voice_desc')}</p>
          <p className="voice-sample">{'\u{1F3A4}'} &quot;How much rainfall is expected?&quot;</p>
        </div>
      </section>

      <section className="section emergency-preview">
        <div className="container">
          <h2 className="section-title">{t('landing.emergency_title')}</h2>
          <p className="section-subtitle">{t('landing.emergency_desc')}</p>
          <div className="emergency-banner" style={{ maxWidth: 700, margin: '0 auto' }}>
            <span className="emergency-banner-icon">{'\u{1F6A8}'}</span>
            <p className="emergency-banner-text">{t('alerts.banner')}</p>
          </div>
        </div>
      </section>

      <section className="section crop-preview">
        <div className="container">
          <h2 className="section-title">{t('landing.crop_title')}</h2>
          <p className="section-subtitle">{t('landing.crop_desc')}</p>
          <div className="grid-3">
            {cropRecommendations.slice(0, 3).map((c) => (
              <article key={c.id} className="card crop-preview-card">
                <span style={{ fontSize: '2rem' }}>{c.icon}</span>
                <h4>{c.name}</h4>
                <span className={`crop-suitability ${c.suitability}`}>{c.suitability}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer className="landing-footer">
        <div className="container">
          <p><strong>{t('landing.footer_text')}</strong></p>
          <p>{t('landing.footer_desc')}</p>
          <p className="footer-copy">{t('landing.footer_copyright')}</p>
          <p>Contact: support@smartfarmer.in | EDAI Sem 6 Project</p>
        </div>
      </footer>
    </div>
  )
}
