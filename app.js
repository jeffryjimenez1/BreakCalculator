


const button = document.querySelector('.main-btn');



button.addEventListener('click', () => {

  let startTime = document.querySelector('.start-time');
  let endTime = document.querySelector('.end-time');


  let firstDate = new Date(startTime.value);

  let secondDate = new Date(endTime.value);

  let milliseconds = secondDate - firstDate;

  const getHoursMinutes = new BreakCalculator(firstDate, secondDate);
  
  console.log(getHoursMinutes.TimeToMilliseconds(milliseconds))

  
  startTime.value = '2022-10-29T00:00:00';
  endTime.value = '2022-10-30T00:00:00';
  
})


class BreakCalculator{
    constructor(date1, date2){
      this.date1 = date1;
      this.date2 = date2;
    }

  PadTo2Digits(num) {

    return num.toString().padStart(2, '0');
  }

  TimeToMilliseconds(milliseconds) {
    let seconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);

    seconds = seconds % 60;
    // 👇️ if seconds are greater than 30, round minutes up (optional)
    minutes = seconds >= 30 ? minutes + 1 : minutes;

    minutes = minutes % 60;

    // 👇️ If you don't want to roll hours over, e.g. 24 to 00
    // 👇️ comment (or remove) the line below
    // commenting next line gets you `24:00:00` instead of `00:00:00`
    // or `36:15:31` instead of `12:15:31`, etc.
    hours = hours % 24;

    let totalHours = `${this.PadTo2Digits(hours)}:${this.PadTo2Digits(minutes)}`;

    const getHours = totalHours.substring(0,totalHours.indexOf(':'));

    const getMinutes = totalHours.substring(totalHours.indexOf(':') + 1);

    const hoursArray = [getHours, getMinutes];

    this.DetermineBreaks(hoursArray);

    return hoursArray;
  }

  DetermineBreaks(hoursMinutes){

    if(hoursMinutes[0] >= 10){

      alert('10 HOURS SHIFT IS NOT ALLOWED')


    } else if(hoursMinutes[0] >= 8) {

      alert('Person gets two break and One Lunch')

    } else if(hoursMinutes[0] >= 6 && hoursMinutes[1] >= 1){

      alert('Person gets one 15 minutes break, one 10 break and One Lunch')

    } else if(hoursMinutes[0] >= 6){

      alert('Person gets one break and One Lunch')

    }
    else if(hoursMinutes[0] >= 4 ){

      alert('Person gets one break only')

    } else {
      alert('No breaks')
    }

  }

  
}


