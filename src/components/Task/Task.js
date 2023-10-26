import React, { useEffect, useRef, useState } from "react";
import styles from "./Task.module.scss";
import {
  faCheck,
  faPenToSquare,
  faRotateLeft,
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

  const handleEditConfirm = () => {
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
  });

  const handleUndoEdit = () => {
    setEditedTitle(task.title);
  };

  return (
    <li
      className={styles.task + " " + (task.done ? styles.taskDone : "")}
      ref={newRef}>
      {editMode === false ? (
        <>
          <div className={styles.title} onClick={() => setEditMode(true)}>
            <span>{index}.</span>
            <p>{task?.title}</p>
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
            <span>{index}.</span>
            <form onSubmit={handleEditConfirm} className={styles.editingForm}>
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
              />
              {editedTitle !== task.title && (
                <button type="button" className={styles.undoButton} onClick={handleUndoEdit}>
                  <FontAwesomeIcon icon={faRotateLeft} />
                </button>
              )}
            </form>
          </div>
          <div className={styles.actions + " " + styles.editingButtons}>
            <button onClick={() => setEditMode(false)}>
              <FontAwesomeIcon icon={faXmark} />
            </button>
            <button type="submit" onClick={handleEditConfirm}>
              <FontAwesomeIcon icon={faCheck} />
            </button>
          </div>
        </>
      )}
    </li>
  );
};

export default Task;
