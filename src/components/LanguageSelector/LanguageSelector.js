import React from 'react'
import styles from "./LanguageSelector.module.scss";
import Farsi from "../../assets/icons/iran.png";
import English from "../../assets/icons/united-kingdom.png";
import Select from 'react-select';

const LanguageSelector = ({ locale, setLocale }) => {

    const customStyles = {
        control: (baseStyles, state) => ({
            ...baseStyles,
            width: "fit-content",
            padding: "2px",
            cursor: "pointer",
            boxShadow: 'none',
            border: "0",
            height: "30px",
            backgroundColor:"#4D4C7D"
        }),
        menu: (baseStyles) => ({
            ...baseStyles,
            cursor: "pointer",
            color: "#222222",
            backgroundColor:"#4D4C7D",
            marginTop:"4px"
        }),
        valueContainer: (baseStyles, state) => ({
            ...baseStyles,
            height: "30px",
            padding: "0",
        }),

        input: (baseStyles) => ({
            ...baseStyles,
            margin:"0"
        }),
        indicatorsContainer: () => ({
            display: "none",
            height: "30px"
        }),
        option: (baseStyles, state) => ({
            ...baseStyles,
            cursor: "pointer",
            backgroundColor: state.isSelected ? "#ffad48" : "transparent"
        })
    }

    const handleLanguageChange = (selected) => {
        setLocale(selected.value);
    }
    const options = [
        { value: 'en', label: <div className={styles.options}><img src={English} height="15px" width="15px" />En </div> },
        { value: 'fa', label: <div className={styles.options}><img src={Farsi} height="15px" width="15px" />Fa </div> },
    ];
    console.log("locale", locale)

    return (
        <div className={styles.container}>
            <form>
                <Select
                    onChange={handleLanguageChange}
                    options={options}
                    isSearchable={false}
                    defaultValue={options[0]}
                    styles={customStyles}

                />
            </form>
        </div >
    )
}

export default LanguageSelector