import React from "react";
import Select from "react-select";
import styles from "./CustomSelect.module.scss";

const CustomSelect = (props) => {
  const customStyles = {
    control: (baseStyles) => ({
      ...baseStyles,
      width: props.name === "theme" ? "100px" : "fit-content",
      padding: "8px",
      cursor: "pointer",
      boxShadow: "none",
      border: "0",
      backgroundColor: "var(--primary_light_color)",
    }),
    menu: (baseStyles) => ({
      ...baseStyles,
      cursor: "pointer",
      color: "#222222",
      backgroundColor: "var(--primary_light_color)",
      marginTop: "4px",
    }),
    valueContainer: (baseStyles) => ({
      ...baseStyles,
      padding: "0 4px",
    }),
    indicatorsContainer: () => ({
      display: "none",
    }),
    singleValue: (baseStyles) => ({
      ...baseStyles,
      color: "var(--tertiary_color)",
    }),
    option: (baseStyles, state) => ({
      ...baseStyles,
      cursor: "pointer",
      color: state.isSelected
        ? "var(--primary_color)"
        : "var(--tertiary_color) ",
      backgroundColor: state.isSelected
        ? "var(--secondary_color)"
        : "transparent",
    }),
  };
  return (
    <div
      className={styles.container}
      style={props.name === "theme" ? { right: "8px" } : { left: "8px" }}
    >
      <form>
        <Select
          {...props}
          isSearchable={false}
          defaultValue={
            props.options.find(
              (option) => option.value === localStorage.getItem(props.name)
            ) || props.options[0]
          }
          styles={customStyles}
        />
      </form>
    </div>
  );
};

export default CustomSelect;
