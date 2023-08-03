class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Queue {
  constructor(front = null) {
    this.front = front;
    this.rear = null;
  }

  isEmpty() {
    return this.front ? false : true;
  }

  enqueue(val) {
    const newNode = new Node(val);

    if (this.isEmpty()) {
      this.front = newNode;
      this.rear = newNode;
      return;
    }
    this.rear.next = newNode;
    this.rear = newNode;
  }

  dequeue() {
    if (this.isEmpty()) throw new Error("no front");
    const current = this.front;
    this.front = current.next;
    current.next = null;
    return current;
  }

  peek() {
    if (this.isEmpty()) throw new Error("no front");
    return this.front.value;
  }

  toString() {
    if (this.isEmpty()) return "NULL";
    let current = this.front;
    let rtnStr = "";
    while (current) {
      rtnStr += `{ ${current.value} } -> `;
      current = current.next;
    }
    return rtnStr + "NULL";
  }
}

module.exports = Queue;
