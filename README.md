# Break Calculator

Responsive shift and break calculator using the existing JavaScript and webpack setup.

## Run

`npm ci`, then `npm run dev` to serve on port 3000. `npm run build` builds `dist/bundle.js`; deploy the entire `dist` directory. Run `node --test tests/*.test.cjs` for regression checks.

## Time handling

All input dates and times represent America/New_York, regardless of the viewer's location or selected break policy. Elapsed hours include Eastern daylight saving transitions. Times in the missing spring hour or repeated autumn hour produce a validation message; choose an unambiguous time. Overnight shifts require an explicit following end date.

Split intervals are time away, subtracted from the enclosing shift. They must be complete, within the shift and non-overlapping. Paid hours apply the existing location-based lunch deductions after splits. Existing break policy logic and scheduling guidance are retained; this update does not revalidate policy requirements.

The interface stays in plain JavaScript; a framework migration is not required for this scope. The calculation helpers in `src/time.cjs` are separate from the UI and covered by timezone regression tests.
