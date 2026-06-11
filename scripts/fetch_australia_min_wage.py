"""
fetch_australia_min_wage.py
Downloads or looks up Australia minimum wage from Fair Work Commission.

The Fair Work Commission publishes National Minimum Wage Orders at:
  https://www.fwc.gov.au/agreements-awards/pay-and-conditions/minimum-wages/minimum-wage-orders

Each order is effective from 1 July each year.

TODO[script-au-wage]:
  - Implement automated fetch from Fair Work Commission website.
  - Parse the current NMW Order page for the latest rate.
  - Write verified data to data/raw/australia_min_wage.csv.
  - Handle fiscal year vs calendar year alignment.

Run: python scripts/fetch_australia_min_wage.py
"""

from __future__ import annotations

KNOWN_WEEKLY_WAGES: dict[int, tuple[float, float, bool]] = {
    # fiscal_year_start: (weekly_AUD, hourly_AUD, needs_verification)
    # Note: FY2016 means "effective from 1 July 2016" = used in calendar 2016H2 and 2017H1
    2016: (672.70, 17.70, False),
    2017: (694.90, 18.29, False),
    2018: (719.20, 18.93, False),
    2019: (740.80, 19.49, False),
    2020: (753.80, 19.84, False),
    2021: (772.60, 20.33, False),
    2022: (812.60, 21.38, False),
    2023: (882.80, 23.23, False),
    2024: (915.90, 24.10, False),
    2025: (949.50, 24.99, True),   # estimate — verify with FWC Annual Wage Review 2025
}


def main() -> None:
    print("Australia National Minimum Wage (Fair Work Commission):")
    print(f"{'FY Start':<10} {'Weekly (AUD)':>13} {'Hourly (AUD)':>13} {'Status':>12}")
    print("-" * 55)

    for year, (weekly, hourly, nv) in sorted(KNOWN_WEEKLY_WAGES.items()):
        status = "⚠️ estimate" if nv else "✅ official"
        print(f"{year:<10} {weekly:>13.2f} {hourly:>13.2f} {status:>13}")

    print()
    print("Note: 'FY Start' = fiscal year beginning 1 July of that year.")
    print("Source: https://www.fwc.gov.au/agreements-awards/pay-and-conditions/minimum-wages")
    print()
    print("TODO: implement automated fetch from FWC website for latest order.")


if __name__ == "__main__":
    main()
