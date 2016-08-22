module.exports = (function(){

  var _map, _parse, _scope;

  function searchAndReplace(string, mainRegex, subRegex, replace){
    var matches = string.match(mainRegex),
        i;

    if (matches){

      for (i = 0; i !== matches.length; i++){
        string = string.replace(new RegExp(matches[i], 'g'), matches[i].replace(subRegex, replace));
      }
    } else {
      throw new Error("searchAndReplace(): expected first parameter has a valid json structure");
    }

    return string;
  }

  function evaluateString(jsonString){
    var matches,
        i;

    jsonString = jsonString.replace(/{/g, '{"').
        replace(/:/g, '":').
        replace(/(?!,\d),/g, ',"');

    jsonString = searchAndReplace(
      jsonString,
      new RegExp(':[a-zA-Z]', 'g'),
      new RegExp(':', 'g'),
      ':"'
    );

    jsonString = searchAndReplace(
      jsonString,
      new RegExp('[a-zA-Z]}', 'g'),
      new RegExp('}', 'g'),
      '"}'
    );

    // Only for complex json
    matches = jsonString.match(/[a-zA-Z],/g);

    if (matches){

      for (i = 0; i !== matches.length; i++){
        jsonString = jsonString.replace(new RegExp(matches[i], 'g'), matches[i].replace(/,/g, '",'));
      }
    }

    return jsonString;
  }

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

    if (!map || (typeof map !== "string")){
      throw new Error("map(): expected first parameter as string");
    }

    if (!scope || (typeof scope !== "object")){
      throw new Error("map(): expected second parameter as object");
    }

    _map = map.replace(/\s/g, '');
    _scope = scope;

    try {
      _parse = JSON.parse(_map);
    } catch (ex){
      _parse = JSON.parse(evaluateString(_map));
    }

    propertySearch(_parse);
    return _parse;
  }

  return {
    map: mapScope
  };
})();
