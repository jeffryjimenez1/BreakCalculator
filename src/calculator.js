import { calculateDuration, wallValue } from './time.cjs';
import { evaluatePolicy } from './policies/index.cjs';
const segmentBox=document.querySelector('.segment-box');
const messageSideBar=document.querySelector('.messages-box');
const shiftBar=document.querySelector('.shift-bar');
function formatTime(minutes){return String(Math.floor(minutes/60)).padStart(2,'0')+':'+String(minutes%60).padStart(2,'0');}
export class BreakCalculator {
 Addtime(){
  this.DeleteMessages();this.DeleteShiftBar();
  const total=document.querySelector('.total-box'),paid=document.querySelector('.total-box-paid');
  try {
   const start=document.querySelector('.start-time').value,end=document.querySelector('.end-time').value;
   const splits=Array.from(document.querySelectorAll('.segmentItem')).map(row=>[row.querySelector('.start-split').value,row.querySelector('.end-split').value]);
   const minutes=calculateDuration(start,end,splits)/60000;
   const result=evaluatePolicy(document.querySelector('input[name="policy"]:checked').value,{minutes,start,end,splits});
   total.textContent=formatTime(minutes);paid.textContent=result.paidMinutes===null?'—':formatTime(result.paidMinutes);
   shiftBar.innerHTML=result.items.map(item=>{
    const label=item.type==='break'?'15 m':(item.paid?'P':'U')+' - '+item.minutes+'m';
    const kind=item.type==='break'?'rest-break':item.paid?'paid-lunch':'unpaid-lunch';
    return '<div class="break '+kind+'">'+label+'</div>';
   }).join('');
   this.ShowMessages(result.message);
  } catch(error){total.textContent='—';paid.textContent='—';this.ShowMessages(error.message);}
 }
 ShowMessages(message){const item=document.createElement('div');item.innerHTML='<p class="messageItem">'+message+'</p>';messageSideBar.appendChild(item);}
  NewSegment() {

    const segmentControlItem = document.createElement('div');
    segmentControlItem.classList = 'segmentItem';
    const number = document.querySelectorAll('.segmentItem').length + 1;
    const midnight = wallValue(Date.now()).slice(0, 10) + 'T00:00';
    segmentControlItem.innerHTML = `<label>Split start<input type="datetime-local" value="${midnight}" required class="enter-time start-split" aria-label="Split ${number} start in local time"></label><label>Split end<input type="datetime-local" value="${midnight}" required class="enter-time end-split" aria-label="Split ${number} end in local time"></label><button type="button" class="close-split" aria-label="Remove split ${number}">Remove</button>`;

    segmentBox.appendChild(segmentControlItem);

    this.disableCalendar();

    return;

  }

  DeleteMessages(){
    messageSideBar.innerHTML = '';
  }


 DeleteShiftBar(){shiftBar.innerHTML='';}
 disableCalendar(){}
}
