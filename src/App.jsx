import React, { useState } from 'react'
import './App.css'


const TodoList = () => {
    const [tasks, setTasks] = useState([])
    const [taskInput, setTaskInput] = useState('')
    const [editMode, setEditMode] = useState(false)
    const [editIndex, setEditIndex] = useState(null)
    const [showEditModal, setShowEditModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [deleteIndex, setDeleteIndex] = useState(null)

    const addTask = () => {
        if (taskInput.trim() !== '') {
            if (editMode) {
                const updatedTasks = [...tasks]
                updatedTasks[editIndex] = taskInput
                setTasks(updatedTasks)
                setEditMode(false)
                setEditIndex(null)
            } else {
                setTasks([...tasks, taskInput])
            }
            setTaskInput('')
        }
    }

    const deleteTask = (index) => {
        setDeleteIndex(index)
        setShowDeleteModal(true)
    }

    const confirmDelete = () => {
        const updatedTasks = [...tasks]
        updatedTasks.splice(deleteIndex, 1)
        setTasks(updatedTasks)
        setShowDeleteModal(false)
    }

    const cancelDelete = () => {
        setShowDeleteModal(false)
    }

    const editTask = (index) => {
        setTaskInput(tasks[index])
        setEditMode(true)
        setEditIndex(index)
        setShowEditModal(true)
    }

    const confirmEdit = () => {
        addTask()
        setShowEditModal(false)
    }

    const cancelEdit = () => {
        setShowEditModal(false)
        setTaskInput('')
        setEditMode(false)
        setEditIndex(null)
    }

    return (
        <div className="todo-list">
            <h1>To Do List</h1>
            <div className="task-input">
                <input
                    type="text"
                    placeholder="Do..."
                    value={taskInput}
                    onChange={(e) => setTaskInput(e.target.value)}
                />
                <button onClick={addTask}>{editMode ? 'Редактировать' : 'Добавить'}</button>
            </div>
            <ul className="tasks">
                {tasks.map((task, index) => (
                    <li key={index}>
                        {task}
                        <div>
                            <button onClick={() => editTask(index)}>Редактировать</button>
                            <button onClick={() => deleteTask(index)}>Удалить</button>
                        </div>
                    </li>
                ))}
            </ul>

            {showEditModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Редактировать</h2>
                        <input
                            type="text"
                            value={taskInput}
                            onChange={(e) => setTaskInput(e.target.value)}
                        />
                        <button onClick={confirmEdit}>Сохранить</button>
                        <button onClick={cancelEdit}>Отмена</button>
                    </div>
                </div>
            )}

            {showDeleteModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Подтвердите удаление</h2>
                        <p>Вы действительно хотите удалить?</p>
                        <button onClick={confirmDelete}>Да</button>
                        <button onClick={cancelDelete}>Нет</button>
                    </div>
                </div>
            )}
        </div>
    )
}

function App() {
    return (
        <div className="App">
            <TodoList />
        </div>
    )
}

export default App
