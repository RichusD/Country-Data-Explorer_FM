import { motion } from "framer-motion"
import { filterVariants } from "../utils/animationVariants"

import CountryCard from "./CountryCard"


function Countries({displayedCountries, handleComparison}) {
    let countrycards

    if (displayedCountries.length === 0){
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
        <motion.section layout className="countries-grid">
            {countrycards}
        </motion.section>
    );
  }
  
  export default Countries;
  