import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet'
import L from 'leaflet'
import { useTranslation } from 'react-i18next'
import { MAP_CONFIG } from '../../config/config'
import { riskZones } from '../../data/mockData'
import '../dashboard/DashboardCards.css'

const userIcon = L.divIcon({
  className: 'user-marker-icon',
  html: '<span style="font-size:28px;line-height:1">📍</span>',
  iconSize: [28, 28],
  iconAnchor: [14, 28],
})

const RISK_COLORS = {
  high: '#ef4444',
  medium: '#f59e0b',
  low: '#22c55e',
  flood: '#7c3aed',
}

export default function RainfallMap({ location, loading, variant = 'default' }) {
  const { t } = useTranslation()
  const center = location
    ? [location.lat, location.lng]
    : MAP_CONFIG.defaultCenter
  const zoom = location ? MAP_CONFIG.userZoom : MAP_CONFIG.defaultZoom

  useEffect(() => {
    setTimeout(() => window.dispatchEvent(new Event('resize')), 300)
  }, [location])

  if (loading) {
    return <div className="skeleton map-container" />
  }

  return (
    <section
      id="section-map"
      className={`dash-card card map-card ${variant === 'hero' ? 'map-card-hero' : ''}`}
    >
      <header className="dash-card-header">
        <span className="dash-card-icon">🗺️</span>
        <h3>{t('map.title')}</h3>
      </header>
      <MapContainer
        center={center}
        zoom={zoom}
        className={`map-container ${variant === 'hero' ? 'map-container-hero' : ''}`}
        scrollWheelZoom
      >
        <TileLayer url={MAP_CONFIG.tileUrl} attribution={MAP_CONFIG.attribution} />
        {location && (
          <Marker position={[location.lat, location.lng]} icon={userIcon}>
            <Popup>
              <strong>{t('map.your_location')}</strong>
              <br />
              {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
            </Popup>
          </Marker>
        )}
        {riskZones.map((zone, i) => (
          <Circle
            key={i}
            center={[zone.lat, zone.lng]}
            radius={zone.radius}
            pathOptions={{
              color: RISK_COLORS[zone.risk] || '#3b82f6',
              fillColor: RISK_COLORS[zone.risk] || '#3b82f6',
              fillOpacity: 0.35,
              weight: 2,
            }}
          >
            <Popup>
              <strong>{zone.name}</strong>
              <br />
              {t(`map.${zone.risk === 'flood' ? 'flood_prone' : zone.risk === 'high' ? 'high_rainfall' : zone.risk === 'low' ? 'safe_zone' : 'moderate_zone'}`)}
            </Popup>
          </Circle>
        ))}
      </MapContainer>
      <p className="crop-detail" style={{ marginTop: '0.75rem' }}>
        <span style={{ color: RISK_COLORS.high }}>●</span> {t('map.high_rainfall')}{' '}
        <span style={{ color: RISK_COLORS.flood }}>●</span> {t('map.flood_prone')}{' '}
        <span style={{ color: RISK_COLORS.medium }}>●</span> {t('map.moderate_zone')}{' '}
        <span style={{ color: RISK_COLORS.low }}>●</span> {t('map.safe_zone')}
      </p>
    </section>
  )
}
