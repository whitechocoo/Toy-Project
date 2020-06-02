import React, { Component } from 'react';
import './css/Todoitem.css';

export default class TodoItem extends Component {
    state = {
        editable: false,
        clicked: false,
        todo:''
    }

    componentDidUpdate(preProps, prevState) {
        const {info, onUpdate} = this.props;
        
        if (!prevState.editable && this.state.editable) {
            this.setState ({
                todo: info.todo
            })
        }

        if (prevState.editable && !this.state.editable) {
            onUpdate(info.id, {
                todo: this.state.todo
            });
        }
    }

    handleUpdate = (e) => {
        const { editable } = this.state;

        this.setState({
            editable: !editable
        });
    }

    handleRemove = (e) => {
        const { info, onRemove } = this.props;

        onRemove(info.id);
    }

    handleChange = (e) => {
        const {name, value} = e.target;
        this.setState({
            [name]: value
        });
    }

    handleKeyPress = (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          this.handleUpdate();
        }
      }

      handleonClick = (e) => {
        const { clicked } = this.state;

        this.setState({
            clicked: !clicked
        });
      }

  render() {
      const {todo} = this.props.info;
      const {editable} = this.state;
      const { clicked } = this.state;
      const clickedcss = {
        textDecoration: clicked ? "line-through" : "none",
        color: clicked ? "lightgrey" : "black"
      };

      const editcss = {
        border: 'none',
        padding: '10px',
        fontSize: '1.5em',
        margin: '',
      }

        if (editable) {
            return (
                <div>
                    <div>
                        <input style={editcss} value={this.state.todo} onChange={this.handleChange} name="todo" 
                                 onKeyPress={this.handleKeyPress} />
                    </div>
                </div>
            );
        }

      return (
          <div className="items">
            <span style={clickedcss} onClick={this.handleonClick} >{todo}</span>
            <span className="button-group">
                <button className="create-button" onClick={this.handleRemove}>삭제</button> &nbsp;
                <button className="delete-button" onClick={this.handleUpdate}>수정</button>
            </span>
          </div>
      );
  }
}
