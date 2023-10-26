import React from 'react'
import styles from "./LanguageSelector.module.scss";
import Farsi from "../../assets/icons/iran.png";
import English from "../../assets/icons/united-kingdom.png";
import Select from 'react-select';
import i18n from '../../i18n';

const customStyles = {
    control: (baseStyles) => ({
        ...baseStyles,
        width: "fit-content",
        padding: "2px",
        cursor: "pointer",
        boxShadow: 'none',
        border: "0",
        backgroundColor: "var(--primary_light_color)"
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
        color: state.isSelected ? "var(--primary_color)" : "var(--tertiary_color) ",
        backgroundColor: state.isSelected ? "var(--secondary_color)" : "transparent",
    })
}
const LanguageSelector = ({ setLocale }) => {

    const handleLanguageChange = (selected) => {
        setLocale(selected.value);
        i18n.changeLanguage(selected.value);
        localStorage.setItem("locale", selected.value)
    }
    const options = [
        { value: 'en', label: <div className={styles.options}><img src={English} height="15px" width="15px" alt="en" />En </div> },
        { value: 'fa', label: <div className={styles.options}><img src={Farsi} height="15px" width="15px" alt="fa" />Fa </div> },
    ];

    return (
        <div className={styles.container}>
            <form>
                <Select
                    onChange={handleLanguageChange}
                    options={options}
                    isSearchable={false}
                    defaultValue={options.find(option => option.value === localStorage.getItem("locale")) || options[0]}
                    styles={customStyles}
                />
            </form>
        </div >
    )
}

export default LanguageSelector