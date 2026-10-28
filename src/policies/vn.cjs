const {breakItem,lunch}=require('./shared.cjs');
const {policyClock}=require('../time.cjs');
// Inputs already represent the selected location's clock. Never convert them.
function isNightShift(start){
 const hour=policyClock(start).getHours();
 return hour>=22||hour<6;
}

// Vietnam standard-shift table supplied by the user. Working minutes after
// splits, before lunch. Lunches remain paid for both day and night shifts.
const bands=[
 {through:209,breaks:0,lunch:0},
 {through:300,breaks:1,lunch:0},
 {through:360,breaks:1,lunch:30},
 {through:600,breaks:2,lunch:30}
];
module.exports=({minutes,start})=>{
 const band=bands.find(b=>minutes<=b.through);
 if(!band)return {items:[],unsupported:true,message:'Vietnam rules above 10:00 hours have not been configured yet.'};
 const items=Array.from({length:band.breaks},breakItem);
 const night=band.lunch&&isNightShift(start);
 if(band.lunch)items.splice(1,0,lunch(night?45:band.lunch,true));
 return {items,message:items.length?(night?'Vietnam night shift: paid 45-minute lunch.':'Vietnam break policy. Lunch is paid.'):'No breaks.'};
};
