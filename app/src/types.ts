export type Country = 'colombia' | 'australia'
export type SourceType = 'official' | 'retail' | 'media' | 'estimate' | 'user_provided'
export type Confidence = 'high' | 'medium' | 'low'
export type WagePeriod = 'monthly' | 'weekly' | 'hourly'

export interface CountryProfile {
  id: Country
  name: string
  flag: string
  productName: string
  productEmoji: string
  currency: string
  currencySymbol: string
  wagePeriod: WagePeriod
  wagePeriodLabel: string
  accentColor: string
  secondaryColor: string
}

export interface YearSnapshot {
  year: number
  minWage: number
  productPrice: number
  productsPurchasable: number
  cpiBase2016: number
  needsVerification: string[]
}

export interface IndexCalculations {
  nominalWageGrowthPct: number
  productPriceGrowthPct: number
  purchasingPowerChangePct: number
  accumulatedInflationPct: number
  realWageChangePct: number
}

export interface CountryIndex {
  profile: CountryProfile
  snapshots: Record<number, YearSnapshot>
  calculations: IndexCalculations
}

export interface IndexData {
  metadata: {
    generatedAt: string
    version: string
    baseYear: number
    currentYear: number
  }
  countries: Record<Country, CountryIndex>
}

export interface DataSource {
  id: string
  country: Country | 'global'
  name: string
  url: string
  type: SourceType
  confidence: Confidence
  variables: string[]
  notes: string
  accessedAt: string
}
