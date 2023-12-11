//template
class Dog {
  //constructor dient om setup te doen (kan niet async zijn)
  constructor(name, birthday) {
    this.name = name;
    this.birthday = birthday;
    this.visits = 0;
  }

  //static methods (zitten op de klasse zelf)
  static register() {
    console.log("New dog in shelter");
  }

  // methods
  bark() {
    console.log(`Hi, I am ${this.name}!`);
  }
}

class GoldenRetriever extends Dog {
  constructor(name, birthday) {
    super(name, birthday);
    this.color = "golden";
  }

  bark() {
    console.log("I am a " + this.color + " retriever, " + this.name);
  }
}

//instances

const rufus = new GoldenRetriever("Rufus", "11/05/2019");
const bobby = new Dog("Bobby", "25/07/2014");

rufus.bark();
bobby.bark();
