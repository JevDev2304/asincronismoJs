//Es una función que se pasa como argumento de otra función
//A callback function is a function passed into another function as an argument
function add(value1,value2){
return value1 + value2;
}

function calc(value1, value2, callback){
    return callback(value1,value2)
}
console.log(calc(6,7, add));

function greeting(name){
    console.log(`Hello ${name}`);
}
setTimeout(greeting, 2000);

function execCallback(callback) {
    window.setTimeout(() => {
      callback();
    }, 2000);
  }
  