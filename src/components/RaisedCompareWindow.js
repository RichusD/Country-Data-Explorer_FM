import { useContext } from "react"
import { motion } from "framer-motion"

import "../pages/styles.css"
import { ComparedCountriesContext, CountriesContext } from "../utils/Contexts"
import { capitalise, populationDensityCalc, useClickOutside } from "../utils/sharedFunctions"
import blankCoatOfArms from "../images/BlankCoatOfArms.png"

function RaisedCompareWindow ({raiseCompareWindow, setRaiseCompareWindow}) {
    const {countriesData} = useContext(CountriesContext)
    const {comparedCountries} = useContext(ComparedCountriesContext)

    const compWindowRef = useClickOutside(() => {
        if (raiseCompareWindow){
            setRaiseCompareWindow(!raiseCompareWindow)
        }
        })



/* Encountered a weird error where if I used setRaiseCompareWindow(true) to set the raiseCompareWindow variable, it would work once and wouldn't
change again if a button did the opposite. I had to change setRaiseCompareWindow(true) to setRaiseCompareWindow(!raiseCompareWindow) for the
button to work. No idea why but a button that just used (false) would not work under any circumstances.*/
    return (
        <motion.div key={Math.random()}initial={{y:50, opacity:0}} animate={{y:0, opacity:1}} transition={{ease: "easeOut",type: "linear", duration:0.2}} exit={{y:50, opacity:0}}ref={compWindowRef} className="comparison-window-active">
            <h2 className="comparison-heading">Compare Countries</h2>
            <table className="comparison-table" >
                <thead>
                    <tr>
                        <th></th>
                        {comparedCountries.map((country)=>{
                            return (
                                <th>{country.name.common}</th>
                            )
                        })}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="comparison-table-first-column">Flag</td>
                        {comparedCountries.map((country)=>{
                            return (
                                <td key={Math.random()} data-cell={country.name.common}>
                                    <img className="comparison-flag" src={country.flags.png} alt={country.flags.alt}/>
                                    </td>
                            )
                        })}
                    </tr>
                    <tr>
                        <td className="comparison-table-first-column">Coat of Arms</td>
                        {comparedCountries.map((country)=>{
                            return (
                                <td className="coat-of-arms-cell" key={Math.random()} data-cell={country.name.common}>
                                    {country.coatOfArms.png ? 
                                    <img className="comparison-coat-of-arms" src={country.coatOfArms.png} alt={`Coat of arms for ${country.name.common}`}/> :
                                    <div className="comparison-coat-of-arms-no-arms">
                                        <img className="comparison-coat-of-arms" src={blankCoatOfArms} alt={"This country does not have an official coat of arms."}/>
                                        <p>This country does not have an official coat of arms.</p>
                                    </div>}

                                    </td>
                            )
                        })}
                    </tr>
                    <tr>
                        <td className="comparison-table-first-column">Population</td>
                        {comparedCountries.map((country)=>{
                            return (
                                <td key={Math.random()} data-cell={country.name.common}>{country.population.toLocaleString("en-US")}</td>
                            )
                        })}
                    </tr>
                    <tr>
                        <td className="comparison-table-first-column">Area</td>
                        {comparedCountries.map((country)=>{
                            return (
                                <td key={Math.random()} data-cell={country.name.common}>{country.area.toLocaleString("en-US")}  km<sup>2</sup></td>
                            )
                        })}
                    </tr>
                    <tr>
                        <td className="comparison-table-first-column">Population Density</td>
                        {comparedCountries.map((country)=>{
                            return (
                                <td key={Math.random()} data-cell={country.name.common}>{populationDensityCalc(country.population, country.area).toLocaleString("en-US")}/km<sup>2</sup></td>
                            )
                        })}
                    </tr>
                    <tr>
                        <td className="comparison-table-first-column">Region</td>
                        {comparedCountries.map((country)=>{
                            return (
                                <td key={Math.random()} data-cell={country.name.common}>{country.region}</td>
                            )
                        })}
                    </tr>
                    <tr>
                        <td className="comparison-table-first-column">Sub-Region</td>
                        {comparedCountries.map((country)=>{
                            return (
                                <td key={Math.random()} data-cell={country.name.common}>{country.subregion}</td>
                            )
                        })}
                    </tr>
                    <tr>
                        <td className="comparison-table-first-column">Capital</td>
                        {comparedCountries.map((country)=>{
                            return (
                                <td key={Math.random()} data-cell={country.name.common}>{country.capital.map((cap)=>`${cap}`).join(", ")}</td>
                            )
                        })}
                    </tr>
                    <tr>
                        <td className="comparison-table-first-column">Landlocked</td>
                        {comparedCountries.map((country)=>{
                            return (
                                <td key={Math.random()} data-cell={country.name.common}>
                                    {country.landlocked ? "Yes": "No"}
                                    </td>
                            )
                        })}
                    </tr>
                    <tr>
                        <td className="comparison-table-first-column">UN Member</td>
                        {comparedCountries.map((country)=>{
                            return (
                                <td key={Math.random()} data-cell={country.name.common}>
                                   {country.unMember ? "Yes" : "No"}
                                    </td>
                            )
                        })}
                    </tr>
                    <tr>
                        <td className="comparison-table-first-column">Driving Side</td>
                        {comparedCountries.map((country)=>{
                            return (
                                <td key={Math.random()} data-cell={country.name.common}>
                                    {capitalise(country.car.side)}
                                    </td>
                            )
                        })}
                    </tr>
                    <tr>
                        <td className="comparison-table-first-column">Top Level Domain</td>
                        {comparedCountries.map((country)=>{
                            return (
                                <td key={Math.random()} data-cell={country.name.common}>{country.tld}</td>
                            )
                        })}
                    </tr>
                    <tr>
                        <td className="comparison-table-first-column">Currencies</td>
                        {comparedCountries.map((country)=>{
                            return (
                                <td key={Math.random()} data-cell={country.name.common}>
                                    {Object.keys(country.currencies).map((curr)=>`${capitalise(country.currencies[curr].name)} (${country.currencies[curr].symbol})`).join(", ")}
                                </td>
                            )
                        })}
                    </tr>
                    <tr>
                        <td className="comparison-table-first-column">Languages</td>
                        {comparedCountries.map((country)=>{
                            return (
                                <td key={Math.random()} data-cell={country.name.common}>
                                    {Object.keys(country.languages).map((lang)=>`${country.languages[lang]}`).join(", ")}
                                </td>
                            )
                        })}
                    </tr>
                    <tr>
                        <td className="comparison-table-first-column">Borders</td>
                        {comparedCountries.map((country)=>{
                            return (
                                <td key={Math.random()} data-cell={country.name.common}>
                                    {country.borders.length !==0 ? country.borders.map((bor)=>{
                                        const targetCountry = countriesData.find((place)=>place["cca3"] === bor)
                                        const targetCountryName = targetCountry.name.common
                                        return (
                                            targetCountryName
                                            )
                                        }).join(", ") : "No borders"}
                                </td>
                            )
                        })}
                    </tr>
                </tbody>
            </table>
            <button onClick={()=>setRaiseCompareWindow(!raiseCompareWindow)} className={raiseCompareWindow ? "comparison-table-close-button":"hide"} >Close Comparison</button>
        </motion.div>
    )
}

export default RaisedCompareWindow