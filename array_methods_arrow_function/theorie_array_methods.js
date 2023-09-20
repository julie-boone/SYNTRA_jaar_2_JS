//deze methods zijn immutable functions, passen de array niet aan
//push en pop zijn mutable functions, veranderen de originele array

let array1 = [1, 2, 3];

//forEach
// valt gelijk met de for-loop, loopt dus over de array
//kan drie waarden krijgen: current value, index en array, altijd in die volgorde, maar niet verplicht om ze mee te geven
//best practice voor notatie als je enkel de index nodig hebt: (_, index)
//kan geen veranderingen persisteren in de values, dus dient enkel om te lezen

array1.forEach((cv, i, array) => {
  console.log(cv);
});

//map
//ook een for-loop, maar dient om een nieuwe array terug te geven met dezelfde lengte, waarop de functie is uitgevoerd

const array2 = array1.map((cv, i, array) => {
  return cv * 2;
});
console.log(array2);

// filter
//gaat ook een nieuwe array returnen, maar met de gefilterde waarde
//moet een boolean returnen, op basis waarvan hij eruit gefilterd wordt of in de nieuwe array komt

const array3 = array1.filter((cv) => {
  return cv <= 2;
}); // antwoord [1, 2]
const array4 = array1.filter((cv) => {
  if (cv <= 2) {
    return true;
  }
  return false;
}); //lange versie
//geen else nodig, omdat je returnt en dus sowieso uit de functie gaat

//sort
//maakt ook een nieuwe array aan
const array5 = [2, 1, 4, 7, 3];
const sortedArray = array5.sort((a, b) => {
  if (a < b) {
    return 1;
  }
  if (a > b) {
    return -1;
  }
  if (a === b) {
    return 0;
  }
});

//reduce
//array.reduce(functie, initial value)
//geeft één waarde terug

array1.reduce((acc, cv) => {
  //acc is accumulator, wordt bijna altijd zo genoemd
  acc += cv;
  return acc;
}, 0); //op het einde staat de startwaarde of accumulator

//arrow functions, gaat sneller maar kan je niet hergebruiken
function add2(a) {
  return a + 2;
}

const add2 = (a) => {
  return a + 2;
};

const add2 = (a) => a + 2; //implicit return function, werkt enkel als de function op één lijn staat
