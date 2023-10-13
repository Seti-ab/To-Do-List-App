import React, { useEffect, useRef, useState } from "react";
import styles from "./Task.module.scss";
import {
  faCheck,
  faPenToSquare,
  faSquareCheck,
  faSquareMinus,
  faTrash,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Task = ({ task, dispatch, index }) => {
  const [editMode, setEditMode] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const newRef = useRef(null);

  const handleConfirmEdit = () => {
    dispatch({ type: "edit", payload: { title: editedTitle, id: task.id } });
    setEditMode(false);
  };

  const handleOutsideClick = (e) => {
    if (newRef.current && !newRef.current.contains(e.target)) {
      setEditMode(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  })


  return (
    <li
      className={styles.task + " " + (task.done && styles.taskDone)}
      ref={newRef}
    >
      {editMode === false ? (
        <>
          <div className={styles.title}>
            <span>{index + 1}.</span>
            <p onClick={() => setEditMode(true)}>{task?.title}</p>
          </div>
          <div className={styles.actions}>
            <button
              onClick={() =>
                dispatch({ type: "toggle", payload: { id: task?.id } })
              }
            >
              {task.done === false ? (
                <FontAwesomeIcon icon={faSquareCheck} />
              ) : (
                <FontAwesomeIcon icon={faSquareMinus} />
              )}
            </button>
            <button onClick={() => setEditMode(true)}>
              <FontAwesomeIcon icon={faPenToSquare} />
            </button>
            <button
              onClick={() =>
                dispatch({ type: "delete", payload: { id: task.id } })
              }
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        </>
      ) : (
        <>
          <div className={styles.title}>
            <span>{index + 1}.</span>
            <form onSubmit={handleConfirmEdit} className={styles.editingForm}>
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
              />
            </form>
          </div>
          <div className={styles.actions}>
            <button onClick={() => setEditMode(false)}>
              <FontAwesomeIcon icon={faXmark} />
            </button>
            <button type="submit" onClick={handleConfirmEdit}>
              <FontAwesomeIcon icon={faCheck} />
            </button>
          </div>
        </>
      )}
    </li>
  );
};

export default Task;
