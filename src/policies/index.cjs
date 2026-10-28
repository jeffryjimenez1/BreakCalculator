const us=require('./us.cjs');
const mx=require('./mx.cjs');
const ny=require('./ny.cjs');
const {costaRica}=require('./cr.cjs');
const {malaysia}=require('./my.cjs');
const philippines=require('./ph.cjs');
const vietnam=require('./vn.cjs');
// Add a country evaluator here, then add its tile to dist/index.html.
const policies={US:us,MX:mx,NY:ny,CR:costaRica,MY:malaysia,PH:philippines,VN:vietnam};
function evaluatePolicy(code,context){
 const evaluate=policies[code];
 if(!evaluate)throw new Error('This break policy is not configured.');
 const result=evaluate(context);
 const unpaidMinutes=result.items.reduce((total,item)=>total+(item.type==='lunch'&&!item.paid?item.minutes:0),0);
 return {...result,paidMinutes:result.unsupported?null:context.minutes-unpaidMinutes};
}
module.exports={evaluatePolicy};
