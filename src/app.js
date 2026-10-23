import { BreakCalculator } from './calculator.js';
import { wallValue } from './time.cjs';
const calculator = new BreakCalculator();
const form = document.querySelector('form');
function defaults() {
  const today = wallValue(Date.now()).slice(0, 10);
  document.querySelector('.start-time').value = today + 'T00:00';
  document.querySelector('.end-time').value = today + 'T00:00';
}
form.addEventListener('submit', event => { event.preventDefault(); calculator.Addtime(); });
form.addEventListener('input', () => { calculator.DeleteMessages(); calculator.DeleteShiftBar(); document.querySelector('.total-box').textContent = '—'; document.querySelector('.total-box-paid').textContent = '—'; });
document.querySelector('.locations').addEventListener('change', () => { if(form.reportValidity()) calculator.Addtime(); });
function resetCalculator() { form.reset(); document.querySelector('.segment-box').replaceChildren(); defaults(); calculator.DeleteMessages(); calculator.DeleteShiftBar(); document.querySelectorAll('.total-box, .total-box-paid').forEach(el => el.textContent = '—'); }
document.querySelector('.clear-btn').addEventListener('click', resetCalculator);
window.addEventListener('pageshow', resetCalculator);
document.querySelector('.addSplit-btn').addEventListener('click', () => calculator.NewSegment());
document.querySelector('.segment-box').addEventListener('click', event => { const button = event.target.closest('.close-split'); if(button) { button.closest('.segmentItem').remove(); if(form.reportValidity()) calculator.Addtime(); } });
defaults();
