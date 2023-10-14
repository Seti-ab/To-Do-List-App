import React from 'react'
import styles from "./LanguageSelector.module.scss";
import Farsi from "../../assets/icons/farsi.png";
import English from "../../assets/icons/english.png";
import Select from 'react-select';

const LanguageSelector = ({ locale, setLocale }) => {

    const handleLanguageChange = (selected) => {
        setLocale(selected);
    }
    const options = [
        { value: 'en', label: <div><img src={English} height="30px" width="30px" />English </div> },
        { value: 'fa', label: <div><img src={Farsi} height="30px" width="30px" />Farsi </div> },
    ];
    console.log("locale", locale)

    return (
        <div styles={styles.container}>
            <form>
                <Select
                    onChange={handleLanguageChange}
                    options={options}
                    isSearchable={false}
                    defaultValue={options[0]}
                />
            </form>
        </div >
    )
}

export default LanguageSelector