import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { chromium, webkit } from 'playwright';

// Run against the production export, including the wider system serif fallback.
// FONTCONFIG_FILE can select a system font set on Linux without changing the site.
const root = path.resolve('dist');
const output = path.resolve('test/scratch/rendering');
await mkdir(output, { recursive: true });
const mime = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.xml': 'application/xml' };
const server = createServer(async (request, response) => {
  try {
    const pathname = new URL(request.url, 'http://localhost').pathname;
    assert(pathname.startsWith('/preview/paper/'));
    const file = path.resolve(root, pathname.slice('/preview/paper/'.length) || 'index.html');
    assert(file.startsWith(root + path.sep));
    const body = await readFile(file);
    response.writeHead(200, { 'Content-Type': mime[path.extname(file)] || 'application/octet-stream' }).end(body);
  } catch { response.writeHead(404).end(); }
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const origin = `http://127.0.0.1:${server.address().port}`;
const url = `${origin}/preview/paper/`;
const report = { checks: [], browsers: [], measurements: [], errors: [], limitations: ['Emulated viewports, not physical devices or native zoom.'] };
const check = (name, condition) => { assert(condition, name); report.checks.push(name); };
const fontResponses = new Map();

async function routeFonts(context, mode, gate = Promise.resolve()) {
  await context.route('https://fonts.*.com/**', async route => {
    if (mode === 'blocked') return route.abort();
    if (new URL(route.request().url()).hostname === 'fonts.gstatic.com') await gate;
    if (process.env.PAPER_TEST_FONT_TRANSPORT === 'node') {
      // Optional transport for machines whose WebKit lacks a TLS module. Real Google
      // responses are reused unchanged; no font or dependency enters the export.
      const address = route.request().url();
      if (!fontResponses.has(address)) fontResponses.set(address, (async () => {
        const response = await fetch(address, { headers: { 'User-Agent': route.request().headers()['user-agent'] } });
        assert(response.ok, `Font response ${response.status}`);
        return { body: Buffer.from(await response.arrayBuffer()), contentType: response.headers.get('content-type') };
      })());
      return route.fulfill(await fontResponses.get(address));
    }
    return route.continue();
  });
}

async function measure(page, label) {
  const result = await page.evaluate(() => {
    const heading = document.querySelector('.masthead h1');
    const text = document.createRange(); text.selectNodeContents(heading);
    const bounds = text.getBoundingClientRect();
    const row = heading.parentElement.getBoundingClientRect();
    return {
      viewport: document.documentElement.clientWidth, document: document.documentElement.scrollWidth,
      textLeft: bounds.left, textRight: bounds.right, rowLeft: row.left, rowRight: row.right,
      fontSize: getComputedStyle(heading).fontSize, scale: heading.style.getPropertyValue('--masthead-scale'),
      date: document.querySelector('time').textContent,
      loadedFonts: [...new Set([...document.fonts].filter(font => font.status === 'loaded').map(font => font.family.replaceAll('"', '')))],
    };
  });
  report.measurements.push({ label, ...result });
  check(`${label}: no document overflow`, result.document === result.viewport);
  check(`${label}: entire masthead inside its row`, result.textLeft >= result.rowLeft - 1 && result.textRight <= result.rowRight + 1);
  return result;
}

async function interactions(page, label) {
  check(`${label}: sources initially hidden`, await page.locator('.source-link:visible').count() === 0);
  const visits = await page.locator('.visit-link:visible').count();
  await page.getByRole('switch', { name: 'Show sources' }).check();
  check(`${label}: sources revealed, visits retained`, await page.locator('.source-link:visible').count() > 0 && await page.locator('.visit-link:visible').count() === visits);
  await page.getByRole('switch').uncheck();
  await page.getByRole('tab', { selected: true }).focus();
  await page.keyboard.press('End');
  check(`${label}: oldest edition and UTC date`, page.url().endsWith('#no1') && await page.locator('time').textContent() === 'Saturday, 10 October 2026');
  await page.keyboard.press('Home');
  check(`${label}: latest edition and UTC date`, page.url().endsWith('#no4') && await page.locator('time').textContent() === 'Monday, 26 October 2026');
  const term = page.locator('.tagline .term').first();
  await term.focus(); await page.keyboard.press('Enter');
  check(`${label}: glossary opens`, await page.getByRole('dialog').isVisible());
  await page.keyboard.press('Escape');
  check(`${label}: glossary closes and restores focus`, !(await page.getByRole('dialog').isVisible()) && await term.evaluate(element => element === document.activeElement));
  const more = page.locator('.read-more').first();
  await more.locator('summary').focus(); await page.keyboard.press('Enter');
  check(`${label}: disclosure opens`, await more.getAttribute('open') !== null);
  await page.keyboard.press('Space');
  check(`${label}: disclosure closes`, await more.getAttribute('open') === null);
}

try {
  for (const engine of [chromium, webkit]) {
    const executablePath = engine === webkit ? process.env.PLAYWRIGHT_WEBKIT_EXECUTABLE : process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE;
    const browser = await engine.launch({ headless: true, ...(executablePath ? { executablePath } : {}) });
    report.browsers.push({ engine: engine.name(), version: browser.version() });
    try {
      for (const mode of ['blocked', 'loaded']) {
        const context = await browser.newContext({ viewport: { width: 390, height: 844 }, timezoneId: 'America/Los_Angeles' });
        await routeFonts(context, mode);
        for (const width of [320, 390, 592, 768, 848, 849, 1072, 1440]) {
          const page = await context.newPage();
          const label = `${engine.name()} ${mode} ${width}`;
          page.on('pageerror', error => report.errors.push({ label, message: error.message }));
          page.on('requestfailed', request => {
            if (request.url().startsWith(origin)) report.errors.push({ label, resource: request.url(), message: request.failure()?.errorText });
          });
          await page.setViewportSize({ width, height: 844 });
          let release;
          const scripts = new Promise(resolve => { release = resolve; });
          await page.route('**/assets/*.js', async route => { await scripts; await route.continue(); });
          await page.goto(url, { waitUntil: 'commit' });
          await page.locator('.masthead h1').waitFor();
          const before = await page.evaluate(() => {
            window.preRenderedHeading = document.querySelector('h1');
            return document.querySelector('time').textContent;
          });
          if (mode === 'blocked') await measure(page, `${label} before hydration`);
          release();
          await page.waitForLoadState('networkidle');
          await page.evaluate(() => document.fonts.ready);
          await page.waitForFunction(() => document.querySelector('h1').style.getPropertyValue('--masthead-scale') !== '');
          check(`${label}: hydration retains the existing tree and date`, await page.evaluate(date => document.querySelector('h1') === window.preRenderedHeading && document.querySelector('time').textContent === date, before));
          const result = await measure(page, label);
          if (mode === 'loaded') {
            check(`${label}: intended fonts loaded`, ['UnifrakturMaguntia', 'Newsreader', 'Libre Franklin'].every(family => result.loadedFonts.includes(family)));
            check(`${label}: original gothic size retained`, result.scale === '1');
          }
          if (width === 390) {
            await page.screenshot({ path: path.join(output, `${engine.name()}-${mode}-390.jpg`), quality: 80 });
            const tab = await page.getByRole('tab').first().boundingBox();
            const action = await page.getByRole('switch').boundingBox();
            const lead = await page.locator('#lead-headline').boundingBox();
            check(`${label}: product and main controls on first screen`, tab.y + tab.height < 844 && action.y + action.height < 844 && lead.y + lead.height < 844);
            await interactions(page, label);
            for (const next of [848, 320, 768, 1440, 390]) {
              await page.setViewportSize({ width: next, height: 844 });
              await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
              await measure(page, `${label} resized to ${next}`);
            }
          }
          await page.close();
        }
        await context.close();
      }
      const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
      let releaseFonts;
      const gate = new Promise(resolve => { releaseFonts = resolve; });
      await routeFonts(context, 'loaded', gate);
      const page = await context.newPage();
      page.on('pageerror', error => report.errors.push({ label: `${engine.name()} delayed fonts`, message: error.message }));
      await page.goto(url, { waitUntil: 'domcontentloaded' });
      await page.waitForFunction(() => document.querySelector('h1').style.getPropertyValue('--masthead-scale') !== '');
      await measure(page, `${engine.name()} font download pending`);
      await page.setViewportSize({ width: 768, height: 844 });
      await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
      await measure(page, `${engine.name()} resized during font download`);
      releaseFonts();
      await page.evaluate(() => document.fonts.ready);
      await page.waitForFunction(() => document.querySelector('h1').style.getPropertyValue('--masthead-scale') === '1');
      const result = await measure(page, `${engine.name()} font download completed`);
      check(`${engine.name()}: delayed gothic face restores original size`, result.loadedFonts.includes('UnifrakturMaguntia') && Math.abs(parseFloat(result.fontSize) - 92.16) < 0.01);
      await context.close();
    } finally { await browser.close(); }
  }
  check('No hydration, application or local resource errors in either browser', report.errors.length === 0);
  console.log(`Passed ${report.checks.length} rendering and interaction checks in Chromium and WebKit.`);
} catch (error) {
  report.failure = error.message;
  throw error;
} finally {
  await writeFile(path.join(output, 'results.json'), JSON.stringify(report, null, 2) + '\n');
  await new Promise(resolve => server.close(resolve));
}
