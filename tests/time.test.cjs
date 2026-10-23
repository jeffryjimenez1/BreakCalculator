const { test } = require('node:test');
const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
const { calculateDuration, easternTime, policyClock } = require('../src/time.cjs');
const hours = (...args) => calculateDuration(...args) / 3600000;
test('ordinary, overnight, split and long shifts', () => {
  assert.equal(hours('2026-10-23T09:00', '2026-10-23T17:00'), 8);
  assert.equal(hours('2026-10-23T22:00', '2026-10-24T06:00'), 8);
  assert.equal(hours('2026-10-23T09:00', '2026-10-23T17:00', [['2026-10-23T12:00', '2026-10-23T13:00']]), 7);
  assert.equal(hours('2026-10-23T09:00', '2026-10-24T10:00'), 25);
});
test('Eastern DST determines elapsed time', () => {
  assert.equal(hours('2026-03-08T00:00', '2026-03-08T08:00'), 7);
  assert.equal(hours('2026-11-01T00:00', '2026-11-01T08:00'), 9);
  assert.throws(() => easternTime('2026-03-08T02:30'), /does not exist/);
  assert.throws(() => easternTime('2026-11-01T01:30'), /occurs twice/);
});
test('invalid dates, reversed shifts and invalid splits fail clearly', () => {
  assert.throws(() => easternTime('2026-02-30T09:00'), /valid date/);
  assert.throws(() => hours('2026-10-23T17:00','2026-10-23T09:00'), /end must be after/);
  assert.throws(() => hours('2026-10-23T09:00','2026-10-23T17:00', [['2026-10-23T08:00','2026-10-23T10:00']]), /within/);
  assert.throws(() => hours('2026-10-23T09:00','2026-10-23T17:00', [['2026-10-23T10:00','2026-10-23T12:00'],['2026-10-23T11:00','2026-10-23T13:00']]), /overlap/);
});
test('results and New York policy clock are independent of browser timezone', () => {
  const script = `const {calculateDuration,policyClock}=require('./src/time.cjs'); console.log(JSON.stringify([calculateDuration('2026-03-08T00:00','2026-03-08T08:00',[['2026-03-08T03:00','2026-03-08T04:00']]),policyClock('2026-10-23T13:30').getHours(),policyClock('2026-10-23T13:30').getMinutes()]));`;
  const results = ['America/Mexico_City','America/Cancun','America/Costa_Rica','America/New_York','UTC'].map(TZ => execFileSync(process.execPath, ['-e', script], {cwd: require('node:path').resolve(__dirname,'..'), env:{...process.env,TZ}, encoding:'utf8'}).trim());
  assert.equal(new Set(results).size,1);
  assert.deepEqual(JSON.parse(results[0]), [21600000,13,30]);
});
