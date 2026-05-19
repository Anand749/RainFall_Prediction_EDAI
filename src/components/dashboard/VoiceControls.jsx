import { useTranslation } from 'react-i18next'
import './DashboardCards.css'

export default function VoiceControls({ isSpeaking, onSpeak, onStop, onReplay }) {
  const { t } = useTranslation()

  return (
    <section className="voice-controls" aria-label="Voice controls">
      {!isSpeaking ? (
        <button type="button" className="btn btn-primary btn-sm" onClick={onSpeak}>
          {'\u{1F50A}'} {t('dashboard.speak_all')}
        </button>
      ) : (
        <button type="button" className="btn btn-danger btn-sm" onClick={onStop}>
          {'\u23F9'} {t('dashboard.stop_speaking')}
        </button>
      )}
      <button type="button" className="btn btn-outline btn-sm" onClick={onReplay}>
        {'\u{1F501}'} {t('dashboard.replay')}
      </button>
    </section>
  )
}
