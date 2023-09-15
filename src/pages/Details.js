import { useState, useEffect, useContext } from "react"
import { Link, useParams, useLocation } from "react-router-dom"
import {BsArrowLeft} from "react-icons/bs"

import { CountriesContext } from "../utils/Contexts"
import { capitalise } from "../utils/sharedFunctions"
import blankCoatOfArms from "../images/BlankCoatOfArms.png"
import "./styles.css"

function Details () {
    let location = useLocation()
    const {countryCode} = useParams()
    const [loading, setLoading] = useState(true)
    const [countryData, setCountryData] = useState({})
    const {countriesData} = useContext(CountriesContext)

    //Make API call on launch and set response to countriesData. This also makes it so that the API is only called on page load.
    useEffect(() => {
            const chosenCountry = countriesData.find((country)=>country["cca3"] === countryCode)
            setCountryData(chosenCountry);
            setLoading(false)         
    }, [location])

    return !loading ? (
        <article>
            <Link className="back-link" to="/countries"><BsArrowLeft className="back-arrow"/>Back</Link>
            <div className="all-content-container">
                <div className="details-title-container">
                    <h1 className="country-title">{countryData.name.common}</h1>
                    <Link to={countryData.maps.googleMaps} target="_blank" className="country-title-location">Visit on Google Maps</Link>
                </div>  
                <div className="details-image-container">
                    <img className="details-flag" src={countryData.flags.svg} alt={countryData.flags.alt}/>
                    {countryData.coatOfArms.svg ? 
                    <img className="details-coat-of-arms" src={countryData.coatOfArms.svg} alt={`Coat of arms for ${countryData.name.common}`}/> :
                     <div className="details-coat-of-arms-no-arms">
                        <img className="details-coat-of-arms" src={blankCoatOfArms} alt={"This country does not have an official coat of arms."}/>
                        <p>This country does not have an official coat of arms.</p>
                    </div>}
                    <h3>Flag</h3>
                    <h3>Coat of Arms</h3>
                </div>
                <div className="main-details-wrapper">
                    <div className="country-details-wrapper">

                            <p className="details-text-title-l">Native Name: </p>
                            {<p className="details-text-l">{Object.keys(countryData.name.nativeName)[0] ? countryData.name.nativeName[Object.keys(countryData.name.nativeName)[0]].official : "There is no official native name for this country."}</p>}
                            <p className="details-text-title-r">Driving Side: </p>
                            <p className="details-text-r">
                                {capitalise(countryData.car.side)}
                                </p>
                            <p className="details-text-title-l">Population: </p>
                            <p className="details-text-l">{countryData.population.toLocaleString("en-US")}</p>
                            <p className="details-text-title-r">Top Level Domain: </p>
                            <p className="details-text-r">{countryData.tld}</p>
                            <p className="details-text-title-l">Area: </p>
                            <p className="details-text-l">{countryData.area.toLocaleString("en-US")} km<sup>2</sup></p>
                            <p className="details-text-title-r">Currencies: </p>
                            <p className="details-text-r">{Object.keys(countryData.currencies).map((curr)=>`${countryData.currencies[curr].name} (${countryData.currencies[curr].symbol})`).join(", ")}</p>
                            <p className="details-text-title-l">Region: </p>
                            <p className="details-text-l">{countryData.region}</p>
                            <p className="details-text-title-r">Languages: </p>
                            <p className="details-text-r">{Object.keys(countryData.languages).map((lang)=>`${countryData.languages[lang]}`).join(", ")}</p>
                            <p className="details-text-title-l">Sub-region: </p>
                            <p className="details-text-l">{countryData.subregion}</p>
                            <p className="details-text-title-r">UN Member? </p>
                            <p className="details-text-r">{countryData.unMember ? "Yes" : "No"}</p>
                            <p className="details-text-title-l">Capital: </p>
                            <p className="details-text-l">{countryData.capital.map((cap)=>`${cap}`).join(", ")}</p>
                            <p className="details-text-title-r">Landlocked? </p>
                            <p className="details-text-r">{countryData.landlocked ? "Yes": "No"}</p>

                    </div>

                    <div className="border-div">
                        <p className="border-text-title">Borders: </p>
                            
                        {countryData.borders.length !==0 ? 
                        <div className="border-list">
                            {countryData.borders.map((bor)=>{
                                const targetCountry = countriesData.find((country)=>country["cca3"] === bor)
                                const targetCountryName = targetCountry.name.common
                                return (
                                    <Link key={Math.random()} to={`/countries/${bor}`}className="border-chip">{targetCountryName}</Link>
                                    )
                                })} 
                        </div> : <p>None</p>}
                    </div>

                </div>
            </div>
        </article>
    ) : "LOADING PLEASE WAIT"
}

export default Details