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

const oldInventors = inventors.filter((inventor) => {
  let oldInventor;
  if (inventor.year >= 1500) {
    if (inventor.year < 1600) {
      oldInventor = inventor;
    }
  }
  return oldInventor;
});

console.log(oldInventors);

// 2. Give us an array of the inventors first and last names

let firstAndLast = inventors.map((inventor) => {
  return `${inventor.first} ${inventor.last}`;
});

console.log(firstAndLast);

// 3. Sort the inventors by birthdate, oldest to youngest

let sortedInventors = inventors.sort((a, b) => {
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

console.log(sortedInventors);

// 4. How many years did all the inventors live all together?

const sumOfAges = inventors.reduce((acc, inventor) => {
  const age = inventor.passed - inventor.year;
  return acc + age;
}, 0);

console.log(sumOfAges);

// 5. Sort the inventors by years lived

const sortedByAge = inventors.sort((a, b) => {
  const ageA = a.passed - a.year;
  const ageB = b.passed - b.year;
  if (ageA < ageB) {
    return -1;
  }
  if (ageA > ageB) {
    return 1;
  }
  if (ageA === ageB) {
    return 0;
  }
});

console.log(sortedByAge);

// 6. create a list of Boulevards in Paris that contain 'de' anywhere in the name
// https://en.wikipedia.org/wiki/Category:Boulevards_in_Paris

const boulevards = document.querySelectorAll(".mw-category-group ul li");
console.log(boulevards);

const boulevardsArray = Array.from(boulevards);

const boulevardsWithDe = boulevardsArray
  .map((boulevard) => {
    return boulevard.innerText;
  })
  .filter((boulevard) => {
    return boulevard.includes("de");
  });

console.log(boulevardsWithDe);

// Sort the people alphabetically by last name

// const alphabetical = people.sort((a, b) => {
//   const firstLetterA = a[0];
//   const firstLetterB = b[0];
//   if (a < b) {
//     return -1;
//   }
//   if (a > b) {
//     return 1;
//   }
//   if (a === b) {
//     return 0;
//   }
// });

console.log(alphabetical);

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

// ## Array Cardio Day 2

// const people = [
//   { name: "Wes", year: 1988 },
//   { name: "Kait", year: 1986 },
//   { name: "Irv", year: 1970 },
//   { name: "Lux", year: 2015 },
// ];

const comments = [
  { text: "Love this!", id: 523423 },
  { text: "Super good", id: 823423 },
  { text: "You are the best", id: 2039842 },
  { text: "Ramen is my fav food ever", id: 123523 },
  { text: "Nice Nice Nice!", id: 542328 },
];

// Some and Every Checks
// Array.prototype.some() // is at least one person 19 or older?
// Array.prototype.every() // is everyone 19 or older?

// Array.prototype.find()
// Find is like filter, but instead returns just the one you are looking for
// find the comment with the ID of 823423

// Array.prototype.findIndex()
// Find the comment with this ID
// delete the comment with the ID of 823423
