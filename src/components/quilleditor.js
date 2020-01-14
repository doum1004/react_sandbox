
import React from 'react';
import hljs from 'highlight.js'
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css'
import 'highlight.js/styles/darcula.css'
import './quilleditor.css'

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

class QuillEditor extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        text: `<code><pre>def a():
  int i = 0</pre></code>`,
      } // You can also pass a Quill Delta here
      this.handleChange = this.handleChange.bind(this)
      this.quillRef = null;      // Quill instance
      this.reactQuillRef = null; // ReactQuill component
    }
    componentDidMount() {
      this.attachQuillRefs()
    }
    
    componentDidUpdate() {
      this.attachQuillRefs()
    }
    
    attachQuillRefs = () => {
      if (typeof this.reactQuillRef.getEditor !== 'function') return;
      this.quillRef = this.reactQuillRef.getEditor();
      this.quillRef.formatLine(0, this.quillRef.getLength(), { 'code-block': true });
    }

    insertText = () => {
      var range = this.quillRef.getSelection();
      let position = range ? range.index : this.quillRef.getLength();
      this.quillRef.insertText(position, 'Hello, World! ')
    }

    handleChange(value, b, c, editor) {
      this.setState({ text: value })
    }
  
    render() {
      return (
        <div id='editor'>
          <ReactQuill value={this.state.text}
          ref={(el) => { this.reactQuillRef = el }}
                              onChange={this.handleChange}
                              theme="snow"
                              modules={modules}
                              formats={formats} />
        <button onClick={this.insertText}>Insert Text</button>
        </div>
      )
    }
  }

  export default QuillEditor;