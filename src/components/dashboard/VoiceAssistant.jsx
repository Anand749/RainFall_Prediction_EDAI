import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { voiceResponses } from '../../data/mockData'
import { useSpeech } from '../../hooks/useSpeech'
import './DashboardCards.css'

function getBotResponse(text) {
  const lower = text.toLowerCase()
  if (lower.includes('rainfall') || lower.includes('rain')) return voiceResponses.rainfall
  if (lower.includes('risk')) return voiceResponses.risk
  if (lower.includes('cotton')) return voiceResponses.cotton
  if (lower.includes('precaution') || lower.includes('safety')) return voiceResponses.precautions
  if (lower.includes('monsoon')) return voiceResponses.monsoon
  if (lower.includes('history') || lower.includes('year')) return voiceResponses.history
  if (lower.includes('crop')) return voiceResponses.crops
  return voiceResponses.default
}

export default function VoiceAssistant({ langCode, embedded = false }) {
  const { t, i18n } = useTranslation()
  const { speak } = useSpeech()
  const [messages, setMessages] = useState([
    { role: 'bot', text: t('voice.ask_question') },
  ])
  const [input, setInput] = useState('')
  const [thinking, setThinking] = useState(false)
  const [listening, setListening] = useState(false)
  const bottomRef = useRef(null)
  const recognitionRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, thinking])

  useEffect(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SR) return
    const rec = new SR()
    rec.continuous = false
    rec.interimResults = false
    rec.lang = i18n.language === 'en' ? 'en-IN' : `${i18n.language}-IN`
    rec.onresult = (e) => {
      const text = e.results[0][0].transcript
      handleSend(text)
      setListening(false)
    }
    rec.onend = () => setListening(false)
    rec.onerror = () => setListening(false)
    recognitionRef.current = rec
  }, [i18n.language])

  const handleSend = (text) => {
    const msg = (text || input).trim()
    if (!msg) return
    setInput('')
    setMessages((prev) => [...prev, { role: 'user', text: msg }])
    setThinking(true)
    setTimeout(() => {
      const reply = getBotResponse(msg)
      setMessages((prev) => [...prev, { role: 'bot', text: reply }])
      setThinking(false)
      speak(reply, i18n.language)
    }, 800)
  }

  const toggleMic = () => {
    if (!recognitionRef.current) return
    if (listening) {
      recognitionRef.current.stop()
      setListening(false)
    } else {
      try {
        recognitionRef.current.start()
        setListening(true)
      } catch {
        /* already started */
      }
    }
  }

  const samples = [
    'How much rainfall is expected?',
    'What is the risk level?',
    'Is cotton crop safe?',
    'What precautions should I take?',
    'Show last 5 years rainfall data.',
  ]

  return (
    <article className={`voice-panel fade-in ${embedded ? 'voice-panel-embedded' : 'dash-card card'}`} id={embedded ? undefined : 'section-voice'}>
      {!embedded && (
        <header className="dash-card-header">
          <span className="dash-card-icon">{'\u{1F3A4}'}</span>
          <h3>{t('voice.title')}</h3>
        </header>
      )}
      <p className="crop-detail" style={{ marginBottom: '0.5rem' }}>{t('voice.sample_queries')}</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '0.75rem' }}>
        {samples.map((q) => (
          <button key={q} type="button" className="btn btn-sm btn-outline" onClick={() => handleSend(q)}>
            {q}
          </button>
        ))}
      </div>
      <section className="voice-messages">
        {messages.map((m, i) => (
          <p key={i} className={`voice-msg ${m.role}`}>{m.text}</p>
        ))}
        {thinking && <p className="voice-msg bot">{t('voice.thinking')}</p>}
        <span ref={bottomRef} />
      </section>
      <form
        className="voice-input-row"
        onSubmit={(e) => { e.preventDefault(); handleSend() }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t('voice.type_message')}
          aria-label={t('voice.type_message')}
        />
        <button
          type="button"
          className={`mic-btn ${listening ? 'listening' : ''}`}
          onClick={toggleMic}
          aria-label={listening ? t('voice.mic_on') : t('voice.mic_off')}
        >
          {'\u{1F3A4}'}
        </button>
        <button type="submit" className="btn btn-primary btn-sm">{t('common.search')}</button>
      </form>
    </article>
  )
}
