function PropertyMaper(map, scope){

  var _map = map || "{\"DatosGenerales\": {\"Nombre\": \"data.nombre\"}, \"value\":25, \"test\":\"data.nombre\"}",
      _scope = scope || { data: {nombre: 'Alfredo'}},
      parse = JSON.parse(_map);

  this.scope = _scope;
  console.log("Before: " + JSON.stringify(parse) + "\n");
  this.propertySearch(parse);
  console.log("After: " + JSON.stringify(parse) + "\n");
}

// Funcion recursiva que busca propiedades string
// function propertySearch(obj){
PropertyMaper.prototype.propertySearch = function(obj){

  for (var prop in obj){
    var type = typeof obj[prop];

    if (type === "object"){
      this.propertySearch(obj[prop]);
    } else if (type === "string"){
      this.mapPropertyValue(obj, prop);
    }
  }
};

// Funcion que busca el propertyString(v) en el scope(s),
// si la encuentra: retorna el valor del propertyString(v) que esta en scope(s)
// sino: retorna el propertyValue(v)
PropertyMaper.prototype.mapPropertyValue = function(obj, prop){
  var split = obj[prop].split('.'),
      tmp = this.scope,
      i;

  for (i = 0; i !== split.length; i++){
    if (tmp.hasOwnProperty(split[i])){
      tmp = tmp[split[i]];
    } else {
      tmp = obj[prop];
      break;
    }
  }

  obj[prop] = tmp;
};

module.exports = PropertyMaper;
