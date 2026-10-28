const {explainBand}=require('./explanation.cjs');
const {breakItem,lunch}=require('./shared.cjs');

// Philippines table supplied by the user. Working minutes after splits,
// before unpaid lunch deductions. All breaks are paid 15-minute breaks.
const bands=[
 {through:209,breaks:0,lunch:0}, // 0:00–3:29
 {through:300,breaks:1,lunch:0}, // 3:30–5:00
 {through:360,breaks:1,lunch:60}, // 5:01–6:00
 {through:600,breaks:2,lunch:60} // 6:01–10:00
];
module.exports=({minutes})=>{
 const band=bands.find(b=>minutes<=b.through);
 if(!band)return {items:[],unsupported:true,message:'Philippines rules above 10:00 hours have not been configured yet.'};
 const items=Array.from({length:band.breaks},breakItem);
 if(band.lunch)items.splice(1,0,lunch(band.lunch));
 return {items,message:explainBand('Philippines',bands,band,items)};
};
