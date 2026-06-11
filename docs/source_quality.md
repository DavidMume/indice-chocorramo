# Calidad de fuentes

Este documento clasifica cada fuente de datos usada en el proyecto y documenta qué datos necesitan verificación adicional.

## Clasificación general

| Fuente | País | Datos que provee | Calidad | Estado |
|--------|------|-----------------|---------|--------|
| DANE — IPC | Colombia | Inflación anual, IPC total nacional | ✅ Oficial | Histórico verificado; 2024-2026 estimado |
| Función Pública / MinTrabajo | Colombia | Salario mínimo mensual | ✅ Oficial | Todos los años verificados |
| Chocorramo prices | Colombia | Precio unitario | ⚠️ Estimado | Requiere verificación primaria |
| Fair Work Commission | Australia | Salario mínimo semanal/horario | ✅ Oficial | 2016-2024 verificado; 2025-26 estimado |
| ABS — CPI | Australia | Inflación, CPI all groups | ✅ Oficial | Histórico verificado; 2024-2026 estimado |
| Meat pie prices | Australia | Precio unitario | ⚠️ Estimado | Precio representativo; no existe fuente oficial |

---

## Datos de alta prioridad para verificar

### 1. Precio del Chocorramo (Colombia)

**Por qué importa:** Es uno de los dos datos centrales del índice. Si el precio es incorrecto, el resultado del índice es incorrecto.

**Estado actual:** Estimación del usuario del proyecto. `confidence: low`.

**Cómo verificar:**
- Precio 2016: Buscar en archivo de prensa colombiana ("precio Chocorramo 2016" en El Tiempo, Portafolio, La República).
- Precio 2026: Verificar precio actual en tiendas físicas (Éxito, Jumbo, D1, Justo & Bueno, Ara) o en sus apps.
- Alternativa: SIPSA-DANE monitorea precios de alimentos procesados. Revisar si incluye galletas/snacks industriales.
- URL SIPSA: https://www.dane.gov.co/index.php/estadisticas-por-tema/agropecuario/sistema-de-informacion-de-precios-sipsa

**Acción requerida:** Cuando se verifique, actualizar `data/raw/colombia_chocorramo_prices.csv`:
- Cambiar `needs_verification` a `false`
- Actualizar `source_name`, `source_url`, `source_type`, `confidence`
- Agregar nota con la fuente específica

---

### 2. Precio del meat pie (Australia)

**Por qué importa:** Ídem al Chocorramo; es el dato central del caso australiano.

**Estado actual:** Precio representativo estimado. No existe fuente oficial. `confidence: low`.

**Cómo verificar:**
- Definir qué tipo de meat pie estamos usando como referencia (bakery, supermercado, canteen).
- Precio 2016: Buscar en prensa australiana (SMH, The Australian, Herald Sun) artículos sobre precio de comida típica.
- Precio 2026: Verificar precio actual en Woolworths, Coles, o bakeries de Sidney/Melbourne.
- Considerar usar el precio de Woolworths (frozen party pie individual) como referencia consistente y verificable.
- URL Woolworths: https://www.woolworths.com.au/shop/search/products?searchTerm=meat+pie

**Rango de precios representativos (2026 estimado):**
- Frozen/supermercado: AUD $2.50–4.00 por unidad
- Canteen/servo: AUD $4.00–6.00
- Bakery artesanal: AUD $6.00–9.00

**Recomendación:** Elegir un punto de referencia consistente y documentarlo explícitamente.

---

### 3. IPC Colombia 2024-2026

**Por qué importa:** Afecta el cálculo del salario real y la comparación contra inflación.

**Estado actual:** Estimación calculada encadenando inflaciones anuales proyectadas. `confidence: low` para 2025-2026.

**Cómo verificar:**
- Descargar la serie IPC mensual/anual del DANE:
  https://www.dane.gov.co/index.php/estadisticas-por-tema/precios-y-costos/indice-de-precios-al-consumidor-ipc
- Buscar "Variación anual del IPC" o "Histórico IPC"
- Los datos de 2024 deberían ya estar disponibles en la publicación de enero 2025

---

### 4. Salario mínimo Australia 2025-2026

**Por qué importa:** El National Minimum Wage Order 2025 entra en vigencia desde julio 2025.

**Estado actual:** Usando NMW Order 2024 ($915.90/semana) como proxy. `confidence: medium`.

**Cómo verificar:**
- URL Fair Work Commission:
  https://www.fwc.gov.au/agreements-awards/pay-and-conditions/minimum-wages/minimum-wage-orders
- Buscar "National Minimum Wage Order 2025"
- El FWC publica el resultado de la Annual Wage Review normalmente en junio de cada año

---

### 5. CPI Australia 2024-2026

**Por qué importa:** Afecta el cálculo del salario real australiano.

**Estado actual:** Estimaciones basadas en proyecciones del RBA. `confidence: low` para 2026.

**Cómo verificar:**
- ABS publica CPI trimestralmente:
  https://www.abs.gov.au/statistics/economy/price-indexes-and-inflation/consumer-price-index-australia
- Última publicación disponible: buscar Q4 2025 / Q1 2026
- También disponible via API ABS: https://api.data.abs.gov.au/

---

## Cronograma de actualización recomendado

| Dato | Frecuencia de actualización | Cuándo actualizar |
|------|-----------------------------|-------------------|
| Salario mínimo Colombia | Anual | Enero (cuando sale el decreto) |
| IPC Colombia | Mensual (publicado por DANE) | Enero para variación anual cierre de año |
| Precio Chocorramo | Puntual / cuando se verifica | Verificar antes de cualquier publicación |
| Salario mínimo Australia | Anual (julio) | Julio cuando entra en vigencia el NMW Order |
| CPI Australia | Trimestral (ABS) | Cada Q publication del ABS |
| Precio meat pie | Puntual / cuando se verifica | Verificar antes de cualquier publicación |
