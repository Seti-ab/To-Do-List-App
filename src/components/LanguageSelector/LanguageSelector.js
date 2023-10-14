import React from 'react'
import styles from "./LanguageSelector.module.scss";

const LanguageSelector = ({lcoale,setLocale}) => {

    const handleLanguageChange = (e) => {
        setLocale(e.target.value);
    }

    return (
        <div styles={styles.container}>
            <form>
                <select value={lcoale} onChange={handleLanguageChange}>
                    <option value="en">English</option>
                    <option value="fa">Farsi</option>
                </select>
            </form>
        </div>
    )
}

export default LanguageSelector