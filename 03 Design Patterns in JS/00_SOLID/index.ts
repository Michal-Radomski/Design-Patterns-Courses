//@ KISS, DRY  and other Principles
//^ KISS Principle (Keep It Simple, Stupid)
//* KISS is a principle that emphasizes simplicity in software design and implementation. It suggests that most systems work best when they are kept simple rather than made overly complex. The key aspects of KISS are:
// 1)  Avoid unnecessary complexity and over-engineering
// 2)  Favor simple, straightforward solutions over convoluted ones
// 3)  Write code that is easy to understand and maintain
// 4)  Break down complex problems into simpler, manageable parts

//^ DRY Principle (Don't Repeat Yourself)
//* DRY is a principle that aims to reduce repetition of code and data. It states that "every piece of knowledge must have a single, unambiguous, authoritative representation within a system." The key aspects of DRY are:
// 1)  Eliminate redundant or duplicated code
// 2)  Extract shared code into reusable abstractions (functions, classes, modules)
// 3)  Modify related items in just one place when changes are required

//^ The principle of least astonishment (or principle of least surprise)
//* The principle of least astonishment (or principle of least surprise) is a key concept in software design and user experience. It states that a system should behave in a way that is consistent with users' reasonable expectations and should avoid surprising or astonishing them with unexpected behavior.
//  1)  It aims to minimize surprising or unintuitive behavior from software systems and user interfaces. The system should operate in a predictable manner aligned with users' mental models and prior experiences.
//  2)  It promotes designing interfaces and APIs that follow common conventions and patterns that users are already familiar with. This reduces the learning curve and cognitive load on users.
//  3)  Method names, variable names, and other code constructs should clearly communicate their purpose and behavior to avoid surprising developers working with the code.
//  4)  When a system must deviate from established conventions or expectations, it should provide clear feedback and justification to users to minimize confusion.
//  5)  The principle is closely related to other design principles like consistency, discoverability, and providing appropriate affordances in user interfaces.
//  6)  Adhering to the principle of least astonishment can improve usability, learnability, and overall user satisfaction with software products.

//^ YAGNI (You Aren't Gonna Need It)
// The YAGNI principle is a concept in software development that suggests you should only implement functionality when it is actually needed, rather than anticipating future requirements and implementing them preemptively. It is part of the Extreme Programming (XP) methodology and is closely related to the KISS (Keep It Simple, Stupid) principle.

//^ Command–Query Separation (CQS)
//* Without CQS
class Counter {
  private count = 0;

  incrementAndGet(): number {
    this.count += 1;
    return this.count;
  }
}

const counter = new Counter();
console.log(counter.incrementAndGet()); // Output: 1

//* With CQS
class Counter2 {
  private count = 0;

  increment(): void {
    this.count += 1;
  }

  getCount(): number {
    return this.count;
  }
}

const counter2 = new Counter2();
counter2.increment();
console.log(counter2.getCount()); // Output: 1

//@ SOLID Principles
//^ SOLID is an acronym for five fundamental principles of object-oriented programming and design. These principles aim to make software designs more understandable, flexible, and maintainable. The SOLID principles are:
//* Single Responsibility Principle (SRP)
// A class should have only one reason to change, meaning it should have a single responsibility or job. This helps in achieving loose coupling and high cohesion in software components.
//* Open/Closed Principle (OCP)
// Software entities (classes, modules, functions, etc.) should be open for extension but closed for modification. This means that the behavior of existing code should be extended without modifying its source code.
//* Liskov Substitution Principle (LSP)
// Subtypes must be substitutable for their base types. In other words, if S is a subtype of T, then objects of type T may be replaced with objects of type S without altering any of the desirable properties of the program.
//* Interface Segregation Principle (ISP)
// Clients should not be forced to depend on interfaces they do not use. Instead of one fat interface, we should have many small interfaces, each addressing a specific subset of behavior.
//* Dependency Inversion Principle (DIP)
// High-level modules should not depend on low-level modules. Both should depend on abstractions. Abstractions should not depend on details. Details should depend on abstractions. High-level modules are eg: business logic, and low-level are eg: data access, I/O operations, external services.

import fs from "fs";

interface ObjectI {
  [key: string]: string | number | ObjectI;
}

//^ 1. Single Responsibility Principle
console.log("1. -----------------");
class Journal {
  entries: ObjectI;
  static count: number;
  constructor() {
    this.entries = {} as ObjectI;
  }

  addEntry(text: string) {
    let c = ++Journal.count;
    let entry = `${c}: ${text}`;
    this.entries[c] = entry;
    console.log({ c });
    return c;
  }

  removeEntry(index: number) {
    delete this.entries[index];
  }

  toString() {
    return Object.values(this.entries).join("\n");
  }

  //* Moved to other class!
  // save(filename)
  // {
  //   fs.writeFileSync(filename, this.toString());
  // }
  //
}
Journal.count = 0;

class PersistenceManager {
  load(filename: string) {
    console.log({ filename });
  }
  loadFromUrl(url: string) {
    console.log({ url });
  }
  saveToFile(journal: Journal, filename: fs.PathOrFileDescriptor) {
    fs.writeFileSync(filename, journal.toString());
  }
}

const j = new Journal();
j.addEntry("I cried today.");
j.addEntry("I ate a bug.");
console.log(j.toString());

const p = new PersistenceManager();
const filename = "./journal.txt";
p.saveToFile(j, filename);

//^ 2. Open-Closed Principle
console.log("2. -----------------");
//* In TS can be used: enums!
const Color = Object.freeze({
  red: "red",
  green: "green",
  blue: "blue",
});

//* In TS can be used: enums!
const Size = Object.freeze({
  small: "small",
  medium: "medium",
  large: "large",
  huge: "huge",
});

class Product {
  name: string;
  color: string;
  size: string;
  constructor(name: string, color: string, size: string) {
    this.name = name;
    this.color = color;
    this.size = size;
  }
}

const apple = new Product("Apple", Color.green, Size.small);
const tree = new Product("Tree", Color.green, Size.large);
const house = new Product("House", Color.blue, Size.large);

const products: Product[] = [apple, tree, house];

// Old way
// class ProductFilter {
//   filterByColor(products: Product[], color: any) {
//     return products.filter((p) => p.color === color);
//   }

//   filterBySize(products: Product[], size: string) {
//     return products.filter((p) => p.size === size);
//   }

//   filterBySizeAndColor(products: Product[], size: string, color: string) {
//     return products.filter((p) => p.size === size && p.color === color);
//   }

//   // state space explosion
//   // 3 criteria (+weight) = 7 methods

//   // OCP = open for extension, closed for modification
// }

// const pf = new ProductFilter();
// console.log(`Green products (old):`);
// for (let p of pf.filterByColor(products, Color.green)) {
//   console.log(` * ${p.name} is green`);
// }
//* ↑↑↑ BEFORE

//* ↓↓↓ AFTER
// New Way
// general interface for a specification
class ColorSpecification {
  color: string;
  constructor(color: string) {
    this.color = color;
  }

  isSatisfied(item: Product) {
    return item.color === this.color;
  }
}

class SizeSpecification {
  size: string;
  constructor(size: string) {
    this.size = size;
  }

  isSatisfied(item: Product) {
    return item.size === this.size;
  }
}

class BetterFilter {
  filter(items: Product[], spec: ColorSpecification | SizeSpecification | AndSpecification) {
    return items.filter((x) => spec.isSatisfied(x));
  }
}

// specification combinator
class AndSpecification {
  specs: (ColorSpecification | SizeSpecification)[];
  constructor(...specs: (SizeSpecification | ColorSpecification)[]) {
    this.specs = specs;
  }

  isSatisfied(item: Product): boolean {
    return this.specs.every((x) => x.isSatisfied(item));
  }
}

const bf = new BetterFilter();
console.log(`Green products (new):`);
for (let p of bf.filter(products, new ColorSpecification(Color.green))) {
  console.log(` * ${p.name} is green`);
}

console.log(`Large products:`);
for (let p of bf.filter(products, new SizeSpecification(Size.large))) {
  console.log(` * ${p.name} is large`);
}

console.log(`Large and green products:`);
const spec = new AndSpecification(new ColorSpecification(Color.green), new SizeSpecification(Size.large));
for (let p of bf.filter(products, spec)) {
  console.log(` * ${p.name} is large and green`);
}

//^ 3. Liskov Substitution Principle
console.log("3. -----------------");
//* This needs to be fixed!
// class Rectangle {
//   _width: number;
//   _height: number;
//   constructor(width: number, height: number) {
//     this._width = width;
//     this._height = height;
//   }

//   get width() {
//     return this._width;
//   }
//   get height() {
//     return this._height;
//   }

//   set width(value) {
//     this._width = value;
//   }
//   set height(value) {
//     this._height = value;
//   }

//   get area() {
//     return this._width * this._height;
//   }

//   toString() {
//     return `${this._width}x${this._height}`;
//   }
// }

// class Square extends Rectangle {
//   constructor(size: number) {
//     super(size, size);
//   }

//   set width(value: number) {
//     this._width = this._height = value;
//   }

//   set height(value: number) {
//     this._width = this._height = value;
//   }
// }

// const useIt = function (rc: Rectangle): void {
//   const width = rc._width;
//   rc.height = 10;
//   console.log(`Expected area of ${10 * width}, ` + `got ${rc.area}`);
// };

// const rc = new Rectangle(2, 3);
// useIt(rc);

// const sq = new Square(5);
// useIt(sq);

//* Example 2
// Base class
class Bird {
  fly(): void {
    console.log("Flying...");
  }
}

// Derived class that follows LSP
class Sparrow extends Bird {
  fly(): void {
    console.log("Sparrow is flying...");
  }
}

// Derived class that violates LSP //* the Penguin class violates the Liskov Substitution Principle!
// class Penguin extends Bird {
//   fly(): void {
//     throw new Error("Penguins can't fly!");
//   }
// }

// Usage
function makeBirdFly(bird: Bird): void {
  bird.fly();
}

// Sparrow instance can be substituted for Bird
const sparrow = new Sparrow();
makeBirdFly(sparrow); // Output: Sparrow is flying...

// Penguin instance violates LSP when substituted for Bird
// const penguin = new Penguin();
// makeBirdFly(penguin); // Throws an error: Penguins can't fly!

//^ 4. Interface Segregation Principle
console.log("4. -----------------");

interface WorkerInterface {
  work(): void;
}

interface HumanWorkerInterface extends WorkerInterface {
  eat(): void;
  sleep(): void;
}

class HumanWorker implements HumanWorkerInterface {
  work() {
    console.log("Working...");
  }

  eat() {
    console.log("Eating...");
  }

  sleep() {
    console.log("Sleeping...");
  }
}

class RobotWorker implements WorkerInterface {
  work() {
    console.log("Working...");
  }
}

const humanWorker = new HumanWorker();
humanWorker.eat();

const robotWorker = new RobotWorker();
robotWorker.work();

//^ 4. Dependency Inversion Principle
console.log("5. -----------------");

const Relationship = Object.freeze({
  parent: 0,
  child: 1,
  sibling: 2,
});

class Person {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

// LOW-LEVEL (STORAGE)
abstract class RelationshipBrowser {
  constructor() {
    if (this.constructor.name === "RelationshipBrowser") throw new Error("RelationshipBrowser is abstract!");
  }
  findAllChildrenOf(_name: string) {}
}

class Relationships extends RelationshipBrowser {
  data: { from: Person; type: number; to: Person }[];
  constructor() {
    super();
    this.data = [];
  }

  addParentAndChild(parent: Person, child: Person) {
    this.data.push({
      from: parent,
      type: Relationship.parent,
      to: child,
    });
    this.data.push({
      from: child,
      type: Relationship.child,
      to: parent,
    });
  }

  findAllChildrenOf(name: string) {
    return this.data.filter((r) => r.from.name === name && r.type === Relationship.parent).map((r) => r.to);
  }
}

// HIGH-LEVEL (RESEARCH)
class Research {
  // constructor(relationships)
  // {
  //   // problem: direct dependence ↓↓↓↓ on storage mechanic
  //   let relations = relationships.data;
  //   for (let rel of relations.filter(r =>
  //     r.from.name === 'John' &&
  //     r.type === Relationship.parent
  //   ))
  //   {
  //     console.log(`John has a child named ${rel.to.name}`);
  //   }
  // }

  constructor(browser: Relationships) {
    for (let p of browser.findAllChildrenOf("John")) {
      console.log(`John has a child named ${p.name}`);
    }
  }
}

const parent = new Person("John");
const child1 = new Person("Chris");
const child2 = new Person("Matt");

// low-level module
const rels = new Relationships();
rels.addParentAndChild(parent, child1);
rels.addParentAndChild(parent, child2);

new Research(rels);

//* Example 2
// Abstraction (Interface)
interface DatabaseService {
  save(data: any): Promise<void>;
  get(id: string): Promise<any>;
}

// High-level module (UserService)
class UserService {
  constructor(private databaseService: DatabaseService) {}

  async createUser(userData: any): Promise<void> {
    // Validate user data
    // ...

    // Save user data using the injected DatabaseService
    await this.databaseService.save(userData);
  }

  async getUserById(userId: string): Promise<any> {
    // Get user data using the injected DatabaseService
    return await this.databaseService.get(userId);
  }
}

// Low-level module (concrete implementation)
class MongoDBService implements DatabaseService {
  async save(_data: any): Promise<void> {
    // Save data to MongoDB
    console.log("Saving data to MongoDB...");
  }

  async get(id: string): Promise<any> {
    // Get data from MongoDB
    console.log("Getting data from MongoDB...");
    return { id };
  }
}

// Usage
const mongoDBService = new MongoDBService();
const userService = new UserService(mongoDBService);

// Create a new user
userService.createUser({ name: "John Doe", email: "john@example.com" });

// Get a user by ID
(async function (): Promise<void> {
  const user = await userService.getUserById("1234");
  console.log("user:", user); // { id: '1234' }
})();
