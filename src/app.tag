<app>
  <treeitem node={root_node}></treeitem>
  <br>
  <div id="editor" style="border: 1px solid">
    <ul>
      <li>1
        <ul>
            <li>11</li>
            <li>22</li>
        </ul>
      </li>
      <li>2</li>
      <li>3</li>
    </ul>
  </div>
  <button onclick={parse}>parse</button>

  <script>
    this.root_node = new Node({text:'root'})

    parse() {
      var ul = document.querySelector('#editor ul')
      this.parse_rec(ul, this.root_node)
    }

    parse_rec(ul, node) {
      var children = ul.children

      for (var i=0; i< children.length;i++) {
        var child_dom = children[i]
        var text = child_dom.innerHTML.split("<ul>")[0]
        var child = node.addChildren({text:text}, node.children.length)
        var ul = child_dom.querySelector('ul')
        if (ul) {
          this.parse_rec(ul, child)
        }
      }
    }
  </script>

</app>
