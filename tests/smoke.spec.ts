import { test, expect } from '@playwright/test';

test('home: SEO básico, CTA WhatsApp/correo y schema LocalBusiness', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/.+/);
  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /^https?:\/\//);
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /og\.png$/);

  await expect(page.locator('a[href^="https://wa.me/"]').first()).toHaveAttribute('href', /\?text=.+/);
  await expect(page.locator('[data-section="cta"] a[href^="mailto:"]')).toHaveAttribute('href', /subject=/);

  const schemas = await page.locator('script[type="application/ld+json"]').allTextContents();
  const parsed = schemas.map((s) => JSON.parse(s) as Record<string, unknown>);
  const types = parsed.map((s) => s['@type']);
  expect(types).toContain('FAQPage');
  expect(types).toContain('LocalBusiness');
  const org = parsed.find((s) => s['@type'] === 'LocalBusiness');
  expect(org?.['contactPoint']).toMatchObject({ contactType: 'sales' });
});

test('secciones clave, certificaciones placeholder y cifras demo', async ({ page }) => {
  await page.goto('/');
  for (const id of ['capacidades', 'industrias', 'calidad', 'proceso', 'preguntas', 'ubicacion', 'rfq']) {
    await expect(page.locator(`section#${id}`)).toBeAttached();
  }
  for (const industry of ['Automotriz', 'Aeroespacial', 'Electrodomésticos']) {
    await expect(page.locator('#industrias h3', { hasText: industry })).toBeVisible();
  }
  // Ninguna certificación real afirmada: todas son TODO-CLIENTE.
  const certs = page.locator('[data-testid="certifications"] li');
  expect(await certs.count()).toBeGreaterThan(0);
  for (const text of await certs.allTextContents()) expect(text).toContain('TODO-CLIENTE');
  await expect(page.locator('[data-testid="stats-demo"]')).toBeVisible();
  await expect(page.locator('#capacidades table tbody tr')).not.toHaveCount(0);
  await expect(page.locator('[data-section="hero"] img')).toHaveAttribute('src', /\.webp$/);
});

test('click en WhatsApp dispara whatsapp_click y correo email_click', async ({ page, context }) => {
  await context.route('https://wa.me/**', (r) => r.abort());
  await page.goto('/');
  await page.evaluate(() => document.querySelectorAll('a[href^="mailto:"]').forEach((a) => a.addEventListener('click', (e) => e.preventDefault())));
  await page.locator('[data-section="cta"] a[href^="https://wa.me/"]').click();
  await page.locator('[data-section="cta"] a[href^="mailto:"]').click();
  const events = await page.evaluate(() => window.dataLayer.map((e) => (e as { event?: string }).event));
  expect(events).toContain('whatsapp_click');
  expect(events).toContain('email_click');
});

test('RFQ: éxito dispara generate_lead', async ({ page }) => {
  await page.goto('/#rfq');
  await page.fill('#f-company', 'Empresa de Prueba SA de CV');
  await page.fill('#f-name', 'Ing. Prueba');
  await page.fill('#f-email', 'compras@prueba.test');
  await page.fill('#f-part', 'PN-0001 rev. A, buje de acero 4140');
  await page.selectOption('#f-service', 'Acero inoxidable');
  await page.selectOption('#f-volume', { index: 3 });
  await page.fill('#f-drawings', 'https://example.com/planos/pn-0001');
  await page.check('#f-nda');
  await page.waitForTimeout(3100); // trampa de tiempo mínimo del endpoint
  await page.click('#lead-form button[type="submit"]');
  await expect(page.locator('#form-status')).toContainText('Gracias');
  const lead = await page.evaluate(() => window.dataLayer.find((e) => (e as { event?: string }).event === 'generate_lead'));
  expect(lead).toMatchObject({ service: 'Acero inoxidable', volume: '5,000–50,000 pzs/año', source: 'rfq_form' });
});

test('RFQ: no hay subida de archivos y el link a planos se valida', async ({ page }) => {
  let posted = false;
  await page.route('**/api/lead.php', (r) => {
    posted = true;
    return r.fulfill({ status: 200, body: '{"ok":true}' });
  });
  await page.goto('/#rfq');
  await expect(page.locator('#lead-form input[type="file"]')).toHaveCount(0);
  await page.fill('#f-company', 'Empresa');
  await page.fill('#f-name', 'Contacto');
  await page.fill('#f-email', 'compras@prueba.test');
  await page.fill('#f-part', 'PN-0002');
  await page.fill('#f-drawings', 'no-es-un-link');
  await page.click('#lead-form button[type="submit"]');
  await page.waitForTimeout(300);
  expect(posted).toBe(false);
});

test('endpoint PHP valida campos obligatorios y el link', async ({ request }) => {
  const res = await request.post('/api/lead.php', {
    form: { company: 'X', name: 'Contacto', email: 'no-correo', part: 'PN', drawings_url: 'javascript:alert(1)' },
  });
  expect(res.status()).toBe(422);
  const json = (await res.json()) as { fields: string[] };
  expect(json.fields).toEqual(expect.arrayContaining(['company', 'email', 'part', 'drawings_url']));
});

test('RFQ: error muestra fallback a WhatsApp', async ({ page }) => {
  await page.route('**/api/lead.php', (r) => r.fulfill({ status: 500, body: '{"ok":false}' }));
  await page.goto('/#rfq');
  await page.fill('#f-company', 'Empresa');
  await page.fill('#f-name', 'Contacto');
  await page.fill('#f-email', 'compras@prueba.test');
  await page.fill('#f-part', 'PN-0003');
  await page.click('#lead-form button[type="submit"]');
  await expect(page.locator('#form-status a[href^="https://wa.me/"]')).toBeVisible();
});

test('formulario: honeypot presente y oculto', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#f-website')).toBeAttached();
  await expect(page.locator('#f-website')).not.toBeInViewport();
});

test('404 real y robots/sitemap', async ({ page, request }) => {
  const res = await request.get('/no-existe-esta-ruta');
  expect(res.status()).toBe(404);
  expect((await request.get('/404.html')).status()).toBe(200);
  expect(await (await request.get('/robots.txt')).text()).toContain('Sitemap:');
  expect((await request.get('/sitemap-index.xml')).status()).toBe(200);
  await page.goto('/404.html');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
});

test('sin scroll horizontal y footer visible', async ({ page }) => {
  await page.goto('/');
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(0);
  await page.locator('footer').scrollIntoViewIfNeeded();
  await expect(page.locator('footer')).toBeVisible();
});

test('capturas', async ({ browser }, info) => {
  // Captura en un contexto con deviceScaleFactor 1: con DPR 2 la página completa en móvil supera el
  // límite de textura de Chrome (16384 px) y la captura repite secciones.
  const mobile = info.project.name === 'mobile';
  const width = mobile ? 360 : 1280;
  const context = await browser.newContext({ viewport: { width, height: 800 }, deviceScaleFactor: 1, isMobile: mobile });
  const page = await context.newPage();
  await page.goto('/');
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  await page.setViewportSize({ width, height });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: `shots/${info.project.name}.png` });
  await context.close();
});
