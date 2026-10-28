// Existing US, MX and New York scheduling conditions, isolated from the DOM.
const { policyClock } = require('../time.cjs');
const { breakItem, lunch } = require('./shared.cjs');
const layouts = {
 'break-one':[1,[]], lunch:[1,[30]], 'lunch-cr':[0,[30]],
 'break-two-cr':[2,[30]], 'break-two':[2,[30]],
 'break-three-cr':[3,[30]], 'break-three':[3,[30,30]],
 'break-ny':[2,[30]], 'break-ny-secondLunch':[2,[30,30]],
 'break-ny-secondLunch-3break':[3,[30,30]], 'break-ny-45':[2,[45]],
 'break-ny-45-10hours':[3,[45,30]]
};
class ExistingPolicy {
 constructor(start,end){this.startTime={value:start};this.endTime={value:end};this.items=[];this.messages=[];}
 // Deductions now come only from rendered unpaid lunch items.
 AddPaidHours() {}
 ShowMessages(message){this.messages.push(message);}
 AddBreakToUI(type){
  if(type==='not-allowed'){this.unsupported=true;this.items=[];return;}
  const [count,lunches]=layouts[type];
  this.items=Array.from({length:count},breakItem);
  this.items.splice(Math.min(1,count),0,...lunches.map(minutes=>lunch(minutes)));
 }
  CheckUSMXconditions(totalHours){

    if( ( parseInt(+totalHours[0]) > 9 && parseInt(+totalHours[1]) >= 31 ) || ( parseInt(+totalHours[0]) > 10 ) ){
      
      this.AddPaidHours((1800000 * 2), totalHours);
      
    }

    else if (parseInt(+totalHours[0]) > 4 && parseInt(+totalHours[1]) >= 1) {
      this.AddPaidHours((1800000), totalHours);
    }

    else if (parseInt(+totalHours[0]) > 5 && parseInt(+totalHours[1]) >= 0) {
      this.AddPaidHours((1800000), totalHours);
    }

    else {
      this.AddPaidHours((0), totalHours);
    }

    this.USMXbreakRules(totalHours);

  }

  CheckNYconditions(totalHours) {

    const shiftStar = policyClock(this.startTime.value);
    const shiftEnd = policyClock(this.endTime.value);


    if ( (shiftStar.getHours() >= 13 || shiftEnd.getHours() <= 6) && ( ( parseInt(+totalHours[0]) > 9 && parseInt(+totalHours[1]) > 45  ) || parseInt(+totalHours[0]) > 10 ) ){

      this.AddPaidHours((2700000 + 1800000), totalHours); 

    } 
    
    else if( (shiftStar.getHours() < 6 || shiftStar.getHours() === 6 && shiftStar.getMinutes() === 0) && (parseInt(+totalHours[0]) > 9 && parseInt(+totalHours[1]) > 45) ) {
      this.AddPaidHours((2700000 + 1800000), totalHours); 
    } 

    else if( (shiftStar.getHours() < 6 || shiftStar.getHours() === 6 && shiftStar.getMinutes() === 0) &&  parseInt(+totalHours[0]) > 10  ) {
      this.AddPaidHours((2700000 + 1800000), totalHours); 
    }

    else if( (shiftStar.getHours() === 6 && shiftStar.getMinutes() > 0) && parseInt(+totalHours[0]) > 5 ) {
      this.AddPaidHours((1800000), totalHours); 
    }

    else if( ( shiftStar.getHours() > 12 || shiftStar.getHours() <= 6  ) && (parseInt(+totalHours[0]) > 5 && parseInt(+totalHours[1]) >= 1) ) {
      this.AddPaidHours((2700000), totalHours); 
    }  
    
    else if( ( shiftStar.getHours() > 12 || shiftStar.getHours() <= 6  ) && (parseInt(+totalHours[0]) >= 7 ) ) {
      this.AddPaidHours((2700000), totalHours); 
    }

    else if(shiftStar.getHours() < 11  && shiftEnd.getHours() >= 19 && shiftEnd.getMinutes() > 0 || shiftStar.getHours() < 11  && shiftEnd.getHours() >= 20 && shiftEnd.getMinutes() >= 0) {
      this.AddPaidHours((1800000 * 2), totalHours);
    }

    else if (parseInt(+totalHours[0]) > 9 && parseInt(+totalHours[1]) >= 31){
      
      this.AddPaidHours((1800000 * 2), totalHours);
      
    }

    else if (parseInt(+totalHours[0]) > 4 && parseInt(+totalHours[1]) >= 1) {
      this.AddPaidHours((1800000), totalHours);
    }

    else if (parseInt(+totalHours[0]) > 5 && parseInt(+totalHours[1]) >= 0) {
      this.AddPaidHours((1800000), totalHours);
    }

    else {
      this.AddPaidHours((0), totalHours);
    }

    this.NYBreakRules(totalHours);

  }


  CRbreakRules(workTime){

    if((workTime[0] > 10 && workTime[1] >= 1) || (workTime[0] > 11 && workTime[1] == 0)){
      this.AddBreakToUI('not-allowed');
      this.ShowMessages('CR daily limit is 11:00 hours');
      
    } else if (workTime[0] >= 9) {
      this.AddBreakToUI('break-three-cr');
      this.ShowMessages("CR gets 3 breaks and 1 lunch between 9:00 and 11:00 paid hours");

    } else if(workTime[0] >= 7) {
      this.AddBreakToUI('break-two-cr');
      this.ShowMessages("CR gets 2 breaks and 1 lunch between 7:00 and 8:59 paid hours");

    } else if(workTime[0] >= 6) {
      this.AddBreakToUI('lunch-cr');
      this.ShowMessages("CR only gets Lunch between 6:00 to 6:59 hours");

    } else if(workTime[0] >= 4) {
      this.AddBreakToUI('break-one');
      this.ShowMessages("CR gets 1 break at 4:00 hours");

    } else {
      this.ShowMessages("No Breaks.");
    }
  }

  Check45LunchNYrules(shiftStar, shiftEnd, workTime) {

    if ( (workTime[0] > 12 && workTime[1] > 15 ) || workTime[0] > 13 ) {

      this.ShowMessages('US daily limit is 12 hours. <br>11 hours is the limit for California and Mexico');
      this.AddBreakToUI('not-allowed');

    } 
    else if ((shiftStar.getHours() > 12 || shiftStar.getHours() <= 6 && shiftStar.getMinutes() < 1 ) && ( (workTime[0] >= 10  && workTime[1] > 45) )) {

      this.ShowMessages("Add a 45-minutes lunch and a second 30-minutes lunch + breaks");
      this.AddBreakToUI('break-ny-45-10hours');

    }  
    else if ((shiftStar.getHours() > 12 || shiftStar.getHours() <= 6 && shiftStar.getMinutes() < 1 ) && workTime[0] >= 11) {

      this.ShowMessages("Add a 45-minutes lunch and a second 30-minutes lunch + breaks");
      this.AddBreakToUI('break-ny-45-10hours');

    } 
    else if ((shiftStar.getHours() > 12 || shiftStar.getHours() <= 6 ) && ( (workTime[0] >= 10  && workTime[1] > 45)) ){

      this.ShowMessages("Add a 45-minutes lunch and a second 30-minutes lunch + breaks");
      this.AddBreakToUI('break-ny-45-10hours');

    } else if ((shiftStar.getHours() > 12 || shiftStar.getHours() <= 6 ) && ( (workTime[0] > 10 )) ){

      this.ShowMessages("Add a 45-minutes lunch and a second 30-minutes lunch + breaks");
      this.AddBreakToUI('break-ny-45-10hours');

    } 
    else if ((shiftStar.getHours() > 12 || shiftStar.getHours() <= 6 && shiftStar.getMinutes() < 1) && workTime[0] > 6 && workTime[1] >= 0){

      this.ShowMessages("Add a 45-minutes lunch + breaks for people who work between 1:00 PM and 6:00 AM");
      this.AddBreakToUI('break-ny-45');

    } 
    else if ((shiftStar.getHours() > 12 || shiftStar.getHours() <= 6 && shiftStar.getMinutes() < 1) && workTime[0] > 5 && workTime[1] >= 1){

      this.ShowMessages("Add a 45-minutes lunch + breaks for people who work between 1:00 PM and 6:00 AM");
      this.AddBreakToUI('break-ny-45');

    } 
    else if ((shiftStar.getHours() > 12 || shiftStar.getHours() <= 5 ) && workTime[0] > 5 && workTime[1] >= 1){

      this.ShowMessages("Add a 45-minutes lunch + breaks for people who work between 1:00 PM and 6:00 AM");
      this.AddBreakToUI('break-ny-45');

    }  
    else if ((shiftStar.getHours() > 12 || shiftStar.getHours() <= 5 ) && workTime[0] > 6){

      this.ShowMessages("Add a 45-minutes lunch + breaks for people who work between 1:00 PM and 6:00 AM");
      this.AddBreakToUI('break-ny-45');

    }
    else {
      this.USMXbreakRules(workTime);
    }

  }

  CheckExtra30LunchNY(shiftStar, shiftEnd, workTime){

    if ((workTime[0] > 12 && workTime[1] >= 1) || workTime[0] > 13 ) {

      this.ShowMessages('US daily limit is 12 hours. <br>11 hours is the limit for California and Mexico');
      this.AddBreakToUI('not-allowed');

    } else if (( shiftStar.getHours() < 11 && shiftEnd.getHours() >= 19 && shiftEnd.getMinutes() > 0 ) && workTime[0] > 11 || ( shiftStar.getHours() < 11 && shiftEnd.getHours() >= 20 && shiftEnd.getMinutes() >= 0 ) && workTime[0] > 11 ){ 

      this.ShowMessages("Add second 30-minutes lunch between 5 PM and 7 PM");
      this.AddBreakToUI('break-ny-secondLunch-3break'); 

    } else if (( shiftStar.getHours() < 11 && shiftEnd.getHours() >= 19 && shiftEnd.getMinutes() > 0 ) && workTime[0] > 10 && workTime[1] > 0 || ( shiftStar.getHours() < 11 && shiftEnd.getHours() >= 20 &&   shiftEnd.getMinutes() >= 0 ) && workTime[0] > 10 && workTime[1] > 0){ 

      this.ShowMessages("Add second 30-minutes lunch between 5 PM and 7 PM");
      this.AddBreakToUI('break-ny-secondLunch-3break'); 

    }
     else if (( shiftStar.getHours() < 11 && shiftEnd.getHours() >= 19 && shiftEnd.getMinutes() > 0 ) || ( shiftStar.getHours() < 11 && shiftEnd.getHours() >= 20 &&   shiftEnd.getMinutes() >= 0 ) && workTime[0] > 5){ 

      this.ShowMessages("Add second 30-minutes lunch between 5 PM and 7 PM");
      this.AddBreakToUI('break-ny-secondLunch');

    } 
     else {
      this.USMXbreakRules(workTime);
    }

  }

  CheckEarlyLunchNY(shiftStar, shiftEnd, workTime){


    if ( (workTime[0] > 6) || (workTime[0] > 5 && workTime[1] >= 30 ) ) { 

      if ((workTime[0] > 12 && workTime[1] >= 1) || workTime[0] > 13 ) {

        this.ShowMessages('US daily limit is 12 hours. <br>11 hours is the limit for California and Mexico');
        this.AddBreakToUI('not-allowed');
  
      } else if ((workTime[0] > 9 && workTime[1] > 30) || workTime[0] > 10) {

        this.ShowMessages("Add the first lunch between 11:00 AM and 2:00 PM. <br> Add the first lunch before the breaks");
        this.AddBreakToUI('break-ny-secondLunch-3break');

      }

      else if ( (  (shiftStar.getHours() > 8 && shiftStar.getHours() < 11 && shiftStar.getMinutes() >= 30 )  || (shiftStar.getHours() > 10 && shiftStar.getHours() < 12 && shiftStar.getMinutes() < 30 ) || (shiftStar.getHours() > 9 && shiftStar.getHours() < 11 && shiftStar.getMinutes() >= 0 ) ) )  {
  
        this.ShowMessages("Add lunch between 11:00 AM and 2:00 PM. <br> Add the lunch before the breaks");
        this.AddBreakToUI('break-ny');
  
      }

      else if ( (  (shiftStar.getHours() > 9 && shiftStar.getHours() < 11  ) ) )  {
  
        this.ShowMessages("Add lunch between 11:00 AM and 2:00 PM. <br> Add the lunch before the breaks");
        this.AddBreakToUI('break-ny');
  
      } 
      
      else {
        this.USMXbreakRules(workTime);
      }
  
    } else {
      this.USMXbreakRules(workTime);
    }


  }

  NYBreakRules(workTime) {
    const shiftStar = policyClock(this.startTime.value);
    const shiftEnd = policyClock(this.endTime.value);

    if ( (shiftStar.getHours() > 12  || shiftStar.getHours() <= 6 ) ) { 

      this.Check45LunchNYrules(shiftStar, shiftEnd, workTime);

     } else if ( ( shiftStar.getHours() < 11 && shiftEnd.getHours() > 19 )  ||( shiftStar.getHours() < 11 && shiftEnd.getHours() > 20 )  || ( shiftStar.getHours() < 11 && shiftEnd.getHours() >= 19 && shiftEnd.getMinutes() > 0)  ) {

        this.CheckExtra30LunchNY(shiftStar, shiftEnd, workTime);

     } else {

      this.CheckEarlyLunchNY(shiftStar, shiftEnd, workTime);

    } 

  }

  MXBreakRules(workTime){
    
    if((workTime[0] > 10 && workTime[1] >= 1) || (workTime[0] > 11 && workTime[1] == 0)){
      this.AddBreakToUI('not-allowed');
      this.ShowMessages('MX daily limit is 11:00 hours');
      
    } 
  }

  USMXbreakRules(workTime) {

    if((workTime[0] > 12 && workTime[1] >= 1) || workTime[0] > 13 ){
      this.ShowMessages('US daily limit is 12 hours. <br>11 hours is the limit for California');
      this.AddBreakToUI('not-allowed');
      
    } else if( (workTime[0] > 9 && workTime[1] > 30) || (workTime[0] > 10 && workTime[1] >= 0 )) {
      this.AddBreakToUI('break-three');
      this.ShowMessages("MX and US get 3 breaks and 2 lunch after 10:01 hours");

    } else if( (workTime[0] > 5 && workTime[1] > 30) || (workTime[0] > 6 && workTime[1] >= 0) )  {
      this.AddBreakToUI('break-two');
      this.ShowMessages("MX and US get 2 breaks and 1 lunch after 6:01 hours");

    } else if( (workTime[0] > 4 && workTime[1] > 0) || (workTime[0] > 5 && workTime[1] >= 0)) {
      this.AddBreakToUI('lunch');
      this.ShowMessages("MX and US get 1 break and 1 lunch after 5:01 hours");
 
    } else if( (workTime[0] > 2 && workTime[1] >= 30) || (workTime[0] > 3 && workTime[1] >= 0) ) {
      this.AddBreakToUI('break-one');
      this.ShowMessages("MX and US get 1 break after 3:30 hours");
    } else {
      this.ShowMessages("No Breaks");
    }

  }


}
function existingPolicy(code,{minutes,start,end}){
 const policy=new ExistingPolicy(start,end);
 const duration=[Math.floor(minutes/60),minutes%60];
 if(code==='NY') policy.CheckNYconditions(duration);
 else {policy.CheckUSMXconditions(duration);if(code==='MX'&&minutes>660){policy.items=[];policy.unsupported=true;policy.messages=['MX daily limit is 11:00 hours'];}}
 return {items:policy.items,message:policy.messages.join('<br>'),unsupported:!!policy.unsupported};
}
module.exports={existingPolicy};
