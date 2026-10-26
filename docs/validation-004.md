# Issue 004 validation

Complete for the stated scope. Reviewed on **26 October 2026**. Issue 004 covers **19 October 00:00 UTC through 26 October 00:00 UTC, exclusive**, the most recent full Monday–Sunday week. Its publication date is 26 October.

The new issue, reporting notes, index, RSS and static export are delivered. Existing application code, CSS, metadata, build configuration, dependencies, manifest and lockfile are unchanged. Issues 001–003 are byte-identical to the inputs. Issue 001 already has the permitted corrected date, 10 October; no historical issue needed editing.

## Requirements and scope

| Requirement | Result and evidence |
| --- | --- |
| New issue in the exact schema | Met: `issues/004.json`; six-word lead headline, three lead paragraphs, three new projects, three audit findings, three signed answers, weekly leaders, watch and allowed glossary |
| Current full week and publication date | Met: 19–25 October; published 26 October; story dates retained in `artifacts/004-story-evidence.json` |
| Plain reporting and permitted links | Met: prose/content validation and editorial review; all story sources are public API records; Visit links are project sites |
| Every issue, newest first | Met: four tabs, index entries and RSS items; only No. 004 tagged Latest |
| Publication, leader scope and online labels | Met: preserved existing implementation in `src/App.tsx:149`, `:164` and `:250`; tested with all four actual issues |
| Immutable history and design | Met: SHA-256 comparison and Git diff; no application or style changes |
| Static export and offline reading | Met: complete `dist/`, relative assets, embedded data, no external script or runtime API; offline controls and no-JavaScript reading tested |
| Primary controls and responsive layouts | Met: 58 existing and 49 supplemental checks; rendered screenshots and manual browser review |
| First screen at 390px | Met: masthead, Latest tab, source switch and lead visible in the saved screenshot |
| Share metadata | Met: title, description, favicon, `og:title`, local 1200×630 `og:image`; assets resolve under a static subpath |
| Design documentation and attribution | Met: root `DESIGN.md`, six-domain review below, retained guide licenses and runtime notices |
| Install, preview, rebuild and actual results | Met: root `README.md`, commands/results below |
| Size and permitted paths | Met: final packaging check below; exact artifact path budget in `.gitignore` |
| Hosting | After review: delivery is the committed static export; no deployment or publishing transaction was performed |

The visual idea remains the existing newspaper: warm newsprint, a blackletter masthead, ruled editorial columns and restrained red ink. No replacement layout or visual system was introduced.

## Reporting and counting

Public API reads used `CHANGELOG.md-Weekly-Research/004 (public weekly newspaper)` as their User-Agent. Research covered publications, audit publications and individual reports, workflows, launches, oracle requests and details, hourly steps, jobs and individual job details, and health. Temporary HTTP 429 responses during the initial detail collection were resolved by pacing subsequent reads. Every required detail was obtained; no missing count was filled with a guess.

Publication selection examined **500 records over five pages**, including **448 dated within the week**. Audit selection examined **100 records**, including **43 within the week**. Duplicate social-post aggregators, repeated promotional projects, offensive material, copycats and financial speculation were excluded. Swarmstreet was considered but omitted after its Visit URL returned HTTP 404. The five selected project URLs returned HTTP 200. Their public pages were inspected read-only; no account connection, pairing, booking or transaction was attempted. Sworn redirects from its recorded project label to another site belonging to the same project.

The lead’s fencing library and its first learning view were inspected. The story says the rules are simplified and the site does not replace a coach. Tandem’s sync dialog requires both pages to remain open and re-pairing after reload; those conditions are in the article. Fieldkit explicitly uses practice payments, and a cancellation credit still needs collecting. IMD Stats is identified as a 21 October snapshot counting requests by creation date. HeroBoost’s answer checks its published description, and KEPT’s checks a release’s publication, not software quality. Audit stories describe possible harm in the reviewed version without asserting a live loss or a confirmed repair.

| Measure | Result and definition |
| --- | --- |
| Completed jobs | **847** completed records whose last update falls in the week; previous week **2,469** |
| Launches | **173** releases first recorded in the week and marked live when read |
| Answers | **163** requests marked `attested`, with `attestedAt` in the week |
| Online | **1,042** connected workers; `/health` snapshot at **01:01:05 UTC on 26 October** |
| Leaders | **Seat #1470: 19; Seat #588: 17; Seat #398: 16** accepted contributions |
| Meter | **17/100**: round(50 × 847 / 2,469), capped at 100; **66% fewer** completed jobs |

The jobs query was paginated to exhaustion: **15,107 records over 31 pages**. It includes jobs created before the reporting week, so a job need not be newly opened to count. The oracle query was also exhausted: **8,827 requests over 18 pages**. The 500 launch records extended back to **11 October**, covering both comparison weeks. **47 pagination boundary checks** found no missing same-timestamp records at the examined boundaries.

Individual details were read for **901 jobs** last updated during the week, across all parent states. Accepted nodes dated inside the window yielded **2,658 contributions with seat numbers**: 2,591 in completed jobs and 67 in blocked jobs. **Ten other accepted records lack a seat** and remain explicitly unattributed. Rankings count contributions, not distinct parent jobs; ties use the lower seat number. `leadersScope` is `this week`; lifetime seat totals were not substituted.

`/steps/hourly` returned a rolling **24-hour** series despite historical-window parameters. As in the existing paper, `numbers.accepted` therefore uses completed jobs, and its visible label stays “Completed jobs.” It is a disclosed weekly proxy, not an accepted-step total. A job’s last update stands in for completion time, and an accepted node’s last update stands in for acceptance time. The API is a current record; later updates, incomplete historical records and missing seat attribution can affect totals and ranks. Online is a publication-time snapshot, not a weekly average.

The compact trail retains **3,475 relevant job rows**, **1,053 answer rows**, dated launches, accepted-node attribution and full pagination metadata, rather than unrelated historical payloads. Page `returnedCount` is the original response size; `count` is the retained row count. Health evidence retains only the connected-worker count and timestamp. No machine configuration or credentials are included.

Saved evidence:

- [`004-counts.json`](../artifacts/004-counts.json): counting rows, weekly boundaries, accepted nodes, missing attribution and pagination checks.
- [`004-story-evidence.json`](../artifacts/004-story-evidence.json): selected publication dates, answer decoding, exclusions and editorial limits.
- [`evidence/004.json`](../evidence/004.json): reader-facing methods, metric sources and watch source. The watch schema has no source field, so the existing reporting-note mechanism supplies it.

The existing checker recalculated issue 004 and the retained issue 003 trail successfully. It explicitly reports the older raw trails for issues 001 and 002 as unavailable. API signatures and the underlying facts behind attestations were read, not independently cryptographically verified.

## Build and interaction verification

Dependencies were installed outside the repository using the unchanged manifest and lockfile. A disposable mirror used those dependencies; the final export was copied back and checked against that mirror byte for byte. No dependency directory, package cache, browser binary, source map or registry archive entered the submission.

Commands actually run:

```sh
npm ci --prefix /tmp/changelog-004-deps --cache /tmp/changelog-004-npm-cache --no-audit --no-fund
PLAYWRIGHT_BROWSERS_PATH=/tmp/changelog-004-browsers node /tmp/changelog-004-deps/node_modules/playwright/cli.js install chromium webkit
# In /tmp/changelog-004-build, containing exact copies of the source and lockfile:
npm run typecheck
npm run build
npm run check
PLAYWRIGHT_BROWSERS_PATH=/tmp/changelog-004-browsers npm test
# From the repository, against the copied final dist/:
PLAYWRIGHT_BROWSERS_PATH=/tmp/changelog-004-browsers node test/scratch/review.mjs --inspect
PLAYWRIGHT_BROWSERS_PATH=/tmp/changelog-004-browsers IMD_PLAYWRIGHT=/tmp/changelog-004-deps/node_modules/playwright/index.mjs node .imd/reads/skills/design-critic/scripts/taste.mjs --out test/scratch/taste
node scripts/check-content.mjs
node scripts/check-evidence.mjs
python3 test/scratch/research/integrity.py
git diff --check
```

Temporary research and supplemental verification scripts live in the task’s scratch area and are removed before submission. The existing production, typecheck, content/evidence and 58-check browser scripts remain reproducible from the delivered source. Their exact results are retained in the named artifacts.

| Check | Actual result |
| --- | --- |
| TypeScript | `tsc --noEmit`, exit 0 |
| Production build | Vite **7.3.7**, exit 0; all four issues embedded and latest pre-rendered |
| Content/evidence | Exit 0; exact schemas, allowed links, index, dated stories, answer decoding, counts, leaders and meter agree |
| Existing browser suite | **58 checks passed**, Chromium **156.0.8078.4** |
| Supplemental browser checks | **49 passed**, including all four actual issue links, dates, leader scopes, source visibility, Visit links, disclosures, metadata assets and embedded-source equality |
| Automated accessibility | Zero axe violations at **1440, 1024, 768, 390 and 320px**, and in the open glossary |
| Supplemental reflow | No document overflow or cross-paragraph word collision at **320, 390, 592, 768, 848, 1072, 1280 and 1440px** |
| External resources | Only Google Fonts; all three intended font families loaded |
| Runtime failures | No application console errors or failed application resources |
| Offline | Reading, sources and disclosures work with external requests blocked; fallback fonts reflow |
| No JavaScript | Latest edition readable in pre-rendered HTML |
| Enlarged text | 200% root text size at 390px remains within the viewport; this is not native browser zoom |
| Static subpath and RSS | Nested hosting, local relative URLs, every issue’s anchor and all four newest-first RSS items pass |

The main suite also tests Arrow/Home/End navigation, browser Back, tab focus/selection, glossary Escape/focus return, Read more/less by keyboard, all-time legacy headings, unknown issue fallback and empty editorial sections in an isolated fixture. Sources begin hidden; all Visit links remain visible.

A supplemental focus assertion initially used programmatic focus after a pointer action. The harness was corrected to use ArrowRight/Home, and the visible two-pixel keyboard outline passed. Application code did not change. The rerun’s final results are in [`004-render-review.json`](../artifacts/004-render-review.json).

The supplied browser tool also inspected the actual final export at **1280×720**, toggled sources, opened and dismissed the glossary, selected issue 001 with its 10 October date, and used Home to return to `#no4`. Its resource list contained nine successful requests, with Google Fonts the only external hosts, and zero console errors. The preview was stopped after inspection.

The pinned probe’s suspected lead overlaps were checked with DOM Ranges around **123 word fragments at each of eight widths**, finding **zero cross-paragraph collisions**. Visual inspection of the mobile and full desktop screenshots confirmed ordinary column flow. The latest tab, source switch and lead fit on the **390×844** first screen: tab approximately y=291–335, switch y=343–387, headline y=450–540.

Retained screenshots were generated from the final export and inspected:

- [390px first screen](../artifacts/004-screenshots/mobile-first-screen.jpg)
- [1440px full paper](../artifacts/004-screenshots/desktop.jpg)
- [Open glossary and close focus](../artifacts/004-screenshots/glossary.jpg)
- [Keyboard focus on Latest](../artifacts/004-screenshots/keyboard-focus.jpg)

The generated `dist/assets/feed-BHU0HGvw.xml` serves the RSS-discovery link; `dist/feed.xml` serves the footer. Both equal root `feed.xml` and are retained. Application JavaScript and CSS retain their original filenames and bytes.

## Better Interface review

The pinned workflow, core principles of accessibility, layout, writing, typography, colors and UI, and design-documentation method were read and applied. Root [`DESIGN.md`](../DESIGN.md) records actual source tokens, font roles, spacing, components, states and breakpoints. Included licenses remain in [`design-guidance-licenses.txt`](design-guidance-licenses.txt). The wallet references were read; wallet infrastructure does not apply to this newspaper.

| Domain | Coverage, evidence and disposition |
| --- | --- |
| Accessibility — Checked | Reviewed native links, buttons, disclosures, labelled switch, tab semantics and native dialog in `src/App.tsx:41`, `:48`, `:225`, `:252`, `:267`. Exercised keyboard navigation, dialog Escape/focus return, selected states and visible focus (`src/styles.css:44`). Axe checks passed. Inline glossary targets retain the inline-text exception. No native screen-reader session was performed. |
| Layout — Checked | Reviewed `src/styles.css:54`, `:70`, `:84`, `:89` and all three responsive blocks. Eight supplemental widths, five suite widths and inspected screenshots establish reflow. The tab strip intentionally scrolls sideways; the document does not. Paragraph-box overlap is a probe false positive resolved by screenshot and word-fragment checks below. Native zoom and an RTL variant were not tested; no RTL variant is shipped. |
| Writing — Checked | Reviewed all of `issues/004.json`, especially `:21`, `:27`, `:35`, `:44`, `:63`, `:68`, `:73`, and counting notes at `evidence/004.json:5`. Clarified direct pairing limits, practice-only booking, dated statistics and the scope of attestations. Audit harm remains conditional. Numbers and missing attribution are explained. Prose validation found no prohibited story content. |
| Typography — Checked | Reviewed font roles and requested weights, `src/styles.css:12`, `:55`, `:86`, `:89`, `:116`, and responsive rules. Intended fonts loaded; real headline wrapping, fallback fonts and text enlargement were checked. Existing four weights, compact metadata and more than six sizes are preserved under the brief’s explicit design constraint. |
| Colors — Checked | Reviewed semantic tokens at `src/styles.css:3`, focus, severity and selected states. Measured actual opaque pairs: ink/paper **14.30:1**, accent/paper **5.54:1**, muted/paper **5.49:1**, ink/panel **12.92:1**, accent/panel **5.01:1**, muted/panel **4.97:1**. Written labels, outlines and selection state supplement color. These six samples are not exhaustive coverage of every state or translucent layer. |
| UI — Checked | Exercised existing tabs, switch, glossary and disclosures; date, figures, leaders and watch update with the selected issue. Reviewed static meter semantics, empty states and hover/focus rules. Sources remain off initially and Visit links stay outside disclosures. No account flow, form submission, animation or runtime loading dependency was added. Animation-panel slow replay is not applicable because the paper has no animated transitions. |

No application defect requiring a source change was found within this edition’s scope. Applicable corrections are editorial precision and complete reporting evidence; requested date, leader-scope and online behavior already existed. All content goes through the existing components.

## Pinned design probe and inherited exceptions

The required probe ran from the repository root against final `dist/`. Its unchanged report is [`004-taste.json`](../artifacts/004-taste.json): **9 passes and 7 flags out of 16**. Render, targets, contrast, glyphs, slogans, repetition, chrome, motion and share metadata passed.

| Flag | Source and confirmed disposition |
| --- | --- |
| Layout | Three paragraph/inline-term box overlaps at 1440px, within the two-column lead at `src/styles.css:89`. Bounding boxes span separated column fragments. Screenshot inspection and 123 word-fragment rectangles per width show zero actual cross-paragraph collisions. Raw flag retained; no CSS change. |
| Casing | 28 uppercase content boxes from inherited print labels; `src/styles.css:56`, `:117`, `:122`, `:133`. Preserved under the brief. |
| Tracking | 30 tracked boxes from those same existing label styles. Preserved under the brief. |
| Eyebrows | 14 detected labels, including the newspaper’s kickers and some Visit links classified by proximity. Preserved under the brief. |
| Type sizes | 14 repeated sizes at each measured width; 20/19 including one-offs, versus the house bar of six/eight. Existing system unchanged. |
| Type faces | Three families and four weights, versus the house preference of at most three weights. Existing font roles retained. |
| Copy budget | 86 words of prose on the first phone screen and 164 on desktop, above the probe’s 60/90 marketing-style bar. This is an editorial reading product using the unchanged newspaper layout. |

The brief explicitly requires **“Keep the existing site's design, layout and code exactly as they are.”** That requirement governs these inherited stylistic exceptions. Removing kickers, changing the type system or reshaping the front page would violate it. The flags remain reported; they are not relabelled as passes.

## Limitations and final packaging

WebKit was downloaded outside the repository but failed to launch: **“Host system is missing dependencies to run browsers”**, including GTK and GStreamer libraries. No Safari result is claimed. Firefox, physical devices, native screen readers, native browser zoom, forced-colors rendering and print rendering were not tested. Source rules for forced colors and print exist, but presence is not a rendered pass. Accessibility automation and screenshots do not establish full accessibility compliance. Third-party site visits do not certify their security, complete functionality or availability after reporting.

The explicit `.gitignore` budget allows only the nine named issue 004 evidence files: at most **2 MiB JSON plus 0.75 MiB JPEG screenshots**. Retained issue 003 artifacts keep their **3.75 MiB** budget. All other paths share **1.5 MiB**, within the total **8 MiB** limit. Generated dependencies and caches remain excluded at every nesting level. Historical reporting evidence, complete source, unchanged lockfile and all required runtime assets remain present.

Final packaging passed: **60 submission files, under 6 MiB uncompressed**, against the **8 MiB** limit. The complete export is **372,822 bytes** and matches the tested mirror byte for byte. Issue 004 evidence uses **1,291,349 bytes of JSON** and **652,853 bytes of JPEGs**, within its separate budgets. All four issues, both RSS copies, the source and unchanged lockfile are retained. No submodule, symlink, dependency directory, cache, source map or dependency archive is in the submission set. Temporary browser captures were removed and preview servers stopped. Immutable-path, schema/evidence, embedded-source, index/RSS and relative-asset checks passed; `git diff --check` passed. These are the contributor’s own results, not independent authority.
