module.exports = (function(){

  var _map, _parse, _scope;

  function mapPropertyValue(obj, prop){
    var split = obj[prop].split('.'),
        tmp = _scope,
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
  }

  function propertySearch(obj){

    for (var prop in obj){
      var type = typeof obj[prop];

      if (type === "object"){
        propertySearch(obj[prop]);
      } else if (type === "string"){
        mapPropertyValue(obj, prop);
      }
    }
  }

  function mapScope(map, scope){

    if (map === null){
      throw new Error("mapScope(): expected map parameter");
    } else if (typeof map !== "string"){
      throw new Error("mapScope(): expected map parameter as string");
    }

    if (scope === null){
      throw new Error("mapScope(): expected scope parameter");
    } else if (typeof scope !== "object"){
      throw new Error("mapScope(): expected scope parameter as object");
    }

    _map = map;
    _parse = JSON.parse(_map);
    _scope = scope;

    propertySearch(_parse);
    return _parse;
  }

  return {
    map: mapScope
  };
})();
