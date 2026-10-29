import { countryZones, zoneLabel, easternTime } from './zones.cjs';

const toggle = document.querySelector('#show-et');
const details = document.querySelector('#et-details');
const zoneSelect = document.querySelector('#source-zone');
const savedZones = new Map();
let currentPolicy;

export function updateEasternTime() {
 const policy = document.querySelector('input[name="policy"]:checked').value;
 if (policy !== currentPolicy) {
  currentPolicy = policy;
  zoneSelect.replaceChildren(...countryZones[policy].map(zone => new Option(zoneLabel(zone), zone)));
  zoneSelect.value = savedZones.get(policy) || countryZones[policy][0];
 }
 const canChooseZone = policy === 'MX';
 zoneSelect.hidden = !canChooseZone;
 document.querySelector('label[for="source-zone"]').hidden = !canChooseZone;
 document.querySelector('#zone-hint').textContent = canChooseZone
  ? 'Choose the location in Mexico where this shift takes place. ET follows New York daylight saving time.'
  : 'Shift time zone: ' + zoneLabel(countryZones[policy][0]) + '. ET follows New York daylight saving time.';
 details.hidden = !toggle.checked;
 if (!toggle.checked) return;
 const error = document.querySelector('#et-error');
 const messages = [];
 for (const field of ['start', 'end']) {
  const output = document.querySelector('#et-' + field);
  output.textContent = '—';
  const value = document.querySelector('.' + field + '-time').value;
  if (!value) continue;
  try { output.textContent = easternTime(value, policy === 'MX' ? zoneSelect.value : countryZones[policy][0]); }
  catch (err) { messages.push((field === 'start' ? 'Start: ' : 'End: ') + err.message); }
 }
 error.textContent = messages.join(' ');
}

toggle.addEventListener('change', updateEasternTime);
zoneSelect.addEventListener('change', () => {
 savedZones.set(currentPolicy, zoneSelect.value);
 updateEasternTime();
});
