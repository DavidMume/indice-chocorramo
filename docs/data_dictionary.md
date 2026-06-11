# Diccionario de datos

Definición de todos los campos usados en `data/raw/*.csv` y `data/processed/*.json`.

## Schema de data/raw/*.csv

Todos los archivos CSV en `data/raw/` usan el mismo schema de columnas.

| Campo | Tipo | Valores posibles | Descripción |
|-------|------|-----------------|-------------|
| `country` | string | `colombia`, `australia` | País al que pertenece el dato |
| `year` | integer | e.g. 2016, 2026 | Año del dato. Para salarios australianos: año de inicio del ejercicio fiscal (FY) |
| `variable` | string | ver tabla abajo | Qué se está midiendo |
| `value` | float | número positivo | Valor numérico del indicador |
| `currency` | string | `COP`, `AUD`, `PCT`, `INDEX` | Unidad o moneda del valor |
| `source_name` | string | — | Nombre descriptivo de la fuente |
| `source_url` | string | URL o `N/A` | URL de la fuente primaria |
| `source_type` | enum | ver tabla abajo | Clasificación del tipo de fuente |
| `confidence` | enum | `high`, `medium`, `low` | Nivel de confianza en el dato |
| `needs_verification` | boolean | `true`, `false` | Si el dato debe verificarse antes de presentarse como definitivo |
| `notes` | string | — | Aclaraciones, advertencias, instrucciones de verificación |

### Variables por archivo

**colombia_min_wage.csv / australia_min_wage.csv:**

| Variable | Descripción |
|----------|-------------|
| `min_wage_monthly` | Salario mínimo mensual (Colombia) |
| `min_wage_weekly` | Salario mínimo semanal (Australia) |
| `min_wage_hourly` | Salario mínimo por hora (Australia) |
| `min_wage_daily` | Salario mínimo diario (Colombia) |

**colombia_chocorramo_prices.csv / australia_meat_pie_prices.csv:**

| Variable | Descripción |
|----------|-------------|
| `chocorramo_unit_price` | Precio por unidad de Chocorramo (Colombia) |
| `meat_pie_unit_price` | Precio por unidad de meat pie (Australia) |

**colombia_cpi.csv / australia_cpi.csv:**

| Variable | Descripción |
|----------|-------------|
| `annual_inflation_pct` | Variación porcentual anual del IPC/CPI |
| `cpi_base2016` | Índice acumulado con base 2016=100, calculado para este proyecto |

### Valores de source_type

| Valor | Descripción |
|-------|-------------|
| `official` | Fuente gubernamental o estadística oficial (DANE, Función Pública, Fair Work Commission, ABS) |
| `retail` | Precio de punto de venta minorista |
| `media` | Precio mencionado en medios de comunicación (prensa, revistas) |
| `estimate` | Estimación sin fuente primaria verificable |
| `user_provided` | Dato provisto por el usuario del proyecto |

### Valores de confidence

| Valor | Cuándo usar |
|-------|-------------|
| `high` | Dato oficial verificado, fuente primaria disponible y consultada |
| `medium` | Dato oficial pero no verificado directamente, o fuente secundaria confiable |
| `low` | Estimación, precio representativo, o dato sin verificación independiente |

---

## Schema de data/processed/purchasing_power_index.json

```json
{
  "metadata": {
    "generated_at": "YYYY-MM-DD",
    "generated_by": "scripts/build_index.py",
    "version": "semver string",
    "base_year": 2016,
    "current_year": 2026,
    "description": "string"
  },
  "countries": {
    "<country_id>": {
      "profile": {
        "id": "string (colombia | australia)",
        "name": "string",
        "flag": "emoji",
        "product_name": "string",
        "product_emoji": "emoji",
        "currency": "ISO 4217",
        "currency_symbol": "string",
        "wage_period": "monthly | weekly | hourly",
        "wage_period_label_es": "string"
      },
      "snapshots": {
        "<year>": {
          "year": 2016,
          "min_wage": "float — en la moneda del país",
          "product_price": "float — en la moneda del país",
          "products_purchasable": "float — min_wage / product_price",
          "cpi_base_2016": "float — índice IPC con base 2016=100",
          "needs_verification": ["array de strings con los campos que requieren verificación"]
        }
      },
      "calculations": {
        "nominal_wage_growth_pct": "float",
        "product_price_growth_pct": "float",
        "purchasing_power_change_pct": "float (negativo = pérdida de poder adquisitivo)",
        "accumulated_inflation_pct": "float",
        "real_wage_change_pct": "float",
        "base_year": 2016,
        "current_year": 2026
      }
    }
  }
}
```

---

## Schema de data/processed/purchasing_power_index.csv

Versión plana del JSON para análisis en herramientas como Excel, R o Pandas.

| Columna | Tipo | Descripción |
|---------|------|-------------|
| `country` | string | ID del país |
| `country_name` | string | Nombre del país |
| `year` | integer | Año del snapshot |
| `product_name` | string | Nombre del producto de referencia |
| `currency` | string | Moneda (COP, AUD) |
| `wage_period` | string | Período del salario (monthly, weekly) |
| `min_wage` | float | Salario mínimo en la moneda del país |
| `product_price` | float | Precio del producto en la moneda del país |
| `products_purchasable` | float | min_wage / product_price |
| `cpi_base_2016` | float | IPC con base 2016=100 |
| `nominal_wage_growth_pct` | float | Solo en el año actual; null en el año base |
| `product_price_growth_pct` | float | Solo en el año actual; null en el año base |
| `purchasing_power_change_pct` | float | Solo en el año actual; null en el año base |
| `accumulated_inflation_pct` | float | Solo en el año actual; null en el año base |
