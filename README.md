# Índice Chocorramo

**Una forma sencilla de entender inflación y poder adquisitivo / A simple way to understand inflation and purchasing power.**

Este proyecto compara cuántos productos populares se podían comprar con un salario mínimo en distintos años, usando Colombia (🍫 Chocorramo) y Australia (🥧 meat pie) como casos de estudio.

La aplicación es completamente bilingüe (ES/EN). El selector cambia todo el contenido sin recargar la página y guarda la preferencia en `localStorage`.

## Contenido, traducciones y datos

- Todo el texto visible en español e inglés vive en `app/src/i18n/translations.ts`.
- El estado de idioma y la persistencia en `localStorage["indice-chocorramo-language"]` viven en `app/src/i18n/LanguageContext.tsx`.
- Para editar una traducción, cambia la misma clave dentro de `es` y `en`; no cambies cifras entre idiomas.
- Los valores que consume la interfaz viven en `app/src/data/index.ts`. Ese archivo conserva salarios, precios, IPC y cálculos separados del texto de la interfaz.
- Los datos fuente versionados viven en `data/raw/*.csv`; los resultados del procesamiento, en `data/processed/`.

## ¿Qué mide?

- Cuántos Chocoramos/meat pies podías comprar con un salario mínimo en 2016 vs 2026.
- Crecimiento nominal del salario vs crecimiento del precio del producto.
- Cambio en poder adquisitivo medido en unidades del producto.
- Comparación contra inflación acumulada (IPC/CPI oficial).

## Stack técnico

| Capa | Tecnología |
|------|-----------|
| Frontend | React 18 + Vite + TypeScript |
| Estilos | Tailwind CSS 3 |
| Gráficos | Recharts |
| Data | CSV + JSON versionados en el repo |
| Procesamiento | Python 3.10+ |
| Deploy | Cloudflare Pages |

## Estructura del repositorio

```
indice-chocorramo/
├── app/                     # Aplicación React
│   └── src/
│       ├── components/      # Componentes de UI
│       ├── charts/          # Gráficos Recharts
│       ├── data/            # Datos procesados (TypeScript)
│       ├── pages/           # Páginas
│       └── utils/           # Funciones de cálculo
├── data/
│   ├── raw/                 # CSVs originales con schema completo
│   ├── processed/           # JSON/CSV generados por scripts
│   └── sources.yaml         # Fuentes documentadas
├── docs/
│   ├── methodology.md       # Qué mide y qué no mide el índice
│   ├── data_dictionary.md   # Definición de cada campo
│   └── source_quality.md    # Clasificación de calidad de fuentes
├── notebooks/               # Análisis exploratorio en Jupyter
└── scripts/                 # Python: fetch + cálculo del índice
```

## Correr localmente

### Requisitos

- Node.js 18+
- Python 3.10+
- npm o pnpm

### Frontend

```bash
cd app
npm install
npm run dev
npm run build
```

Vite muestra la URL local (normalmente `http://localhost:5173`) y genera el build de producción en `app/dist/`.

### Procesamiento de datos

```bash
pip install -r scripts/requirements.txt
python scripts/build_index.py
```

El script lee `data/raw/*.csv`, calcula el índice y escribe `data/processed/purchasing_power_index.json`. Los datos procesados ya están incluidos en el repo, no es necesario correr el script para ver la app.

### Actualizar los datos sin rediseñar la página

1. Actualiza las filas correspondientes en `data/raw/*.csv`, conservando el schema documentado abajo.
2. Documenta o corrige las fuentes en `data/sources.yaml`.
3. Ejecuta `python scripts/build_index.py` desde la raíz del repositorio.
4. Sincroniza el resultado validado con `app/src/data/index.ts` si el script no lo hace automáticamente.
5. Ejecuta `cd app && npm run build` para comprobar tipos y generar el sitio.

Los componentes y las traducciones no necesitan cambios cuando solo cambian valores.

### Build para producción

```bash
cd app
npm run build
# Output en app/dist/
```

## Deploy en Cloudflare Pages

1. Conecta el repositorio en Cloudflare Pages.
2. Configura **Root directory** como `app`.
3. Usa **Build command:** `npm run build`.
4. Usa **Build output directory:** `dist`.
5. Usa Node.js 20 o posterior y despliega.

Si prefieres mantener la raíz del repositorio como directorio de trabajo, usa `cd app && npm run build` y `app/dist`; ambas configuraciones producen el mismo sitio.

## Añadir el proyecto al portafolio principal

El portafolio usa `src/data/projects.js` como índice reutilizable. Añade o actualiza el objeto con `slug: 'chocorramo-index'`, completa sus campos bilingües (`title`, `subtitle`, `description`, `date`, `category`, `status` y `collection`) y agrega `tags`, `technologies`, `liveUrl`, `repoUrl` y `articleUrl` cuando exista. La colección debe ser:

- ES: `Análisis públicos con datos`
- EN: `Public analysis with data`

Después, desde la raíz del portafolio, ejecuta `npm install`, `npm run dev` y `npm run build`.

## Schema de datos

Cada fila en los CSVs de `data/raw/` sigue este schema:

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `country` | string | `colombia` o `australia` |
| `year` | int | Año del dato |
| `variable` | string | Qué se mide |
| `value` | float | Valor numérico |
| `currency` | string | ISO 4217 (COP, AUD) |
| `source_name` | string | Nombre de la fuente |
| `source_url` | string | URL de la fuente |
| `source_type` | enum | `official`, `retail`, `media`, `estimate`, `user_provided` |
| `confidence` | enum | `high`, `medium`, `low` |
| `needs_verification` | bool | Si el dato requiere verificación |
| `notes` | string | Aclaraciones y advertencias |

## Fórmulas

```
productos_comprables       = salario_minimo / precio_producto
crecimiento_nominal_salario = (salario_actual / salario_base - 1) × 100
crecimiento_precio_producto = (precio_actual / precio_base - 1) × 100
cambio_poder_adquisitivo    = (productos_actual / productos_base - 1) × 100
salario_real_base           = salario_nominal / (ipc_relativo / 100)
```

## Limitaciones importantes

- El precio del Chocorramo y del meat pie **no es un dato oficial**. Proviene de fuentes de medios, retail o usuarios. Ver `docs/source_quality.md`.
- Comparar un solo producto con el costo de vida general es una simplificación pedagógica, no un análisis exhaustivo.
- Las cifras de CPI/IPC para 2025-2026 pueden ser estimaciones; ver `needs_verification` en los datos.

## Estado de verificación de datos

| Dato | Estado |
|------|--------|
| Salario mínimo Colombia 2016 | ✅ Oficial (Decreto) |
| Salario mínimo Colombia 2026 | ✅ Oficial (Decreto) |
| Precio Chocorramo 2016 | ⚠️ Requiere verificación |
| Precio Chocorramo 2026 | ⚠️ Requiere verificación |
| IPC Colombia (DANE) | ⚠️ Estimado — requiere verificación |
| Salario mínimo Australia 2016 | ✅ Oficial (Fair Work Commission) |
| Salario mínimo Australia 2026 | ⚠️ Requiere verificación |
| Precio meat pie Australia | ⚠️ Estimado — precio representativo |
| CPI Australia (ABS) | ⚠️ Estimado — requiere verificación |

## Tareas pendientes (next iteration)

Ver [`AGENTS.md`](AGENTS.md) para el backlog completo con instrucciones para agentes de IA.

## Fuentes principales

- **DANE** (Colombia IPC): https://www.dane.gov.co/index.php/estadisticas-por-tema/precios-y-costos/indice-de-precios-al-consumidor-ipc
- **Función Pública** (salario mínimo Colombia): https://www.funcionpublica.gov.co/
- **Fair Work Commission** (Australia): https://www.fwc.gov.au/
- **ABS** (Australia CPI): https://www.abs.gov.au/statistics/economy/price-indexes-and-inflation/consumer-price-index-australia

## Licencia

MIT — datos y código son de acceso libre.
