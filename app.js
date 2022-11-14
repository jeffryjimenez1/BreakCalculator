import { BreakCalculator } from "./calculator.js";

const button = document.querySelector('.main-btn');
const resetBtn = document.querySelector('.clear-btn');
const locationMenu = document.querySelector('.locations');
const addSplitBtn = document.querySelector('.addSplit-btn');
const splitSegmentsBox = document.querySelector('.segment-box');


new BreakCalculator().disableCalendar();

button.addEventListener('click', () => {

  
  new BreakCalculator().Addtime();
  
});

locationMenu.addEventListener('change', () => {

  new BreakCalculator().Addtime();

});

resetBtn.addEventListener('click', () => {
  const noShowMessage = new BreakCalculator();
  noShowMessage.DeleteMessages();
  noShowMessage.DeleteShiftBar();
  noShowMessage.DeleteTimeTotal();
});


addSplitBtn.addEventListener('click', () => {
    new BreakCalculator().NewSegment();
});

splitSegmentsBox.addEventListener('click', (e) => {

  if(e.target.classList.contains('close-split')){

    const inputChildren = e.target.parentElement.children;

    let firstInputDate = new Date(Array.from(inputChildren)[0].value);
    let secondInputDate = new Date(Array.from(inputChildren)[1].value);

    const deletedMilliseconds = firstInputDate - secondInputDate;

    new BreakCalculator().ReduceDeletedSplitMilliseconds(deletedMilliseconds);
    
    e.target.parentElement.style.display = 'none';

  }
  
});

