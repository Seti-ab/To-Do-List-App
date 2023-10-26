import React from 'react'

const ThemeSelector = () => {
    const options = [
        { value: 'default', label: "Default"},
        { value: 'dark', label: "Dark" },
        { value: 'light', label: "Light" },
    ];

    return (
        <div className={styles.container}>
            <form>
                <Select
                    onChange={handleLanguageChange}
                    options={options}
                    isSearchable={false}
                    defaultValue={options.find(option => option.value === localStorage.getItem("theme")) || options[0]}
                    styles={customStyles}
                    menuIsOpen
                />
            </form>
        </div >
    )
}

export default ThemeSelector