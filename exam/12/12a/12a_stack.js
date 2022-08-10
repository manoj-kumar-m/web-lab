function push(arr, val) {
    arr.push(val);
    console.log("Pushed " + val + " to the stack");
    console.log("Stack: " + arr);
    return arr;
}

function pop(arr) {
    let val = arr.pop();
    console.log("Popped " + val + " from the stack");
    console.log("Stack: " + arr);
    return arr;
}

function top(arr) {
    return arr[arr.length-1]
}

function size(arr) {
    return arr.length
}

module.exports = {
    push,
    pop,
    top,
    size
};