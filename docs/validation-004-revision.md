# Issue 004 revision validation

Complete for the stated revision scope. Both reported defects were reproduced before changing source, fixed, and rechecked against the rebuilt static export. This supplements the historical [issue 004 review](validation-004.md); it supersedes that review's fallback-layout and Safari coverage claims. These are contributor-side measurements, not independent certification.

## Reproduction and changes

**Masthead overflow — high, fixed.** Original locations: `src/styles.css:223` and `:254`. The first Chromium run with this machine's narrower serif substitute did not overflow. Selecting the standard DejaVu system font set reproduced the failure without changing application CSS. With Google Fonts blocked before navigation, WebKit 27.2 reproduced the reviewer's exact measurements:

| Viewport width | Original document width, WebKit | Original document width, Chromium | Final document width, both engines |
| ---: | ---: | ---: | ---: |
| 320 | 328 | 327 | 320 |
| 390 | 396 | 392 | 390 |
| 768 | 800 | 798 | 768 |
| 848 | 880 | 881 | 848 |

Final implementation: `src/styles.css:222` and `:255` retain the original responsive size expressions in `--masthead-size`, with a 0.9 initial scale. The masthead grid can shrink to its container. At `src/App.tsx:204`, the fitting effect starts from the original size, measures the actual text with a DOM Range, and reduces it only when it exceeds the row. It remeasures after font loading and viewport/container resize. Up to three measurements accommodate the observed font rounding; observers and listeners are cleaned up. No text is hidden, clipped, ellipsized or transformed. Before hydration, the smaller CSS size also keeps the reported fallback widths usable.

The loaded gothic face retains its original sizes: approximately **37.28, 45.435, 92.16 and 101.76px** at the four reported widths. A delayed-font test resizes while the font request is pending, then releases the real font and verifies restoration to the original size. The desktop layout is unchanged.

**Publication-date hydration — advisory, fixed.** Original and final formatter location: `src/App.tsx:17`. WebKit 27.2 on Debian with ICU 76 retained the comma and did not reproduce the issue. The same WebKit release's Ubuntu build with ICU 74 reproduced it at all five baseline widths, with fonts blocked and loaded: `Monday, 26 October 2026` became `Monday 26 October 2026`, one React #418 error occurred, and the original heading node was replaced. The formatter now uses `Intl.DateTimeFormat.formatToParts` and explicit separators, preserving UTC. Final tests hold the application script until they capture the pre-rendered node and date, then release it and assert that both survive hydration. Dates also remain correct when navigating to the oldest issue in an America/Los_Angeles browser timezone.

No issue, counting evidence, index, feed, metadata, dependency or build-configuration file changed. No fifth issue was added. The only application changes are these two fixes; the new browser test directly covers their failure modes. The complete rebuilt `dist/` is included, with obsolete hashed JS/CSS removed.

## Commands and results

Dependencies were installed from unchanged copies of `package.json` and `package-lock.json` into `/tmp/changelog-revision-deps`; an exact source mirror at `/tmp/changelog-revision-build` used them. Browser downloads and missing system libraries were also kept under `/tmp`. Nothing was installed into the repository's dependency directories. The mirror's final export was copied back and compared byte for byte.

Commands actually run:

```sh
npm ci --prefix /tmp/changelog-revision-deps --cache /tmp/changelog-revision-npm-cache --no-audit --no-fund
PLAYWRIGHT_BROWSERS_PATH=/tmp/changelog-revision-browsers node /tmp/changelog-revision-deps/node_modules/playwright/cli.js install chromium webkit
# In the source mirror:
npm run typecheck
npm run build
npm run check
npm test
PAPER_TEST_FONT_TRANSPORT=node node scripts/test-rendering.mjs
# From the repository, against the final copied export:
node .imd/reads/skills/design-critic/scripts/taste.mjs --out test/scratch/taste
node scripts/check-content.mjs
node scripts/check-evidence.mjs
git diff --check
```

Browser commands used task-specific `PLAYWRIGHT_BROWSERS_PATH`, `PLAYWRIGHT_WEBKIT_EXECUTABLE`, `FONTCONFIG_FILE`, library/graphics paths and `IMD_PLAYWRIGHT` to locate the temporary runtimes. DejaVu Serif was selected through a temporary fontconfig file, without changing the site's fallback stack. The Ubuntu WebKit browser came from the same official Playwright build, with its matching ICU library. No browser binary, font, package cache, registry archive or runtime library is submitted.

| Check | Actual result |
| --- | --- |
| Typecheck | `tsc --noEmit`, exit 0 |
| Production build | Vite 7.3.7, exit 0; all four issues embedded |
| Content/evidence | Exit 0; index/schema checks pass; saved arithmetic/story trails for 003 and 004 pass; 001 and 002 raw trails remain unavailable |
| Existing interaction suite | **58 passed**, Chromium 156.0.8078.4 |
| Focused regression suite | **251 passed**, Chromium 156.0.8078.4 and WebKit 27.2 (Ubuntu/ICU 74) |
| Regression widths | **320, 390, 592, 768, 848, 849, 1072, 1440px**, with blocked and loaded fonts, plus live resize sequences and delayed font loading |
| Hydration | Original heading node and publication date preserved at every matrix width; zero application/hydration/local-resource errors |
| Primary interactions | Sources switch, persistent Visit links, archive Home/End and dates, glossary keyboard opening/Escape/focus return, Read more/less in both engines; full existing suite also checks history, unknown issue and empty states |
| Accessibility automation | Zero axe violations at 320, 390, 768, 1024 and 1440px, and in the open glossary |
| Other existing-suite checks | 200% root text enlargement, no-JavaScript latest edition, offline reading, metadata, nested static hosting, relative assets, all four RSS entries |
| First screen | Inspected 390×844 screenshots with fonts blocked and loaded: masthead, Latest tab, sources switch and lead visible |
| Assigned browser tool | Inspected final export at 390 and 1440px; exercised sources, archive and glossary; zero new page errors, no document overflow |
| Pinned design probe | **9 pass, 7 flags**, detailed below |

The regression test is delivered as [`scripts/test-rendering.mjs`](../scripts/test-rendering.mjs). It normally uses direct browser font requests. This machine's Ubuntu WebKit lacks a working TLS module, so `PAPER_TEST_FONT_TRANSPORT=node` fetched real Google Fonts responses through Node and returned those unchanged bytes at the same browser URLs. All three intended font families were verified loaded. Blocked-font tests abort both Google hosts. The production page has no proxy or added network dependency. Chromium's existing suite, assigned browser inspection and pinned probe used direct Google Fonts requests successfully.

Full baseline measurements, final regression results, existing-suite results and probe checks are retained in [`revision-004-checks.json`](revision-004-checks.json). Inspected final screenshots are retained for [WebKit fallback at 390px](revision-004-screenshots/webkit-blocked-390.jpg) and [WebKit gothic at 390px](revision-004-screenshots/webkit-loaded-390.jpg). The desktop screenshot was inspected in scratch storage; it is not retained as another large duplicate.

## Better Interface coverage

Applied the pinned workflow, core principles of all six domains, relevant typography/adaptivity guidance and design-documentation section. The request's instruction to preserve the accepted newspaper design governs inherited stylistic choices. [`DESIGN.md`](../DESIGN.md) describes the final fitting and date behavior. Existing design-guide notices remain unchanged.

| Domain | Coverage, findings and limitations |
| --- | --- |
| Accessibility — checked | Masthead remains complete, selectable text and the existing `h1`; no hidden overflow. Keyboard tabs, dialog focus return, disclosures and switch work in both engines. Existing axe scans pass. No native screen-reader session or physical-device testing. |
| Layout — checked | Confirmed and fixed the two narrow masthead breakpoints (`src/styles.css:222`, `:255`; `src/App.tsx:204`). Eight matrix widths, pre-hydration fallback, live resize and delayed fonts pass. Inspected mobile and desktop screenshots. Native browser zoom and RTL were not tested; no RTL variant ships. |
| Writing — checked | Publication date has identical punctuation across server and client (`src/App.tsx:17`). UTC and Covering wording retained. Story text and earlier issues are unchanged. No new product terminology or labels. |
| Typography — checked | Measured actual fallback glyph bounds and verified original loaded gothic sizes. All three intended font families load in both tested engines. Fallback, font arrival and resize are covered. Existing print hierarchy and spacing remain. Arbitrary user-installed fonts and all operating-system rendering engines are not exhaustively tested. |
| Colors — checked | Palette and focus tokens unchanged. Existing suite remeasured ink/accent/muted on paper: **14.30/5.54/5.49:1**; on panel: **12.92/5.01/4.97:1**. Probe contrast passes. Forced-colors rendering was not rechecked. |
| UI — checked | Both engines retain the pre-rendered page and exercise the existing primary controls. Loaded, unavailable and delayed font states are tested without adding a loading surface or changing reading flow. No new animation, account, wallet, tracker or external script. Print rendering remains untested. |

The final probe again flags casing, tracking, eyebrows, type sizes, type weights and first-screen copy budget. These are inherited newspaper choices explicitly preserved by the assignment, not new revision findings. Its seventh flag is the same three paragraph-box overlaps in the two-column lead (`src/styles.css:89`): the inspected final desktop screenshot shows separated text fragments with normal column flow. The probe itself reports **no horizontal scroll at 320, 390 or 1440**, no floating control covering text and no text clipped by hidden overflow. Its raw flags are retained rather than relabelled as passes.

## Integrity and delivery

Protected configuration, lockfile, all four issue files, index, feeds and reporting evidence remain byte-identical to the supplied revision baseline. The export matches the tested mirror, contains relative asset URLs and retains the local favicon/share image/notices. Google Fonts remains the only external reading dependency. `.imd-responses.json` answers both findings as fixed. The submission contains no dependency/cache directory, symlink, submodule or dependency archive. The existing ignore file was not changed; new review files fit within the existing allowance for non-artifact paths. Final byte counts are recorded in the README.

Known limits: Linux browser builds with emulated viewports, not physical Safari devices; no native zoom or screen-reader session; no exhaustive arbitrary-font coverage; WebKit loaded-font transport limitation above. The initial Debian WebKit result alone would have missed the ICU punctuation difference, so the final date regression explicitly used the reproducing Ubuntu/ICU 74 build.
