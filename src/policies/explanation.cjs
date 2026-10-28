const format=minutes=>String(Math.floor(minutes/60))+':'+String(minutes%60).padStart(2,'0');
function describeItems(items){
 const count=items.filter(item=>item.type==='break').length;
 const descriptions=[];
 if(count)descriptions.push(`${count} × 15-minute ${count===1?'break':'breaks'}`);
 const lunches=items.filter(item=>item.type==='lunch');
 for(const paid of [false,true]){
  const durations=[...new Set(lunches.filter(item=>item.paid===paid).map(item=>item.minutes))];
  for(const duration of durations){
   const count=lunches.filter(item=>item.paid===paid&&item.minutes===duration).length;
   descriptions.push(`${count} × ${duration}-minute ${paid?'paid':'unpaid'} ${count===1?'lunch':'lunches'}`);
  }
 }
 return descriptions.join(' + ')||'no breaks or lunch';
}
// Bounds come from the same band that selected the result, preventing drift.
function explainBand(country,bands,band,items){
 const index=bands.indexOf(band);
 const from=index===0?0:bands[index-1].through+1;
 return `${country}: ${format(from)}–${format(band.through)} hours → ${describeItems(items)}.`;
}
module.exports={explainBand,describeItems};
