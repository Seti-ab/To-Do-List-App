import ToDoList from "./components/ToDoList.js/ToDoList";
import "./App.scss";
import LanguageSelector from "./components/LanguageSelector/LanguageSelector";
import { useState } from "react";

function App() {
  const [locale, setLocale] = useState(localStorage.getItem("locale"));
  const [theme, setTheme] = useState();
  
  return (
    <div className="App" data-theme="dark">
      <LanguageSelector locale={locale} setLocale={setLocale} />
      <ToDoList locale={locale} />
    </div>
  );
}

export default App;
