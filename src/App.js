import { useState } from "react";
import "./App.scss";
import LanguageSelector from "./components/LanguageSelector/LanguageSelector";
import ThemeSelector from "./components/ThemeSelector/ThemeSelector";
import ToDoList from "./components/ToDoList.js/ToDoList";

function App() {
  const [locale, setLocale] = useState(localStorage.getItem("locale"));
  const [theme, setTheme] = useState(localStorage.getItem("theme"));

  return (
    <div className="App" data-theme={theme}>
      <LanguageSelector setLocale={setLocale} />
      <ToDoList locale={locale} />
      <ThemeSelector setTheme={setTheme} />
    </div>
  );
}

export default App;
