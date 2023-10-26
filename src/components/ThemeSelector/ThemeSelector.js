import React from "react";
import Select from "react-select";
import styles from "./ThemeSelector.module.scss";

const customStyles = {
  control: (baseStyles) => ({
    ...baseStyles,
    width: "100px",
    padding: "2px",
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
  singleValue:(baseStyles)=>({
    ...baseStyles,
    color:"var(--tertiary_color)",
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

const ThemeSelector = ({ setTheme }) => {
  const options = [
    {
      value: "default",
      label: (
        <div className={styles.options}>
          <span className={styles.themePreview + " " + styles.default}></span>
          Default
        </div>
      ),
    },
    {
      value: "dark",
      label: (
        <div className={styles.options}>
          <span className={styles.themePreview + " " + styles.dark}></span>
          Dark
        </div>
      ),
    },
    {
      value: "light",
      label: (
        <div className={styles.options}>
          <span className={styles.themePreview + " " + styles.light}></span>
          Light
        </div>
      ),
    },
  ];

  const handleThemeChange = (selected) => {
    setTheme(selected.value);
    localStorage.setItem("theme", selected.value);
  };

  return (
    <div className={styles.container}>
      <form>
        <Select
          onChange={handleThemeChange}
          options={options}
          isSearchable={false}
          defaultValue={
            options.find(
              (option) => option.value === localStorage.getItem("theme")
            ) || options[0]
          }
          styles={customStyles}
          menuIsOpen
        />
      </form>
    </div>
  );
};

export default ThemeSelector;
