const startTime = document.querySelector('.start-time');
const endTime = document.querySelector('.end-time');
const shiftBar = document.querySelector('.shift-bar');

const messageSideBar = document.querySelector('.messages-box');
const segmentBox = document.querySelector('.segment-box');
const totalBox = document.querySelector('.total-box');


export class BreakCalculator{
    constructor(){
      this.startTime = startTime;
      this.endTime = endTime;
      this.totalBox = totalBox;
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

    let firstDate = new Date(this.startTime.value);
    let secondDate = new Date(this.endTime.value);

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
    

    this.TimeToMilliseconds();  
  }

  TimeToMilliseconds() {

    let milliseconds = this.savedMilliseconds;

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

    this.AddUpSplitTime(hoursArray);
    this.DeleteMessages();
    this.DeleteShiftBar();
    this.DetermineBreaks(hoursArray);

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
    } else {
      console.log('Alert No Break')
    }

  }

  CRbreakRules(workTime){

    if(workTime[0] >= 11 && workTime[1] > 0){

      this.ShowMessages('Shifts greater than 11 hours are not allowed in CR');
      
    } else if(workTime[0] >= 11 && workTime[1] == 0) {

      this.AddBreakToUI('break-three-cr');
      this.ShowMessages('CR gets 3 breaks and 1 lunch from 8 to 9 hours');

    }
     else if(workTime[0] >= 9 && workTime[1] >= 1) {

      this.AddBreakToUI('break-three-cr');
      this.ShowMessages('CR gets 3 breaks and 1 lunch from 8 to 9 hours');

    } else if(workTime[0] >= 9 && workTime[1] == 0) {

      this.AddBreakToUI('break-two-cr');
      this.ShowMessages('CR gets 2 breaks and 1 lunch from 8 to 9 hours');

    } else if(workTime[0] >= 8 && workTime[0] < 9 && workTime[1] >= 1) {

      this.AddBreakToUI('break-two-cr');
      this.ShowMessages('CR gets 2 breaks and 1 lunch from 8 to 9 hours');

    } else if(workTime[0] >= 8 && workTime[1] == 0) {

      this.AddBreakToUI("lunch-cr", "Lunch-cr");
      this.ShowMessages("CR gets only lunch from 6 to 8 hours");

    }
     else if(workTime[0] >= 6 && workTime[0] < 8) {

      this.AddBreakToUI("lunch-cr", "Lunch-cr");
      this.ShowMessages("CR gets only lunch from 6 to 8 hours");

    } else if(workTime[0] >= 4 && workTime[0] < 6 ) {

      this.AddBreakToUI("break-one", "Break 1");
      this.ShowMessages("Add a break after 4 hours");
      
    } else {

      this.ShowMessages('No Breaks for CR for less than 4 hours');
      
    }
  }

  USMXbreakRules(workTime, VILocation) {

    if(workTime[0] >= 10 && workTime[1] >= 1){
      this.ShowMessages('Shifts greater than 10 hours are not allowed');
      
    } else if(workTime[0] >= 10 && workTime[1] == 0) {
      this.AddBreakToUI("break-two");
      this.ShowMessages("US and MX get 2 breaks and 1 lunch after 6 hours");

    }
     else if(workTime[0] > 5 && workTime[1] >= 1) {
      this.AddBreakToUI("break-two");
      this.ShowMessages("US and MX get 2 breaks and 1 lunch after 6 hours");

    }
     else if(workTime[0] > 5 && workTime[1] == 0) {
      this.AddBreakToUI("lunch");
      this.ShowMessages("US and MX get 1 break and 1 lunch after 5 hours");

    } else if(workTime[0] >= 5 && workTime[1] > 0) {
      this.AddBreakToUI("lunch");
      this.ShowMessages("US and MX get 1 break and 1 lunch after 5 hours");

    }
     else if(workTime[0] >= 5 && workTime[1] >= 0) {
      this.AddBreakToUI("break-one");
      this.ShowMessages("US and MX get first break after 4 hours");

    } else if(workTime[0] >= 4 && workTime[0] < 5 ) {
      this.AddBreakToUI("break-one");
      this.ShowMessages("US and MX get first break after 4 hours");

    }
     else if(workTime[0] >= 3 && workTime[1] >= 30 && VILocation === 'CA') {
      this.AddBreakToUI("break-one");
      this.ShowMessages("CA gets first break at 3.5 hours");

    } else {

      this.ShowMessages('No Breaks');
      
    }

  }

  DetermineBreaks(hoursMinutes){

    const AllLocations = document.querySelector('.locations').value;

    if(AllLocations === "CR"){

      this.CRbreakRules(hoursMinutes);

    } else {

      this.USMXbreakRules(hoursMinutes, AllLocations);

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

  AddUpSplitTime(totalHours){
    this.totalBox.innerHTML = `<p><span class="total-time">${totalHours[0]}:${totalHours[1]}</span></p>`;
  }

  DeleteMessages(){
    messageSideBar.innerHTML = '';
  }

  DeleteTimeTotal(){
  
    this.savedMilliseconds = [];
    this.totalBox.innerHTML = '00:00';
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
