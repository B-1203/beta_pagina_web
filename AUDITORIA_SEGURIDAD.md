# Auditoria de seguridad - El Artesano Beach House

Fecha de revision: 2026-10-27

## 1. Resumen ejecutivo

La aplicacion es un sitio informativo estatico con un formulario que prepara un
mensaje para WhatsApp. No tiene autenticacion, base de datos, API propia
utilizada por la interfaz ni contenido HTML controlado por visitantes. En la
revision del codigo no se encontraron XSS, inyecciones de comandos, SQL ni
redirecciones abiertas explotables.

Se implementaron controles de validacion en el formulario, cabeceras HTTP de
defensa en profundidad y actualizaciones de dependencias. La auditoria final
no reporta vulnerabilidades conocidas (`npm audit` y `npm audit --omit=dev`).
El resultado es **APTO CON OBSERVACIONES**, porque la configuracion real de
HTTPS, CDN, registros, politicas legales y despliegue no puede comprobarse
solo desde el repositorio.

La compilacion correcta y la ausencia de XSS en el codigo no demuestran que el
sitio sea completamente seguro. La configuracion HTTPS, CDN, DNS, registros,
politicas legales y cabeceras efectivamente entregadas deben verificarse en el
entorno de produccion.

## 2. Alcance y metodologia

- Revision estatica de `app/`, `next.config.ts`, `package.json`,
  `package-lock.json`, `.gitignore` y configuraciones de TypeScript/ESLint.
- Busqueda de HTML inseguro, ejecucion dinamica, parametros de URL, destinos
  externos, secretos y configuracion de imagenes.
- `npm audit`, `npx tsc --noEmit`, `npm run lint` y `npm run build`.
- Revision del historial Git local accesible para detectar archivos de entorno,
  credenciales o certificados versionados.
- No se ejecutaron ataques contra sistemas externos ni pruebas destructivas.

## 3. Hallazgos

| # | Gravedad | Ubicacion | Hallazgo | Estado |
|---|---|---|---|---|
| 1 | CRITICO | `package.json` y `package-lock.json` (version inicial `next@16.3.3`) | `npm audit` inicial reporto avisos de RCE en `next/og` y optimizacion de imagenes, SSRF, filtraciones y cache poisoning para Next 16.0.0-16.4.0. Algunos vectores no estan configurados en este sitio. | Corregido: Next.js y `eslint-config-next` actualizados a 16.4.3 |
| 2 | ALTO | `package-lock.json` (version inicial `sharp@0.35.4`) | Vulnerabilidad inicial en la dependencia `librsvg` de Sharp. | Corregido al actualizar dependencias |
| 3 | ALTO | `package-lock.json` inicial (`source-map-js`, `zod`, `brace-expansion`) | `npm audit` inicial reporto problemas transitivos de denegacion de servicio, agotamiento de memoria y recursion. | Corregido con `npm audit fix` sin `--force` |
| 4 | MEDIO | `app/components/PublicHome.tsx` en la generacion del enlace WhatsApp | Los datos del formulario se incluyen en el parametro `text` de una URL. Esto es parte del funcionamiento solicitado, pero puede quedar en historial, telemetria o registros de navegacion. | Riesgo residual documentado |

### OWASP Top 10 aplicable

- **A03 Injection:** no se observo una inyeccion explotable. React escapa el
  contenido mostrado y `encodeURIComponent` codifica el mensaje de WhatsApp.
- **A05 Security Misconfiguration:** era aplicable por la ausencia inicial de
  cabeceras; se corrigio en `next.config.ts`. La entrega real debe verificarse
  en el CDN o reverse proxy.
- **A06 Vulnerable and Outdated Components:** aplicable y bloqueante por el
  resultado de `npm audit`.
- **A07 Identification and Authentication Failures:** no aplicable; no existe
  autenticacion ni area privada.
- **A08 Software and Data Integrity Failures:** riesgo de cadena de suministro
  por dependencias vulnerables; requiere actualizar y verificar lockfile.
- **A09 Security Logging and Monitoring Failures:** no se puede evaluar desde
  este repositorio; no existe backend ni telemetria propia.
- **A10 SSRF:** no hay destinos remotos controlados por visitantes. El riesgo
  potencial de la optimizacion de imagenes queda condicionado a la version de
  Next y debe corregirse actualizando dependencias.
- A01 Broken Access Control, A02 Cryptographic Failures y A04 Insecure Design
  no presentan una superficie relevante en la arquitectura actual; el
  tratamiento de datos en WhatsApp queda como riesgo de privacidad residual.

## 4. Correcciones implementadas

### Formulario de reservas

En `app/components/PublicHome.tsx` se agregaron:

- Limites de longitud para nombre, telefono, correo y comentarios.
- Validacion de caracteres y cantidad minima de digitos del telefono.
- Validacion estricta de formato y existencia de fechas.
- Verificacion de que la cabina seleccionada pertenezca al catalogo local.
- Verificacion de que adultos mas ninos no excedan la capacidad.
- Normalizacion mediante `trim()` antes de construir el mensaje.
- Atributos `maxLength`, `max`, `autoComplete` e `inputMode` en los controles.

No se cambio el destino, el formato funcional del enlace ni el flujo de
apertura de WhatsApp.

### Cabeceras HTTP

En `next.config.ts` se configuraron para todas las rutas:

- `Content-Security-Policy` sin dominios externos, con las excepciones minimas
  necesarias para hidratacion de Next, estilos inline existentes e imagenes
  locales.
- `X-Content-Type-Options: nosniff`.
- `Referrer-Policy: strict-origin-when-cross-origin`.
- `X-Frame-Options: DENY`.
- `Permissions-Policy` restringiendo camara, microfono, geolocalizacion y pago.
- `Strict-Transport-Security` solo en produccion.

Los enlaces a mapas y redes sociales abiertos en nueva pestaña usan
`rel="noopener noreferrer"`.

## 5. Comprobaciones sin vulnerabilidad confirmada

- No hay `dangerouslySetInnerHTML`, `innerHTML`, `eval`, `new Function` ni
  generacion de HTML desde entrada del usuario.
- No hay parametros de URL usados como contenido o destino.
- Las imagenes son rutas locales estaticas; no hay `remotePatterns` arbitrarios.
- Facebook, Instagram, mapas y WhatsApp usan destinos constantes en el codigo.
- `.env*`, `.pem`, logs y artefactos de build estan excluidos en `.gitignore`.
- No se encontraron tokens, claves privadas, certificados ni credenciales en
  los archivos revisados ni en el historial Git local accesible.
- `app/services/api.ts` no es utilizado por los componentes revisados. Si se
  activa, `NEXT_PUBLIC_API_URL` no debe contener secretos y debe usar HTTPS en
  produccion.

## 6. Dependencias pendientes

Resultado de `npm audit`:

```text
5 vulnerabilities (4 high, 1 critical)
```

Resultado de `npm audit --omit=dev`:

```text
3 vulnerabilities (2 high, 1 critical)
```

Next.js y `eslint-config-next` se actualizaron de forma explicita a 16.4.3,
dentro de la misma version mayor. Luego se ejecutaron las correcciones
transitivas con `npm audit fix` sin `--force`; el lockfile quedo regenerado.
No se actualizaron versiones mayores automaticamente.

## 7. Recomendaciones para produccion

1. Actualizar las dependencias afectadas antes de publicar y volver a ejecutar
   todas las pruebas.
2. Servir exclusivamente por HTTPS con certificado valido y redireccion HTTP a
   HTTPS. Verificar que HSTS se entregue desde el dominio productivo.
3. Confirmar en el CDN o reverse proxy las cabeceras definidas en
   `next.config.ts`; no exponer el servidor de desarrollo.
4. No permitir dominios remotos arbitrarios en `next/image` ni subir/procesar
   SVG o imagenes de terceros sin validacion y aislamiento.
5. Mantener `.env.local`, credenciales, logs, `.next` y artefactos fuera del
   repositorio y del servidor publico.
6. Revisar la politica de privacidad para indicar que los datos se transfieren
   a WhatsApp, un tercero, mediante una URL preparada por el navegador.
7. Evitar almacenar URLs completas del formulario en analitica, proxies o
   logs; minimizar los datos incluidos en comentarios cuando sea posible.
8. Revisar periodicamente dependencias y proteger la rama de produccion con
   revisiones de cambios y escaneo de secretos.

## 8. Resultado de pruebas

| Prueba | Resultado |
|---|---|
| `npm audit` | PASS: 0 vulnerabilidades |
| `npm audit --omit=dev` | PASS: 0 vulnerabilidades |
| `npx tsc --noEmit` | PASS |
| `npm run lint` | PASS |
| `npm run build` | PASS con Next.js 16.4.3 |
| Servidor local `next start` + solicitud HTTP a `/` | PASS: se observaron CSP, HSTS, `nosniff`, Referrer-Policy, X-Frame-Options y Permissions-Policy |
| Pruebas externas/destructivas | No ejecutadas |

## 9. Veredicto

**APTO CON OBSERVACIONES.** La vulnerabilidad critica y las vulnerabilidades
altas reportadas inicialmente fueron corregidas y las pruebas locales pasan.
El codigo de la aplicacion y sus controles de formulario no muestran XSS ni
inyecciones confirmadas, pero este resultado no sustituye la verificacion de
HTTPS, CDN, HSTS, logs, politica de privacidad y despliegue real. Debe
mantenerse un proceso de actualizacion y escaneo de dependencias.
