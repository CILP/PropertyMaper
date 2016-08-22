# PropertyMaper [![Build Status](https://travis-ci.org/CILP/PropertyMaper.svg?branch=master)](https://travis-ci.org/CILP/PropertyMaper) [![Coverage Status](https://coveralls.io/repos/github/CILP/PropertyMaper/badge.svg?branch=master)](https://coveralls.io/github/CILP/PropertyMaper?branch=master)

Module in JavaScript for map object's properties to string key's properties as values

##Prerequisites
To Install and run the project you need to have installed NodeJS.
``` 
https://nodejs.org/en
```

##Installation

```
npm install property-maper
```

##Usage
To map an object to a json-string template:

## .map(map, scope)
Parameter: map(string)
Contains the string template in json format

Parameter: scope(object)
Contains the object wich has the data to bind into map

Return:
Maped object with map format

##Example

```
var pm = require('property-maper');

var result = pm.map("{
    name:data.person.name,
    last_name:data.person.last_name,
    addres:data.person.addres,
    hobbies:data.person.hobbies,
    others:data.others.other
  }",
  {
    data: {
      person: {
        name:"Carlos",
        last_name:"Linares",
        addres:"Guadalajara",
        hobbies:"Play Guitar, Video Games"
      },
      others: {
        other: "Other things, etc."
      }
    }
  }
);

console.log(result);
```

##Result
The result will be...

```
{
  name:"Carlos",
  last_name:"Linares",
  addres:"Guadalajara",
  hobbies:"Play Guitar, Video Games",
  others:"Other things, etc."
}
```

##License
MIT License

