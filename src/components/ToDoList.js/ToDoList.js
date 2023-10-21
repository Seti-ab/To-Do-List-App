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
    const [error, setError] = useState({
        show: false,
        message: ""
    });

    const addNewTaskHandler = (e) => {
        setNewTask(e.target.value);
        setError({ ...error, show: false })
    }

    const isValid = newTask.length >= 3 && newTask.length <= 255;
    const submitHandler = (e) => {
        e.preventDefault();
        if (isValid) {
            dispatch({
                type: "add",
                payload: {
                    title: newTask
                }
            })
            setNewTask("");
            setError({ ...error, show: false });

        } if (newTask.length < 3) {
            setError({ show: true, message: "Input must be at least 3 characters." });
        } else if (newTask.length > 250) {
            setError({ show: true, message: "Input can't be more than 250 characters." });

        } else {
            setError({ ...error, show: false })
        }
    }

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
        localStorage.setItem("locale", locale);
        // return () => {

        // }

    }, [tasks, locale])

    return (
        <>
            <div className={styles.background} onClick={() => setError({ ...error, show: false })}></div>
            <div
                className={styles.contentContainer + " "
                    + (locale === "fa" ? styles.farsiToDoListContainer : "") + " "
                    + (error.show ? styles.errorBox : "")}>
                <form onSubmit={submitHandler}>
                    <h1>{locale === "fa" ? "لیست کارها" : "TO-DO List"}</h1>
                    <label>
                        <input
                            type='text'
                            value={newTask}
                            onChange={addNewTaskHandler}
                            placeholder={locale === "fa" ? "کارایی که باید انجام بدم..." : "Things i have to do..."} />
                        {isValid && <button type='submit'><FontAwesomeIcon icon={faPlus} /></button>}
                    </label>
                </form>
                <p className={styles.errorMessage + " " + (error.show ? styles.showError : styles.hideError)}>{error.message}</p>
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
        </>
    )
}

export default ToDoList