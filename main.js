require('express')().listen(3000)
/* This is meant as a guide to understanding JavaScripts Prototypal inheritance 

  Here we have applied it with some of JS's syntactic sugar for constructor functions ES6 classes

*/ 


// ---------------------- constructor functions ---------------------
// Three global constructor functions

// console.dir(Object); // this one is at the top of the chain
// console.dir(Array);
// console.dir(Function);


// notice how these ^^ all output a function

var obj = {}; // creating this object literal is actually calling the "new Object()" constructor function behind the scenes;

var arr = []; // creating this array literal is actually calling the "new Array()" constructor function behind the scenes;

function foo(){} // creating this function actually calls the "new Function()" constructor function in the background


/* ------------------------ prototypes -----------------------------
 - the prototype chain is actually an implemenatation of a linked-list (linear data structure where each element is a reference to a seperate object);

 - There are two properties to be discussed
      * prototype = the prototype of the current obj
      *  __proto__ - aka "dunder proto" ("double underscore") = the prototype of its prototype (never use or modify this directly, you will break the prototype chain)
      
 - example:
      * var obj = {};
        obj.__proto__ is the same as Object.prototype         
 */
// console.log(obj.__proto__ === Object.prototype) // true
// console.dir(Function.prototype === Object.prototype.__proto__) // null

class Top {
  constructor(){
    this.name = "top level",
    this.sayName = function(){
      console.log(this.name);
    }
  }
}

class Middle extends Top {
  constructor(){
    super(); // inherits from Top
  }
}


class Bottom extends Middle {
  constructor(){
    super(); // inherits from Middle
  }
}


var example = new Bottom();
console.dir(example);


console.dir(example.constructor); // Function Bottom
console.log(example.__proto__.constructor); // also Function Bottom

console.log(example.constructor.prototype); // Bottom {}
console.log(example.__proto__); // also Bottom {}

console.log(example.constructor.__proto__); // Function Middle
console.log(example.__proto__.__proto__.constructor); // Function Middle

console.log(example.constructor.__proto__.prototype); // Middle {}
console.log(example.__proto__.__proto__); // Middle {}

console.log(example.constructor.__proto__.__proto__); // Function Top
console.log(example.__proto__.__proto__.__proto__.constructor); // Function Top

console.log(example.constructor.__proto__.__proto__.prototype);// Top {}
console.log(example.__proto__.__proto__.__proto__); // Top {}

console.log(example.constructor.prototype === example.__proto__); // true
console.log(example.__proto__.__proto__.__proto__.__proto__ === Object.prototype); //true
console.log(example.__proto__.__proto__.__proto__.__proto__.__proto__ === null); // true final link



// Note: the lower you nest the inheritance the slower the performance, however JS's prototype chain is an implementation of a linked-list which makes it actually much faster because instead of making new copies of parent classes, instead it uses references 

// example.sayName(); // console.logs -> "top level"
var a = new Bottom();

Object.prototype.sayHello = () => "hello"; // attach prototype method higher up the chain

console.dir(example.__proto__.__proto__.__proto__.__proto__.sayHello());
/*
  1. example checks itself first
  2. example checks to see if it has a prototype
  3. example finds no prototype so it checks its __proto__
  4. checks example.__proto__.__proto__
  5. checks example.__proto__.__proto__.__proto__
  6. finds it on example.__proto__.__proto__.__proto__.__proto__ aka Object.prototype
  7. runs sayHello function
*/
