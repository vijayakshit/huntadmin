
 const createCORSRequest = (method, url) => {
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
      // XHR for Chrome/Firefox/Opera/Safari.
      xhr.open(method, url, true);
    } else if (typeof XDomainRequest != "undefined") {
      // XDomainRequest for IE.
      xhr = new XDomainRequest();
      xhr.open(method, url);
    } else {
      // CORS not supported.
      xhr = null;
    }
    return xhr;
  };
  
  const getTitle = (text) => {
    return text.match('<title>(.*)?</title>')[1];
  }
  
   const shootlogin = (onload,onerror) =>{
    var url = 'https://akshitsalfredo.herokuapp.com/login';

    var xhr = this.createCORSRequest('POST', url);
    if (!xhr) {
      alert('CORS not supported');
      return;
    }
  
    // Response handlers.
    xhr.onload = function() {
      
      var resp = JSON.parse(xhr.responseText);
      return(onload(resp));
    };
  
    
    xhr.onerror = function() {
      return(onerror(xhr.error))
      alert('Woops, there was an error making the request.');
    };

    xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
    xhr.withCredentials = true;

    xhr.send(JSON.stringify({
        "username": "akshitthevijay@gmail.com",
        "password": "Password"
      }));
}


export default shootlogin;