import { useState, useEffect, useContext } from "react"
import { Link, useParams, useLocation } from "react-router-dom"
import {BsArrowLeft} from "react-icons/bs"

import { CountriesContext } from "../utils/Contexts"
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
                <img className="details-flag" src={countryData.flags.svg} alt={countryData.flags.alt}/>
                <div className="main-details-wrapper">
                    <h2 id="country-title">{countryData.name.common}</h2>
                    <div className="country-details-wrapper">
                        <div className="left-details-wrapper">
                            <div className="detail-div"><p className="details-text-title">Native Name: </p><p className="details-text">{countryData.name.nativeName[Object.keys(countryData.name.nativeName)[0]].official}</p></div>
                            <div className="detail-div"><p className="details-text-title">Population: </p><p className="details-text">{countryData.population.toLocaleString("en-US")}</p></div>
                            <div className="detail-div"><p className="details-text-title">Region: </p><p className="details-text">{countryData.region}</p></div>
                            <div className="detail-div"><p className="details-text-title">Sub-region: </p><p className="details-text">{countryData.subregion}</p></div>
                        </div>
                        <div className="right-details-wrapper">
                            <div className="detail-div"><p className="details-text-title">Capital: </p><p className="details-text">{countryData.capital.map((cap)=>`${cap}`).join(", ")}</p></div>
                            <div className="detail-div"><p className="details-text-title">Top Level Domain: </p><p className="details-text">{countryData.tld}</p></div>
                            <div className="detail-div"><p className="details-text-title">Currencies: </p><p className="details-text">{Object.keys(countryData.currencies).map((curr)=>`${countryData.currencies[curr].name} (${countryData.currencies[curr].symbol})`).join(", ")}</p></div>
                            <div className="detail-div"><p className="details-text-title">Languages: </p><p className="details-text">{Object.keys(countryData.languages).map((lang)=>`${countryData.languages[lang].toString()}`).join(", ")}</p></div>
                        </div> 
                    </div>

                    <div className="border-div">
                        <p className="border-text-title">Borders: </p>
                        <div className="border-list">
                            {countryData.borders.length !==0 ? countryData.borders.map((bor)=>{
                                const targetCountry = countriesData.find((country)=>country["cca3"] === bor)
                                const targetCountryName = targetCountry.name.common
                                return (
                                    <Link key={Math.random()} to={`/countries/${bor}`}className="border-chip">{targetCountryName}</Link>
                                    )
                                }) : <p>None</p>}
                        </div>
                    </div>

                </div>
            </div>
        </article>
    ) : "LOADING PLEASE WAIT"
}

export default Details