require('express')().listen(3000)
/* 
  This is meant as a guide to understanding JavaScripts Prototypal inheritance 
  Here we have applied it with some of JS's syntactic sugar for constructor functions ES6 classes
*/ 


// ---------------------- constructor functions ---------------------
// Three global constructor functions

// console.dir(Object); // this one is at the top of the chain
// console.dir(Function); // Object and Function are linked together because they both have each other prototype property on their constructor functions
                          // console.log(Object instanceof Function) // true
                          // console.log(Function instanceof Object) //  true 
                          // console.log(Function instanceof Function) //  true
                          // console.log(Object instanceof Object) // true
                          
// console.dir(Array);  // Array is an instance of an Object and Function



// notice how these ^^ all output a function

// var obj = {}; // creating this object literal is actually calling the "new Object()" constructor function behind the scenes;

// var arr = []; // creating this array literal is actually calling the "new Array()" constructor function behind the scenes;

// function foo(){} // creating this function actually calls the "new Function()" constructor function in the background


/* ------------------------ prototypes -----------------------------
 - the prototype chain is actually an implemenatation of a linked-list (linear data structure where each element is a reference to a seperate object);

 - There are three properties to be discussed
      * prototype   - the prototype object of the current obj
      *  __proto__  - aka "dunder proto" ("double underscore") = the prototype of its constructor function (never use or modify this directly, you will break the prototype chain)
      * constructor - references the constructor function that was used to create that instance
      
 - example:
      * var obj = {};
        obj.__proto__ is the same as Object.prototype or obj.constructor.prototype because obj.constructor === Object   
 */
// console.log(obj.__proto__ === Object.prototype) // true
// console.dir(Object.prototype.__proto__) // null

class Top {
  constructor(){
    this.name = "patrick",
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


// remove comment lines to run these!


// console.dir(example);

// console.dir(example.constructor); // Function Bottom
// console.dir(example.__proto__.constructor); // also Function Bottom

// console.dir(example.constructor.prototype); // Bottom {}
// console.dir(example.__proto__); // also Bottom {}

// console.dir(example.constructor.__proto__); // Function Middle
// console.dir(example.__proto__.__proto__.constructor); // Function Middle

// console.dir(example.constructor.__proto__.prototype); // Middle {}
// console.dir(example.__proto__.__proto__); // Middle {}

// console.dir(example.constructor.__proto__.__proto__); // Function Top
// console.dir(example.__proto__.__proto__.__proto__.constructor); // Function Top

// console.dir(example.constructor.__proto__.__proto__.prototype);// Top {}
// console.dir(example.__proto__.__proto__.__proto__); // Top {}

// console.dir(example.constructor.prototype === example.__proto__); // true
// console.dir(example.__proto__.__proto__.__proto__.__proto__ === Object.prototype); //true
// console.dir(example.__proto__.__proto__.__proto__.__proto__.__proto__ === null); // true final link



// Note: the lower you nest the inheritance the slower the performance, however JS's prototype chain is an implementation of a linked-list which makes it actually much faster because instead of making new copies of parent classes, instead it uses references 

// example.sayName(); // console.logs -> "top level"
example.sayName() // "patrick"
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
