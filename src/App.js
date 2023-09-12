import Axios from "axios";
import {BrowserRouter, Routes, Route} from "react-router-dom"
import { useState, useEffect } from "react";
import "./pages/styles.css"

import SharedLayout from "./pages/SharedLayout";
import Homepage from "./pages/Homepage";
import CountriesPage from "./pages/CountriesPage";
import ErrorPage from "./pages/ErrorPage"
import AboutPage from "./pages/AboutPage";
import Details from "./pages/Details"
import testingData from "./utils/testingData";

import { 
  CountriesContext,
  DarkLightModeContext,
  ComparedCountriesContext,
  DisplayedCountriesContext,
  FiltersContext
} from "./utils/Contexts";

import {
  drivingSideList,
  populationList,
  areaList
} from "./utils/filterArrays"

import { generateFilter } from "./utils/sharedFunctions";

function App() {
  const [countriesData, setCountriesData] = useState([])
  const [comparedCountries, setComparedCountries] = useState([])
  const [displayedCountries, setDisplayedCountries] = useState([])
  const [filterConditions, setFilterConditions] = useState({})
  const [darkMode, setDarkMode] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getData = async () =>{
/*           const response = await Axios.get("https://restcountries.com/v3.1/all?fields=name,nativeName,population,region,subregion,capital,tld,currencies,languages,borders,cca3,flags,maps,car,area,unMember,landlocked,coatOfArms")
          //Add additional property to enable comparison feature later on
          const dataWithComp = response.data.map((c)=>{
            return {...c, compare: false}})
          //Set the country data to that version of the data with that added property
          setCountriesData(dataWithComp)
          //Remove loading flag
          setLoading(false) */
          const testingDataWithComp = testingData.map((c)=>{
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
    setFilterConditions(generateFilter(countriesData,drivingSideList,populationList,areaList))
    
}, [countriesData])


  return !loading ? (    
    <div id={`${darkMode ? "dark" : "light"}`} className="master-container">
      <CountriesContext.Provider value={{countriesData, setCountriesData}}>
      <ComparedCountriesContext.Provider value={{comparedCountries, setComparedCountries}}>
      <DarkLightModeContext.Provider value={{darkMode, setDarkMode}}>
      <DisplayedCountriesContext.Provider value={{displayedCountries, setDisplayedCountries}}>
      <FiltersContext.Provider value={{filterConditions, setFilterConditions}}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SharedLayout/>}>
              <Route index element={<Homepage/>}/>
              <Route path="/about" element={<AboutPage/>}/>
              <Route path="/countries" element={<CountriesPage/>}/>
              <Route path="/countries/:countryCode" element={<Details/>}/>
              <Route path="*" element={<ErrorPage/>}/>
            </Route>
          </Routes>
        </BrowserRouter>
      </FiltersContext.Provider>
      </DisplayedCountriesContext.Provider>
      </DarkLightModeContext.Provider>
      </ComparedCountriesContext.Provider>
      </CountriesContext.Provider>
    </div>
  ) : "LOADING IT ALL UP"
}

export default App;