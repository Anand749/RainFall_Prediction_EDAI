import { useState, useEffect, useCallback, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import Navbar from '../components/layout/Navbar'
import Sidebar from '../components/layout/Sidebar'
import MobileNav from '../components/layout/MobileNav'
import LanguageSelector from '../components/common/LanguageSelector'
import LoadingSpinner from '../components/common/LoadingSpinner'
import PredictionCard from '../components/dashboard/PredictionCard'
import MonsoonCard from '../components/dashboard/MonsoonCard'
import RiskCard from '../components/dashboard/RiskCard'
import HistoricalCharts from '../components/dashboard/HistoricalCharts'
import WeatherInsights from '../components/dashboard/WeatherInsights'
import AlertWidget from '../components/dashboard/AlertWidget'
import PreventiveMeasures from '../components/dashboard/PreventiveMeasures'
import CropRecommendations from '../components/dashboard/CropRecommendations'
import VoiceAssistant from '../components/dashboard/VoiceAssistant'
import VoiceControls from '../components/dashboard/VoiceControls'
import RiskAlertPopup from '../components/dashboard/RiskAlertPopup'
import RainfallMap from '../components/map/RainfallMap'
import { useGeolocation } from '../hooks/useGeolocation'
import { useSpeech } from '../hooks/useSpeech'
import { useVoiceCommands } from '../hooks/useVoiceCommands'
import {
  fetchPrediction, fetchMonsoonData, fetchRiskLevel,
  fetchHistoricalData, fetchWeatherData, fetchCropRecommendations, fetchAlerts,
} from '../api/services'
import './DashboardPage.css'

const SECTION_IDS = {
  overview: 'section-overview',
  map: 'section-map',
  alerts: 'section-alerts',
  crops: 'section-crops',
  history: 'section-history',
  voice: 'section-voice',
}

export default function DashboardPage() {
  const { t, i18n } = useTranslation()
  const { location, error: geoError, loading: geoLoading } = useGeolocation()
  const { speak, stop, replay, isSpeaking } = useSpeech()
  const [activeSection, setActiveSection] = useState('overview')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [prediction, setPrediction] = useState(null)
  const [monsoon, setMonsoon] = useState(null)
  const [risk, setRisk] = useState(null)
  const [history, setHistory] = useState(null)
  const [weather, setWeather] = useState(null)
  const [crops, setCrops] = useState(null)
  const [alerts, setAlerts] = useState(null)
  const [showRiskPopup, setShowRiskPopup] = useState(false)
  const announcedRef = useRef(false)

  const scrollToSection = useCallback((section) => {
    setActiveSection(section)
    const id = SECTION_IDS[section]
    if (id) {
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
    }
  }, [])

  const handleSpeakRef = useRef(() => {})

  const { isListening, startListening } = useVoiceCommands((text) => {
    const cmd = text.toLowerCase()
    if (cmd.includes('rainfall') || cmd.includes('show rainfall')) scrollToSection('overview')
    else if (cmd.includes('map') || cmd.includes('open map')) scrollToSection('map')
    else if (cmd.includes('speak') || cmd.includes('prediction')) handleSpeakRef.current()
    else if (cmd.includes('alert')) scrollToSection('alerts')
    else if (cmd.includes('crop')) scrollToSection('crops')
    else if (cmd.includes('history')) scrollToSection('history')
    else if (cmd.includes('marathi')) { i18n.changeLanguage('mr'); localStorage.setItem('language', 'mr') }
    else if (cmd.includes('hindi')) { i18n.changeLanguage('hi'); localStorage.setItem('language', 'hi') }
    else if (cmd.includes('english')) { i18n.changeLanguage('en'); localStorage.setItem('language', 'en') }
    else if (cmd.includes('bengali')) { i18n.changeLanguage('bn'); localStorage.setItem('language', 'bn') }
    else if (cmd.includes('assamese')) { i18n.changeLanguage('as'); localStorage.setItem('language', 'as') }
    else if (cmd.includes('bhojpuri')) { i18n.changeLanguage('bho'); localStorage.setItem('language', 'bho') }
  })

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      const lat = location?.lat
      const lng = location?.lng
      try {
        const [pred, mon, rsk, hist, wth, crp, alt] = await Promise.all([
          fetchPrediction(lat, lng),
          fetchMonsoonData(),
          fetchRiskLevel(lat, lng),
          fetchHistoricalData(lat, lng),
          fetchWeatherData(lat, lng),
          fetchCropRecommendations(),
          fetchAlerts(lat, lng),
        ])
        setPrediction(pred)
        setMonsoon(mon)
        setRisk(rsk)
        setHistory(hist)
        setWeather(wth)
        setCrops(crp)
        setAlerts(alt)
        if (rsk?.level === 'high' || rsk?.level === 'red_alert') {
          setShowRiskPopup(true)
          if ('Notification' in window && Notification.permission === 'granted') {
            new Notification(t('risk.red_alert'), { body: t('alerts.banner') })
          }
        }
      } finally {
        setLoading(false)
      }
    }
    if (!geoLoading) load()
  }, [location, geoLoading, t])

  const handleSpeak = useCallback(() => {
    if (!prediction || !risk || !monsoon) return
    const riskLabel = t(`risk.${risk.level === 'red_alert' ? 'red_alert' : risk.level}`)
    const monsoonLabel = t(`monsoon.${monsoon.intensity}`)
    const text = t('speech.prediction_announcement', {
      rainfall: prediction.rainfall_mm,
      probability: prediction.probability,
      risk: riskLabel,
      monsoon: monsoonLabel,
    })
    speak(text, i18n.language)
  }, [prediction, risk, monsoon, t, speak, i18n.language])

  handleSpeakRef.current = handleSpeak

  useEffect(() => {
    if (!loading && prediction && !announcedRef.current) {
      announcedRef.current = true
      setTimeout(handleSpeak, 1500)
    }
  }, [loading, prediction, handleSpeak])

  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission()
    }
  }, [])

  if (geoLoading && loading) {
    return (
      <div className="dashboard-loading">
        <LoadingSpinner size="lg" text={t('dashboard.fetching_location')} />
      </div>
    )
  }

  return (
    <div className="dashboard-layout">
      <Navbar onMenuToggle={() => setSidebarOpen(true)} />
      <Sidebar
        activeSection={activeSection}
        onNavigate={scrollToSection}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <main className="dashboard-main">
        <header className="dashboard-header fade-in">
          <div>
            <h1>{t('dashboard.title')}</h1>
            <p>{t('dashboard.welcome')}</p>
          </div>
          <LanguageSelector />
        </header>

        <section className="location-bar glass-card fade-in">
          <span>{'\u{1F4CD}'} <strong>{t('dashboard.location')}</strong></span>
          {geoLoading ? (
            <span>{t('dashboard.fetching_location')}</span>
          ) : location ? (
            <>
              <span>{t('dashboard.latitude')}: {location.lat.toFixed(6)}</span>
              <span>{t('dashboard.longitude')}: {location.lng.toFixed(6)}</span>
            </>
          ) : null}
          {geoError && <span className="geo-error">{t('dashboard.location_denied')}</span>}
          <button
            type="button"
            className={`btn btn-sm ${isListening ? 'btn-danger' : 'btn-outline'}`}
            onClick={startListening}
            title="Voice commands"
          >
            {'\u{1F3A4}'} Voice
          </button>
        </section>

        {/* Main focus: Map + primary ML rainfall prediction */}
        <section className="dashboard-hero" id="section-overview">
          <div className="hero-map-col">
            <RainfallMap location={location} loading={geoLoading} variant="hero" />
          </div>
          <div className="hero-prediction-col">
            <AlertWidget alerts={alerts} />
            <PredictionCard data={prediction} loading={loading} hero />
            <VoiceControls
              isSpeaking={isSpeaking}
              onSpeak={handleSpeak}
              onStop={stop}
              onReplay={replay}
            />
          </div>
        </section>

        {/* ML classification outputs — directly above historical data */}
        <section className="dashboard-panel dashboard-ml-panel">
          <header className="panel-header">
            <h2 className="panel-title">{t('dashboard.ml_classification')}</h2>
            <span className="ml-badge ml-badge-lg">{t('dashboard.ml_model')}</span>
          </header>
          <div className="ml-classification-grid">
            <MonsoonCard data={monsoon} loading={loading} ml />
            <RiskCard data={risk} loading={loading} ml />
            <WeatherInsights data={weather} loading={loading} ml />
          </div>
        </section>

        {/* Historical rainfall */}
        <section className="dashboard-panel dashboard-history-panel" id="section-history">
          <HistoricalCharts data={history} loading={loading} />
        </section>

        {/* Below historical: voice, crops, preventive — each in its own panel box */}
        <div className="dashboard-lower">
          <section className="dashboard-panel" id="section-voice">
            <header className="panel-header">
              <h2 className="panel-title">{t('voice.title')}</h2>
            </header>
            <VoiceAssistant langCode={i18n.language} embedded />
          </section>

          <section className="dashboard-panel" id="section-crops">
            <CropRecommendations crops={crops} loading={loading} inPanel />
          </section>

          <section className="dashboard-panel dashboard-preventive-panel">
            <PreventiveMeasures inPanel />
          </section>
        </div>
      </main>
      <MobileNav activeSection={activeSection} onNavigate={scrollToSection} />
      <RiskAlertPopup show={showRiskPopup} onClose={() => setShowRiskPopup(false)} />
    </div>
  )
}
