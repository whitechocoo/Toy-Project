import React, { Component } from 'react';
import TodoAdd from './TodoAdd';
import TodoList from './TodoList';
import './css/Todomain.css';

export default class Todomain extends Component {
    id = 0;
    state = {
        todo: []
    }

    handleCreate = (data) => {
        const {todo} = this.state;
        
        this.setState({
            todo: todo.concat({
                id: this.id++, ...data
            })
        });
    }

    handleRemove = (id) => {
        const {todo} = this.state;
        
        this.setState({
            todo: todo.filter(
                info => info.id != id
            )
        });
    }

    handleUpdate = (selected_id, data) => {
        const {todo} = this.state;

        this.setState({
            todo: todo.map(origin => origin.id == selected_id
                ? {...origin, ...data}
                : origin
            )
        })
    }


    render() {
        const {todo} = this.state;
        return (
            <div className="todo-div">
                <div className="title">Todos</div>
                <main className="todo-main">           
                    <section className="add-wrapper">
                        <TodoAdd onCreate={this.handleCreate}/>
                    </section>
                    <section className="list-wrapper">
                        <TodoList data={todo} onRemove={this.handleRemove} onUpdate={this.handleUpdate}/>
                    </section>
                </main>
            </div>
        );
    }
}