import React, { Component } from 'react';

export default class TodoAdd extends Component {
  state = {
      todo: ""
  }

  handleCreate = (e) => {
    this.props.onCreate(this.state);

    this.setState({
      todo: ""
    })
  }

  handleChange = (e) => {
    this.setState({
      todo : e.target.value
    })
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      if (e.target.value == '') {
        return
      }
      
      this.handleCreate();

      this.setState({
        todo: ""
      })
    }
  }

  render() {
    const css = {
      border: 'none',
      padding: '10px',
      fontSize: '0.75em',
      margin: '',
    };
    return (
      <div>
          <form>
              <input style={css} value={this.state.todo} name="todo" type="text" 
                placeholder="무엇을 해야하나요?"
                onChange={this.handleChange}  onKeyPress={this.handleKeyPress} />
           </form>
      </div>
    );
  }
}
