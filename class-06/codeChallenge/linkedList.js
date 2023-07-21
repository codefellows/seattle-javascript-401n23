// make a class node
// initialize the value property and next property
// make a linked list class
// give it a head
// while loop where when the ll value is truthy we enter the loop
// use a temp or current value to start the loop
// go to the next node
// at the end we will exit the loop

class Node {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }
}

class LinkedList {
  constructor(head = null) {
    this.head = head;
  }

  traversalCheatSheet() {
    let current = this.head;
    while (current) {
      current = current.next;
    }
  }

  altTraversalCheatSheet() {
    /// return the last node of the list or something... count them??
    let current = this.head;
    if (!current) return;
    while (current?.next) {
      // conditional chaining
      current = current.next;
    }
    return current;
  }

  // insert
  insert(value) {
    const newNode = new Node(value);
    newNode.next = this.head;
    this.head = newNode;
  }

  // includes
  includes(val) {
    let current = this.head;
    while (current) {
      if (current.value === val) return true;
      current = current.next;
    }
    return false;
  }

  // toString
  // "{ a } -> { b } -> { c } -> NULL"
  toString() {
    if (!this.head) return "NULL";
    let current = this.head;
    let returnStr = "";
    while (current) {
      // look at the node.value "{ a } -> "
      returnStr += `{ ${current.value} } -> `;
      current = current.next;
    }
    // once we exit the loop we need to tack NULL on to the end
    returnStr += "NULL";
    return returnStr;
  }

  //   append
  // arguments: new value
  // adds a new node with the given value to the end of the list
  // - create a function that takes in a NEW VALUE
  // - make a new node with the value argument
  // - traverse to the end
  // - end node.next will be the new node

  append(newValue) {
    const newNode = new Node(newValue);
    if (!this.head) this.head = newNode;
    let current = this.head;
    while (current.next) {
      current = current.next;
    }
    current.next = newNode;
  }

  // insert before
  // arguments: value, new value
  // adds a new node with the given new value immediately before the first node that has the value specified
  // check the head to see if it matches our value, if it does insert()
  // loop through the list, check current.next.value to see if it is the value we are looking for
  // when we find that value insert the new node (temp is current.next, current.next is new node, new node.next is temp)
  // return the list

  insertBefore(valueToCheck, newValueToAdd) {
    const newNode = new Node(newValueToAdd);
    if (!this.head) return (this.head = newNode);
    if (this.head.value === valueToCheck) {
      newNode.next = this.head;
      this.head = newNode;
      return;
    }
    let current = this.head;
    while (current) {
      if (current.next.value === valueToCheck) {
        newNode.next = current.next;
        current.next = newNode;
        return;
      } else {
        current = current.next;
      }
    }
    // optionally return ll
  }

  // insert after
  // arguments: value, new value
  // adds a new node with the given new value immediately after the first node that has the value specified
  // assign head to current
  // check current.value to see if it match our argument
  // temp is current.next
  // current.next is new node
  // new node.next is temp
  // return the list

  insertAfter(valueToCheck, newValueToAdd) {
    let insert = new Node(newValueToAdd);
    if (!this.head) return (this.head = insert);
    let current = this.head;
    while (current) {
      if (current.value === valueToCheck) {
        let temp = current.next;
        current.next = insert;
        insert.next = temp;
        return;
      } else {
        current = current.next;
      }
    }
    // optionally return the list
  }
}

module.exports = { LinkedList, Node };
