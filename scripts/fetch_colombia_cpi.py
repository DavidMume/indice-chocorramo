"""
fetch_colombia_cpi.py
Downloads IPC (CPI) data from DANE for Colombia.

DANE provides the IPC series via:
  1. Manual download: https://www.dane.gov.co/index.php/estadisticas-por-tema/precios-y-costos/indice-de-precios-al-consumidor-ipc
  2. API DANE (experimental): https://www.dane.gov.co/index.php/servicios/api-dane

TODO[script-co-cpi]:
  - Implement automated download from DANE.
  - Parse the Excel/CSV with the IPC total nacional series.
  - Compute annual variation and cumulative index with base 2016=100.
  - Write to data/raw/colombia_cpi.csv following the project schema.

Currently outputs known/estimated values for reference.

Run: python scripts/fetch_colombia_cpi.py
"""

from __future__ import annotations

KNOWN_ANNUAL_INFLATION: dict[int, tuple[float, bool]] = {
    # year: (inflation_pct, needs_verification)
    2016: (5.75, False),
    2017: (4.09, False),
    2018: (3.18, False),
    2019: (3.80, False),
    2020: (1.61, False),
    2021: (5.62, False),
    2022: (13.12, False),
    2023: (9.28, False),
    2024: (5.20, True),    # estimate
    2025: (5.00, True),    # estimate
    2026: (5.30, True),    # estimate
}


def compute_cumulative_index(
    inflations: dict[int, tuple[float, bool]],
    base_year: int = 2016,
) -> dict[int, tuple[float, bool]]:
    """Computes cumulative CPI with base_year=100."""
    index: dict[int, tuple[float, bool]] = {}
    cumulative = 100.0
    needs_v = False

    for year in sorted(inflations.keys()):
        if year == base_year:
            index[year] = (100.0, False)
            continue
        rate, nv = inflations[year]
        if year > base_year:
            needs_v = needs_v or nv
            cumulative *= 1 + rate / 100
            index[year] = (round(cumulative, 2), needs_v)

    return index


def main() -> None:
    print("Colombia IPC (annual inflation + cumulative index, base 2016=100):")
    print(f"{'Year':<6} {'Inflation %':>12} {'CPI (2016=100)':>15} {'Verified':>10}")
    print("-" * 50)

    cumulative = compute_cumulative_index(KNOWN_ANNUAL_INFLATION)

    for year in sorted(KNOWN_ANNUAL_INFLATION.keys()):
        infl, nv = KNOWN_ANNUAL_INFLATION[year]
        cpi_val, cpi_nv = cumulative.get(year, (float("nan"), True))
        verified_str = "⚠️ estimate" if nv else "✅ official"
        print(f"{year:<6} {infl:>11.2f}% {cpi_val:>15.2f} {verified_str:>12}")

    print()
    print("TODO: implement automated download from DANE API or manual scraping.")
    print("Source: https://www.dane.gov.co/index.php/estadisticas-por-tema/precios-y-costos/indice-de-precios-al-consumidor-ipc")


if __name__ == "__main__":
    main()
