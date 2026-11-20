const {explainBand}=require('./explanation.cjs');
const {breakItem,lunch}=require('./shared.cjs');
const {parseWallTime}=require('../time.cjs');

// United States scheduling table supplied by the user. Durations are working minutes
// after split intervals and before unpaid lunch deductions.
const bands=[
 {through:209,breaks:0,lunches:0}, // 0:00–3:29
 {through:300,breaks:1,lunches:0}, // 3:30–5:00
 {through:390,breaks:1,lunches:1}, // 5:01–6:30 (up to 6:00 paid)
 {through:600,breaks:2,lunches:1}, // 6:31–10:00 (starts at 6:01 paid)
 {through:720,breaks:3,lunches:2}  // 10:01–12:00
];

function lunchTime(start,end,splits){
 if(!start||!end)return '';
 let remaining=270*60000;
 const intervals=splits.map(([from,to])=>[parseWallTime(from),parseWallTime(to)]).sort((a,b)=>a[0]-b[0]);
 intervals.push([parseWallTime(end),parseWallTime(end)]);
 let from=parseWallTime(start);
 for(const [to,resume] of intervals){
  const duration=to-from;
  // If a split starts at the 4.5-hour mark, suggest the next working time.
  if(remaining<duration){
   const [date,time]=new Date(from+remaining).toISOString().slice(0,16).split('T');
   return date===start.slice(0,10)?time:`${date} at ${time}`;
  }
  remaining-=duration;
  from=resume;
 }
 return '';
}

module.exports=({minutes,start,end,splits=[]})=>{
 const band=bands.find(b=>minutes<=b.through);
 if(!band)return {items:[],unsupported:true,message:'United States rules above 12:00 hours have not been configured yet.'};
 const items=Array.from({length:band.breaks},breakItem);
 if(band.lunches)items.splice(1,0,...Array.from({length:band.lunches},()=>lunch(30)));
 let message=explainBand('United States',bands,band,items);
 if(band.lunches){
  const time=lunchTime(start,end,splits);
  const meal=band.lunches===1?'lunch':'first lunch';
  message+=`<br><strong>Schedule your ${meal} at 4.5 hours of work.</strong>`;
  if(time)message+=` Suggested start at ${time}.`;
 }
 return {items,message};
};
