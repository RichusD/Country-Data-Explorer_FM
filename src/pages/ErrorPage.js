import { Link, useLocation} from "react-router-dom"
import { useContext, useEffect } from "react"
import sadWorld from "../images/sad-world.png"
import { CountriesContext } from "../utils/Contexts"

let randomNum = 0
    
function ErrorPage () {
    const location = useLocation()
    const {countriesData} = useContext(CountriesContext)
    
    useEffect(() => {
        randomNum = Math.floor(Math.random() * (countriesData.length +1))
    }, [location])
        
        



    return (
        <div className="error-container">
            <h1>404</h1>
            <h2>Page not found</h2>
            <img src={sadWorld} alt="Image of crying pixel art globe"/>
            <p className="error-wording">The page you're looking for could not be found!</p>
            <p className="error-tiny-wording">Sorry about that.</p>
            
            <p className="error-wording">Would you rather check out a  
                <Link className="error-random-link" to={`/countries/${countriesData[randomNum]["cca3"]}`}>random country</Link>
                  instead?
            </p>
        </div>
    )
}

export default ErrorPage