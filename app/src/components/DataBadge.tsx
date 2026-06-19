import type { Confidence, SourceType } from '../types'
import { useLanguage } from '../i18n/LanguageContext'

interface DataBadgeProps {
  confidence: Confidence
  sourceType: SourceType
  needsVerification?: boolean
  className?: string
}

const confidenceClass: Record<Confidence, string> = {
  high: 'bg-green-100 text-green-800', medium: 'bg-yellow-100 text-yellow-800', low: 'bg-orange-100 text-orange-800',
}

export default function DataBadge({
  confidence,
  needsVerification,
  className = '',
}: DataBadgeProps) {
  const { t } = useLanguage()
  if (needsVerification) {
    return (
      <span
        className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-red-100 text-red-700 ${className}`}
        title={t.badge.tooltip}
      >
        ⚠️ {t.badge.pending}
      </span>
    )
  }

  const labels = { high: t.badge.official, medium: t.badge.approximate, low: t.badge.estimate }
  return (
    <span
      className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${confidenceClass[confidence]} ${className}`}
    >
      {confidence === 'high' ? '✅' : '~'} {labels[confidence]}
    </span>
  )
}
