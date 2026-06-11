import type { Confidence, SourceType } from '../types'

interface DataBadgeProps {
  confidence: Confidence
  sourceType: SourceType
  needsVerification?: boolean
  className?: string
}

const confidenceConfig: Record<Confidence, { label: string; className: string }> = {
  high: { label: 'Dato oficial', className: 'bg-green-100 text-green-800' },
  medium: { label: 'Dato aproximado', className: 'bg-yellow-100 text-yellow-800' },
  low: { label: 'Estimación', className: 'bg-orange-100 text-orange-800' },
}

export default function DataBadge({
  confidence,
  needsVerification,
  className = '',
}: DataBadgeProps) {
  if (needsVerification) {
    return (
      <span
        className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-red-100 text-red-700 ${className}`}
        title="Este dato requiere verificación con fuentes primarias"
      >
        ⚠️ Pendiente de verificar
      </span>
    )
  }

  const config = confidenceConfig[confidence]
  return (
    <span
      className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${config.className} ${className}`}
    >
      {confidence === 'high' ? '✅' : '~'} {config.label}
    </span>
  )
}
