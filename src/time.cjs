// UTC is only a neutral arithmetic container for entered calendar fields.
// No entered time is converted to or from a real-world timezone.
function wallValue(timestamp) {
 const date=new Date(timestamp);
 const pad=value=>String(value).padStart(2,'0');
 return date.getFullYear()+'-'+pad(date.getMonth()+1)+'-'+pad(date.getDate())+'T'+pad(date.getHours())+':'+pad(date.getMinutes());
}
function parseWallTime(value) {
 if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(value)) throw new Error('Enter a complete date and time.');
 const nominal=Date.parse(value+':00Z');
 if(!Number.isFinite(nominal)||new Date(nominal).toISOString().slice(0,16)!==value)throw new Error('Enter a valid date and time.');
 return nominal;
}
function calculateDuration(start, end, splits = []) {
  const first = parseWallTime(start), last = parseWallTime(end);
  if (last <= first) throw new Error('Shift end must be after shift start. For overnight shifts, select the next date.');
  const intervals = splits.map(([s, e]) => [parseWallTime(s), parseWallTime(e)]).sort((a, b) => a[0] - b[0]);
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
// Policy checks use the entered clock directly, never the browser timezone.
function policyClock(value) {
  const date = new Date(value + ':00Z');
  return { getHours: () => date.getUTCHours(), getMinutes: () => date.getUTCMinutes() };
}
module.exports = { parseWallTime, calculateDuration, policyClock, wallValue };
