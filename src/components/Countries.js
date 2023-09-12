import { useContext } from "react"

import CountryCard from "./CountryCard"
import { DarkLightModeContext } from "../utils/Contexts"

function Countries({displayedCountries, loading, handleComparison}) {
    const {darkMode} = useContext(DarkLightModeContext)
    let countrycards

    if (displayedCountries.length === 0 && !loading){
        countrycards = 
            <div>
                <p>Unable to find anything that meets your filters or search criteria</p>
            </div>
    } else {
        countrycards = displayedCountries.map((country)=>{
            return(
                <CountryCard 
                    key={Math.random()}
                    flag={country.flags.svg}
                    flagAlt={country.flags.alt}
                    name={country.name.common}
                    population={country.population}
                    region={country.region}
                    capital={country.capital}
                    code={country.cca3}
                    comparison={country.compare}
                    handleComparison={handleComparison}
                />
            )
        })
    }

    return (
        <section className={`countries-grid ${darkMode ? "dark-mode" : ""}`}>
            {countrycards}
        </section>
    );
  }
  
  export default Countries;
  