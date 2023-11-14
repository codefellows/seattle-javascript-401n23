### Big O Notation

_a way to measure how well a computer algorithm scales based on the size of the input_

- always looking at worst case
- not necessarily the speed but how well it runs as the input scales
- we care about the parts of the algo that have the most significant impact

`return n+3-n^3`

#### The most common you will see in programming are:

- O(1)
  - will always take the same amount of time regardless of the input size (adding an element to the end of an array)
- O(n)
  - time to complete is directly proportional to the input size (a loop or a linear search)
- O(n^2) (cubed, ...)
  - time to complete is proportional to the square of the imput size
  - nested loops
  - inefficient sorts - like bubble sort
- O(log n)
  - binary search is classic example
  - each time the algo runs the data is cut by 50%
- O(N log n)
  - efficient sorts quick sort - divide and conquer sort
  - outter loop that runs n times
  - nested loop that runs log n (goes down by 50% every time)

space

- how much space is ADDED related to the input
- O(1) - you create no new sizable variables no matter much input you have
- O(n) - making a new data structure to hold each value

- num, undefined, null, bools
- strings, arrays, objects, stacks, queues
