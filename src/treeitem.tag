<treeitem>
  <div >
    <span name="input_text" class="input_text" contenteditable="true" onkeydown={keyHandler}>
      { node.text }
    </span>
    <span class="actions">
      <button onclick={addChildren}>new children</button>
    </span>
  </div>
  <ul>
    <li data-is="treeitem" each={child in node.children} node={child} > </li>
  </ul>

  <script>

    this.node = opts.node || new Node()
    this.last_id = opts.node.id || 0

    this.on('update',function() {
      this.node = opts.node
    })

    addChildren() {
      var text = this.input_text.innerHTML
      this.last_id++
      var id = this.last_id*100
      this.node.addChildren({id:id, text:id})
    }

    addSibling() {
      var text = this.input_text.innerHTML
      this.node.addSibling()
    }

    convertToChildren() {
      this.node.convertToChildren()
      this.update()
    }

    convertToSibling() {
      this.node.convertToSibling()
      this.parent.parent.update() //todo: improve this
    }

    keyHandler(event) {
      var key = typeof event.which === 'undefined' ? event.keyCode : event.which

      var enterKey = key === 13
      var tabKey   = key === 9
      var shiftKey = event.shiftKey

      if (enterKey) {
        this.addSibling()
        console.log('enter key')
        return false
      }
      else if (tabKey && shiftKey) {
        this.convertToSibling()
        console.log('shift+tab key')
        return false
      }
      else if (tabKey) {
        this.convertToChildren()
        console.log('tab key')
        return false
      }
      return true

    }
  </script>
  <style>
    .input_text {
      width: 100px;
      display: inline-block;
    }
  </style>
</treeitem>
