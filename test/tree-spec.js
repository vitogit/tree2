describe('tree spec', function() {
  context('default', function() {

    it('creates a tree', function() {
      expect(new Tree()).to.exist
    })

    it('has a root node', function() {
      var tree = new Tree()
      expect(tree.root).to.exist
    })

  })
})
