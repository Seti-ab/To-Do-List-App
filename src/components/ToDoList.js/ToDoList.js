import React, { useEffect, useReducer, useState } from 'react';
import styles from "./ToDoList.module.scss";

const ToDoList = () => {

    const reducer = (tasks, action) => {
        switch (action.type) {
            case "add":
                return [
                    ...tasks,
                    {
                        id: Date.now(),
                        title: action.payload.title,
                        done: false,
                    }
                ]
            default:
                return tasks;

        }
    }
    const initialTasks = JSON.parse(localStorage.getItem("tasks"));
    const [tasks, dispatch] = useReducer(reducer, initialTasks || [])
    const [newTask, setNewTask] = useState("");
    const handleNewTaskChange = (e) => {
        setNewTask(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch({
            type: "add",
            payload: {
                title: newTask
            }
        })
        setNewTask("");
        console.log("input", tasks)
    }
    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
        return () => {

        }
    }, [tasks])

    return (
        <div className={styles.toDoListContainer}>
            <form onSubmit={handleSubmit}>
                <label>
                    <h1>TO-DO List</h1>
                    <input type='text' value={newTask} onChange={handleNewTaskChange} placeholder="What's on your mind?" />
                </label>
            </form>
            <ul className={styles.list}>
                {tasks?.map((task, index) => {
                    return (
                        <li className={styles.task} key={task.id}>
                            <span>{index + 1}.</span>
                            <p>{task.title}</p>
                        </li>
                    )
                })}
            </ul>

        </div>
    )
}

export default ToDoList