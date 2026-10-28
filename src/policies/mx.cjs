const {explainBand}=require('./explanation.cjs');
const {breakItem,lunch}=require('./shared.cjs');

// Mexico scheduling table supplied by the user. Durations are working minutes
// after split intervals and before unpaid lunch deductions.
const bands=[
 {through:209,breaks:0,lunches:0}, // 0:00–3:29
 {through:300,breaks:1,lunches:0}, // 3:30–5:00
 {through:360,breaks:1,lunches:1}, // 5:01–6:00
 {through:600,breaks:2,lunches:1}, // 6:01–10:00
 {through:720,breaks:3,lunches:2}  // 10:01–12:00
];

module.exports=({minutes})=>{
 const band=bands.find(b=>minutes<=b.through);
 if(!band)return {items:[],unsupported:true,message:'Mexico rules above 12:00 hours have not been configured yet.'};
 const items=Array.from({length:band.breaks},breakItem);
 if(band.lunches)items.splice(1,0,...Array.from({length:band.lunches},()=>lunch(30)));
 return {items,message:explainBand('Mexico',bands,band,items)};
};
