# People Generator

Generador de personajes aleatorios: nombre, apellido, edad, altura, nacionalidad, signo, ocupación y color favorito, con retrato incluido.

**Demo:** https://leandrocarlino.github.io/peopleGenerator/

Reescrito en **Angular 22** con standalone components y signals.

## Qué cambió

| | Antes | Ahora |
|---|---|---|
| Framework | Angular 14 (sin soporte, no compila en Node 24) | **Angular 22**, standalone + signals |
| Fotos | 41 PNG de ~1,3 MB | **46 WebP de 0,46 MB** |
| Retratos | 21 de mujer y 20 de hombre declarados, pero solo existen 20 y 21 | las listas se generan desde `public/img`: imposible pedir una foto inexistente |
| Datos | “Diego” y “Venezuela” duplicados | listas sin repetidos, tildes normalizadas |
| Altura | `charAt(0)+'.'+charAt(1)+charAt(2)` sobre un string | centímetros en el modelo y formato al mostrar |
| Generación | lógica atada al servicio, imposible de testear | función pura `generarPersona(genero, rnd)` inyectable |
| Historial | no existía | últimas 6 generadas, clicables |
| Copiar | no existía | copia la ficha, con fallback y mensaje de error |
| Página de error | “error works!” | 404 propia con título por ruta |
| Tests | specs por defecto | **8 tests** (rangos, retratos, formato) |

## Características

- Tres acciones: **generar mujer**, **generar hombre** y **sorpréndeme**.
- Ficha con retrato, datos y botón para copiarla como texto.
- Historial de las últimas seis personas, para volver a una sin perderla.
- Estado vacío con ilustración en vez de campos en blanco.
- Responsive: la ficha pasa de dos columnas a una en móvil.
- Tema claro/oscuro, foco visible y `aria-live` en la ficha.
- Lighthouse: accesibilidad, buenas prácticas y SEO en 100.

## Datos

Las listas de nombres, apellidos, nacionalidades, signos, ocupaciones y colores viven en
`src/app/core/datos.ts`; los retratos en `public/img` (uno por género y número).
La generación es una función pura (`src/app/core/persona.ts`), así que se puede testear
con un generador aleatorio inyectado.

## Correr

```bash
npm install
npm start        # http://localhost:4200
npm test         # 8 tests
npm run build
```

## Créditos

Los retratos son ilustraciones de sus respectivos autores. Este proyecto no recopila datos
ni tiene fines comerciales.
