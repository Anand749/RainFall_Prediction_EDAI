import './SkeletonCard.css'

export default function SkeletonCard({ height = 120 }) {
  return (
    <div className="skeleton-card card" style={{ minHeight: height }}>
      <div className="skeleton skeleton-title" />
      <div className="skeleton skeleton-line" />
      <div className="skeleton skeleton-line short" />
    </div>
  )
}
