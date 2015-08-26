"use strict";
const request = require('request');
const Vue = require('vue');

window.Main = function(ipc) {
  //Vue.directive('mdl', {
  //bind: function() {
  //componentHandler.upgradeElement(this.el);
  //}
  //});
  let test = new Vue({
    el: '#main',
    data: {
      n: 1,
      arr: [0, 1]
    },
    directives: {
      mdl: {
        bind: function() {
          componentHandler.upgradeElement(this.el);
        }
      },
      progress: function(val) {
        if (!this.el.MaterialProgress)
          componentHandler.upgradeElement(this.el);
        this.el.MaterialProgress.setProgress(val);
      }
    }
  });
  ipc.send('page-ready');

  window.dorequest = function() {
    test.n++;
    test.arr.push(test.n);
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
}
