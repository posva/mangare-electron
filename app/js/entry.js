"use strict";
const ipc = require('ipc');

document.addEventListener('DOMContentLoaded', function() {
  new Main(ipc);
});
