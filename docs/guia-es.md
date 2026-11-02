> Guía original de la plantilla. Las rutas a `scripts/new-project.sh` y `../../scripts/lighthouse.sh` son del repositorio interno de Revolution505.

# industrial-b2b-astro — Sitio de 1 página para proveedores industriales B2B (Astro 5 + Tailwind 4)

Para talleres de maquinado, fabricantes, metalmecánica, inyección de plástico, servicios industriales en
parques industriales. Demo **ficticia**: "Ferrovant Maquinados", maquinados CNC en El Marqués, Querétaro
(la empresa, las cifras y los datos de contacto no existen).

## Qué incluye
- **Hero** para compradores/ingenieros: CTA RFQ + correo, ilustración técnica generada localmente
  (`<Image>` de `astro:assets`, WebP responsivo) y franja de specs (tolerancia, lote, tiempo de cotización).
- **Cifras** de demo con aviso visible mientras `statsAreDemo: true`.
- **Capacidades**: 6 procesos con specs (mono), tabla de **materiales** y tabla de **tolerancias/acabados**.
- **Industrias**: automotriz, aeroespacial, electrodomésticos, equipo industrial (con piezas típicas).
- **Calidad**: prácticas de calidad + **certificaciones solo como placeholders `TODO-CLIENTE`** (el test falla si
  alguna certificación no contiene `TODO-CLIENTE`; cámbialo cuando el cliente entregue certificados vigentes).
- **Proceso de cotización** (5 pasos), **FAQ** (schema FAQPage), banda CTA **correo + WhatsApp**.
- **Planta**: dirección genérica de parque industrial, horario, notas de acceso (andén, recepción), mapa click-to-load.
- **Formulario RFQ**: empresa, contacto, correo corporativo, teléfono (opcional), número de parte/descripción,
  material, volumen anual, **link a planos** (`type=url`, validado http/https también en PHP; **sin subida de
  archivos**), notas, casilla "Requiero NDA". `mailto:` con asunto y cuerpo guía como alternativa.
- Schema `LocalBusiness` (configurable a `Organization`: omite geo/horario) con `contactPoint` de ventas,
  `knowsAbout` y `hasOfferCatalog`; WebSite con `publisher`.
- Igual que landing-astro: SEO/OG/canonical en `Base.astro`, GA4 (`generate_lead`, `whatsapp_click`,
  `phone_click`, `email_click`), `public/api/lead.php` (honeypot + tiempo mínimo + rate limit + `LEAD_DRY_RUN`),
  404 real, sitemap, robots, `scripts/php-router.php`.
- Identidad: grafito/acero + naranja de seguridad, IBM Plex Sans + monoespaciada del sistema para specs,
  esquinas rectas y fondo tipo plano técnico. Contraste AA.

Medido (26-oct-2026, mobile, Lighthouse 12, build servido con PHP local):
**Performance 99 · Accessibility 100 · Best Practices 100 · SEO 100**.
Playwright: **22/22** (11 pruebas × desktop 1280 + mobile 360). Capturas en `shots/`.

## Convertir en sitio de cliente en < 1 día
1. `bash scripts/new-project.sh industrial-b2b-astro <slug>` (desde la raíz de r505-studio).
2. Pide al cliente (checklist): razón social, dirección de la nave, correo de ventas, WhatsApp, procesos y
   **capacidad real** (envolventes, tolerancias), materiales, industrias/piezas típicas (sin nombres de sus
   clientes salvo permiso por escrito), **certificados vigentes** (PDF), cifras comprobables, fotos de planta.
3. Edita **solo** `src/config/site.ts` — busca `TODO-CLIENTE`:
   - `processes`, `materials`, `tolerances` (íconos: `lathe | mill | grind | wire | layers | gauge | car | plane | home | pulse | file | truck`).
   - `certifications`: pon norma + número de certificado **solo** si el cliente lo acredita; si no tiene,
     elimina la lista (y ajusta el test de certificaciones).
   - `stats` + `statsAreDemo: false` con cifras reales, o borra `<Stats />` de `src/pages/index.astro`.
   - `industries`, `rfqProcess`, `faq`, `form.materialOptions`, `form.volumeOptions`, `locationNotes`.
   - `schemaType`: `LocalBusiness` si reciben visitas en planta; `Organization` si no.
4. Imagen del hero: reemplaza `src/assets/hero-pieza.png` por foto real de planta/pieza (4:3, ≥ 1200 px).
   `npm run images` regenera la ilustración placeholder.
5. Colores en `src/styles/global.css` (`--color-brand-*`, `--color-accent-*`), `themeColor` en site.ts,
   favicon `public/favicon.svg` y la inicial del logo en `Header.astro`.
6. `npm run og` → `public/og.png`. `.env.local`: `PUBLIC_GA4_ID` (opcional Ads).
7. `npm run check && npm run build && npm test` y Lighthouse (abajo). Deploy según HANDOFF.

## Comandos
| Comando | Qué hace |
|---|---|
| `npm run dev` | Desarrollo en http://localhost:4321 (el formulario PHP no corre aquí) |
| `npm run check` | TypeScript estricto + diagnósticos Astro |
| `npm run build` | Build estático a `dist/` |
| `npm run preview:php` | Sirve `dist/` con PHP como Hostinger (formulario + 404 real) en :8794 |
| `npm test` | Playwright smoke (desktop 1280 + mobile 360) + capturas en `shots/` |
| `npm run og` / `npm run images` | Regenera `public/og.png` / la ilustración del hero |
| `bash ../../scripts/lighthouse.sh http://127.0.0.1:8794/` | Lighthouse mobile → `reports/` |

Para probar el formulario sin enviar correo: `LEAD_DRY_RUN=1 npm run preview:php`.

## Eventos GA4
| Evento | Cuándo | Parámetros |
|---|---|---|
| `generate_lead` | RFQ enviada con éxito | `service` (material), `volume`, `source` (`rfq_form`) |
| `whatsapp_click` | Click en cualquier `https://wa.me/…` | `location` (sección) |
| `phone_click` | Click en `tel:` | `location` |
| `email_click` | Click en `mailto:` (hero, CTA, RFQ, footer) | `location` |

**Verificar:** GA4 → Admin → DebugView con la extensión "Google Analytics Debugger"; haz cada acción.
Marca `generate_lead` y `email_click` como **eventos clave** (en B2B muchos compradores escriben por correo).

---

# HANDOFF (copiar a `clients/<slug>/HANDOFF.md` y completar)

## Cómo editar contenido
Todo el texto está en `src/config/site.ts`; imágenes en `src/assets/`. Cambiar → `npm run build` → subir `dist/`.

## Credenciales que crea el cliente (no se guardan aquí)
- Acceso al hosting/panel (Hostinger hPanel) y al dominio.
- Buzón `no-reply@<dominio>` para enviar las RFQ y buzón de ventas que las recibe (mismo dominio → SPF/DKIM).
- Propiedad GA4 (el cliente es dueño; nos da acceso de Editor).

## Deploy (Hostinger)
1. `npm run build`.
2. Subir el **contenido** de `dist/` a `public_html/` (incluye `.htaccess` y `api/lead.php`).
3. Copiar `lead-config.example.php` → `lead-config.php`, llenar `to`/`from` y subirlo al directorio
   **padre** de `public_html/` (no accesible por web).
4. Probar: enviar una RFQ real, abrir `/no-existe` (404), `/sitemap-index.xml`, `/robots.txt`.
5. Activar SSL y descomentar el bloque "Forzar HTTPS" en `.htaccess`.

## Planos y confidencialidad
El sitio **no recibe archivos**: el comprador comparte un link. Los planos quedan en la nube del comprador;
el correo de la RFQ solo contiene el link. Si el cliente necesita un portal de carga segura, es un proyecto aparte.

## Backups
Código en git (repo del proyecto). El sitio es estático: el respaldo es el propio `dist/` + repo.

## Mantenimiento mensual R505 (upsell)
Hosting administrado + SSL + monitoreo de disponibilidad + cambios de contenido menores (capacidades,
certificaciones nuevas, vacantes) + reporte mensual de GA4 (RFQs, clics a correo/WhatsApp).
Precio: ver `docs/pricing.md` (lo define Christian).
