"""
build_index.py
Reads raw CSV data files and computes the Índice Chocorramo.
Outputs data/processed/purchasing_power_index.json and purchasing_power_index.csv.

Usage:
    python scripts/build_index.py

Requires: pandas, pyyaml
"""

from __future__ import annotations

import json
import sys
from datetime import date
from pathlib import Path
from typing import Any

import pandas as pd

ROOT = Path(__file__).resolve().parent.parent
RAW_DIR = ROOT / "data" / "raw"
PROCESSED_DIR = ROOT / "data" / "processed"
PROCESSED_DIR.mkdir(parents=True, exist_ok=True)

BASE_YEAR = 2016
CURRENT_YEAR = 2026


def load_csv(filename: str) -> pd.DataFrame:
    path = RAW_DIR / filename
    if not path.exists():
        print(f"  WARNING: {path} not found, skipping.", file=sys.stderr)
        return pd.DataFrame()
    df = pd.read_csv(path)
    _validate_schema(df, path)
    return df


REQUIRED_COLUMNS = {
    "country", "year", "variable", "value", "currency",
    "source_name", "source_url", "source_type", "confidence",
    "needs_verification", "notes",
}


def _validate_schema(df: pd.DataFrame, path: Path) -> None:
    missing = REQUIRED_COLUMNS - set(df.columns)
    if missing:
        raise ValueError(f"Schema error in {path.name}: missing columns {missing}")


def get_value(df: pd.DataFrame, year: int, variable: str) -> float | None:
    row = df[(df["year"] == year) & (df["variable"] == variable)]
    if row.empty:
        return None
    return float(row.iloc[0]["value"])


def needs_verification(df: pd.DataFrame, year: int, variable: str) -> bool:
    row = df[(df["year"] == year) & (df["variable"] == variable)]
    if row.empty:
        return True
    val = row.iloc[0]["needs_verification"]
    if isinstance(val, bool):
        return val
    return str(val).strip().lower() == "true"


def calc_products_purchasable(wage: float, price: float) -> float:
    if price <= 0:
        raise ValueError("price must be > 0")
    return wage / price


def calc_growth_pct(base: float, current: float) -> float:
    if base == 0:
        return 0.0
    return ((current / base) - 1) * 100


def build_country(
    country_id: str,
    profile: dict[str, Any],
    wage_df: pd.DataFrame,
    price_df: pd.DataFrame,
    cpi_df: pd.DataFrame,
    wage_variable: str,
    price_variable: str,
) -> dict[str, Any]:
    snapshots: dict[str, Any] = {}

    for year in [BASE_YEAR, CURRENT_YEAR]:
        wage = get_value(wage_df, year, wage_variable)
        price = get_value(price_df, year, price_variable)
        cpi = get_value(cpi_df, year, "cpi_base2016")

        if wage is None:
            print(f"  WARNING [{country_id}]: no wage data for {year}", file=sys.stderr)
            wage = 0.0
        if price is None:
            print(f"  WARNING [{country_id}]: no price data for {year}", file=sys.stderr)
            price = 1.0
        if cpi is None:
            print(f"  WARNING [{country_id}]: no CPI data for {year}", file=sys.stderr)
            cpi = 100.0

        products = calc_products_purchasable(wage, price)

        nv_list: list[str] = []
        if needs_verification(wage_df, year, wage_variable):
            nv_list.append("min_wage")
        if needs_verification(price_df, year, price_variable):
            nv_list.append("product_price")
        if needs_verification(cpi_df, year, "cpi_base2016"):
            nv_list.append("cpi_base_2016")

        snapshots[str(year)] = {
            "year": year,
            "min_wage": round(wage, 2),
            "product_price": round(price, 2),
            "products_purchasable": round(products, 2),
            "cpi_base_2016": round(cpi, 2),
            "needs_verification": nv_list,
        }

    base_snap = snapshots[str(BASE_YEAR)]
    curr_snap = snapshots[str(CURRENT_YEAR)]

    nominal_wage_growth = calc_growth_pct(base_snap["min_wage"], curr_snap["min_wage"])
    product_price_growth = calc_growth_pct(base_snap["product_price"], curr_snap["product_price"])
    purchasing_power_change = calc_growth_pct(
        base_snap["products_purchasable"],
        curr_snap["products_purchasable"],
    )
    accumulated_inflation = curr_snap["cpi_base_2016"] - 100.0
    real_wage_change = calc_growth_pct(
        base_snap["min_wage"],
        curr_snap["min_wage"] / (curr_snap["cpi_base_2016"] / 100),
    )

    return {
        "profile": profile,
        "snapshots": snapshots,
        "calculations": {
            "nominal_wage_growth_pct": round(nominal_wage_growth, 2),
            "product_price_growth_pct": round(product_price_growth, 2),
            "purchasing_power_change_pct": round(purchasing_power_change, 2),
            "accumulated_inflation_pct": round(accumulated_inflation, 2),
            "real_wage_change_pct": round(real_wage_change, 2),
            "base_year": BASE_YEAR,
            "current_year": CURRENT_YEAR,
        },
    }


def build_flat_csv(index: dict[str, Any]) -> pd.DataFrame:
    """Creates a flat CSV with one row per (country, year, metric)."""
    rows = []
    for country_id, country_data in index["countries"].items():
        profile = country_data["profile"]
        calcs = country_data["calculations"]
        for year_str, snap in country_data["snapshots"].items():
            rows.append({
                "country": country_id,
                "country_name": profile["name"],
                "year": int(year_str),
                "product_name": profile["product_name"],
                "currency": profile["currency"],
                "wage_period": profile["wage_period"],
                "min_wage": snap["min_wage"],
                "product_price": snap["product_price"],
                "products_purchasable": snap["products_purchasable"],
                "cpi_base_2016": snap["cpi_base_2016"],
                "nominal_wage_growth_pct": calcs["nominal_wage_growth_pct"] if int(year_str) == CURRENT_YEAR else None,
                "product_price_growth_pct": calcs["product_price_growth_pct"] if int(year_str) == CURRENT_YEAR else None,
                "purchasing_power_change_pct": calcs["purchasing_power_change_pct"] if int(year_str) == CURRENT_YEAR else None,
                "accumulated_inflation_pct": calcs["accumulated_inflation_pct"] if int(year_str) == CURRENT_YEAR else None,
            })
    return pd.DataFrame(rows)


def main() -> None:
    print("Building Índice Chocorramo...")

    colombia_wages = load_csv("colombia_min_wage.csv")
    colombia_prices = load_csv("colombia_chocorramo_prices.csv")
    colombia_cpi = load_csv("colombia_cpi.csv")
    australia_wages = load_csv("australia_min_wage.csv")
    australia_prices = load_csv("australia_meat_pie_prices.csv")
    australia_cpi = load_csv("australia_cpi.csv")

    colombia_profile = {
        "id": "colombia",
        "name": "Colombia",
        "flag": "🇨🇴",
        "product_name": "Chocorramo",
        "product_emoji": "🍫",
        "currency": "COP",
        "currency_symbol": "$",
        "wage_period": "monthly",
        "wage_period_label_es": "mes",
    }

    australia_profile = {
        "id": "australia",
        "name": "Australia",
        "flag": "🇦🇺",
        "product_name": "Meat Pie",
        "product_emoji": "🥧",
        "currency": "AUD",
        "currency_symbol": "A$",
        "wage_period": "weekly",
        "wage_period_label_es": "semana",
    }

    colombia_data = build_country(
        "colombia",
        colombia_profile,
        colombia_wages,
        colombia_prices,
        colombia_cpi,
        wage_variable="min_wage_monthly",
        price_variable="chocorramo_unit_price",
    )

    australia_data = build_country(
        "australia",
        australia_profile,
        australia_wages,
        australia_prices,
        australia_cpi,
        wage_variable="min_wage_weekly",
        price_variable="meat_pie_unit_price",
    )

    index = {
        "metadata": {
            "generated_at": date.today().isoformat(),
            "generated_by": "scripts/build_index.py",
            "version": "0.1.0",
            "base_year": BASE_YEAR,
            "current_year": CURRENT_YEAR,
            "description": "Índice de poder adquisitivo medido en unidades de producto cotidiano.",
        },
        "countries": {
            "colombia": colombia_data,
            "australia": australia_data,
        },
    }

    json_path = PROCESSED_DIR / "purchasing_power_index.json"
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(index, f, ensure_ascii=False, indent=2)
    print(f"  Written: {json_path}")

    flat_df = build_flat_csv(index)
    csv_path = PROCESSED_DIR / "purchasing_power_index.csv"
    flat_df.to_csv(csv_path, index=False)
    print(f"  Written: {csv_path}")

    print("\nIndex summary:")
    for cid, cdata in index["countries"].items():
        calcs = cdata["calculations"]
        print(f"\n  {cdata['profile']['flag']} {cdata['profile']['name']}:")
        print(f"    Nominal wage growth:       {calcs['nominal_wage_growth_pct']:+.1f}%")
        print(f"    Product price growth:      {calcs['product_price_growth_pct']:+.1f}%")
        print(f"    Purchasing power change:   {calcs['purchasing_power_change_pct']:+.1f}%")
        print(f"    Accumulated inflation:     {calcs['accumulated_inflation_pct']:+.1f}% (est.)")
        print(f"    Real wage change (CPI):    {calcs['real_wage_change_pct']:+.1f}% (est.)")


if __name__ == "__main__":
    main()
