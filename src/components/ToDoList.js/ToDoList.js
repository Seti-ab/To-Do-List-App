import React, { useEffect, useReducer, useState } from "react";
import styles from "./ToDoList.module.scss";
import Task from "../Task/Task";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faPlus } from "@fortawesome/free-solid-svg-icons";
import toFarsiNumber from "../../utils/toFarsiNumber";
import { useTranslation } from "react-i18next";
import { saveAs } from 'file-saver';

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
          },
        ];
      case "toggle":
        return tasks.map((task) => {
          if (task.id === action.payload.id) {
            return {
              ...task,
              done: !task.done,
            };
          }
          return task;
        });
      case "delete":
        return tasks.filter((task) => task.id !== action.payload.id);
      case "edit":
        return tasks.map((task) => {
          if (task.id === action.payload.id) {
            return {
              ...task,
              title: action.payload.title,
            };
          }
          return task;
        });

      default:
        return tasks;
    }
  };
  const initialTasks = JSON.parse(localStorage.getItem("tasks") || null);
  const [tasks, dispatch] = useReducer(reducer, initialTasks || []);
  const [newTask, setNewTask] = useState("");
  const [error, setError] = useState({
    show: false,
    message: "",
  });

  const handleNewTaskAdd = (e) => {
    setNewTask(e.target.value);
    setError({ ...error, show: false });
  };

  const isValid = newTask.length >= 3 && newTask.length <= 255;
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      dispatch({
        type: "add",
        payload: {
          title: newTask,
        },
      });
      setNewTask("");
      setError({ ...error, show: false });
    } else if (newTask.length < 3) {
      setError({ show: true, message: "input_must_be_at_least_3_characters" });
    } else if (newTask.length > 250) {
      setError({
        show: true,
        message: "input_cant_be_more_than_250_characters",
      });
    } else {
      setError({ ...error, show: false });
    }
  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleSaveAsFile = () => {
    const savingFormat = tasks.map((task, index) => {
      return `${(locale === "fa" ? toFarsiNumber(index + 1) : index + 1)} . ${task.title}\n`
    })
    const file = new Blob(savingFormat, { type: 'text/plain;charset=utf-8' });
    saveAs(file, 'myTasks.txt');
  }

  return (
    <>
      <button title="Save as txt" className={styles.saveButton} onClick={handleSaveAsFile}>
        <FontAwesomeIcon icon={faDownload} />
      </button>
      <div
        className={styles.background}
        onClick={() => setError({ ...error, show: false })}
      ></div>
      <div
        className={
          styles.contentContainer +
          " " +
          (locale === "fa" ? styles.farsiToDoListContainer : "") +
          " " +
          (error.show ? styles.errorBox : "")
        }
      >
        <form onSubmit={handleSubmit}>
          <h1>{t("to_do_list")}</h1>
          <label>
            <input
              type="text"
              value={newTask}
              onChange={handleNewTaskAdd}
              placeholder={t("things_i_have_to_do")}
            />
            {isValid && (
              <button type="submit">
                <FontAwesomeIcon icon={faPlus} />
              </button>
            )}
          </label>
        </form>

        <p
          className={
            styles.errorMessage +
            " " +
            (error.show ? styles.showError : styles.hideError)
          }
        >
          {t(error.message)}
        </p>
        <ul className={styles.list}>
          {tasks
            ?.sort((x, y) => (x.done === y.done ? 0 : x.done ? 1 : -1))
            .map((task, index) => (
              <Task
                task={task}
                dispatch={dispatch}
                key={task.id}
                error={error}
                setError={setError}
                index={locale === "fa" ? toFarsiNumber(index + 1) : index + 1}
              />
            ))}
        </ul>
      </div>

    </>
  );
};

export default ToDoList;
