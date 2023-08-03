// Can successfully push onto a stack
// Can successfully push multiple values onto a stack
// Can successfully pop off the stack
// Can successfully empty a stack after multiple pops
// Can successfully peek the next item on the stack
// Can successfully instantiate an empty stack
// Calling pop or peek on empty stack raises exception

const Stack = require("./stack");

describe("Tests all stack methods", () => {
  test("Can successfully push onto a stack", () => {
    const test1Stack = new Stack();
    test1Stack.push(1);
    expect(test1Stack.toString()).toBe("{ 1 } -> NULL");
  });

  test("Can successfully push multiple values onto a stack", () => {
    const test2Stack = new Stack();
    test2Stack.push(1);
    test2Stack.push(2);
    test2Stack.push(3);
    expect(test2Stack.toString()).toBe("{ 3 } -> { 2 } -> { 1 } -> NULL");
  });

  test("Calling pop or peek on empty stack raises exception", () => {
    const emptyStack = new Stack();
    // to test that calling a function throws an error wrap it in an arrow function
    expect(() => emptyStack.pop()).toThrow(new Error("no top"));
    expect(() => emptyStack.peek()).toThrow(new Error("no top"));
  });

  test("Can successfully instantiate an empty stack", () => {
    const emptyStack1 = new Stack();
    // to test that calling a function throws an error wrap it in an arrow function
    expect(emptyStack1.toString()).toEqual("NULL");
  });

  test("Can successfully pop off the stack", () => {
    const test3Stack = new Stack();
    test3Stack.push(1);
    test3Stack.push(2);
    test3Stack.push(3);
    const popped = test3Stack.pop();

    expect(test3Stack.toString()).toBe("{ 2 } -> { 1 } -> NULL");
    expect(popped.value).toEqual(3);
  });

  test("Can successfully empty a stack after multiple pops", () => {
    const test4Stack = new Stack();
    test4Stack.push(1);
    test4Stack.push(2);
    test4Stack.push(3);
    const pop3 = test4Stack.pop();
    const pop2 = test4Stack.pop();
    const pop1 = test4Stack.pop();
    expect(pop3.value).toEqual(3);
    expect(pop2.value).toEqual(2);
    expect(pop1.value).toEqual(1);
    expect(test4Stack.toString()).toEqual("NULL");
  });

  test("isEmpty returns correctly", () => {
    expect(new Stack().isEmpty()).toBe(true);
  });
});
