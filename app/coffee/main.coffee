#request = require 'request'
Vue = require 'vue'

window.Main = (ipc) ->
  Vue.config.debug = true
  test = new Vue
    components:
      mdlCheckbox: require '../components/checkbox.vue'
    el: '#main'
    data:
      n: 1
      check: true
      arr: [
        0
        1
      ]
    directives:
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
