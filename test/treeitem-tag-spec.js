describe.skip('treeitem tag spec', function() {
  context('default', function() {
    beforeEach(function() {
      var html = document.createElement('treeitem')
      document.body.appendChild(html)
      tag = riot.mount('treeitem')[0]
    });

    it('got mounted', function() {
      expect(tag).to.exist
    })

    it('has a node var', function() {
      expect(tag.node).to.exist
    })
  })
})
