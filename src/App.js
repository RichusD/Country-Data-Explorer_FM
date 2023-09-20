import Axios from "axios";
import { Routes, Route, useLocation} from "react-router-dom"
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import "./pages/styles.css"

import SharedLayout from "./pages/SharedLayout";
import Homepage from "./pages/Homepage";
import CountriesPage from "./pages/CountriesPage";
import ErrorPage from "./pages/ErrorPage"
import Details from "./pages/Details"
import testingData from "./utils/testingData";

import { 
  CountriesContext,
  DarkLightModeContext,
  ComparedCountriesContext,
  DisplayedCountriesContext,
  FiltersContext,
  SortContext
} from "./utils/Contexts";

import {
  drivingSideList,
  populationList,
  areaList,
  UNMemberList,
  landlockedList,
} from "./utils/filterArrays"

import sortOptionsList from "./utils/SortOptions"

import { generateFilter } from "./utils/sharedFunctions";

function App() {
  const [countriesData, setCountriesData] = useState([])
  const [comparedCountries, setComparedCountries] = useState([])
  const [displayedCountries, setDisplayedCountries] = useState([])
  const [filterConditions, setFilterConditions] = useState({})
  const [sortOptions, setSortOptions] = useState([...sortOptionsList])
  const [darkMode, setDarkMode] = useState(false)
  const [loading, setLoading] = useState(true)

  const location = useLocation()

  useEffect(()=>{
    console.log("App level rerender")
  })

  useEffect(() => {
    const getData = async () =>{
/*           const response = await Axios.get("https://restcountries.com/v3.1/all?fields=name,nativeName,population,region,subregion,capital,tld,currencies,languages,borders,cca3,flags,maps,car,area,unMember,landlocked,coatOfArms")
          //Add additional property to enable comparison feature later on
          const dataWithComp = response.data.map((c)=>{
            // This is needed as there's an error in the API where this nation has an area of -1km2. I got this area from Wikipedia.
            if (c.name.common === "Svalbard and Jan Mayen"){
              return {...c, area: 61399, compare:false}
            }
            return {...c, compare: false}})
          //Set the country data to that version of the data with that added property
          setCountriesData(dataWithComp)
          //Remove loading flag
          setLoading(false) */
          const testingDataWithComp = testingData.map((c)=>{
            // This is needed as there's an error in the API where this nation has an area of -1km2. I got this area from Wikipedia.
            if (c.name.common === "Svalbard and Jan Mayen"){
              return {...c, area: 61399, compare:false}
            }
            return {...c, compare:false}})
          setCountriesData(testingDataWithComp)
          setLoading(false)
    }

    try{
        getData()
    } catch (error){
        console.log(error);
    }
  }, [])

  useEffect(() => {
    const copiedList = countriesData.map((countrydata)=>{return {...countrydata}})
    setDisplayedCountries(copiedList)
    setFilterConditions(
      generateFilter(
        countriesData,
        drivingSideList,
        UNMemberList,
        landlockedList,
        populationList,
        areaList
      )
    )
    
}, [countriesData])

  return !loading ? (    
    <div id={`${darkMode ? "dark" : "light"}`} className="master-container">
      <CountriesContext.Provider value={{countriesData, setCountriesData}}>
      <ComparedCountriesContext.Provider value={{comparedCountries, setComparedCountries}}>
      <DarkLightModeContext.Provider value={{darkMode, setDarkMode}}>
      <DisplayedCountriesContext.Provider value={{displayedCountries, setDisplayedCountries}}>
      <FiltersContext.Provider value={{filterConditions, setFilterConditions}}>
      <SortContext.Provider value={{sortOptions, setSortOptions}}>
        {/*use mode="wait" so that the next page doesn't try to load while the current one is animating out, causing layout issues.*/}
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.key}>
            <Route path="/" element={<SharedLayout/>}>
              <Route index element={<Homepage/>}/>
              <Route path="/countries" element={<CountriesPage/>}/>
              <Route path="/countries/:countryCode" element={<Details/>}/>
              <Route path="*" element={<ErrorPage/>}/>
            </Route>
          </Routes>
        </AnimatePresence>
      </SortContext.Provider>
      </FiltersContext.Provider>
      </DisplayedCountriesContext.Provider>
      </DarkLightModeContext.Provider>
      </ComparedCountriesContext.Provider>
      </CountriesContext.Provider>
    </div>
  ) : "LOADING IT ALL UP"
}

export default App;