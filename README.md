# Break Calculator

Responsive shift and break calculator using the existing JavaScript and webpack setup.

## Run

`npm ci`, then `npm run dev` to serve on port 3000. `npm run build` builds `dist/bundle.js`; deploy the entire `dist` directory. Run `node --test tests/*.test.cjs` for regression checks.

## Time handling

Inputs are calendar dates and clock times, used exactly as entered. No timezone conversions or daylight saving adjustments apply. UTC is only used internally as a neutral arithmetic container so every browser returns identical durations. Overnight shifts require an explicit following end date. Default dates use today on the user’s device.

Split intervals are time away, subtracted from the enclosing shift. They must be complete, within the shift and non-overlapping. Paid hours apply the existing location-based lunch deductions after splits. Existing break policy logic and scheduling guidance are retained; this update does not revalidate policy requirements.

The interface stays in plain JavaScript; a framework migration is not required for this scope. The calculation helpers in `src/time.cjs` are separate from the UI and covered by timezone regression tests.

## Country policies

Rules live in src/policies/, separate from DOM rendering. Each country exports an evaluator accepting working minutes (after splits) and entered start/end clock values. It returns items with type, minutes, and paid status, plus a message. The registry in index.cjs is the only place to register a new evaluator. Legacy New York scheduling conditions remain in legacy.cjs for gradual migration.

Paid hours subtract only unpaid lunch items; 15-minute breaks and paid lunches do not reduce paid hours. Malaysia bands use total working time before lunch: 0–209 minutes none, 210–300 one break, 301–360 one break plus unpaid 60-minute lunch, 361–600 two breaks plus unpaid 60-minute lunch. Above 600 minutes is unconfigured and paid hours are withheld.

Run node --test tests/time.test.cjs tests/policies.test.cjs for timezone and country boundary checks.

## Eastern Time display

Enable “Show shift times in Eastern Time (ET)” to display both entered dates and times in America/New_York, including EST/EDT. The source time zone defaults to the selected policy country (US: New York; Mexico: Mexico City). Select the actual shift location for countries with multiple zones. This display uses browser IANA time-zone data and updates when inputs, policy, or source zone change. Keep browsers updated for time-zone rule changes.

Conversion is display-only: working hours, splits, paid hours, and policy checks continue to use entered clock times. Missing or invalid times, daylight saving gaps, and repeated hours produce a message instead of a guessed conversion. Toggle and source-zone changes preserve calculated results. Reset hides the conversion.

Run node --test tests/*.test.cjs for calculation and conversion checks.
