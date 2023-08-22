import CountryCard from "./CountryCard"

function Countries({countries, loading}) {
    let countrycards = ""
    if (countries.length === 0 && !loading){
        countrycards = 
            <div>
                <p>Unable to find anything that meets your filters</p>
            </div>
    } else {
        countrycards = countries.map((country)=>{
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
                />
            )
        })
    }

    return (
        <section id="countries-grid">
            {countrycards}
        </section>
    );
  }
  
  export default Countries;
  