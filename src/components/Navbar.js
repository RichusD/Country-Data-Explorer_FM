import moon from "../images/moon.png"
import { NavLink, useLocation} from "react-router-dom"
import { useContext, useEffect } from "react"

import { CountriesContext } from "../utils/Contexts"
import { DarkLightModeContext } from "../utils/Contexts"

let randomNum = 0

const Navbar = () => {
    const location = useLocation()
    const {countriesData} = useContext(CountriesContext)
    const {darkMode, setDarkMode} = useContext(DarkLightModeContext)

    useEffect(() => {
        randomNum = Math.floor(Math.random() * (countriesData.length +1))
    }, [location])


    return (
        <div className={`nav-container ${darkMode ? "dark-mode":""}`}>
            <h2 id="nav-title">Where in the world?</h2>
            <nav>
                <NavLink className="nav-link" to="/">Home</NavLink>
                <NavLink className="nav-link" to="/about">About</NavLink>
                <NavLink className="nav-link" to="/countries">Countries</NavLink>
                <NavLink className="nav-link" to={`/countries/${countriesData[randomNum]["cca3"]}`}>Random Country</NavLink>
            </nav>

            <button id="darkmode-button" onClick={()=>setDarkMode(!darkMode)}>
                <img id="moon-icon" src={moon} />
                <p>Dark Mode</p>
            </button>
        </div>
    )
}

export default Navbar