<treeitem>
  <div >
    <span name="input_text" class="input_text" contenteditable="true">{ node.text }</span>
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

  </script>
  <style>
    .input_text {
      width: 100px;
      display: inline-block;
    }
  </style>
</treeitem>
