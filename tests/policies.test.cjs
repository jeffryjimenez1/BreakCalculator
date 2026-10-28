const {test}=require('node:test');
const assert=require('node:assert/strict');
const {evaluatePolicy}=require('../src/policies/index.cjs');
const evaluate=(code,minutes,start='2026-10-28T09:00',end='2026-10-28T17:00')=>evaluatePolicy(code,{minutes,start,end});
test('NY lunch scenarios use full worked windows, exact boundaries and splits',()=>{
 const {calculateDuration}=require('../src/time.cjs');
 const check=(s,e,expected,splits=[])=>{
  const start='2026-10-28T'+s,end='2026-10-28T'+e;
  const result=evaluatePolicy('NY',{start,end,splits,minutes:calculateDuration(start,end,splits)/60000});
  assert.deepEqual(result.items.filter(i=>i.type==='lunch').map(i=>i.minutes),expected,s+'–'+e);
 };
 check('09:00','15:00',[30]);
 check('11:01','17:01',[]);
 check('13:00','19:00',[]);
 check('13:00','19:01',[45]);
 check('06:00','12:01',[]);
 check('05:59','12:00',[45]);
 check('13:00','23:46',[45]);
 check('08:00','18:31',[30]);
 check('09:00','19:00',[30]);
 check('09:00','19:01',[30,30]);
 check('09:00','20:00',[30,30],[['2026-10-28T14:00','2026-10-28T17:00']]);
 check('09:00','20:00',[],[['2026-10-28T12:00','2026-10-28T13:00']]);
 check('09:00','20:00',[30],[['2026-10-28T18:00','2026-10-28T18:30']]);
});
test('Vietnam standard ranges and paid lunches match every minute through 10 hours',()=>{
 for(let minutes=0;minutes<=600;minutes++){
  const result=evaluate('VN',minutes,'2026-10-28T09:00'); // Entered local daytime
  assert.equal(result.items.filter(i=>i.type==='break').length,minutes<210?0:minutes<=360?1:2);
  assert.deepEqual(result.items.filter(i=>i.type==='lunch'),minutes<=300?[]:[{type:'lunch',minutes:30,paid:true}]);
  assert.equal(result.paidMinutes,minutes);
 }
 assert.equal(evaluate('VN',601).paidMinutes,null);
});
test('Vietnam night lunch uses entered clock without timezone conversion',()=>{
 for(const date of ['2026-10-28','2026-12-01'])for(const [clock,expected] of [['21:59',30],['22:00',45],['23:59',45],['00:00',45],['05:59',45],['06:00',30],['11:00',30]]){
  const start=date+'T'+clock;
  const result=evaluate('VN',480,start);
  assert.deepEqual(result.items.filter(i=>i.type==='lunch'),[{type:'lunch',minutes:expected,paid:true}],start);
  assert.equal(result.paidMinutes,480);
 }
 assert.equal(evaluate('VN',300,'2026-10-28T22:00').items.filter(i=>i.type==='lunch').length,0);
});

test('Philippines matches every minute of the supplied table',()=>{
 for(let minutes=0;minutes<=600;minutes++){
  const result=evaluate('PH',minutes);
  const breaks=minutes<210?0:minutes<=360?1:2;
  const lunches=minutes<=300?0:1;
  assert.equal(result.items.filter(i=>i.type==='break').length,breaks);
  assert.ok(result.items.filter(i=>i.type==='break').every(i=>i.minutes===15&&i.paid));
  assert.deepEqual(result.items.filter(i=>i.type==='lunch'),Array.from({length:lunches},()=>({type:'lunch',minutes:60,paid:false})));
  assert.equal(result.paidMinutes,minutes-lunches*60);
 }
 assert.equal(evaluate('PH',601).paidMinutes,null);
 assert.match(evaluate('PH',601).message,/not been configured/);
});
for(const code of ['US','MX'])test(`${code} matches every minute of the supplied break and lunch table`,()=>{
 for(let minutes=0;minutes<=720;minutes++){
  const breaks=minutes<210?0:minutes<=360?1:minutes<=600?2:3;
  const lunches=minutes<=300?0:minutes<=600?1:2;
  const result=evaluate(code,minutes);
  assert.equal(result.items.filter(i=>i.type==='break').length,breaks,`breaks at ${minutes} minutes`);
  assert.deepEqual(result.items.filter(i=>i.type==='lunch'),Array.from({length:lunches},()=>({type:'lunch',minutes:30,paid:false})));
  assert.equal(result.paidMinutes,minutes-lunches*30);
  assert.ok(result.items.filter(i=>i.type==='break').every(i=>i.minutes===15&&i.paid));
 }
 assert.equal(evaluate(code,721).paidMinutes,null);
 assert.match(evaluate(code,721).message,/not been configured/);
});
test('Malaysia exact boundaries and unpaid lunch deductions',()=>{
 for(const [minutes,breaks,lunch,paid] of [[0,0,0,0],[209,0,0,209],[210,1,0,210],[300,1,0,300],[301,1,60,241],[360,1,60,300],[361,2,60,301],[600,2,60,540]]){
  const result=evaluate('MY',minutes);
  assert.equal(result.items.filter(i=>i.type==='break').length,breaks);
  assert.equal(result.items.filter(i=>i.type==='lunch').reduce((s,i)=>s+i.minutes,0),lunch);
  assert.equal(result.paidMinutes,paid);
 }
 assert.equal(evaluate('MY',601).paidMinutes,null);
 assert.match(evaluate('MY',601).message,/not been configured/);
});
test('Costa Rica paid lunch and all 15-minute breaks retain paid time',()=>{
 for(const minutes of [240,360,420,540,660]){
  const result=evaluate('CR',minutes);
  assert.equal(result.paidMinutes,minutes);
  assert.ok(result.items.every(i=>i.paid));
  assert.ok(result.items.filter(i=>i.type==='break').every(i=>i.minutes===15));
 }
 assert.deepEqual(evaluate('CR',360).items,[{type:'lunch',minutes:30,paid:true}]);
});
test('US, MX, and NY deductions match their displayed unpaid lunches',()=>{
 for(const code of ['US','MX','NY'])for(const minutes of [210,300,301,360,361,480,601,660]){
  const result=evaluate(code,minutes);
  if(result.unsupported)continue;
  const deduction=result.items.filter(i=>i.type==='lunch'&&!i.paid).reduce((s,i)=>s+i.minutes,0);
  assert.equal(result.paidMinutes,minutes-deduction);
  assert.ok(result.items.filter(i=>i.type==='break').every(i=>i.minutes===15&&i.paid));
 }
 assert.equal(evaluate('US',480).paidMinutes,450);
 assert.equal(evaluate('MX',480).paidMinutes,450);
 const night=evaluate('NY',480,'2026-10-28T22:00','2026-10-29T06:00');
 assert.ok(night.items.some(i=>i.type==='lunch'&&i.minutes===45));
 assert.equal(night.paidMinutes,435);
});
