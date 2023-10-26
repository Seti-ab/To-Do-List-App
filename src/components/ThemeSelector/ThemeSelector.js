import React from "react";
import styles from "../CustomSelect/CustomSelect.module.scss";
import CustomSelect from "../CustomSelect/CustomSelect";

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
    <CustomSelect
      onChange={handleThemeChange}
      options={options}
      name="theme"
    />
  );
};

export default ThemeSelector;
