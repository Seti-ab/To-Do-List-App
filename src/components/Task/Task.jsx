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
import TitledButton from "../TitledButton/TitledButton";
import { useTranslation } from "react-i18next";

const Task = ({ task, dispatch, index, error, setError }) => {
  const { t } = useTranslation();
  const [editMode, setEditMode] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [deleted, setDeleted] = useState();

  const newRef = useRef(null);

  const isValid = editedTitle.length >= 3 && editedTitle.length <= 255;
  const handleEditConfirm = (e) => {
    e.preventDefault();
    if (isValid) {
      dispatch({ type: "edit", payload: { title: editedTitle, id: task.id } });
      setEditMode(false);
    }
    if (editedTitle.length < 3) {
      setError({ show: true, message: "input_must_be_at_least_3_characters" });
    } else if (editedTitle.length > 250) {
      setError({
        show: true,
        message: "input_cant_be_more_than_250_characters",
      });
    } else {
      setError({ ...error, show: false });
    }
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (newRef.current && !newRef.current.contains(e.target)) {
        setEditMode(false);
        setError({ ...error, show: false });
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleUndoEdit = () => {
    setEditedTitle(task.title);
    setError({ ...error, show: false });
  };
  const handleTaskDelete = () => {
    setDeleted(true);
    setTimeout(() => {
      dispatch({ type: "delete", payload: { id: task.id } });
    }, [300]);
  };
  return (
    <li
      className={
        styles.task +
        " " +
        (task.done ? styles.taskDone : "") +
        " " +
        (deleted ? styles.taskDeleted : "")
      }
      ref={newRef}
    >
      {editMode === false ? (
        <>
          <div className={styles.title} onClick={() => setEditMode(true)}>
            <span>{index}.</span>
            <p>{task?.title}</p>
          </div>
          <div className={styles.actions}>
            <TitledButton text={task.done ? t("undone") : t("done")}>
              <button
                onClick={() =>
                  dispatch({ type: "toggle", payload: { id: task.id } })
                }
              >
                {task.done === false ? (
                  <FontAwesomeIcon icon={faSquareCheck} />
                ) : (
                  <FontAwesomeIcon icon={faSquareMinus} />
                )}
              </button>
            </TitledButton>
            <TitledButton text={t("edit")}>
              <button onClick={() => setEditMode(true)}>
                <FontAwesomeIcon icon={faPenToSquare} />
              </button>
            </TitledButton>
            <TitledButton text={t("delete")}>
              <button onClick={handleTaskDelete}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </TitledButton>
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
                <button
                  type="button"
                  className={styles.undoButton}
                  onClick={handleUndoEdit}
                >
                  <FontAwesomeIcon icon={faRotateLeft} />
                </button>
              )}
            </form>
          </div>
          <div className={styles.actions + " " + styles.editingButtons}>
            <TitledButton text={t("confirm")}>
              <button type="submit" onClick={handleEditConfirm}>
                <FontAwesomeIcon icon={faCheck} />
              </button>
            </TitledButton>
            <TitledButton text={t("cancel")}>
              <button onClick={() => setEditMode(false)}>
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </TitledButton>
          </div>
        </>
      )}
    </li>
  );
};

export default Task;
