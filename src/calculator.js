const startTime = document.querySelector('.start-time');
const endTime = document.querySelector('.end-time');
const shiftBar = document.querySelector('.shift-bar');

const messageSideBar = document.querySelector('.messages-box');
const segmentBox = document.querySelector('.segment-box');
const totalBox = document.querySelector('.total-box');
const totalBoxPaid = document.querySelector('.total-box-paid');


export class BreakCalculator{
    constructor(){
      this.startTime = startTime;
      this.endTime = endTime;
      this.totalBox = totalBox;
      this.totalBoxPaid = totalBoxPaid;
      this.messageSideBar = messageSideBar;
      this.savedMilliseconds = 0;
      this.delMill = 0;
    }

  PadTo2Digits(num) {

    return num.toString().padStart(2, '0');
  }

  ReduceDeletedSplitMilliseconds(deletedMilliseconds){

    this.savedMilliseconds = 0;
    this.delMill = deletedMilliseconds;

    this.Addtime();

  }

  Addtime(){

    const dayjs = require('dayjs');
    let utc = require('dayjs/plugin/utc')
    let timezone = require('dayjs/plugin/timezone')
    dayjs.extend(utc) 
    dayjs.extend(timezone)

    const firstDate = dayjs.utc(this.startTime.value).tz('America/New_York');
    const secondDate = dayjs.utc(this.endTime.value).tz('America/New_York');

    let allSplitsStart = [];
    let allSplitsEnd = [];

    document.querySelectorAll('.start-split').forEach(item => allSplitsStart.push(new Date(item.value).getTime()));
    document.querySelectorAll('.end-split').forEach(item => allSplitsEnd.push(new Date(item.value).getTime()));

    let addUpStarts = allSplitsStart.reduce((a, b) => a + b, 0);

    let addUpEnds = allSplitsEnd.reduce((a, b) => a + b, 0);

    let totalAddUps = addUpEnds - addUpStarts;

    let originalMilliseconds =  (secondDate - firstDate);

    let passMill = originalMilliseconds - totalAddUps;

    this.savedMilliseconds = passMill - this.delMill;

    this.GetPaidHours();
  }

  AddPaidHours(timeAdded, totalHours){

    const box = this.totalBox;
    const boxPaid = this.totalBoxPaid;

    function addTimeUI(timePassed){
      box.innerHTML = `<p><span class="total-time">${totalHours[0]}:${totalHours[1]}</span></p>`;
      boxPaid.innerHTML = `<p><span class="total-time">${timePassed[0]}:${timePassed[1]}</span></p>`;
    };

    const totalTime = this.TimeToMilliseconds(this.savedMilliseconds - (timeAdded));

    addTimeUI(totalTime);

  }

  GetPaidHours(){
    const AllLocations = document.querySelector('.locations').value;
    const totalHours = this.TimeToMilliseconds(this.savedMilliseconds);

    if (AllLocations === "MX" && parseInt(+totalHours[0]) > 10) {
      this.MXBreakRules(totalHours);
    }

    if (AllLocations === "NY") {
      this.CheckNYconditions(totalHours);
    }
    
    else if ( AllLocations === "MX" || AllLocations === "US" ) {
      this.CheckUSMXconditions(totalHours);
    } 

    else {
      this.AddPaidHours((0), totalHours);
      this.CRbreakRules(totalHours);
    }
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

    const shiftStar = new Date(this.startTime.value);
    const shiftEnd = new Date(this.endTime.value);

    if ((shiftStar.getHours() > 12 && shiftEnd.getHours() < 7 ) && parseInt(+totalHours[0]) > 9 && parseInt(+totalHours[1]) >= 31  ){
      this.AddPaidHours((2700000 + 1800000), totalHours);
    }

    else if((shiftStar.getHours() > 12 && shiftEnd.getHours() <= 23 ) && parseInt(+totalHours[0]) > 5 || (shiftStar.getHours() >= 0 && shiftEnd.getHours() < 7 ) && parseInt(+totalHours[0]) > 5 ) {
      this.AddPaidHours((2700000), totalHours);
      console.log('SECONDS ')
    }

    else if(shiftStar.getHours() <= 11  && shiftEnd.getHours() >= 19) {
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


  TimeToMilliseconds(totalmilliseconds) {

    let milliseconds = totalmilliseconds;

    let seconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);

    seconds = seconds % 60;

    minutes = seconds >= 30 ? minutes + 1 : minutes;

    minutes = minutes % 60;

    hours = hours % 24;

    let totalHours = `${this.PadTo2Digits(hours)}:${this.PadTo2Digits(minutes)}`;

    const getHours = totalHours.substring(0,totalHours.indexOf(':'));
    const totalMinutes  = totalHours.substring(totalHours.indexOf(':') + 1);

    const hoursArray = [getHours, totalMinutes];

    this.DeleteMessages();
    this.DeleteShiftBar();
    return hoursArray;

  }
  
  ShowMessages(message){

    const messageDiv = document.createElement('div');
    const messageContainer= document.querySelector('.messages-box');
    messageDiv.innerHTML = `<p class="messageItem">${message}</p>`;
    messageContainer.appendChild(messageDiv);

  }

  AddBreakToUI(breakType){
    const shiftBar = document.querySelector('.shift-bar');
    const breakDiv = document.createElement('div');
    breakDiv.classList = `break ${breakType}`;

    if(breakType === 'not-allowed') {
      shiftBar.innerHTML = ` <div class="break break-one"><div>Not Allowed</div></div> `;
    }
    else if(breakType === 'break-one') {
      shiftBar.innerHTML = ` <div class="break break-one"><div>break 1</div></div> `;
    } else if (breakType === 'lunch'){
      shiftBar.innerHTML = ` 
      <div class="break break-one"><div>Break 1</div></div> 
      <div class="break lunch"><div>30m</div></div> 
      `;
    } else if (breakType === 'lunch-cr'){
      shiftBar.innerHTML = ` 
      <div class="break lunch"><div>30m CR</div></div> 
      `;
    } else if (breakType === 'break-two-cr'){
      shiftBar.innerHTML = ` 
      <div class="break break-one"><div>Break 1</div></div> 
      <div class="break lunch"><div>30m CR</div></div> 
      <div class="break break-two"><div>Break 2</div></div> 
      `;
    } else if (breakType === 'break-two'){
      shiftBar.innerHTML = ` 
      <div class="break break-one"><div>Break 1</div></div> 
      <div class="break lunch"><div>30m</div></div> 
      <div class="break break-two"><div>Break 2</div></div> 
      `;
    } else if (breakType === 'break-three-cr'){
      shiftBar.innerHTML = ` 
      <div class="break break-one"><div>Break 1</div></div> 
      <div class="break lunch"><div>30m CR</div></div> 
      <div class="break break-two"><div>Break 2</div></div> 
      <div class="break break-three"><div>Break 3</div></div> 
      `;
    } else if (breakType === 'break-three'){
      shiftBar.innerHTML = ` 
      <div class="break break-one"><div>Break 1</div></div> 
      <div class="break lunch"><div>30m</div></div> 
      <div class="break lunch-two"><div>30m</div></div> 
      <div class="break break-two"><div>Break 2</div></div> 
      <div class="break break-three"><div>Break 3</div></div> 
      `;
    } else if (breakType === 'break-ny') {
      shiftBar.innerHTML = ` 
      <div class="break break-one"><div>Break 1</div></div> 
      <div class="break lunch"><div>30m NY</div></div> 
      <div class="break break-two"><div>Break 2</div></div> 
      `; 
    }
    else if (breakType === 'break-ny-secondLunch') {
      shiftBar.innerHTML = ` 
      <div class="break break-one"><div>Break 1</div></div> 
      <div class="break lunch"><div>30m</div></div> 
      <div class="break lunch-two"><div>30m</div></div> 
      <div class="break break-two"><div>Break 2</div></div> 
      `;
    } else if (breakType === 'break-ny-45') {
      shiftBar.innerHTML = ` 
      <div class="break break-one"><div>Break 1</div></div>
      <div class="break lunch"><div>45m NY</div></div>
      <div class="break break-two"><div>Break 2</div></div>
      `;
    } else if (breakType === 'break-ny-45-10hours') {
      shiftBar.innerHTML = ` 
      <div class="break break-one"><div>Break 1</div></div>
      <div class="break lunch"><div>45m NY</div></div> 
      <div class="break lunch"><div>30m NY</div></div>
      <div class="break break-two"><div>Break 2</div></div>
      <div class="break break-three"><div>Break 3</div></div>
      `;
    }
     else {
      console.log('Alert No Break')
    }

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
      this.ShowMessages("No Breaks");
    }
  }

  NYBreakRules(workTime) {
    const shiftStar = new Date(this.startTime.value);
    const shiftEnd = new Date(this.endTime.value);

    if((workTime[0] > 11 && workTime[1] > 30) || (workTime[0] > 12 && workTime[1] >= 0)){
      this.ShowMessages('US daily limit is 12 hours. <br>11 hours is the limit for California and Mexico');
      this.AddBreakToUI('not-allowed');
      
    } else if ((shiftStar.getHours() < 11  && shiftEnd.getHours() >= 19) && workTime[0] > 5){

      this.ShowMessages("Add second 30-minutes lunch between 5 PM and 7 PM");
      this.AddBreakToUI('break-ny-secondLunch');

    } else if (((shiftStar.getHours() > 12 && shiftEnd.getHours() <= 23 ) || (shiftStar.getHours() > 12 && shiftEnd.getHours() < 7 ) || shiftStar.getHours() <= 6  ) && workTime[0] > 9 && workTime[1] >= 31 ) {

      this.ShowMessages("Add a 45-minutes lunch and a second 30-minutes lunch + breaks");
      this.AddBreakToUI('break-ny-45-10hours');

    } else if ((shiftStar.getHours() > 12 && shiftEnd.getHours() <= 23 ) && workTime[0] > 5 || (shiftStar.getHours() >= 0 && shiftEnd.getHours() < 7 ) && workTime[0] > 5 || ( shiftStar.getHours() <= 6 && shiftStar.getMinutes() < 1 ) && workTime[0] > 5) {
      this.ShowMessages("Add a 45-minutes lunch + breaks for people who work between 1:00 PM and 6:00 AM");
      this.AddBreakToUI('break-ny-45');
    }

    else if ( (  (shiftStar.getHours() > 8 && shiftStar.getHours() < 11 && shiftStar.getMinutes() >= 30) || (shiftStar.getHours() > 10 && shiftStar.getHours() < 12 && shiftStar.getMinutes() < 1 ) ) && workTime[0] > 5 )  {

      this.ShowMessages("Add lunch between 11:00 AM and 2:00 PM. <br> Add the lunch and 2 breaks");
      this.AddBreakToUI('break-ny');

    } 
    
    else {
      this.USMXbreakRules(workTime);
    }

  }

  MXBreakRules(workTime){
    
    if((workTime[0] > 10 && workTime[1] >= 1) || (workTime[0] > 11 && workTime[1] == 0)){
      this.AddBreakToUI('not-allowed');
      this.ShowMessages('MX daily limit is 11:00 hours');
      
    } 
  }

  USMXbreakRules(workTime) {

    if((workTime[0] > 11 && workTime[1] > 30) || (workTime[0] > 12 && workTime[1] >= 0)){
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

  NewSegment() {

    const segmentControlItem = document.createElement('div');
    segmentControlItem.classList = 'segmentItem';
    segmentControlItem.innerHTML = `
          <input type="datetime-local" value="2022-10-30T00:00:00" class="enter-time addedSplitStart start-split">
          <input type="datetime-local" value="2022-10-29T00:00:00"  class="enter-time addedSplitEnd end-split">
          <!-- <button class="close-split">&#10006</button> -->
    `;

    segmentBox.appendChild(segmentControlItem);

    this.disableCalendar();

    return;

  }

  DeleteMessages(){
    messageSideBar.innerHTML = '';
  }

  DeleteTimeTotal(){
  
    this.savedMilliseconds = [];
    this.totalBox.innerHTML = '00:00';
    this.totalBoxPaid.innerHTML = '00:00';
    this.startTime.value = "2022-10-29T00:00:00";
    this.endTime.value = "2022-10-30T00:00:00";

    document.querySelectorAll('.start-split').forEach(item => item.value = '2022-10-30T00:00:00');
    document.querySelectorAll('.end-split').forEach(item => item.value = '2022-10-29T00:00:00');
    document.querySelector('.segment-box').innerHTML = '';

  }

  DeleteShiftBar(){
    shiftBar.innerHTML = '';
  }

  disableCalendar(){
    const inputTimeField = document.querySelectorAll('.enter-time');

    inputTimeField.forEach(item => {
      item.addEventListener('keydown',(e)=>{
        const key = e.keyCode;
        if(key === 32){
          e.preventDefault();
        }
      })
    })
  }


}
