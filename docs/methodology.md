# Metodología del Índice Chocorramo

## ¿Qué mide el índice?

El Índice Chocorramo mide cuántas unidades de un producto cotidiano puedes comprar con el salario mínimo en dos momentos del tiempo. Luego compara ese número para ver si el poder adquisitivo subió o bajó.

La pregunta central es simple:

> Con el salario mínimo de 2016, ¿cuántos Chocoramos podías comprar?
> Con el salario mínimo de 2026, ¿cuántos puedes comprar ahora?

Si la respuesta es menos, tu poder adquisitivo —medido en ese producto— bajó.

---

## Conceptos clave

### Salario nominal

El número en pesos, dólares o la moneda que sea, que aparece en tu nómina o decreto. No toma en cuenta si los precios subieron o bajaron. Es el número "bruto" antes de ajustar por inflación.

**Ejemplo:** En Colombia, el salario mínimo mensual pasó de $689.455 COP en 2016 a $1.750.905 COP en 2026. Eso es un crecimiento nominal del 153,9%.

### Inflación

El aumento generalizado de precios en la economía, medido por el IPC (Índice de Precios al Consumidor) en Colombia, o el CPI (Consumer Price Index) en Australia. Cuando los precios suben, el mismo dinero alcanza para comprar menos.

La inflación se mide sobre una **canasta** de cientos de productos y servicios representativos del consumo promedio de los hogares.

### Salario real

El salario nominal ajustado por inflación. Responde la pregunta: "¿puedo comprar más o menos cosas que antes?".

```
salario_real = salario_nominal / (IPC_relativo / 100)
```

Si el salario nominal subió 154% pero la inflación fue 72%, el salario real subió aproximadamente 48%. Es decir, con el nuevo salario puedes comprar un 48% más de la canasta promedio que antes.

### Poder adquisitivo en unidades del producto

En lugar de usar el IPC (abstracto), usamos un producto concreto como termómetro:

```
productos_comprables = salario_minimo / precio_producto
```

Si en 2016 comprabas 626 Chocoramos con el salario mínimo y en 2026 compras 547, tu poder adquisitivo medido en Chocoramos bajó un 12,7%.

---

## Fórmulas

| Indicador | Fórmula |
|-----------|---------|
| Productos comprables | `salario_minimo / precio_producto` |
| Crecimiento nominal del salario | `(salario_2026 / salario_2016 − 1) × 100` |
| Crecimiento del precio del producto | `(precio_2026 / precio_2016 − 1) × 100` |
| Cambio en poder adquisitivo | `(productos_2026 / productos_2016 − 1) × 100` |
| Salario real deflactado | `salario_nominal / (IPC_relativo / 100)` |
| IPC acumulado (base 2016=100) | `IPC_2016 × (1 + infl_2017) × (1 + infl_2018) × ...` |

---

## ¿Por qué usar un producto cotidiano para explicar inflación?

1. **Concreción:** "El salario creció 154%" es abstracto. "Antes comprabas 626 Chocoramos, ahora compras 547" es tangible y verificable.
2. **Comunicación:** Los economistas usan el IPC para análisis rigurosos. Para comunicar a personas no economistas, un producto familiar funciona mejor.
3. **Verificabilidad:** Cualquier persona puede ir a una tienda y comprobar el precio actual del producto.
4. **Comparación internacional:** Elegir un producto emblemático por país (Chocorramo en Colombia, meat pie en Australia) agrega contexto cultural.

---

## ¿Qué NO mide el índice?

- **El costo de vida completo:** Vivienda, salud, educación, transporte, servicios públicos. Un solo producto no representa la canasta completa.
- **La distribución del ingreso:** El salario mínimo afecta a una fracción de la población laboral. Los resultados no son generalizables a todos.
- **Calidad de vida o bienestar:** Más Chocoramos comprables no implica mejor calidad de vida.
- **Variaciones regionales:** El precio del Chocorramo en Bogotá puede diferir al de Bucaramanga o Cali.
- **Efectos de sustitución:** Si el Chocorramo sube mucho, la gente puede comprar otra galleta. El IPC captura este efecto; este índice no.
- **Canasta básica alimentaria:** Para medir pobreza o necesidades básicas, el instrumento correcto es el IPC o la línea de pobreza del DANE/ABS.
- **Calidad del producto:** Un Chocorramo de 2026 puede tener diferente peso, ingredientes o calidad que el de 2016.

---

## Limitaciones de los datos

### Colombia

- **Precios del Chocorramo:** No existe una fuente oficial. Los precios en este proyecto son estimaciones provenientes de fuentes de medios y reporte del usuario. Marcados como `needs_verification: true`.
- **IPC 2024-2026:** Los valores del IPC para los años más recientes son estimaciones basadas en proyecciones. Los datos oficiales del DANE deben verificarse directamente en su portal.

### Australia

- **Precios del meat pie:** No existe una fuente oficial. Los precios varían significativamente según el tipo de establecimiento (bakery artesanal, canteen, supermercado, servo). Se usa un "precio representativo" de rango medio.
- **Salario mínimo 2026:** El National Minimum Wage Order del Fair Work Commission se publica cada junio. El valor para FY2025-26 debe verificarse directamente con la Fair Work Commission.
- **CPI 2024-2026:** Valores estimados basados en tendencias recientes. Verificar con el ABS.

---

## Comparabilidad entre países

Colombia usa **salario mensual** y Australia usa **salario semanal**. La comparación de "productos comprables" es *dentro* de cada país (2016 vs 2026), no entre países. No es correcto comparar directamente los 547 Chocoramos colombianos con los 134 meat pies australianos porque usan períodos de tiempo distintos y monedas distintas.

La comparación válida es:

- **Colombia:** cayó de 626 a 547 Chocoramos/mes (−12,7%)
- **Australia:** cayó de 140 a 134 meat pies/semana (−3,9%)

Ambos cayeron, pero la caída colombiana fue mayor. Esto se debe principalmente a que el precio del Chocorramo creció mucho más que la inflación general.

---

## Próximas iteraciones

- [ ] Agregar años intermedios (2017-2025) para mostrar una línea de tiempo completa.
- [ ] Incorporar más productos de referencia por país.
- [ ] Extender a más países (México, Chile, Brasil, UK, USA).
- [ ] Comparar contra IPC de alimentos específicamente (no IPC total).
- [ ] Agregar intervalo de confianza para precios estimados.
