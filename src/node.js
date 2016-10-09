function Node(options) {
  var node = options || {}
  this.id = node.id || 0
  this.text = node.text || ''
  this.parent = node.parent
  this.previous = node.previous
  this.children = node && node.children || []
}

Node.prototype.hasChildren = function() {
  return this.children && this.children.length > 0
}

Node.prototype.lastChild = function() {
  return this.children[this.children.length-1]
}

Node.prototype.addChildren = function(node) {
  node.parent = node.parent || this

  //the child previous is his parent
  var childPrevious = this

  //If parent.children >0 then child previous is a sibling not the parent
  if (this.hasChildren()) {
     childPrevious = this.lastChild()
  }

  node.previous = node.previous || childPrevious
  this.children.push(node)
};
