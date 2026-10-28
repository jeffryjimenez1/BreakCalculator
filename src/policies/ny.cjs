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
 const messages=[],lunches=[];
 if(night){lunches.push(lunch(45));messages.push('Schedule a 45-minute unpaid lunch halfway through the evening/overnight shift.');}
 else if(morning){lunches.push(lunch(30));messages.push('Schedule a 30-minute unpaid lunch between 11 AM and 2 PM, no later than 1 PM. Lunch may come before the first break.');}
 if(second){lunches.push(lunch(30));messages.push('Schedule a second 30-minute unpaid lunch between 5 PM and 7 PM. This also applies across split shifts when both full windows are worked.');}
 items.splice(Math.min(1,items.length),0,...lunches);
 return {items,message:messages.join('<br>')||(items.length?'New York: paid 15-minute breaks.':'No breaks.')};
};
