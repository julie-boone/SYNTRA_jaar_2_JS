const timeUl = document.querySelector(".videos").children;

console.log(timeUl);

let timeArray = [];

for (i = 0; i <= timeUl.length - 1; i++) {
  timeArray.push(timeUl[i].dataset.time);
}

timeInDecimal = timeArray
  .map((cv) => {
    const minuteArray = cv.split(":");
    const seconds = parseInt(minuteArray[1]);
    const minutes = parseInt(minuteArray[0] * 60);
    const decimalTime = minutes + seconds;
    return decimalTime;
  })
  .reduce((acc, cv) => {
    return acc + cv;
  }, 0);

const addedTime = new Date(0, 0, 0, 0, 0, 0);
addedTime.setSeconds(timeInDecimal);

console.log(
  `${addedTime.getHours()}:${addedTime.getMinutes()}:${addedTime.getSeconds()}`
);

//display in U:M:S
