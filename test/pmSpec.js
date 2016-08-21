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
      JSON.stringify({
        DatosGenerales: {
          Nombre: "data.nombre",
        }
      }),
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

  it('test case for null map parameter', function(){

    expect(function(){
      propertyMaper.map(null, {data: {name: 'Alfredo'}});
    }).to.throw("mapScope(): expected map parameter");
  });

  it('test case for non-string map parameter', function(){

    expect(function(){
      propertyMaper.map({}, {data: {name: 'Alfredo'}});
    }).to.throw("mapScope(): expected map parameter as string");
  });

  it('test case for null scope parameter', function(){

    expect(function(){
      propertyMaper.map("", null);
    }).to.throw("mapScope(): expected scope parameter");
  });

  it('test case for non-object map parameter', function(){

    expect(function(){
      propertyMaper.map("", 25);
    }).to.throw("mapScope(): expected scope parameter as object");
  });
});
