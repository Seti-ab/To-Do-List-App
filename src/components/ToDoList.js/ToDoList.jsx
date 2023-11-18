import React, { useEffect, useReducer, useRef, useState } from "react";
import styles from "./ToDoList.module.scss";
import Task from "../Task/Task";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEraser,
  faListCheck,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import toFarsiNumber from "../../utils/toFarsiNumber";
import { useTranslation } from "react-i18next";
import { saveAs } from "file-saver";
import Modal from "../Modal/Modal";
import ImportButton from "../ImportButton/ImportButton";
import ExportButton from "../ExportButton/ExportButton";
import SmallButton from "../SmallButton/SmallButton";
import Tooltip from "../Tooltip/Tooltip";

const ToDoList = ({ locale }) => {
  const reducer = (tasks, action) => {
    switch (action.type) {
      case "add":
        return [
          ...tasks,
          {
            id: Date.now() + "-" + action.payload.title,
            title: action.payload.title,
            done: action.payload.done || false,
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
      case "deleteAll":
        return [];
      case "checkAll":
        return tasks.map((task) => {
          return {
            ...task,
            done: true,
          };
        });
      case "uncheckAll":
        return tasks.map((task) => {
          return {
            ...task,
            done: false,
          };
        });
      default:
        return tasks;
    }
  };
  //states and other hooks
  const initialTasks = JSON.parse(localStorage.getItem("tasks") || null);
  const [tasks, dispatch] = useReducer(reducer, initialTasks || []);
  const [newTask, setNewTask] = useState("");
  const [error, setError] = useState({
    show: false,
    message: "",
  });
  const [showConfirmationModal, setShowConfirmationModal] = useState({
    import: false,
    deleteAll: false,
  });
  const [importedtasks, setImportedtasks] = useState([]);
  const [doneAll, setDoneAll] = useState(false);

  const { t } = useTranslation("");
  const importFileRef = useRef(null);

  //functions
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

  //export tasks to a .txt file
  const handleExportToFile = () => {
    const savingFormat = tasks.map((task, index) => {
      return `${task.done ? "✓" : ""}${
        locale === "fa" ? toFarsiNumber(index + 1) : index + 1
      } . ${task.title}\n`;
    });
    const file = new Blob(savingFormat, { type: "text/plain;charset=utf-8" });
    saveAs(file, "myTasks.txt");
  };

  //import tasks from a .txt file
  const handleImportFromFile = async (e) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target.result;
      let temp = text.split("\n").map((string) => {
        let tempTask = {};
        if (string.charAt(0) === "✓") {
          tempTask.done = true;
        }
        tempTask.title = string.replace(
          /✓|[\u06F0-\u06F90-9]|[0-9]{1,2}| {0,}\. {0,}/g,
          ""
        );
        return tempTask;
      });
      //remove empty element
      setImportedtasks(temp.filter((t) => t.title));
    };
    reader.readAsText(e.target.files[0]);
    setShowConfirmationModal({ import: true, deleteAll: false });
  };

  const handleModalClose = () => {
    setShowConfirmationModal({ import: false, deleteAll: false });
    handleClearImportedFile();
  };

  const handleConfirmImport = () => {
    importedtasks.forEach((task) => {
      dispatch({
        type: "add",
        payload: { title: task.title, done: task.done },
      });
    });
    setShowConfirmationModal({ import: false, deleteAll: false });
    setImportedtasks([]);
    handleClearImportedFile();
  };

  const handleClearImportedFile = () => {
    if (importFileRef.current) {
      importFileRef.current.value = "";
      importFileRef.current.type = "text";
      importFileRef.current.type = "file";
    }
  };

  const handleConfirmDelete = () => {
    setShowConfirmationModal({ import: false, deleteAll: true });
  };
  const handleDeleteAllTasks = () => {
    dispatch({ type: "deleteAll" });
    setShowConfirmationModal({ import: false, deleteAll: false });
  };

  const handleToggleCheck = () => {
    setDoneAll(!doneAll);
    doneAll===true ? dispatch({ type: "uncheckAll" }) : dispatch({ type: "checkAll" });
  };

  return (
    <>
      <div
        className={styles.topBarContainer}>
        <div>
          <SmallButton handleClick={handleConfirmDelete}>
            <FontAwesomeIcon icon={faEraser} />
            <Tooltip text={t("delete_all")} place="right" />
          </SmallButton>
          <SmallButton handleClick={handleToggleCheck}>
            <FontAwesomeIcon icon={faListCheck} />
            <Tooltip text={t(doneAll ? "uncheck_all": "check_all")} place="right" />

          </SmallButton>
        </div>
        <div>
          <ImportButton
            handleChange={handleImportFromFile}
            importFileRef={importFileRef}
          />
          <ExportButton handleClick={handleExportToFile} />
        </div>
      </div>
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
        style={
          Object.values(showConfirmationModal).find((modal) => modal === true)
            ? { zIndex: 5 }
            : {}
        }
      >
        <Modal
          show={showConfirmationModal.import}
          text={t("import_file_confiramation")}
          handleClose={() => handleModalClose()}
          handleConfirm={() => handleConfirmImport()}
          actions
        />
        <Modal
          show={showConfirmationModal.deleteAll}
          text={t("delete_all_confiramation")}
          handleClose={() => handleModalClose()}
          handleConfirm={() => handleDeleteAllTasks()}
          actions
        />

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
