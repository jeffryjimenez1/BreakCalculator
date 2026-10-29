const { parseWallTime } = require('./time.cjs');

const countryZones = {
 US: ['America/New_York', 'America/Chicago', 'America/Denver', 'America/Phoenix', 'America/Los_Angeles', 'America/Anchorage', 'America/Adak', 'Pacific/Honolulu', 'America/Detroit', 'America/Indiana/Indianapolis', 'America/Indiana/Knox', 'America/Indiana/Marengo', 'America/Indiana/Petersburg', 'America/Indiana/Tell_City', 'America/Indiana/Vevay', 'America/Indiana/Vincennes', 'America/Indiana/Winamac', 'America/Kentucky/Louisville', 'America/Kentucky/Monticello', 'America/Menominee', 'America/North_Dakota/Beulah', 'America/North_Dakota/Center', 'America/North_Dakota/New_Salem', 'America/Juneau', 'America/Metlakatla', 'America/Nome', 'America/Sitka', 'America/Yakutat'],
 MX: ['America/Mexico_City', 'America/Cancun', 'America/Tijuana', 'America/Hermosillo', 'America/Mazatlan', 'America/Chihuahua', 'America/Ciudad_Juarez', 'America/Ojinaga', 'America/Matamoros', 'America/Bahia_Banderas', 'America/Merida', 'America/Monterrey'],
 NY: ['America/New_York'],
 CR: ['America/Costa_Rica'],
 MY: ['Asia/Kuala_Lumpur', 'Asia/Kuching'],
 PH: ['Asia/Manila'],
 VN: ['Asia/Ho_Chi_Minh']
};

function zoneLabel(zone) {
 return zone.split('/').slice(1).join(' / ').replace(/_/g, ' ');
}

// Match calendar fields in the source zone rather than using the device zone.
function wallToInstant(value, zone) {
 const nominal = parseWallTime(value);
 const formatter = new Intl.DateTimeFormat('en-CA', {
  timeZone: zone, year: 'numeric', month: '2-digit', day: '2-digit',
  hour: '2-digit', minute: '2-digit', hourCycle: 'h23'
 });
 function fieldsAt(timestamp) {
  const parts = Object.fromEntries(formatter.formatToParts(timestamp).map(p => [p.type, p.value]));
  return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}`;
 }
 const offsets = new Set();
 // Sample both sides of nearby clock changes, including half-hour offsets.
 for (let hours = -36; hours <= 36; hours += 6) {
  const probe = nominal + hours * 3600000;
  offsets.add(parseWallTime(fieldsAt(probe)) - probe);
 }
 const matches = [...offsets].map(offset => nominal - offset).filter(t => fieldsAt(t) === value);
 if (!matches.length) throw new Error('This local time does not exist because clocks move forward. Choose a time outside the daylight saving gap.');
 if (matches.length > 1) throw new Error('This local time occurs twice when clocks move back. ET conversion is ambiguous; choose a time outside the repeated hour.');
 return matches[0];
}

function easternTime(value, zone) {
 return new Intl.DateTimeFormat('en-US', {
  timeZone: 'America/New_York', year: 'numeric', month: 'short', day: 'numeric',
  hour: 'numeric', minute: '2-digit', timeZoneName: 'short'
 }).format(wallToInstant(value, zone));
}

module.exports = { countryZones, zoneLabel, wallToInstant, easternTime };
