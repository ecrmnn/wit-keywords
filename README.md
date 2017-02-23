# wit-keywords
> Mass push values to keyword based entities on Wit.ai

[![Travis](https://img.shields.io/travis/ecrmnn/wit-keywords.svg?style=flat-square)](https://travis-ci.org/ecrmnn/wit-keywords.svg?branch=master)
[![npm version](https://img.shields.io/npm/v/wit-keywords.svg?style=flat-square)](http://badge.fury.io/js/wit-keywords)
[![npm downloads](https://img.shields.io/npm/dm/wit-keywords.svg?style=flat-square)](http://badge.fury.io/js/wit-keywords)
[![npm license](https://img.shields.io/npm/l/wit-keywords.svg?style=flat-square)](http://badge.fury.io/js/wit-keywords)

### Installation
```bash
npm install wit-keywords --save
```

### Usage
Push an array of actors to the actor entity
```javascript
const keywords = require('wit-keywords');

new keywords(process.env.WIT_TOKEN)
  .entity('actor')
  .push([
    'Leonardo DiCaprio',
    'Steve Carell',
    'Alec Baldwin',
    'Micheal Cera'
  ])
  .then(response => console.log(response))
  .catch(err => console.log(err));

//=> [{
//=>   value: 'Leonardo DiCaprio',
//=>   status: 'added'
//=> }, {}, {}, {}]
```

Trigger a function ``after`` each pushed item
```javascript
const keywords = require('wit-keywords');

new keywords(process.env.WIT_TOKEN)
 .entity('actor')
 .after(actor => {
   // Do something
 })
 .push([
   'Leonardo DiCaprio',
   'Steve Carell',
   'Alec Baldwin',
   'Micheal Cera'
 ]);
```

Trigger a function ``after`` each pushed item
```javascript
const keywords = require('wit-keywords');

new keywords(process.env.WIT_TOKEN)
  .entity('actor')
  .after(actor => {
    // Do something
  })
  .push([
    'Leonardo DiCaprio',
    'Steve Carell',
    'Alec Baldwin',
    'Micheal Cera'
  ]);
```

Set custom number of parallel requests (``concurrency``)
```javascript
const keywords = require('wit-keywords');

new keywords(process.env.WIT_TOKEN)
  .concurrency(4) // Default = 3
  .entity('actor')
  .after(actor => {
    // Do something
  })
  .push([
    'Leonardo DiCaprio',
    'Steve Carell',
    'Alec Baldwin',
    'Micheal Cera'
  ]);
```

### License
MIT © [Daniel Eckermann](http://danieleckermann.com)