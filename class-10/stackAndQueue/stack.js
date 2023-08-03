class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Stack {
  constructor(top = null) {
    this.top = top;
  }

  toString() {
    if (!this.top) return "NULL";
    let current = this.top;
    let rtnStr = "";
    while (current) {
      rtnStr += `{ ${current.value} } -> `;
      current = current.next;
    }
    return rtnStr + "NULL";
  }

  push(val) {
    const current = new Node(val);
    current.next = this.top;
    this.top = current;
  }

  pop() {
    if (!this.top) throw new Error("no top");
    const temp = this.top;
    this.top = temp.next;
    temp.next = null;
    return temp;
  }

  peek() {
    if (!this.top) throw new Error("no top");
    return this.top.value;
  }

  isEmpty() {
    return Boolean(!this.top);
    // return this.top ? false : true;
  }
}

module.exports = Stack;
