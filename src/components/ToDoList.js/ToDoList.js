import React, { useEffect, useReducer, useState } from 'react';
import styles from "./ToDoList.module.scss";
import Task from '../Task/Task';

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
            case "toggle":
                return tasks.map(task => {
                    if (task.id === action.payload.id) {
                        return {
                            ...task,
                            done: !task.done
                        }
                    }
                    return task
                })
            case "delete":
                return tasks.filter(task => task.id !== action.payload.id)
            case "edit":
                return tasks.map(task=>{
                    if(task.id===action.payload.id){
                        return {
                            ...task,
                            title:action.payload.title
                        }
                    }
                    return task;
                })

            default:
                return tasks;

        }
    }
    const initialTasks = JSON.parse(sessionStorage.getItem("tasks"));
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
    }
    console.log("tasks", tasks)
    useEffect(() => {
        sessionStorage.setItem("tasks", JSON.stringify(tasks));
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
                    return <Task task={task} dispatch={dispatch} key={task.id} index={index} />
                })}
            </ul>

        </div>
    )
}

export default ToDoList