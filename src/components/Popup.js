import React, { useState, useEffect } from 'react';

import { formatDate } from '../utils/common';
import { fetchTodos, addTodo, updateTodo } from '../utils/firebase';

function Popup(props) {
    const {registerPopupOpen, setRegisterPopupOpen, editPopupOpen, setEditPopupOpen, setTodos, setTodo, todo, setFetchLoading} = props;
    const [todoId, setTodoId] = useState('');
    const [todoStatus, setTodoStatus] = useState('');
    const [todoTitle, setTodoTitle] = useState('');
    const [todoDesc, setTodoDesc] = useState('');
    const [todoCategory, setTodoCategory] = useState('');
    const [todoStart, setTodoStart] = useState('');
    const [todoEnd, setTodoEnd] = useState('');

    const handleSubmitRegister = event => {
        event.preventDefault();

        addTodo(todoTitle, todoDesc, todoCategory, todoStart, todoEnd).then(docRef => {
            setTodoTitle('');
            setTodoDesc('');
            setTodoCategory('');
            setTodoStart('');
            setTodoEnd('');
            setRegisterPopupOpen(false);

            fetchTodos().then(data => {
                setTodos(data);
            });
        });
    }

    const handleSubmitEdit = event => {
        event.preventDefault();

        updateTodo(todoId, todoStatus, todoTitle, todoDesc, todoCategory, todoStart, todoEnd).then(docRef => {
            setTodo({});
            setTodoId('');
            setTodoStatus('');
            setTodoTitle('');
            setTodoDesc('');
            setTodoCategory('');
            setTodoStart('');
            setTodoEnd('');
            setEditPopupOpen(false);

            fetchTodos().then(data => {
                setTodos(data);
            });
        });
    }

    const handleCancel = (event, setTodo) => {
        event.preventDefault();

        setTodo({});
        setRegisterPopupOpen(false);
        setEditPopupOpen(false);
        setFetchLoading(false);
    }

    const isStatusComplete = () => {
        return todoStatus === 'complete';
    }

    useEffect(() => {
        if (Object.keys(todo).length !== 0) {
            setTodoId(todo.id);
            setTodoStatus(todo.status);
            setTodoTitle(todo.title);
            setTodoDesc(todo.description);
            setTodoCategory(todo.category);
            setTodoStart(formatDate(todo.start));
            setTodoEnd(formatDate(todo.end));
        }
    }, [todo])

    return (
        <div className={`popup-default ${registerPopupOpen ? "popup-add" : "popup-edit"}`}>
            <div className={`popup-default-inner ${registerPopupOpen ? "popup-add-inner" : "popup-edit-inner"}`}>
                <div className="popup-default-close">
                    <button className="popup-default-close-icon" onClick={event => handleCancel(event, setTodo)}>&#0215;</button>
                </div>
                <form className="popup-default-form" onSubmit={registerPopupOpen ? handleSubmitRegister : handleSubmitEdit}>
                    {editPopupOpen && (
                        <div className="popup-default-form-line">
                            <label>Status:</label>
                            <select value={todoStatus} onChange={event => setTodoStatus(event.target.value)}>
                                <option value="new">未着手</option>
                                <option value="doing">実行中</option>
                                <option value="stop">保留</option>
                                <option value="complete">完了</option>
                            </select>
                        </div>
                    )}
                    <div className="popup-default-form-line">
                        <label>Title:</label>
                        <input type="text" value={todoTitle} className={isStatusComplete() ? 'readonly' : ''} disabled={isStatusComplete()} onChange={event => setTodoTitle(event.target.value)} />
                    </div>
                    <div className="popup-default-form-line">
                        <label>Description:</label>
                        <textarea value={todoDesc} className={isStatusComplete() ? 'readonly' : ''} disabled={isStatusComplete()} onChange={event => setTodoDesc(event.target.value)}></textarea>
                    </div>
                    <div className="popup-default-form-line">
                        <label>Category:</label>
                        <input type="text" value={todoCategory} className={isStatusComplete() ? 'readonly' : ''} disabled={isStatusComplete()} onChange={event => setTodoCategory(event.target.value)} />
                    </div>
                    <div className="popup-default-form-line">
                        <label>Start:</label>
                        <input type="date" value={todoStart} className={isStatusComplete() ? 'readonly' : ''} disabled={isStatusComplete()} onChange={event => setTodoStart(event.target.value)} />
                    </div>
                    <div className="popup-default-form-line">
                        <label>End:</label>
                        <input type="date" value={todoEnd} className={isStatusComplete() ? 'readonly' : ''} disabled={isStatusComplete()} onChange={event => setTodoEnd(event.target.value)} />
                    </div>
                    <div className="popup-default-form-line-button">
                        {registerPopupOpen ? 
                            (<button type="submit" className={`popup-default-form-line-button-register ${(todoTitle && todoDesc && todoCategory && todoStart && todoEnd) ? "active" : "deactive"}`}>Register</button>) : 
                            (<button type="submit" className={`popup-default-form-line-button-register ${(todoTitle && todoDesc && todoCategory && todoStart && todoEnd) ? "active" : "deactive"}`}>Update</button>)
                        }
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Popup;