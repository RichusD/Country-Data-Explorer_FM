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

    /* I used location.pathname instead of just location here as I found that for some reason when I clicked on a country's comparison box
    it would cause it to run again. This caused some strange bugs and performance issues.*/
    useEffect(() => {
        randomNum = Math.floor(Math.random() * (countriesData.length +1))
        console.log(location)
    }, [location.pathname])


    return (
        <div className="nav-container" >
            <h2 className="nav-title">Where in the world?</h2>
            <nav>
                <NavLink className="nav-link" to="/">Home</NavLink>
                <NavLink className="nav-link" to="/countries">Countries</NavLink>
                <NavLink className="nav-link" to={`/countries/${countriesData[randomNum]["cca3"]}`}>Random Country</NavLink>
            </nav>

            <button className="dark-mode-button" onClick={()=>setDarkMode(!darkMode)}>
                <img className="moon-icon" src={moon} />
                <p>Dark Mode</p>
            </button>
        </div>
    )
}

export default Navbar