"use strict";
const ipc = require('ipc');

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('main').appendChild(
    document.createElement('P').appendChild(
      document.createTextNode('DONE')
    ));

    new Main(ipc);
});
