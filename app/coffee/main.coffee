request = require 'request'
Vue = require 'vue'
la = require './lala.coffee'

window.Main = (ipc) ->
  #Vue.directive('mdl', {
  #bind: function() {
  #componentHandler.upgradeElement(this.el);
  #}
  #});
  test = new Vue
    el: '#main'
    data:
      n: 1
      arr: [
        0
        1
      ]
    directives:
      mdl: bind: ->
        componentHandler.upgradeElement @el
      progress: (val) ->
        if not @el.MaterialProgress
          componentHandler.upgradeElement @el
        @el.MaterialProgress.setProgress val

  ipc.send 'page-ready'

  window.dorequest = ->
    test.n++
    test.arr.push test.n
    return
    request.get 'http://www.mangareader.net/alphabetical', (err, response, body) ->
      console.log err, response, body
      document.getElementById('main').appendChild document.createElement('P').appendChild(document.createTextNode(body))
      #debugger
