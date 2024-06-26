class Percentage {
  constructor(percent) {
    this.percent = percent; // 0 to 100
  }

  toString() {
    return `${this.percent}%`;
  }

  valueOf() {
    return this.percent / 100;
  }
}

const fivePercent = new Percentage(5);
console.log(`${fivePercent} of 50 is ${50 * fivePercent}`);

//* Example2
class Property {
  constructor(value, name = "") {
    this._value = value;
    this.name = name;
  }

  get value() {
    return this._value;
  }
  set value(newValue) {
    if (this._value === newValue) return;
    console.log(`Assigning ${newValue} to ${this.name}`);
    this._value = newValue;
  }
}

class Creature {
  constructor() {
    this._agility = new Property(10, "agility");
  }

  get agility() {
    return this._agility.value;
  }
  set agility(value) {
    this._agility.value = value;
  }
}

const c = new Creature();
c.agility = 12;
c.agility = 13;

//* Example 3
class Car {
  drive() {
    console.log("Car being driven");
  }
}

class CarProxy {
  constructor(driver) {
    this.driver = driver;
    this._car = new Car();
  }

  drive() {
    if (this.driver.age >= 16) this._car.drive();
    else console.log("Driver too young");
  }
}

class Driver {
  constructor(age) {
    this.age = age;
  }
}

const car = new Car();
car.drive();

const car2 = new CarProxy(new Driver(12)); // try 22
car2.drive();

//* Example 4
class Image {
  constructor(url) {
    this.url = url;
    console.log(`Loading image from ${this.url}`);
  }

  draw() {
    console.log(`Drawing image ${this.url}`);
  }
}

class LazyImage {
  constructor(url) {
    this.url = url;
  }

  draw() {
    if (!this.image) this.image = new Image(this.url);
    this.image.draw();
  }
}

function drawImage(img) {
  console.log("About to draw the image");
  img.draw();
  console.log("Done drawing the image");
}

const img = new LazyImage("http://pokemon.com/pikachu.png");
drawImage(img);

//* Exercise
class Person {
  constructor(age = 0) {
    this.age = age;
  }

  drink() {
    return "drinking";
  }
  drive() {
    return "driving";
  }
  drinkAndDrive() {
    return "driving while drunk";
  }
}

class ResponsiblePerson {
  constructor(person) {
    this.person = person;
  }

  get age() {
    return this.person.age;
  }

  set age(value) {
    this.person.age = value;
  }

  drink() {
    if (this.age >= 18) return this.person.drink();
    return "too young";
  }

  drive() {
    if (this.age >= 16) return this.person.drive();
    return "too young";
  }

  // don't do it, folks!
  drinkAndDrive() {
    return "dead";
  }
}
