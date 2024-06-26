class Person {
  constructor(name) {
    this.name = name;
    this.chatLog = [];
  }

  receive(sender, message) {
    let s = `${sender}: '${message}'`;
    console.log(`[${this.name}'s chat session] ${s}`);
    this.chatLog.push(s);
  }

  say(message) {
    this.room.broadcast(this.name, message);
  }

  pm(who, message) {
    this.room.message(this.name, who, message);
  }
}

class ChatRoom {
  constructor() {
    this.people = [];
  }

  broadcast(source, message) {
    for (let p of this.people) if (p.name !== source) p.receive(source, message);
  }

  join(p) {
    let joinMsg = `${p.name} joins the chat`;
    this.broadcast("room", joinMsg);
    p.room = this;
    this.people.push(p);
  }

  message(source, destination, message) {
    for (let p of this.people) if (p.name === destination) p.receive(source, message);
  }
}

const room = new ChatRoom();

const john = new Person("John");
const jane = new Person("Jane");

room.join(john);
room.join(jane);

john.say("hi room");
jane.say("oh, hey john");

const simon = new Person("Simon");
room.join(simon);
simon.say("hi everyone!");

jane.pm("Simon", "glad you could join us!");

//* Example 2
class Event {
  constructor() {
    this.handlers = new Map();
    this.count = 0;
  }

  subscribe(handler) {
    this.handlers.set(++this.count, handler);
    return this.count;
  }

  unsubscribe(idx) {
    this.handlers.delete(idx);
  }

  fire(sender, args) {
    this.handlers.forEach(function (v, k) {
      v(sender, args);
    });
  }
}

class PlayerScoredEventArgs {
  constructor(playerName, goalsScoredSoFar) {
    this.playerName = playerName;
    this.goalsScoredSoFar = goalsScoredSoFar;
  }

  print() {
    console.log(`${this.playerName} has scored ` + `their ${this.goalsScoredSoFar} goal`);
  }
}

class Game {
  constructor() {
    this.events = new Event();
  }
}

class Player {
  constructor(name, game) {
    this.name = name;
    this.game = game;
    this.goalsScored = 0;
  }

  score() {
    this.goalsScored++;
    let args = new PlayerScoredEventArgs(this.name, this.goalsScored);
    this.game.events.fire(this, args);
  }
}

class Coach {
  constructor(game) {
    this.game = game;

    game.events.subscribe(function (sender, args) {
      if (args instanceof PlayerScoredEventArgs && args.goalsScoredSoFar < 3) {
        console.log(`coach says: well done, ${args.playerName}`);
      }
    });
  }
}

const game = new Game();
const player = new Player("Sam", game);
const coach = new Coach(game);

player.score();
player.score();
player.score();
