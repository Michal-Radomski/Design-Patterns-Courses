class Memento {
  constructor(balance) {
    this.balance = balance;
  }
}

class BankAccount {
  constructor(balance = 0) {
    this.balance = balance;
    this.changes = [new Memento(balance)];
    this.current = 0;
  }

  deposit(amount) {
    this.balance += amount;
    let m = new Memento(this.balance);
    this.changes.push(m);
    this.current++;
    return m;
  }

  restore(m) {
    if (m) {
      this.balance = m.balance;
      this.changes.push(m);
      this.current = this.changes.count - 1;
    }
  }

  undo() {
    if (this.current > 0) {
      let m = this.changes[--this.current];
      this.balance = m.balance;
      return m;
    }
    return null;
  }

  redo() {
    if (this.current + 1 < this.changes.length) {
      let m = this.changes[++this.current];
      this.balance = m.balance;
      return m;
    }
    return null;
  }

  toString() {
    return `Balance: $${this.balance}`;
  }
}

const ba = new BankAccount(100);
const m1 = ba.deposit(50);
const m2 = ba.deposit(25);
console.log(1, "ba.toString():", ba.toString());

// restore to m1
ba.restore(m1);
console.log(2, "ba.toString():", ba.toString());

// restore to m2
ba.restore(m2);
console.log(3, "ba.toString():", ba.toString());

//* Undo and redo
ba.undo();
console.log(`Undo 1: ${ba.toString()}`);
ba.undo();
console.log(`Undo 2: ${ba.toString()}`);
ba.redo();
console.log(`Redo 2: ${ba.toString()}`);
