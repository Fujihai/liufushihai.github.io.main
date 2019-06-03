createHTTPRequestObject = function(){
  var xmlHttpReqObject;

  try{
    xmlHttpReqObject = new ActiveXObject("Msxml2.XMLHTTP");
  }catch(e){
    try{
      xmlHttpReqObject = new ActiveXObject("Microsoft.XMLHTTP");
    }catch(e){
      xmlHttpReqObject = false;
    }
  }

  if(!xmlHttpReqObject && window.XMLHttpRequest){
    xmlHttpReqObject = new XMLHttpRequest();
  }
  
  return xmlHttpReqObject;
}

getJSON = function(url, callback){
  var xhr = createHTTPRequestObject();
  xhr.open('GET', url, true);
  xhr.send();
  xhr.onreadystatechange = function(){
    if(xhr.readyState === 4){
      if(xhr.status === 200){
        var headers = {};
        headers = headerInfo2JSONObject(xhr.getAllResponseHeaders());
      }
      callback(JSON.parse(xhr.responseText), headers);
    }
  };
}

headerInfo2JSONObject = function(headers){
  var arr = headers.trim().split("\n");
  var headers = {};
  arr.forEach(function(item){
    var parts = item.split(": ");
    var prop = parts.shift();
    headers[prop] = parts.shift();
  });
  return headers;
}

ajax = function(post, url, callback){
  var xhr = createHTTPRequestObject();
  var method = post == null ? 'GET' : 'POST';
  xhr.open(method, url, true);
  xhr.send(JSON.stringify(post));
  xhr.onreadystatechange = function(){
    if(xhr.readyState === 4){
      if(xhr.status === 200){
        callback(xhr.responseText);
      }
    }
  }
}