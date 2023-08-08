const Stack = require("./stack");

class PseudoQueue {
  constructor() {
    this.in = new Stack();
    this.out = new Stack();
  }

  transfer() {
    while (this.in.top) {
      const temp = this.in.pop();
      this.out.push(temp.value);
    }
  }

  enqueue(val) {
    // we can always push nodes into the in stack
    // o(1)
    this.in.push(val);
  }

  dequeue() {
    if (this.out.top) {
      // o(1)
      return this.out.pop();
    }
    if (this.in.top) {
      transfer();
      return this.out.pop();
    }
    return null;
    //error or whatever, it is empty
  }
}
