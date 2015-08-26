(function() {
  const remote = require('remote');
  const ipc = require('ipc');
  const request = remote.require('request');

  ipc.send('page-ready');

  window.dorequest = function() {
    request.get('http://www.mangareader.net/alphabetical', function(err, response, body) {
      console.log(err, response, body);
      document.getElementById('main').appendChild(
        document.createElement('P').appendChild(
          document.createTextNode(body)
        ));
      //debugger;
    });
  };
})();
