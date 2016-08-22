var propMaperModule = require('./property-maper.js');

console.time('Execution-Time');
var pm = propMaperModule.map(
  "{DatosGenerales: {Nombre: data.nombre}, list: Algo, otro: {some: 12}, a: Loro, c: [1,2,3], d: [{area:basexaltura, perimetro: 45}]}",
  {data: {nombre: "Carlos"}}
);
console.timeEnd('Execution-Time');
console.log(pm);
