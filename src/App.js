import ToDoList from "./components/ToDoList.js/ToDoList";
import "./App.scss";
import LanguageSelector from "./components/LanguageSelector/LanguageSelector";
import { useState } from "react";
import ThemeSelector from "./components/ThemeSelector/ThemeSelector";

function App() {
  const [locale, setLocale] = useState(localStorage.getItem("locale"));
  const [theme, setTheme] = useState(localStorage.getItem("theme"));
  
  return (
    <div className="App" data-theme={theme}>
      <LanguageSelector locale={locale} setLocale={setLocale} />
      <ToDoList locale={locale} />
      <ThemeSelector theme={theme} setTheme={setTheme}/>
    </div>
  );
}

export default App;
