var propMaperModule = require('./property-maper-module.js');

console.time('Execution-Time');
var pm = propMaperModule.map(
  JSON.stringify({
    "name":"data.person.name",
    "last_name":"data.person.last_name",
    "addres":"data.person.addres",
    "hobbies":"data.person.hobbies",
    "others":"data.others.other"
  }),
  {
    "data": {
      "person": {
        "name":"Carlos",
        "last_name":"Linares",
        "addres":"Guadalajara",
        "hobbies":"Play Guitar, Video Games"
      },
      "others": {
        "other": "Other things, etc."
      }
    }
  }
);
console.timeEnd('Execution-Time');

console.log(pm);
