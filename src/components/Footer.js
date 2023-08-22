import { useContext } from "react"

import { DarkLightModeContext } from "../utils/Contexts"


const Footer = () => {
    const {darkMode} = useContext(DarkLightModeContext)

    return (
        <footer className={`${darkMode ? "dark-mode":""}`}>
            <p>Programmed by a Dog Enterprises 2023</p>
            <p>Woof woof, woof woof woof 2023</p>
        </footer>
    )
}

export default Footer