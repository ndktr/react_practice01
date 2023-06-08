import React from 'react';

import { formatDate } from '../../utils/common';
import { fetchTodos, fetchTodo, deleteTodo } from '../../utils/firebase';

function TodoList(props) {
    const {statusText, todos, setTodo, setTodos, registerPopupOpen, setRegisterPopupOpen, setEditPopupOpen, setFetchLoading} = props;

    const handleClick = (event, id, setTodo) => {
        event.preventDefault();

        setEditPopupOpen(true);
        fetchTodo(id).then(data => {
            data.id = id;
            setTodo(data);
            setFetchLoading(true);
        });
    }

    const handleDelete = (event, id) => {
        event.preventDefault();

        const confirmed = window.confirm("Are you sure you want to delete this?");
        if (confirmed) {
            deleteTodo(id).then(docRef => {
                fetchTodos().then((data) => {
                    setTodos(data);
                });
            })
        }
    }

    return (
        <div className="todo">
            <div className="todo-header">
                <h2 className="todo-header-title">
                    {statusText}
                    <span className="todo-header-counter">
                        <span className="todo-header-counter-inner">{todos.length}</span>
                    </span>
                </h2>
                {(statusText === "未着手") && <button type="button" className="todo-header-button" onClick={() => setRegisterPopupOpen(!registerPopupOpen)}>Add</button>}
            </div>
            <div className="todo-content">
                {todos.length === 0 && <div className="todo-content-notask">Nothing</div>}
                <ul className="todo-list">
                    {todos.map(todo => (
                        <li key={todo.id} className="todo-list-card">
                            <button className="todo-list-card-title" onClick={event => handleClick(event, todo.id, setTodo)}>{todo.title}</button>
                            <div className="todo-list-card-genre">{todo.category}</div>
                            <div className="todo-list-card-bottom">
                                <div className="todo-list-card-bottom-time">
                                    <div className="todo-list-card-start">開始日: {formatDate(todo.start)}</div>
                                </div>
                                <div className="todo-list-card-bottom-delete">
                                    <button href="#" onClick={event => handleDelete(event, todo.id)}><i className="fas fa-trash-alt"></i></button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default TodoList;