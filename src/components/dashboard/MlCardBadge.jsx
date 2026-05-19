import { useTranslation } from 'react-i18next'

export default function MlCardBadge() {
  const { t } = useTranslation()
  return <span className="ml-badge">{t('dashboard.ml_model')}</span>
}
