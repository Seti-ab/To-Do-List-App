import { useEffect, useState } from "react";
import "./App.scss";
import LanguageSelector from "./components/LanguageSelector/LanguageSelector";
import ThemeSelector from "./components/ThemeSelector/ThemeSelector";
import ToDoList from "./components/ToDoList.js/ToDoList";

function App() {
  const [locale, setLocale] = useState();
  const [theme, setTheme] = useState();

  useEffect(() => {
    const localStorageLocale = localStorage.getItem("locale")
    const localStorageTheme = localStorage.getItem("theme");
    if (!localStorageLocale) {
      localStorage.setItem("locale", "en")
    }
    if (!localStorageTheme) {
      localStorage.setItem("theme", "default")
    }
    setLocale(localStorageLocale);
    setTheme(localStorageTheme);

  }, [])

  //top bar color for PWA
  useEffect(() => {
    switch (theme) {
      case "default":
      default:
        document.querySelector("meta[name='theme-color']").content = "#363062";
        break;
      case "dark":
        document.querySelector("meta[name='theme-color']").content = "#132043";
        break;
      case "light":
        document.querySelector("meta[name='theme-color']").content = "#fff2d8";
        break;
    }
  }, [theme])

  return (
    <div className="App" data-theme={theme}>
      <ToDoList locale={locale} />
      <div className="selectorsContainer">
        <LanguageSelector setLocale={setLocale} />
        <ThemeSelector setTheme={setTheme} />
      </div>
    </div>
  );
}

export default App;
