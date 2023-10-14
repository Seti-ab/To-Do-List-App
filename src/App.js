import ToDoList from './components/ToDoList.js/ToDoList';
import "./App.scss"
import LanguageSelector from './components/LanguageSelector/LanguageSelector';
import { useState } from 'react';

function App() {
  const [locale, setLocale] = useState("en");
  return (
    <div className="App">
      <div className="languageSelector">
        <LanguageSelector locale={locale} setLocale={setLocale} />
      </div>
      <ToDoList locale={locale} />
    </div>
  );
}

export default App;
