import { useTranslation } from 'react-i18next'
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend,
} from 'recharts'
import './DashboardCards.css'

export default function HistoricalCharts({ data, loading }) {
  const { t } = useTranslation()

  if (loading) {
    return (
      <article className="dash-card card">
        <div className="skeleton skeleton-title" />
        <div className="skeleton chart-wrap" />
      </article>
    )
  }

  const stats = [
    { label: t('history.last_year'), value: data?.lastYear },
    { label: t('history.two_years'), value: data?.twoYearsAgo },
    { label: t('history.three_year_avg'), value: data?.threeYearAvg },
    { label: t('history.five_year_avg'), value: data?.fiveYearAvg },
  ]

  return (
    <article className="dash-card card fade-in panel-inner-card">
      <header className="dash-card-header">
        <span className="dash-card-icon">{'\u{1F4C8}'}</span>
        <h3>{t('history.title')}</h3>
      </header>
      <section className="history-stats">
        {stats.map((s) => (
          <div key={s.label} className="history-stat">
            <p className="history-stat-value">{s.value} mm</p>
            <p className="history-stat-label">{s.label}</p>
          </div>
        ))}
      </section>
      <h4 style={{ marginBottom: '0.5rem', fontSize: '0.95rem' }}>{t('history.trend')}</h4>
      <ResponsiveContainer width="100%" height={220} className="chart-wrap">
        <LineChart data={data?.yearly || []}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="year" stroke="var(--text-secondary)" />
          <YAxis stroke="var(--text-secondary)" />
          <Tooltip contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }} />
          <Legend />
          <Line type="monotone" dataKey="rainfall" stroke="var(--primary)" strokeWidth={3} dot={{ r: 5 }} name="mm" />
        </LineChart>
      </ResponsiveContainer>
      <h4 style={{ margin: '1rem 0 0.5rem', fontSize: '0.95rem' }}>{t('history.monthly_data')}</h4>
      <ResponsiveContainer width="100%" height={200} className="chart-wrap">
        <BarChart data={data?.monthly || []}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="month" stroke="var(--text-secondary)" />
          <YAxis stroke="var(--text-secondary)" />
          <Tooltip contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }} />
          <Bar dataKey="rainfall" fill="var(--secondary)" radius={[4, 4, 0, 0]} name="mm" />
        </BarChart>
      </ResponsiveContainer>
    </article>
  )
}
