var React = require('react');
var CodeMirror = require('react-codemirror');
require('codemirror/lib/codemirror.css');
require('codemirror/mode/python/python');
require('codemirror/addon/hint/show-hint');

var defaults = {
	python: '# Heading\n\nSome **bold** and _italic_ text\nBy [Jed Watson](https://github.com/JedWatson)',
};

class CodeMirrorEditor extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        code: defaults.python,
        readOnly: false,
        mode: 'python',
      }

      this.updateCode = this.updateCode.bind(this)
      this.changeMode = this.changeMode.bind(this)
      this.toggleReadOnly = this.toggleReadOnly.bind(this)
    }
  
    updateCode(newCode) {
      this.setState({ 
        code: newCode,
      });
    }

    changeMode (e) {
      var mode = e.target.value;
      this.setState({
        mode: mode,
        code: defaults[mode]
      });
    }

    toggleReadOnly () {
      this.setState({
        readOnly: !this.state.readOnly
      }, () => this.refs.editor.focus());
    }

    render() {
      var options = {
			  lineNumbers: true,
			  readOnly: this.state.readOnly,
			  mode: this.state.mode,
      };
      return (
        <div>
          <CodeMirror
            ref="editor"
            value={this.state.code}
            onChange={this.updateCode}
            options={options}
            autoFocus={true} />
          <div style={{ marginTop: 10 }}>
            <select onChange={this.changeMode} value={this.state.mode}>
              <option value="python">Python</option>
            </select>
            <button onClick={this.toggleReadOnly}>Toggle read-only mode (currently {this.state.readOnly ? 'on' : 'off'})</button>
          </div>
        </div>
      );
    }
  }

  export default CodeMirrorEditor;