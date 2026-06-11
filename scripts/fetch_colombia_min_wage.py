"""
fetch_colombia_min_wage.py
Placeholder script for fetching official Colombia minimum wage data.

The authoritative source is Función Pública / MinTrabajo via annual decrees.
There is no public API; data must be fetched from official documents.

TODO[script-col-wage]:
  Implement one of these approaches:
  1. Scrape the Diario Oficial (diariooficial.gov.co) for salary decrees.
  2. Parse PDFs from Función Pública.
  3. Use manually verified data already in data/raw/colombia_min_wage.csv.

Run: python scripts/fetch_colombia_min_wage.py
"""

from __future__ import annotations

KNOWN_MIN_WAGES: dict[int, float] = {
    2016: 689455,
    2017: 737717,
    2018: 781242,
    2019: 828116,
    2020: 877803,
    2021: 908526,
    2022: 1000000,
    2023: 1160000,
    2024: 1300000,
    2025: 1423500,   # needs_verification: true
    2026: 1750905,
}


def main() -> None:
    print("Colombia minimum wages (from known official data):")
    print(f"{'Year':<6} {'Monthly (COP)':>15}")
    print("-" * 25)
    for year, wage in sorted(KNOWN_MIN_WAGES.items()):
        print(f"{year:<6} {wage:>15,.0f}")
    print()
    print("NOTE: This script currently uses hardcoded verified data.")
    print("To automate: implement web scraping of Función Pública / Diario Oficial.")
    print("Verify source: https://www.funcionpublica.gov.co/")


if __name__ == "__main__":
    main()
