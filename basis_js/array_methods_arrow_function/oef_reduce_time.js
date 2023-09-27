const timeUl = document.querySelector(".videos").children;

console.log(timeUl);

let timeArray = [];

for (i = 0; i <= timeUl.length - 1; i++) {
  timeArray.push(timeUl[i].dataset.time);
}

timeInDecimal = timeArray
  .map((cv) => {
    let minuteArray = cv.split(":");
    let seconds = parseInt(minuteArray[1]);
    let minutes = parseInt(minuteArray[0] * 60);
    let decimalTime = minutes + seconds;
    return decimalTime;
  })
  .reduce((acc, cv) => {
    acc += cv;
    return acc;
  }, 0);

const addedTime = new Date(0, 0, 0, 0, 0, 0);
addedTime.setSeconds(timeInDecimal);

console.log(
  `${addedTime.getHours()}:${addedTime.getMinutes()}:${addedTime.getSeconds()}`
);

//display in U:M:S
