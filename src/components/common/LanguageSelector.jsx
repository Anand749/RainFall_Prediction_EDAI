import { useTranslation } from 'react-i18next'
import { LANGUAGES } from '../../config/config'
import './LanguageSelector.css'

export default function LanguageSelector({ compact = false }) {
  const { i18n } = useTranslation()

  const handleChange = (e) => {
    const code = e.target.value
    i18n.changeLanguage(code)
    localStorage.setItem('language', code)
  }

  return (
    <div className={`lang-selector ${compact ? 'compact' : ''}`}>
      <span className="lang-icon" aria-hidden="true">🌐</span>
      <select
        value={i18n.language}
        onChange={handleChange}
        aria-label="Select language"
        className="lang-select"
      >
        {LANGUAGES.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {compact ? lang.code.toUpperCase() : `${lang.nativeName} (${lang.name})`}
          </option>
        ))}
      </select>
    </div>
  )
}
