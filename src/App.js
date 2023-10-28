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

  return (
    <div className="App" data-theme={theme}>
      <LanguageSelector setLocale={setLocale} />
      <ToDoList locale={locale} />
      <ThemeSelector setTheme={setTheme} />
    </div>
  );
}

export default App;
