
import React from 'react';
import hljs from 'highlight.js'
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css'
import 'highlight.js/styles/darcula.css'
import './editor.css'

const ReactQuill = require('react-quill'); // CommonJS

hljs.configure({
  languages: ['python'] //['javascript', 'ruby', 'python', 'rust'],
})

const modules = {
  syntax: {
    highlight: text => hljs.highlightAuto(text).value,
  },
  toolbar: [
    ['bold', 'italic', 'underline', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'image', 'video'],
    ['clean'],
    ['code-block'],
  ],
  clipboard: {
    matchVisual: false,
  },
}

const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video',
  'code-block',
]

class Editor extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        text: `<code><pre>def a():
  int i = 0</pre></code>`,
      } // You can also pass a Quill Delta here
      this.handleChange = this.handleChange.bind(this)
    }
  
    handleChange(value) {
      this.setState({ text: value })
    }
  
    render() {
      return (
        <div id='editor'>
          <ReactQuill value={this.state.text}
                              onChange={this.handleChange}
                              theme="bubble"
                              modules={modules}
                              formats={formats} />
        </div>
      )
    }
  }

  export default Editor;