// Can successfully enqueue into a queue
// Can successfully enqueue multiple values into a queue
// Can successfully dequeue out of a queue the expected value
// Can successfully peek into a queue, seeing the expected value
// Can successfully empty a queue after multiple dequeues
// Can successfully instantiate an empty queue
// Calling dequeue or peek on empty queue raises exception

const Queue = require("./queue.js");

describe("queues", () => {
  test("can enqueue", () => {
    const q = new Queue();
    q.enqueue(3);
    expect(q.toString()).toBe("{ 3 } -> NULL");
  });
  test("can dequeue", () => {
    const q = new Queue();
    q.enqueue(3);
    q.enqueue(2);
    q.enqueue(1);
    let dQ3 = q.dequeue();
    expect(dQ3.value).toBe(3);
  });
});
