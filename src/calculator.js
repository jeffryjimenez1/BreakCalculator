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

    // let firstDate = new Date(this.startTime.value);
    // let secondDate = new Date(this.endTime.value);

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

  GetPaidHours(){
    const AllLocations = document.querySelector('.locations').value;
    const totalHours = this.TimeToMilliseconds(this.savedMilliseconds);

    const box = this.totalBox;
    const boxPaid = this.totalBoxPaid;

    function addTimeUI(timePassed){
      box.innerHTML = `<p><span class="total-time">${totalHours[0]}:${totalHours[1]}</span></p>`;
      boxPaid.innerHTML = `<p><span class="total-time">${timePassed[0]}:${timePassed[1]}</span></p>`;
    };


    if(parseInt(+totalHours[0]) > 9 && parseInt(+totalHours[1]) >= 31 && AllLocations === "MX" || parseInt(+totalHours[0]) > 9 && parseInt(+totalHours[1]) >= 31 &&  AllLocations === "US"){

      const totalTime = this.TimeToMilliseconds(this.savedMilliseconds - (1800000 * 2));

      addTimeUI(totalTime);

      this.USMXbreakRules(totalHours);

    } else if(parseInt(+totalHours[0]) > 4 && parseInt(+totalHours[1]) >= 1 && AllLocations === "MX" || parseInt(+totalHours[0]) > 4 && parseInt(+totalHours[1]) >= 1 &&  AllLocations === "US"){

      const totalTime = this.TimeToMilliseconds(this.savedMilliseconds - 1800000);

      addTimeUI(totalTime);

      this.USMXbreakRules(totalHours);

    } else if (parseInt(+totalHours[0]) > 5 && parseInt(+totalHours[1]) >= 0 && AllLocations === "MX" || parseInt(+totalHours[0]) > 5 && parseInt(+totalHours[1]) >= 0 && AllLocations === "US" ){

      const totalTime = this.TimeToMilliseconds(this.savedMilliseconds - 1800000);

      addTimeUI(totalTime);

      this.USMXbreakRules(totalHours);

    }  else if (AllLocations === "MX" || AllLocations === "US") {

      const totalTime = this.TimeToMilliseconds(this.savedMilliseconds);

      addTimeUI(totalTime);

      this.USMXbreakRules(totalHours);

    }
     else {

      const totalTime = this.TimeToMilliseconds(this.savedMilliseconds);

      addTimeUI(totalHours);
      this.CRbreakRules(totalHours);
      
    }
    
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

    if(breakType === 'break-one') {
      shiftBar.innerHTML = ` <div class="break break-one"><div>break 1</div></div> `;
    } else if (breakType === 'lunch'){
      shiftBar.innerHTML = ` 
      <div class="break break-one"><div>Break 1</div></div> 
      <div class="break lunch"><div>Lunch</div></div> 
      `;
    } else if (breakType === 'lunch-cr'){
      shiftBar.innerHTML = ` 
      <div class="break lunch"><div>Lunch CR</div></div> 
      `;
    } else if (breakType === 'break-two-cr'){
      shiftBar.innerHTML = ` 
      <div class="break break-one"><div>Break 1</div></div> 
      <div class="break lunch"><div>Lunch CR</div></div> 
      <div class="break break-two"><div>Break 2</div></div> 
      `;
    } else if (breakType === 'break-two'){
      shiftBar.innerHTML = ` 
      <div class="break break-one"><div>Break 1</div></div> 
      <div class="break lunch"><div>Lunch</div></div> 
      <div class="break break-two"><div>Break 2</div></div> 
      `;
    } else if (breakType === 'break-three-cr'){
      shiftBar.innerHTML = ` 
      <div class="break break-one"><div>Break 1</div></div> 
      <div class="break lunch"><div>Lunch CR</div></div> 
      <div class="break break-two"><div>Break 2</div></div> 
      <div class="break break-three"><div>Break 3</div></div> 
      `;
    } else if (breakType === 'break-three'){
      shiftBar.innerHTML = ` 
      <div class="break break-one"><div>Break 1</div></div> 
      <div class="break lunch"><div>Lunch</div></div> 
      <div class="break lunch-two"><div>2nd Lunch</div></div> 
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

  USMXbreakRules(workTime) {

    if((workTime[0] > 11 && workTime[1] > 30) || (workTime[0] > 12 && workTime[1] >= 0)){
      this.ShowMessages('US and MX daily limit is 12 hours. <br>11 hours is the limit for California');
      
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
