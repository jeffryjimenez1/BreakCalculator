const {breakItem,lunch}=require('./shared.cjs');
// Malaysia: thresholds use working minutes after split intervals, before lunch.
const bands=[
 {through:209,breaks:0,lunch:0},
 {through:300,breaks:1,lunch:0},
 {through:360,breaks:1,lunch:60},
 {through:600,breaks:2,lunch:60}
];
function malaysia({minutes}){
 const band=bands.find(b=>minutes<=b.through);
 if(!band)return {items:[],unsupported:true,message:'Malaysia rules above 10:00 hours have not been configured yet.'};
 const items=Array.from({length:band.breaks},breakItem);
 if(band.lunch)items.splice(1,0,lunch(band.lunch));
 return {items,message:items.length?'Malaysia break policy.':'No breaks.'};
}
module.exports={malaysia};
