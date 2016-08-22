var expect = require('chai').expect,
    propertyMaper = require('../property-maper.js');

describe('Mapping', function(){

  it('returns a object successfully mapped', function(){
    var pm = propertyMaper.map(
      JSON.stringify({
        "name":"data.person.name",
        "last_name":"data.person.last_name",
        "addres":"data.person.addres",
        "hobbies":"data.person.hobbies",
        "others":"data.others.other"
      }),
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

    expect(pm.name).to.equal("Carlos");
    expect(pm.last_name).to.equal("Linares");
    expect(pm.addres).to.equal("Guadalajara");
    expect(pm.hobbies).to.equal("Play Guitar, Video Games");
    expect(pm.others).to.equal("Other things, etc.");
  });

  it('return test case successfully', function(){
    var pm = propertyMaper.map(
      "{DatosGenerales: { Nombre: data.nombre }}",
      {
        data: {
          nombre: "Alfredo",
        }
      }
    );

    expect(pm.DatosGenerales.Nombre).to.equal("Alfredo");
  });

  it('test case for no properties in scope parameter', function(){
    var pm = propertyMaper.map(
      JSON.stringify({
        DatosGenerales: {
          Nombre: "data.nombre",
        }
      }), {}
    );

    expect(pm.DatosGenerales.Nombre).to.equal("data.nombre");
  });

  it('test case for extra properties in map parameter', function(){
    var pm = propertyMaper.map(
      JSON.stringify({
        DatosGenerales: {
          Nombre: "data.nombre",
          Edad: "data.edad"
        }
      }),
      {
        data: {
          nombre: "Alfredo"
        }
      }
    );

    expect(pm.DatosGenerales.Nombre).to.equal("Alfredo");
    expect(pm.DatosGenerales.Edad).to.equal("data.edad");
  });

  it('test case for no found property in scope parameter', function(){
    var pm = propertyMaper.map(
      JSON.stringify({
        DatosGenerales: {
          Nombre: "data.nombre",
        }
      }), {data: {edad: 22}}
    );

    expect(pm.DatosGenerales.Nombre).to.equal("data.nombre");
  });

  it('test case for non valid json map parameter (Simple JSON)', function(){
    var pm = propertyMaper.map(
      "{DatosGenerales: {Nombre: data.nombre}}",
      {data: {nombre: "Carlos"}}
    );

    expect(pm.DatosGenerales.Nombre).to.equal("Carlos");
  });

  it('test case for non valid json map parameter (Complex JSON)', function(){
    var pm = propertyMaper.map(
      "{ DatosGenerales: {Nombre: data.nombre}, list: Algo, otro: {some: 12}, a: Loro, c: [1,2,3], d: [{area:basexaltura, perimetro: 45}]}",
      {data: {nombre: "Carlos"}}
    );

    expect(pm.DatosGenerales.Nombre).to.equal("Carlos");
  });

  it('test case for null map parameter', function(){

    expect(function(){
      propertyMaper.map(null, {data: {name: 'Alfredo'}});
    }).to.throw("map(): expected first parameter as string");
  });

  it('test case for non-string map parameter', function(){

    expect(function(){
      propertyMaper.map({}, {data: {name: 'Alfredo'}});
    }).to.throw("map(): expected first parameter as string");
  });

  it('test case for non-valid-string map parameter 1th', function(){

    expect(function(){
      propertyMaper.map("", null);
    }).to.throw("map(): expected first parameter as string");
  });

  it('test case for non-valid-string map parameter 2nd', function(){

    expect(function(){
      propertyMaper.map("Hola Mundo!", {});
    }).to.throw("searchAndReplace(): expected first parameter has a valid json structure");
  });

  it('test case for non-valid-string map parameter 3rd', function(){

    expect(function(){
      propertyMaper.map("{DatosGenerales: {hola: data.saludo", {});
    }).to.throw("searchAndReplace(): expected first parameter has a valid json structure");
  });

  it('test case for non-valid-string map parameter 4th', function(){

    expect(function(){
      propertyMaper.map("", 25);
    }).to.throw("map(): expected first parameter as string");
  });

  it('test case for non-valid scope parameter', function(){

    expect(function(){
      propertyMaper.map("{}", null);
    }).to.throw("map(): expected second parameter as object");
  });

  it('test case for non-valid scope parameter', function(){

    expect(function(){
      propertyMaper.map("{}", 25);
    }).to.throw("map(): expected second parameter as object");
  });
});
