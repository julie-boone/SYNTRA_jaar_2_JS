// Get your shorts on - this is an array workout!
// ## Array Cardio Day 1

// Some data we can work with

const inventors = [
  { first: "Albert", last: "Einstein", year: 1879, passed: 1955 },
  { first: "Isaac", last: "Newton", year: 1643, passed: 1727 },
  { first: "Galileo", last: "Galilei", year: 1564, passed: 1642 },
  { first: "Marie", last: "Curie", year: 1867, passed: 1934 },
  { first: "Johannes", last: "Kepler", year: 1571, passed: 1630 },
  { first: "Nicolaus", last: "Copernicus", year: 1473, passed: 1543 },
  { first: "Max", last: "Planck", year: 1858, passed: 1947 },
  { first: "Katherine", last: "Blodgett", year: 1898, passed: 1979 },
  { first: "Ada", last: "Lovelace", year: 1815, passed: 1852 },
  { first: "Sarah E.", last: "Goode", year: 1855, passed: 1905 },
  { first: "Lise", last: "Meitner", year: 1878, passed: 1968 },
  { first: "Hanna", last: "Hammarström", year: 1829, passed: 1909 },
];

const people = [
  "Bernhard, Sandra",
  "Bethea, Erin",
  "Becker, Carl",
  "Bentsen, Lloyd",
  "Beckett, Samuel",
  "Blake, William",
  "Berger, Ric",
  "Beddoes, Mick",
  "Beethoven, Ludwig",
  "Belloc, Hilaire",
  "Begin, Menachem",
  "Bellow, Saul",
  "Benchley, Robert",
  "Blair, Robert",
  "Benenson, Peter",
  "Benjamin, Walter",
  "Berlin, Irving",
  "Benn, Tony",
  "Benson, Leana",
  "Bent, Silas",
  "Berle, Milton",
  "Berry, Halle",
  "Biko, Steve",
  "Beck, Glenn",
  "Bergman, Ingmar",
  "Black, Elk",
  "Berio, Luciano",
  "Berne, Eric",
  "Berra, Yogi",
  "Berry, Wendell",
  "Bevan, Aneurin",
  "Ben-Gurion, David",
  "Bevel, Ken",
  "Biden, Joseph",
  "Bennington, Chester",
  "Bierce, Ambrose",
  "Billings, Josh",
  "Birrell, Augustine",
  "Blair, Tony",
  "Beecher, Henry",
  "Biondo, Frank",
];

// 1. Filter the list of inventors for those who were born in the 1500's

const filteredInventors = inventors.filter((inventor) => {
  return inventor.year < 1600 && inventor.year >= 1500;
});

// console.log(filteredInventors);

// 2. Give us an array of the inventors first and last names

const firstAndLast = inventors.map((inventor) => {
  return `${inventor.first}, ${inventor.last}`; //handigst met template literals
});

// console.log(firstAndLast);

// 3. Sort the inventors by birthdate, oldest to youngest

const inventorsSorted = inventors.sort((a, b) => {
  if (a.year < b.year) {
    return -1;
  }
  if (a.year > b.year) {
    return 1;
  }
  if ((a.year = b.year)) {
    return 0;
  }
});

// console.log(inventorsSorted);

// 4. How many years did all the inventors live all together?

let totalAge = 0;
inventors.forEach((inventor) => {
  totalAge += inventor.passed - inventor.year;
});

// console.log(totalAge);

//optie2

const sumOfAgeReduce = inventors.reduce((acc, inventor) => {
  const age = inventor.passed - inventor.year;
  acc += age;

  return acc; //dit is altijd het laatste deel van de reduce-method
}, 0); // 0 op het einde is de acc, accumulator, startwaarde

// 5. Sort the inventors by years lived

const ageSorted = inventors
  .sort((a, b) => {
    let ageA = a.passed - a.year;
    let ageB = b.passed - b.year;
    if (ageA < ageB) {
      return -1;
    }
    if (ageA > ageB) {
      return 1;
    }
    if (ageA === ageB) {
      return 0;
    }
  })
  .map((inventor) => {
    inventor.age = inventor.passed - inventor.year; //nieuwe key aanmaken en assigneren
    return inventor; //alle methods zijn chainable, dus kan je in één keer uitvoeren
  });

// console.log(ageSorted);

// 6. create a list of Boulevards in Paris that contain 'de' anywhere in the name
// https://en.wikipedia.org/wiki/Category:Boulevards_in_Paris

// const nodeList = document.querySelectorAll("div.mw-category-group li a");

// const array = Array.from(nodeList);

// const boulevardAvecDe = array
//   .map((cv) => {
//     return cv.title;
//   })
//   .filter((cv) => {
//     return cv.includes("de");
//   });

// console.log(boulevardAvecDe);

//hetzelfde op één regel, met een implicit return function

// const boulevardsAvecDe = array
//   .map((cv) => cv.title)
//   .filter((cv) => cv.includes("de"));

// Sort the people alphabetically by last name

// Sum up the instances of each of these
const data = [
  "car",
  "car",
  "truck",
  "truck",
  "bike",
  "walk",
  "car",
  "van",
  "bike",
  "walk",
  "car",
  "van",
  "car",
  "truck",
];

const dataCounted = data.reduce(
  (acc, data) => {
    switch (data) {
      case "car":
        acc.car++;
        break;
      case "walk":
        acc.walk++;
        break;
      case "truck":
        acc.truck++;
        break;
      case "bike":
        acc.bike++;
        break;
      case "van":
        acc.van++;
        break;
    }

    return acc;
  },
  {
    car: 0,
    walk: 0,
    truck: 0,
    bike: 0,
    van: 0,
  }
);

//nog betere oplossing

const itemsCOunt = data.reduce((acc, cv) => {
  if (!acc[cv]) {
    acc[cv] = 0;
  }
  acc[cv] += 1;
  return acc;
}, {});

// console.log(dataCounted)

// ## Array Cardio Day 2

const people2 = [
  { name: "Wes", year: 1988 },
  { name: "Kait", year: 1986 },
  { name: "Irv", year: 1970 },
  { name: "Lux", year: 2015 },
];

const comments = [
  { text: "Love this!", id: 523423 },
  { text: "Super good", id: 823423 },
  { text: "You are the best", id: 2039842 },
  { text: "Ramen is my fav food ever", id: 123523 },
  { text: "Nice Nice Nice!", id: 542328 },
];

// Some and Every Checks
// Array.prototype.some() // is at least one person 19 or older?
const thisYear = new Date().getFullYear();

const olderThan19 = people2.some(({ year }) => {
  return thisYear - year >= 19;
});
console.log(olderThan19);

// Array.prototype.every() // is everyone 19 or older?
const everyoneOlder = people2.every(({ year }) => {
  return thisYear - year >= 19;
});
console.log(everyoneOlder);

// Array.prototype.find()
// Find is like filter, but instead returns just the one you are looking for
// find the comment with the ID of 823423

const foundComment = comments.find((comment) => {
  return comment.id === 823423;
});

console.log(foundComment);

// Array.prototype.findIndex()
// Find the comment with this ID
const foundCommentID = comments.findIndex((comment) => {
  return comment.id === 823423;
});

console.log(foundCommentID);

// delete the comment with the ID of 823423

const withoutComment = comments.filter((comment) => {
  return comment.id !== 823423;
});

console.log(withoutComment);

//of met een splice

//Use the .sort method without taking articles into account:
const bands = [
  "The Plot in You",
  "The Devil Wears Prada",
  "Pierce the Veil",
  "Norma Jean",
  "The Bled",
  "Say Anything",
  "The Midway State",
  "We Came as Romans",
  "Counterparts",
  "Oh, Sleeper",
  "A Skylit Drive",
  "Anywhere But Here",
  "An Old Dog",
];

const sortedBands = bands
  .map((cv) => {
    let filmWithoutArticle;
    filmWithoutArticle = cv
      .replace(/The /i, "")
      .replace(/An /i, "")
      .replace(/A /i, "");
    return filmWithoutArticle;
  })
  .sort((a, b) => {
    if (a > b) {
      return 1;
    }
    if (a < b) {
      return -1;
    }
    if ((a = b)) {
      return 0;
    }
  });

// console.log(sortedBands);
