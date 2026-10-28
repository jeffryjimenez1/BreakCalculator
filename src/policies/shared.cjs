// All durations are minutes. Breaks are always paid and last 15 minutes.
const breakItem=()=>({type:'break',minutes:15,paid:true});
const lunch=(minutes,paid=false)=>({type:'lunch',minutes,paid});
module.exports={breakItem,lunch};
