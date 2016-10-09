<treeitem>
  <div >
    <span name="input_text" class="input_text" contenteditable="true" onkeypress={keyHandler}>
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
    addChildren() {
      var text = this.input_text.innerHTML
      this.node.addChildren({text:'children of:'+this.node.text})
    }

    addSibling() {
      var text = this.input_text.innerHTML
      console.dir(this.node)
      this.node.addSibling({text:'sibling of:'})
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
        console.log('shift+tab key')
        return false
      }
      else if (tabKey) {
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
