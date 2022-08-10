function enqueue(arr, ele) {
    arr.push(ele);
    console.log("Added " + ele + " to the queue");
    console.log("Queue: " + arr);
    return arr;
}

function dequeue(arr) {
    let val = arr.shift();
    console.log("Removed " + val + " from the queue");
    console.log("Queue: " + arr);
    return arr;
}

function front(arr) {
    return arr[0]
}

function rear(arr) {
    return arr[arr.length-1]
}

function size(arr) {
    return arr.length
}

module.exports = {
    enqueue,
    dequeue,
    front,
    rear,
    size
};