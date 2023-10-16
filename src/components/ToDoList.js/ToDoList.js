import React, { useEffect, useReducer, useState } from 'react';
import styles from "./ToDoList.module.scss";
import Task from '../Task/Task';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import toFarsiNumber from '../../utils/toFarsiNumber';

const ToDoList = ({ locale }) => {
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
                return tasks.map(task => {
                    if (task.id === action.payload.id) {
                        return {
                            ...task,
                            title: action.payload.title
                        }
                    }
                    return task;
                })

            default:
                return tasks;

        }
    }
    const initialTasks = JSON.parse(localStorage.getItem("tasks") || null);
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
    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
        localStorage.setItem("locale", locale);
        // return () => {

        // }
    }, [tasks, locale])

    return (
        <div className={styles.toDoListContainer + " " + (locale === "fa" ? styles.farsiToDoListContainer : "")} >
            <form onSubmit={handleSubmit}>
                <h1>{locale === "fa" ? "لیست کارها" : "TO-DO List"}</h1>
                <label>
                    <input type='text' value={newTask} onChange={handleNewTaskChange} placeholder={locale === "fa" ? "کارایی که باید انجام بدم..." : "Things i have to do..."} />
                    <button type='submit'><FontAwesomeIcon icon={faPlus} /></button>
                </label>
            </form>
            <ul className={styles.list}>
                {tasks?.map((task, index) => {
                    if (task.done === false) {
                        return <Task task={task} dispatch={dispatch} key={task.id} index={locale === "fa" ? toFarsiNumber(index + 1) : index + 1} />
                    }
                })}
                {tasks?.map((task, index) => {
                    if (task.done === true) {
                        return <Task task={task} dispatch={dispatch} key={task.id} index={locale === "fa" ? toFarsiNumber(index + 1) : index + 1} />
                    }
                })}
            </ul>

        </div>
    )
}

export default ToDoList