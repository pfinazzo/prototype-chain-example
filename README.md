# Inheritance in JavaScript

* JavaScript differs from most OOP languages in that it uses something called the prototype chain for inheritance which is really just a linked list
* JavaScripts prototype chain has better performance because it uses references instead of creating new copies of objects
* The prototype chain is actually also more powerful because an entire class based system can be built on top of it, but its biggest strength is also its weakness because it can be confusing to understand if you're used to classical OOP

  - This is meant as a guide to understanding JavaScripts Prototypal inheritance 
  - Here we have applied it with some of JS's syntactic sugar for constructor functions ES6 classes

  Take a look at main.js to see how it works