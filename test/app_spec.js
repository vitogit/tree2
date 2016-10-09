describe('app spec', function() {
  context('default', function() {
    beforeEach(function() {
      var html = document.createElement('app')
      document.body.appendChild(html)
      app = riot.mount('app')[0]
    });
  })
})
