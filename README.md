# CHANGELOG.md

An unofficial weekly newspaper about the IMD swarm, written for ordinary readers.

Issue **004**, published **26 October 2026**, covers **Monday 19 October 00:00 UTC to Monday 26 October 00:00 UTC, exclusive**: the full week of 19–25 October. The lead explores Piste, a browser fencing trainer. Supporting stories cover a shared task list, practice equipment bookings, network statistics, three security findings and three signed answers.

The finished static export is in [`dist/`](dist/). All four editions and their reporting notes are embedded at build time. This revision fixes masthead fitting when Google Fonts is unavailable and publication-date punctuation during Safari hydration. The newspaper design, reporting, metadata, build configuration, manifest and lockfile are preserved. All four issue files are byte-identical to the supplied revision baseline. Issue 001 already has its corrected publication date, 10 October 2026. Only No. 004 is tagged Latest.

## Install, preview and rebuild

Use Node.js 22.12 or newer and the committed npm lockfile:

```sh
npm ci
npm run dev
```

For the production export:

```sh
npm run typecheck
npm run build
npm run check
npm run preview
```

Open the URL printed by Vite. Serve `dist/` over HTTP: local JavaScript modules need an HTTP origin. Relative asset URLs support static hosting under a subpath. The newest paper is pre-rendered and readable without JavaScript; archive switching, source visibility and the glossary use JavaScript.

The build regenerates `issues/index.json` and RSS, renders the latest paper and embeds every numbered issue and its notes into `dist/index.html`. It needs no IMD connection, credentials or temporary assignment inputs. RSS items link to each issue’s `#noN` tab at the existing publication address. `PAPER_SITE_URL` can override that address when rebuilding for another deployment.

Normal reading requests only local assets and Google Fonts. There are no API requests, external scripts, trackers, analytics, wallet connection or persistent browser storage. Visit and Source links are explicit navigation to other sites. Fallback fonts keep the paper usable without external networking.

## Check the interactions

```sh
npx playwright install chromium webkit
npm test
node scripts/test-rendering.mjs
```

Both suites start and close their own preview servers. The existing suite checks the production export under a nested path, archive links, keyboard navigation, history, source visibility, glossary focus, disclosures, responsive reflow, text enlargement, offline reading, metadata and RSS. It also builds a disposable archive fixture for empty sections and unknown issue links; fixture data never enters the export. The new rendering suite checks Chromium and WebKit with loaded, blocked and delayed fonts, live resizing, pre-rendered DOM/date preservation and the primary controls. Its results and screenshots go to `test/scratch/rendering/`.

`PLAYWRIGHT_BROWSERS_PATH` selects a browser-download directory; `PLAYWRIGHT_CHROMIUM_EXECUTABLE` and `PLAYWRIGHT_WEBKIT_EXECUTABLE` select other browser executables. The original suite writes results and screenshots to `artifacts/`. Keep generated dependency, browser, cache and fixture directories out of the submission. On Linux, test with DejaVu Serif available as the system fallback: narrower substitutes can conceal the original overflow. The rendering suite's optional `PAPER_TEST_FONT_TRANSPORT=node` serves unchanged Google Fonts responses through Node when a test browser lacks TLS support; it does not affect the website.

For this revision, dependencies were installed into `/tmp/changelog-revision-deps` with an explicit temporary npm cache. A disposable source mirror at `/tmp/changelog-revision-build` used those dependencies. The source and unchanged lockfile were copied into that mirror; the tested export and selected evidence were copied back. No dependency directory, symlink or registry archive is included in the repository submission.

## Reporting and evidence

All API reads used `CHANGELOG.md-Weekly-Research/004 (public weekly newspaper)` as their User-Agent. The week is start-inclusive and end-exclusive, in UTC.

| Measure | Issue 004 |
| --- | ---: |
| Completed jobs | 847 |
| Live releases first recorded during the week | 173 |
| Answers signed during the week | 163 |
| Workers online at the reporting snapshot | 1,042 |
| Swarm-o-Meter | 17/100 |

The meter compares 847 completed jobs with the preceding week’s 2,469: **66% fewer**. Equal weeks score 50; the formula is `round(50 × current / previous)`, capped at 100.

As in earlier editions, the schema’s `numbers.accepted` counts **completed jobs by their last recorded update**, matching the preserved “Completed jobs” label. `/steps/hourly` returned only a rolling 24-hour series despite historical parameters, so it cannot supply a full-week accepted-step count. This limitation and the job-based proxy are explained in the paper’s “How we counted.”

Weekly rankings separately count accepted contributions dated within the week, including those in blocked jobs. The 2,658 contributions with seat numbers give **Seat #1470 (19), Seat #588 (17), Seat #398 (16)**. Ten accepted records lack seat attribution and are left unattributed. Node update times stand in for acceptance times; these are contributions, not distinct parent jobs. Online is the `/health` connected-worker count observed at **01:01 UTC on 26 October**, not a weekly total.

The research paginated 15,107 job records and 8,827 answer requests to exhaustion, read 901 individual job records relevant to the week, and checked 47 pagination boundaries. Relevant rows and pagination metadata are preserved in [`004-counts.json`](artifacts/004-counts.json). [`004-story-evidence.json`](artifacts/004-story-evidence.json) records dated publications, answers and editorial limitations. [`evidence/004.json`](evidence/004.json) supplies the counting notes and watch-story source embedded in the paper. The existing `npm run check` recalculates the saved trails for issues 003 and 004; it explicitly reports issues 001 and 002 as not re-checked from raw trails.

Reporting excludes spam, offensive material, copycat projects and financial speculation. Audit stories describe possible user consequences in reviewed versions, without alleging real losses or unverified repairs. Signed answers report the API’s attestations; signatures, underlying claims and third-party security were not independently certified. API records can change after reporting, and missing seat attribution can affect rankings.

## Actual validation

The final production build, TypeScript check and content/evidence checks passed. All **58 existing Chromium interaction checks** and **251 new Chromium/WebKit rendering and interaction checks** passed. Automated accessibility scans reported zero violations at five widths and in the open glossary. Both engines fit the complete masthead at eight widths with fonts blocked and loaded, preserve the pre-rendered node/date without hydration errors, and recover the original gothic size after delayed font loading. The 390px screenshots show the product, Latest tab, source switch and lead on the first screen.

The pinned design probe ran against the final export: **9 checks passed, 7 flagged**. Six flags concern inherited newspaper styling that the brief requires preserving. The remaining flag is the existing paragraph-box overlap heuristic in the two-column lead; the inspected final desktop screenshot shows normal separated column text. The probe reports no horizontal scrolling or clipped text. The two reported defects were reproduced and fixed; their responses are in [`.imd-responses.json`](.imd-responses.json).

See [`docs/validation-004-revision.md`](docs/validation-004-revision.md) for commands, before/after measurements, the six-domain Better Interface review and limitations, including the WebKit test runtime's TLS limitation. Real Google Fonts bytes were used through the test-only Node transport in WebKit; Chromium also passed direct font requests. Physical Safari devices, native zoom, screen readers and print rendering were not tested. The original [`issue 004 review`](docs/validation-004.md) and earlier reviews remain as history. These are worker-side checks, not independent certification.

## Submission budget

The exact artifact allowlist in `.gitignore` has a **6.5 MiB** path budget: **3.75 MiB** for retained issue 003 evidence and **2.75 MiB** for issue 004 evidence. Issue 004 permits at most **2 MiB JSON** and **0.75 MiB screenshots** across its nine named files. All other submission paths share **1.5 MiB**. The complete submission must fit **8,388,608 bytes**. Dependencies and caches remain excluded at every depth; required source, lockfile and runtime assets are retained.

The checked revision has **65 submission files**, approximately **6.02 MiB uncompressed**. The final static export is **373,878 bytes**. New review documentation, two compact screenshots and the regression script fit within the existing non-artifact allowance (under 0.86 MiB used). The ignore file and historical evidence are unchanged; no dependency or cache directory, symlink, submodule or package archive is included.

## Add another edition

1. Gather the latest complete Monday–Sunday UTC week from the public API using a distinct User-Agent.
2. Add the next numbered `issues/NNN.json` in the existing schema. Preserve earlier issues. `date` is publication day; `week` is the reporting period.
3. Add `evidence/NNN.json` and compact dated trails. Count accepted nodes with recorded seats within the week, regardless of parent-job state. Missing `leadersScope` means all-time for older issues.
4. Rebuild, typecheck, validate the content and interactions, and include the complete `dist/`. Tabs, Latest, index and RSS are generated from every numbered file.

## Source map

| Path | Purpose |
| --- | --- |
| `issues/` | Numbered editions and generated newest-first index |
| `evidence/` | Reporting notes embedded in the paper |
| `src/` | Existing newspaper and interactions |
| `scripts/` | Existing build, content, evidence and browser checks |
| `public/` | Local favicon, share image and runtime notices |
| `dist/` | Complete static export and RSS |
| `DESIGN.md` | Implemented tokens, typography, components and responsive behavior |
| `docs/` | Reviews and design-guidance attribution |
| `artifacts/` | Compact reporting and validation evidence |

The pinned Better Interface guide informed the review. Its attribution and included licenses remain in [`docs/design-guidance-licenses.txt`](docs/design-guidance-licenses.txt). Runtime library notices remain in the export.
