import React, { Component } from 'react';
import TodoItem from './TodoItem';

export default class TodoList extends Component {
    render() {
        const {data, onRemove, onUpdate} = this.props;

        const list = data.map(v => (
            <TodoItem onRemove={onRemove} onUpdate={onUpdate} key={v.id} info={v}/>
        ));

        return (
            <div>
                <div><b>{list}</b></div>
            </div>
        );
    }
}
