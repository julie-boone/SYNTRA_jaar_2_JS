const timeUl = document.querySelector(".videos").children;

console.log(timeUl);

let timeArray = [];

for (i = 0; i <= timeUl.length - 1; i++) {
  timeArray.push(timeUl[i].dataset.time);
}

//kan ook met array.from(), maar dan zet je wel de volledige elementen in een array,
//en moet je in de map hierna de data eruithalen

timeInDecimal = timeArray
  .map((cv) => {
    const minuteArray = cv.split(":");
    console.log(minuteArray);
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
