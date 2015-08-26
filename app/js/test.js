"use strict";
const remote = require('remote');
const ipc = require('ipc');
const request = remote.require('request');
const Vue = remote.require('vue');

ipc.send('page-ready');

let test = new Vue({
  el: '#main',
  data: {
    n: 1,
    arr: [1]
  },
  directives: {
    mtl: function() {
      componentHandler.upgradeElement(this.element);
    }
  }
});

window.dorequest = function() {
  test.n++;
  debugger;
  //test.arr.
  return;
  request.get('http://www.mangareader.net/alphabetical', function(err, response, body) {
    console.log(err, response, body);
    document.getElementById('main').appendChild(
      document.createElement('P').appendChild(
        document.createTextNode(body)
      ));
    //debugger;
  });
};
