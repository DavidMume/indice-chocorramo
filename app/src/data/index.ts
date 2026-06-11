import type { IndexData } from '../types'

/**
 * Datos procesados del Índice Chocorramo.
 * Generado por scripts/build_index.py — no editar manualmente.
 * Datos con needs_verification contienen estimaciones pendientes de confirmar.
 */
export const indexData: IndexData = {
  metadata: {
    generatedAt: '2026-06-11',
    version: '0.1.0',
    baseYear: 2016,
    currentYear: 2026,
  },
  countries: {
    colombia: {
      profile: {
        id: 'colombia',
        name: 'Colombia',
        flag: '🇨🇴',
        productName: 'Chocorramo',
        productEmoji: '🍫',
        currency: 'COP',
        currencySymbol: '$',
        wagePeriod: 'monthly',
        wagePeriodLabel: 'mes',
        accentColor: '#FCD116',
        secondaryColor: '#003893',
      },
      snapshots: {
        2016: {
          year: 2016,
          minWage: 689455,
          productPrice: 1100,
          productsPurchasable: 626.78,
          cpiBase2016: 100.0,
          needsVerification: ['productPrice'],
        },
        2026: {
          year: 2026,
          minWage: 1750905,
          productPrice: 3200,
          productsPurchasable: 547.16,
          cpiBase2016: 172.0,
          needsVerification: ['productPrice', 'cpiBase2016'],
        },
      },
      calculations: {
        nominalWageGrowthPct: 153.93,
        productPriceGrowthPct: 190.91,
        purchasingPowerChangePct: -12.70,
        accumulatedInflationPct: 72.0,
        realWageChangePct: 47.65,
      },
    },
    australia: {
      profile: {
        id: 'australia',
        name: 'Australia',
        flag: '🇦🇺',
        productName: 'Meat Pie',
        productEmoji: '🥧',
        currency: 'AUD',
        currencySymbol: 'A$',
        wagePeriod: 'weekly',
        wagePeriodLabel: 'semana',
        accentColor: '#00008B',
        secondaryColor: '#FF0000',
      },
      snapshots: {
        2016: {
          year: 2016,
          minWage: 672.70,
          productPrice: 4.80,
          productsPurchasable: 140.15,
          cpiBase2016: 100.0,
          needsVerification: ['productPrice'],
        },
        2026: {
          year: 2026,
          minWage: 915.90,
          productPrice: 6.80,
          productsPurchasable: 134.69,
          cpiBase2016: 132.0,
          needsVerification: ['minWage', 'productPrice', 'cpiBase2016'],
        },
      },
      calculations: {
        nominalWageGrowthPct: 36.16,
        productPriceGrowthPct: 41.67,
        purchasingPowerChangePct: -3.89,
        accumulatedInflationPct: 32.0,
        realWageChangePct: 3.15,
      },
    },
  },
}

export const BASE_YEAR = indexData.metadata.baseYear
export const CURRENT_YEAR = indexData.metadata.currentYear
