// 12 (a)	Write a java script program to implement Stack and Queue using modules 

const stack = require("./12a_stack");
const queue = require("./12a_queue");

stArr = [];
qArr = [];

stArr = stack.push(stArr, 1);
stArr = stack.push(stArr, 2);
stArr = stack.push(stArr, 3);
stArr = stack.push(stArr, 4);
stArr = stack.pop(stArr);
stArr = stack.pop(stArr);
stArr = stack.pop(stArr);

qArr = queue.enqueue(qArr, 1);
qArr = queue.enqueue(qArr, 2);
qArr = queue.enqueue(qArr, 3);
qArr = queue.enqueue(qArr, 4);
qArr = queue.dequeue(qArr);
qArr = queue.dequeue(qArr);