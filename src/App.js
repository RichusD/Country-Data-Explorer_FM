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

import { CountriesContext } from "./utils/Contexts";
import { DarkLightModeContext } from "./utils/Contexts";


function App() {
  const [countriesData, setCountriesData] = useState([])
  const [darkMode, setDarkMode] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getData = async () =>{
          const response = await Axios.get("https://restcountries.com/v3.1/all?fields=name,nativeName,population,region,subregion,capital,tld,currencies,languages,borders,cca3,flags,maps,car,area")
          //Add additional property to enable comparison feature
          const dataWithComp = response.data.map((c)=>{
            return {...c, compare: false}})
          //Set the country data to that version of the data with that added property
          setCountriesData(dataWithComp)
          //Remove loading flag
          setLoading(false)
    }

    try{
        getData()
    } catch (error){
        console.log(error);
    }
  }, [])


  return !loading ? (    
    <div id="master-container">
      <CountriesContext.Provider value={{countriesData}}>
      <DarkLightModeContext.Provider value={{darkMode, setDarkMode}}>
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
      </DarkLightModeContext.Provider>
      </CountriesContext.Provider>
    </div>
  ) : "LOADING IT ALL UP"
}

export default App;