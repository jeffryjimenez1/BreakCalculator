const {describeItems}=require('./explanation.cjs');
const {breakItem,lunch}=require('./shared.cjs');
const {parseWallTime,policyClock}=require('../time.cjs');
const DAY=86400000;
function workingIntervals(start,end,splits){
 const intervals=[];let cursor=parseWallTime(start);
 for(const [s,e] of splits.map(([s,e])=>[parseWallTime(s),parseWallTime(e)]).sort((a,b)=>a[0]-b[0])){
  if(s>cursor)intervals.push([cursor,s]);cursor=e;
 }
 if(cursor<parseWallTime(end))intervals.push([cursor,parseWallTime(end)]);
 return intervals;
}
const covers=(intervals,start,end)=>intervals.some(([s,e])=>s<=start&&e>=end);
// Supplied NY guide. Use the detailed second-lunch duration (30m), not
// the conflicting 20m summary. All clock fields are used without conversion.
module.exports=({minutes,start,end,splits=[]})=>{
 if(minutes>720)return {items:[],unsupported:true,message:'New York rules above 12:00 hours have not been configured yet.'};
 const count=minutes<210?0:minutes<=360?1:minutes<=600?2:3;
 const items=Array.from({length:count},breakItem);
 const intervals=workingIntervals(start,end,splits);
 const clock=policyClock(start),startMinutes=clock.getHours()*60+clock.getMinutes();
 const night=(startMinutes>=780||startMinutes<360)&&minutes>360;
 const first=parseWallTime(start),last=parseWallTime(end);
 let morning=false,second=false;
 for(let day=Math.floor(first/DAY)*DAY;day<=last;day+=DAY){
  const morningStart=day+11*3600000,morningEnd=day+14*3600000;
  const eveningStart=day+17*3600000,eveningEnd=day+19*3600000;
  const workedMorning=covers(intervals,morningStart,morningEnd);
  if(minutes>=360&&workedMorning)morning=true;
  if(first<morningStart&&last>eveningEnd&&workedMorning&&covers(intervals,eveningStart,eveningEnd))second=true;
 }
 const breakRange=minutes<210?'0:00–3:29':minutes<=360?'3:30–6:00':minutes<=600?'6:01–10:00':'10:01–12:00';
 const messages=['New York: '+breakRange+' hours → '+describeItems(items)+'.'],lunches=[];
 if(night){lunches.push(lunch(45));messages.push('The shift starts from 1 PM to before 6 AM and lasts more than six hours → one 45-minute unpaid lunch, scheduled halfway through the shift.');}
 else if(morning){lunches.push(lunch(30));messages.push('The shift works the entire 11 AM–2 PM window and lasts at least six hours → one 30-minute unpaid lunch in that window, no later than 1 PM.');}
 if(second){lunches.push(lunch(30));messages.push('The schedule starts before 11 AM, ends after 7 PM, and works both full 11 AM–2 PM and 5 PM–7 PM windows → a second 30-minute unpaid lunch between 5 PM and 7 PM, including split shifts.');}
 if(!lunches.length)messages.push('No NY lunch condition is met: neither the full morning-window requirement nor the evening/overnight requirement applies.');
 items.splice(Math.min(1,items.length),0,...lunches);
 return {items,message:messages.join('<br>')||(items.length?'New York: paid 15-minute breaks.':'No breaks.')};
};
