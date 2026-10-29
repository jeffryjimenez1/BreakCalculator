const { test } = require('node:test');
const assert = require('node:assert/strict');
const { countryZones, wallToInstant, easternTime } = require('../src/zones.cjs');
test('every configured country zone is supported and converts', () => {
 for (const zones of Object.values(countryZones)) for (const zone of zones) assert.ok(Number.isFinite(wallToInstant('2026-10-29T09:00', zone)), zone);
});
test('Costa Rica conversion follows Eastern daylight saving per date', () => {
 assert.equal(new Date(wallToInstant('2026-07-01T09:00','America/Costa_Rica')).toISOString(), '2026-07-01T15:00:00.000Z');
 assert.match(easternTime('2026-07-01T09:00','America/Costa_Rica'), /11:00 AM EDT/);
 assert.match(easternTime('2026-12-01T09:00','America/Costa_Rica'), /10:00 AM EST/);
});
test('Asian shifts show the previous Eastern calendar day', () => {
 for(const zone of ['Asia/Manila','Asia/Kuala_Lumpur']) assert.match(easternTime('2026-10-29T08:00',zone), /Oct 28, 2026.*8:00 PM EDT/);
 assert.match(easternTime('2026-10-29T08:00','Asia/Ho_Chi_Minh'), /Oct 28, 2026.*9:00 PM EDT/);
});
test('regional selection distinguishes Mexico and US time zones', () => {
 assert.match(easternTime('2026-07-01T09:00','America/Mexico_City'), /11:00 AM EDT/);
 assert.match(easternTime('2026-07-01T09:00','America/Cancun'), /10:00 AM EDT/);
 assert.match(easternTime('2026-07-01T09:00','America/Los_Angeles'), /12:00 PM EDT/);
 assert.match(easternTime('2026-07-01T09:00','America/New_York'), /9:00 AM EDT/);
});
test('DST gaps and repeated hours are reported instead of silently converted', () => {
 assert.throws(()=>wallToInstant('2026-03-08T02:30','America/New_York'), /does not exist/);
 assert.throws(()=>wallToInstant('2026-11-01T01:30','America/New_York'), /occurs twice/);
 assert.match(easternTime('2026-03-08T01:30','America/New_York'), /1:30 AM EST/);
 assert.match(easternTime('2026-03-08T03:30','America/New_York'), /3:30 AM EDT/);
});
test('invalid or incomplete inputs are rejected',()=>{
 assert.throws(()=>easternTime('', 'Asia/Manila'), /complete/);
 assert.throws(()=>easternTime('2026-02-30T09:00','Asia/Manila'), /valid date/);
});
