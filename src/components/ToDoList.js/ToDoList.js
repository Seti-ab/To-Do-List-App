import React, { useEffect, useReducer, useState } from 'react';
import styles from "./ToDoList.module.scss";
import Task from '../Task/Task';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import toFarsiNumber from '../../utils/toFarsiNumber';
import { useTranslation } from 'react-i18next';

const ToDoList = ({ locale }) => {
    const { t } = useTranslation("");

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

    const handleNewTaskAdd = (e) => {
        setNewTask(e.target.value);
        setError({ ...error, show: false })
    }

    const isValid = newTask.length >= 3 && newTask.length <= 255;
    const handleSubmit = (e) => {
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
            setError({ show: true, message: t("input_must_be_at_least_3_characters") });
        } else if (newTask.length > 250) {
            setError({ show: true, message: t("input_cant_be_more_than_250_characters") });

        } else {
            setError({ ...error, show: false })
        }
    }

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks])
    
    return (
        <>
            <div className={styles.background} onClick={() => setError({ ...error, show: false })}></div>
            <div
                className={styles.contentContainer + " "
                    + (locale === "fa" ? styles.farsiToDoListContainer : "") + " "
                    + (error.show ? styles.errorBox : "")}>
                <form onSubmit={handleSubmit}>
                    <h1>{t('to_do_list')}</h1>
                    <label>
                        <input
                            type='text'
                            value={newTask}
                            onChange={handleNewTaskAdd}
                            placeholder={t('things_i_have_to_do')} />
                        {isValid && <button type='submit'><FontAwesomeIcon icon={faPlus} /></button>}
                    </label>
                </form>

                <p className={styles.errorMessage + " " + (error.show ? styles.showError : styles.hideError)}>{error.message}</p>
                <ul className={styles.list}>
                    {tasks?.map((task, index) => (
                        task.done === false && <Task task={task} dispatch={dispatch} key={task.id} index={locale === "fa" ? toFarsiNumber(index + 1) : index + 1} />
                    ))}
                    {tasks?.map((task, index) => (
                        task.done === true && <Task task={task} dispatch={dispatch} key={task.id} index={locale === "fa" ? toFarsiNumber(index + 1) : index + 1} />
                    ))}
                </ul>
            </div>
        </>
    )
}

export default ToDoList