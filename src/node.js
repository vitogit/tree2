function Node(options) {
  var node = options || {}
  this.id = node.id || 0
  this.text = node.text || ''
  this.parent = node.parent
  this.previous = node.previous
  this.children =  node.children || []
}

Node.prototype.hasChildren = function() {
  return this.children && this.children.length > 0
}

Node.prototype.lastChild = function() {
  return this.children[this.children.length-1]
}

Node.prototype.addChildren = function(options) {
  var node = options || {}

  node.parent = node.parent || this

  //the child previous is his parent
  var childPrevious = this

  //If parent.children >0 then child previous is a sibling not the parent
  if (this.hasChildren()) {
     childPrevious = this.lastChild()
  }

  node.previous = node.previous || childPrevious
  this.children.push(new Node(node))
};

Node.prototype.addSibling = function(node) {
  if (this.parent) {
    this.parent.addChildren(node)
  } else { //is the root, don't have parent
    this.addChildren(node)
  }
};

Node.prototype.removeChild = function(node) {
  var index = -1
  for (var i=0; i< this.children.length ; i++ ) {
      if (this.children[i] === node) {
        index = i
        break
      }
  }
  if (index > -1) {
    this.children.splice(index, 1);
  }
};

Node.prototype.convertToChildren = function() {
  this.parent.removeChild(this)
  this.parent = this.previous
  this.parent.addChildren(this)
};

Node.prototype.convertToSibling = function() {
  this.parent.removeChild(this)
  this.parent = this.parent.parent
  this.parent.addChildren(this)
};

Node.prototype.printChildren = function() {
  var result = ''
  for (var i=0; i< this.children.length ; i++ ) {
    result += this.children[i].text+' '
  }
  return result
};
