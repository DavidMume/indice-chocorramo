# AGENTS.md — Índice Chocorramo

Guía de trabajo para agentes de IA (Codex, Claude, etc.) que trabajen en este repositorio.

## Propósito del proyecto

Página web divulgativa que explica inflación, salario nominal, salario real y poder adquisitivo usando ejemplos cotidianos. Compara cuántos productos populares se podían comprar con un salario mínimo en 2016 vs 2026:
- 🇨🇴 Colombia: Chocorramo (COP)
- 🇦🇺 Australia: meat pie (AUD)

Audiencia: personas no economistas. Tono: divulgativo, visual, transparente.

## Stack

- **Frontend:** React 18 + Vite 5 + TypeScript 5
- **Estilos:** Tailwind CSS 3
- **Gráficos:** Recharts 2
- **Datos:** CSV/JSON versionados en `/data/`
- **Procesamiento:** Python 3.10+ en `/scripts/`
- **Deploy:** Cloudflare Pages

## Estructura crítica

```
app/src/
  types.ts               ← interfaces TypeScript (IndexData, CountryProfile, etc.)
  data/index.ts          ← datos procesados como constantes TS (la app los importa aquí)
  utils/calculations.ts  ← funciones puras: calcularProductos, calcularCrecimiento, etc.
  components/            ← componentes UI
  charts/                ← gráficos Recharts
data/
  raw/                   ← CSVs fuente con schema completo (no modificar manualmente)
  processed/             ← JSON generado por scripts/build_index.py
  sources.yaml           ← catálogo de fuentes
scripts/
  build_index.py         ← script principal que lee raw/ y escribe processed/
```

## Reglas de datos (CRÍTICO — no violar)

1. **Nunca inventes datos.** Si un dato no está confirmado, usa `needs_verification: true`.
2. **Nunca marques como oficial** el precio del Chocorramo o el meat pie — son estimaciones de fuentes de medios/retail.
3. **Schema obligatorio** para cada fila en data/raw/*.csv:
   ```
   country, year, variable, value, currency, source_name, source_url,
   source_type, confidence, needs_verification, notes
   ```
4. `source_type` debe ser uno de: `official | retail | media | estimate | user_provided`
5. `confidence` debe ser uno de: `high | medium | low`

## Fórmulas (no cambiar sin actualizar docs/methodology.md)

```python
productos_comprables       = salario_minimo / precio_producto
crecimiento_nominal_salario = (salario_actual / salario_base - 1) * 100
crecimiento_precio_producto = (precio_actual  / precio_base  - 1) * 100
cambio_poder_adquisitivo   = (productos_actual / productos_base - 1) * 100
salario_real_base           = salario_nominal / (ipc_relativo / 100)
```

## Convenciones de código

- **TypeScript:** strict mode. Sin `any`. Interfaces en `types.ts`.
- **Componentes React:** funcionales + hooks. Sin class components.
- **Estilos:** Tailwind únicamente. Sin CSS modules, sin styled-components.
- **Gráficos:** solo Recharts. No agregar otras librerías de charts sin discutir.
- **Comentarios:** solo cuando el "por qué" no es obvio.
- **Tests:** en `app/src/__tests__/`. Usar Vitest.
- **Python:** PEP 8. Type hints obligatorios. Dependencias en `scripts/requirements.txt`.
- **Commits:** conventional commits (`feat:`, `fix:`, `data:`, `docs:`).

## Datos actuales (estado a junio 2026)

### Colombia

| Variable | 2016 | 2026 | Estado |
|----------|------|------|--------|
| Salario mínimo mensual | COP 689,455 | COP 1,750,905 | ✅ Oficial |
| Precio Chocorramo | COP ~1,100 | COP ~3,200 | ⚠️ Necesita verificación |
| IPC relativo (base 2016=100) | 100.0 | ~172.0 | ⚠️ Estimado |

### Australia

| Variable | 2016 | 2026 | Estado |
|----------|------|------|--------|
| Salario mínimo semanal | AUD 672.70 | AUD ~915.90 | ✅/⚠️ 2016 oficial; 2026 requiere verificación |
| Precio meat pie | AUD ~4.80 | AUD ~6.80 | ⚠️ Precio representativo (no oficial) |
| CPI relativo (base 2016=100) | 100.0 | ~132.0 | ⚠️ Estimado |

## Backlog de tareas — prioridad alta

### Datos (bloqueantes para producción)
- [ ] **TODO[data-1]** Verificar precio Chocorramo 2016 con fuente confiable (retail, SIPSA-DANE, o prensa de época). Actualizar `data/raw/colombia_chocorramo_prices.csv` y cambiar `needs_verification` a `false` si se confirma.
- [ ] **TODO[data-2]** Verificar precio Chocorramo 2026 (precio actual en tienda). Misma fuente.
- [ ] **TODO[data-3]** Obtener IPC Colombia 2016-2026 de DANE. URL: https://www.dane.gov.co/index.php/estadisticas-por-tema/precios-y-costos/indice-de-precios-al-consumidor-ipc — buscar serie IPC total nacional.
- [ ] **TODO[data-4]** Verificar salario mínimo Australia 2026. URL: https://www.fwc.gov.au/agreements-awards/pay-and-conditions/minimum-wages — buscar National Minimum Wage Order 2025.
- [ ] **TODO[data-5]** Verificar precio representativo meat pie Australia 2016 y 2026. Buscar en prensa australiana, ABS food prices, o retailers como Woolworths/Coles.
- [ ] **TODO[data-6]** Obtener CPI Australia (ABS) 2016-2026. URL: https://www.abs.gov.au/statistics/economy/price-indexes-and-inflation/consumer-price-index-australia — tabla serie trimestral.

### Frontend
- [ ] **TODO[fe-1]** Agregar más años intermedios (2017-2025) al timeline si hay datos disponibles. Actualizar charts para mostrar línea temporal completa.
- [ ] **TODO[fe-2]** Mejorar diseño mobile: cards comparison y charts necesitan mejor responsividad en < 375px.
- [ ] **TODO[fe-3]** Agregar animaciones de entrada con `framer-motion` o CSS transitions.
- [ ] **TODO[fe-4]** Agregar tooltip enriquecido en gráficos con fuente del dato y badge de confianza.
- [ ] **TODO[fe-5]** Botón de descarga de datos (CSV y JSON).
- [ ] **TODO[fe-6]** Meta tags OG para compartir en redes (título, descripción, imagen).
- [ ] **TODO[fe-7]** Modo oscuro con clase `dark:` de Tailwind.

### Testing
- [ ] **TODO[test-1]** Escribir tests unitarios en `app/src/__tests__/calculations.test.ts` para todas las funciones en `utils/calculations.ts`. Usar Vitest.
- [ ] **TODO[test-2]** Escribir tests de snapshot para componentes principales con `@testing-library/react`.
- [ ] **TODO[test-3]** Validar que los CSVs en `data/raw/` tienen el schema correcto (script Python en `scripts/validate_schema.py`).
- [ ] **TODO[test-4]** Agregar GitHub Action que corra tests y build en cada PR.

### Scripts / datos
- [ ] **TODO[script-1]** Completar `scripts/fetch_colombia_cpi.py` para descargar automáticamente la serie IPC del DANE.
- [ ] **TODO[script-2]** Completar `scripts/fetch_australia_cpi.py` para descargar CPI de la API del ABS.
- [ ] **TODO[script-3]** Agregar validación de schema en `scripts/build_index.py` — fallar si faltan campos obligatorios.
- [ ] **TODO[script-4]** Agregar más años (columnas) al `purchasing_power_index.json` cuando haya datos verificados.

### Documentación
- [ ] **TODO[docs-1]** Completar `docs/methodology.md` con explicación de diferencia salario nominal vs real.
- [ ] **TODO[docs-2]** Agregar `docs/source_quality.md` con clasificación detallada de cada fuente.
- [ ] **TODO[docs-3]** Agregar sección FAQ en la web.

## Cómo correr localmente

```bash
# Frontend
cd app && npm install && npm run dev

# Tests (cuando existan)
cd app && npm test

# Regenerar datos procesados
pip install -r scripts/requirements.txt
python scripts/build_index.py

# Validar schema de datos
python scripts/validate_schema.py  # TODO: crear este script
```

## Archivos que NO debes modificar directamente

- `data/processed/purchasing_power_index.json` → regenerar con `python scripts/build_index.py`
- `app/src/data/index.ts` → copiar los processed JSON en este archivo o regenerar con script

## Variables de entorno

No se necesitan variables de entorno para el frontend (todos los datos son estáticos).
Para scripts Python futuros que hagan requests a APIs, usar `.env` local (no commitear).
