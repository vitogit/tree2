describe('node spec', function() {
  context('default', function() {

    it('creates a node', function() {
      expect(new Node({})).to.exist
    })

    it('has an id', function() {
      var node = new Node()
      expect(node.id).to.exist
    })

    it('has a children array', function() {
      var node = new Node()
      expect(node.children).to.exist
      expect(node.children).to.be.an('array')
    })

    it('adds a children', function() {
      var parent = new Node()
      parent.addChildren({id:1})
      expect(parent.children).to.have.lengthOf(1)
      expect(parent.children[0].id).to.be.eq(1)
    })

    it('removes a children', function() {
      var parent = new Node()
      parent.addChildren({id:1})
      parent.addChildren({id:2})
      var firstChild = parent.children[0]
      parent.removeChild(firstChild)
      expect(parent.children).to.have.lengthOf(1)
      expect(parent.children[0].id).to.be.eq(2)
    })

    it('has the correct parent', function() {
      var parent = new Node()
      parent.addChildren({id:1})
      var child = parent.children[0]
      expect(child.parent).to.be.eq(parent)
    })

    it('check if it has children', function() {
      var parent = new Node()
      expect(parent.hasChildren()).to.be.false
      parent.addChildren({id:1})
      expect(parent.hasChildren()).to.be.true
    })

    it('get the last children', function() {
      var parent = new Node()
      parent.addChildren({id:1})
      parent.addChildren({id:2})
      var lastchild = parent.children[1]
      expect(parent.lastChild()).to.be.eq(lastchild)
    })

    it('convert from sibling to children', function() {
      var parent = new Node()
      parent.addChildren({id:1})
      parent.addChildren({id:2})
      var firstChild = parent.children[0]
      var lastChild = parent.children[1]
      lastChild.convertToChildren()
      expect(lastChild.parent).to.be.eq(firstChild)
      expect(lastChild.previous).to.be.eq(firstChild)
      expect(firstChild.children).to.have.lengthOf(1)
      expect(parent.children).to.have.lengthOf(1)
    })

    it.skip('convert from sibling to children complex test', function() {
      var parent = new Node()
      parent.addChildren({id:1})
      parent.addChildren({id:2})
      parent.addChildren({id:3})

      var firstChild = parent.children[0]
      var secondChild = parent.children[1]
      var thirdChild = parent.children[2]
      secondChild.convertToChildren()
      thirdChild.convertToChildren()
      expect(thirdChild.parent).to.be.eq(firstChild)
      expect(thirdChild.previous).to.be.eq(firstChild)
    })

    it('convert from children to sibling', function() {
      var parent = new Node()
      parent.addChildren({id:1})
      var firstChild = parent.children[0]
      firstChild.addChildren({id:11})
      var grandChild = firstChild.children[0]

      expect(parent.children).to.have.lengthOf(1)
      expect(firstChild.children).to.have.lengthOf(1)
      grandChild.convertToSibling()
      expect(parent.children).to.have.lengthOf(2)
      expect(firstChild.children).to.have.lengthOf(0)
    })

    it('prints the children', function() {
      var parent = new Node()
      parent.addChildren({text:1})
      parent.addChildren({text:2})
      expect(parent.printChildren()).to.be.eq('1 2 ')
    })

    context('parent without children', function() {
      var parent, child
      beforeEach(function() {
        parent = new Node()
        parent.addChildren({id:1})
        child = parent.children[0]
      });

      it('has the correct previous', function() {
        expect(child.previous).to.be.eq(parent)
      })

      it('adds a sibling', function() {
        child.addSibling()
        expect(parent.children).to.have.lengthOf(2)
      })
    })

    context('parent with children', function() {
      var parent, firstChild, lastChild
      beforeEach(function() {
        parent = new Node()
        parent.addChildren({id:1})
        parent.addChildren({id:2})

        firstchild = parent.children[0]
        lastchild = parent.children[1]
      });

      it('has the correct previous', function() {
        expect(lastchild.previous).to.be.eq(firstchild)
      })

      it('adds a sibling correctly', function() {
        firstchild.addSibling()
        expect(parent.children).to.have.lengthOf(3)
        lastchild.addSibling()
        expect(parent.children).to.have.lengthOf(4)
      })
    })

    context('root node (has no parent)', function() {
      var root
      beforeEach(function() {
        root = new Node()
      });

      it('child has it as previous', function() {
        root.addChildren()
        var child = root.children[0]
        expect(child.previous).to.be.eq(root)
      })

      it('adds a sibling correctly', function() {
        root.addSibling()
        expect(root.children).to.have.lengthOf(1)
      })
    })
  })
})
