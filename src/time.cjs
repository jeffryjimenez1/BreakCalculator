const zone = 'America/New_York';
const formatter = new Intl.DateTimeFormat('en-CA', { timeZone: zone, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' });
function wallValue(timestamp) {
  const parts = Object.fromEntries(formatter.formatToParts(timestamp).map(p => [p.type, p.value]));
  return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}`;
}
function easternTime(value) {
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(value)) throw new Error('Enter a complete date and time.');
  const nominal = Date.parse(value + ':00Z');
  if (!Number.isFinite(nominal) || new Date(nominal).toISOString().slice(0, 16) !== value) throw new Error('Enter a valid date and time.');
  const matches = [4, 5].map(hours => nominal + hours * 3600000).filter(candidate => wallValue(candidate) === value);
  if (!matches.length) throw new Error('This time does not exist in Eastern Time because clocks move forward. Choose another time.');
  if (matches.length > 1) throw new Error('This time occurs twice in Eastern Time because clocks move back. Choose a time outside the repeated hour.');
  return matches[0];
}
function calculateDuration(start, end, splits = []) {
  const first = easternTime(start), last = easternTime(end);
  if (last <= first) throw new Error('Shift end must be after shift start. For overnight shifts, select the next date.');
  const intervals = splits.map(([s, e]) => [easternTime(s), easternTime(e)]).sort((a, b) => a[0] - b[0]);
  let previous = first, excluded = 0;
  for (const [s, e] of intervals) {
    if (s < first || e > last || e <= s) throw new Error('Each split must end after it starts and stay within the shift.');
    if (s < previous) throw new Error('Split intervals must not overlap.');
    excluded += e - s;
    previous = e;
  }
  if (excluded >= last - first) throw new Error('Splits must leave some working time in the shift.');
  return last - first - excluded;
}
// Policy checks use the entered Eastern clock, never the browser timezone.
function policyClock(value) {
  const date = new Date(value + ':00Z');
  return { getHours: () => date.getUTCHours(), getMinutes: () => date.getUTCMinutes() };
}
module.exports = { easternTime, calculateDuration, policyClock, wallValue };
