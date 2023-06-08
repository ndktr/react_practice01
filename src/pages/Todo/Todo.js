import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import Popup from '../../components/Popup';
import TodoList from './TodoList';
import { fetchTodos } from '../../utils/firebase';

function Todo(props) {
    const { isLoggedIn } = props;
    const [fetchLoading, setFetchLoading] = useState(false);
    const [todos, setTodos] = useState([]);
    const [todo, setTodo] = useState({});
    const [registerPopupOpen, setRegisterPopupOpen] = useState(false);
    const [editPopupOpen, setEditPopupOpen] = useState(false);

    useEffect(() => {
        if (isLoggedIn) {
            fetchTodos().then((data) => {
                setTodos(data)
            });
        }
    }, [fetchLoading]);

    if (isLoggedIn) {
        return (
            <div className="todo-wrapper">
                {(registerPopupOpen || (editPopupOpen && fetchLoading)) && <Popup registerPopupOpen={registerPopupOpen} setRegisterPopupOpen={setRegisterPopupOpen} editPopupOpen={editPopupOpen} setEditPopupOpen={setEditPopupOpen} todo={todo} setTodo={setTodo} setTodos={setTodos} setFetchLoading={setFetchLoading}/>}
                <TodoList statusText="未着手" todos={todos.filter(todo => todo.status == 'new')} registerPopupOpen={registerPopupOpen} setRegisterPopupOpen={setRegisterPopupOpen} editPopupOpen={editPopupOpen} setEditPopupOpen={setEditPopupOpen} setTodo={setTodo} setTodos={setTodos} setFetchLoading={setFetchLoading}/>
                <TodoList statusText="実行中" todos={todos.filter(todo => todo.status == 'doing')} registerPopupOpen={registerPopupOpen} setRegisterPopupOpen={setRegisterPopupOpen} editPopupOpen={editPopupOpen} setEditPopupOpen={setEditPopupOpen} setTodo={setTodo} setTodos={setTodos} setFetchLoading={setFetchLoading}/>
                <TodoList statusText="保留" todos={todos.filter(todo => todo.status == 'stop')} registerPopupOpen={registerPopupOpen} setRegisterPopupOpen={setRegisterPopupOpen} editPopupOpen={editPopupOpen} setEditPopupOpen={setEditPopupOpen} setTodo={setTodo} setTodos={setTodos} setFetchLoading={setFetchLoading}/>
                <TodoList statusText="完了" todos={todos.filter(todo => todo.status == 'complete')} registerPopupOpen={registerPopupOpen} setRegisterPopupOpen={setRegisterPopupOpen} editPopupOpen={editPopupOpen} setEditPopupOpen={setEditPopupOpen} setTodo={setTodo} setTodos={setTodos} setFetchLoading={setFetchLoading}/>
            </div>
        );
    } else {
        return <Navigate to="/" />
    }
}

export default Todo;