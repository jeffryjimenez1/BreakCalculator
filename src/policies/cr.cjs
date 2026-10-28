const {breakItem,lunch}=require('./shared.cjs');
function costaRica({minutes}){
 if(minutes>660)return {items:[],unsupported:true,message:'CR daily limit is 11:00 hours'};
 const count=minutes>=540?3:minutes>=420?2:minutes>=360?0:minutes>=240?1:0;
 const items=Array.from({length:count},breakItem);
 if(minutes>=360)items.splice(Math.min(1,count),0,lunch(30,true));
 return {items,message:items.length?'Costa Rica break policy. Lunch is paid.':'No breaks.'};
}
module.exports={costaRica};
