import React, {useContext, useEffect, useState} from "react"

import SearchFilter from "../components/SearchFilter"
import Countries from "../components/Countries"

import { CountriesContext } from "../utils/Contexts"
import CompareWindow from "../components/CompareWindow"


let comparedCountries = []

let regionList = []
let languagesList = []
let drivingSideList = ["left", "right"]
let populationList = [
  {
    name:"0 - 10,000",
    min:0,
    max:10000,
    checked: false
  },
  {
    name:"10,001 - 100,000",
    min:10001,
    max:100000,
    checked: false
  },
  {
    name:"100,001 - 1,000,000",
    min:100001,
    max:1000000,
    checked: false
  },
  {
    name:"1,000,001 - 10,000,000",
    min:1000001,
    max:10000000,
    checked: false
  },
  {
    name:"10,000,001 - 100,000,000",
    min:10000001,
    max:100000000,
    checked: false
  },
  {
    name:"100,000,000+",
    min:100000001,
    max:Infinity,
    checked: false
  }
]
let areaList = [
  {
    name:"0 - 10,000",
    min:0,
    max:10000,
    checked: false
  },
  {
    name:"10,001 - 100,000",
    min:10001,
    max:100000,
    checked: false
  },
  {
    name:"100,001 - 1,000,000",
    min:100001,
    max:1000000,
    checked: false
  },
  {
    name:"1,000,001 - 10,000,000",
    min:1000001,
    max:10000000,
    checked: false
  },
  {
    name:"10,000,001+",
    min:10000001,
    max:Infinity,
    checked: false
  },

]




function CountriesPage() {
  const [countriesList, setCountriesList] = useState([])
  const [filterConditions, setFilterConditions] = useState({})
  const [showDropdown, setShowDropdown] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const [showCompareWindow, setShowCompareWindow] = useState(true)
  const [raiseCompareWindow, setRaiseCompareWindow] = useState(false)

  

  const {countriesData, setCountriesData} = useContext(CountriesContext)
  

  //Generate a list of regions from the data to use in filters.
  useEffect(() => {
      setCountriesList(countriesData)
      countriesData.forEach((country)=> {
          regionList = [...regionList, country.region]
          languagesList = [...languagesList, ...Object.keys(country.languages).map((lang)=>`${country.languages[lang]}`)]
      })
      regionList = [...new Set(regionList)]
      languagesList = [...new Set(languagesList)]
  }, [])

  //Once we have a list of regions, we can create a filter with it
  useEffect(() => {
    //GENERATE FILTER OBJECT
    //This object can be expanded to allow other types of filtration
    let workingList ={region:[],languages:[],drivingSide:[],totalPopulation:[],totalArea:[]}

    regionList.map((region)=>{
      workingList.region.push({name:region, checked:false})
    })
    languagesList.map((lang)=>{
      workingList.languages.push({name:lang, checked:false})
    })
    drivingSideList.map((side)=>{
      workingList.drivingSide.push({name:side, checked:false})
    })
    workingList.totalPopulation = [...populationList]
    workingList.totalArea = [...areaList]
    setFilterConditions(workingList)
    setLoading(false)
  }, [regionList])

  //This handles the actual filter and search together
  function filterAndSearch(currentSearchTerm, filterConditions){
    //Create array to hold what will be the filtered list
    let newList = []
    //Create variable to hold the checked value on each filter
    let allCheckedValues = Object.keys(filterConditions).map((cat)=>{
      return filterConditions[cat].map((el)=>el.checked)
    }).flat()
        
    //Check if no filters are selected
    if (allCheckedValues.every((v)=> v === false)){
      newList = countriesData
    } else {
    //If a filter is selected, find all countries that fit the filter and add it to the newList array
      filterConditions.region.map((e)=>{
        if (e.checked){
          newList = [...newList, ...countriesData.filter((country)=>(country.region === e.name))]
        }
      })
      filterConditions.languages.map((e)=>{
        if (e.checked){
          newList = [...newList, ...countriesData.filter((country)=>(Object.values(country.languages).includes(e.name)))]
        }
      })
      filterConditions.drivingSide.map((e)=>{
        if (e.checked){
          newList = [...newList, ...countriesData.filter((country)=>(country.car.side === e.name))]
        }
      })
      filterConditions.totalPopulation.map((e)=>{
        if (e.checked){
          newList = [...newList, ...countriesData.filter((country)=>(country.population >= e.min && country.population <= e.max))]
        }
      })
      filterConditions.totalArea.map((e)=>{
        if (e.checked){
          newList = [...newList, ...countriesData.filter((country)=>(country.area >= e.min && country.area <= e.max))]
        }
      })
    }
    //If there's anything in the searchbox currently, perform a substring search
    if (currentSearchTerm){
      newList = [...newList].filter((country)=>{
        //Use of .includes() makes it a substring search. Make everything lowercase to ensure cases don't mess with things
        return (country.name.common.toLowerCase().includes(currentSearchTerm.toLowerCase()))
      })
    } 
    //Finally, set the countries list to this filtered list of countries, so we can see it on screen
    setCountriesList(newList)
  }

  //This function handles the click on a filter
  function handleFilterClick(event, clickName){
    //Finds the filter that was clicked and changes its checked value to true
    let regions = [...filterConditions.region]
    let langs = [...filterConditions.languages]
    let driveSide = [...filterConditions.drivingSide]
    let popul = [...filterConditions.totalPopulation]
    let area = [...filterConditions.totalArea]

    if (event.target.className.includes("region")){
      let changeIndex = regions.findIndex((e)=> e.name === clickName)
      regions[changeIndex].checked = !regions[changeIndex].checked
    } else if (event.target.className.includes("languages")){
      let changeIndex = langs.findIndex((e)=> e.name === clickName)
      langs[changeIndex].checked = !langs[changeIndex].checked
    } else if (event.target.className.includes("drivingSide")){
      let changeIndex = driveSide.findIndex((e)=> e.name === clickName)
      driveSide[changeIndex].checked = !driveSide[changeIndex].checked
    } else if (event.target.className.includes("totalPopulation")){
      let changeIndex = popul.findIndex((e)=> e.name === clickName)
      popul[changeIndex].checked = !popul[changeIndex].checked
    } else if (event.target.className.includes("totalArea")){
      let changeIndex = area.findIndex((e)=> e.name === clickName)
      area[changeIndex].checked = !area[changeIndex].checked
    }
    setFilterConditions({
      region:regions,
      languages:langs,
      drivingSide:driveSide,
      totalPopulation:popul,
      totalArea:area
    })
    
    //Runs the filter & search function
    filterAndSearch(searchTerm,filterConditions)
    //Close Dropdown
    setShowDropdown(false)
  }
  //This handles search terms
  function handleSearch(e){
    //Sets the value of the search box
    setSearchTerm(e.target.value)
    /* The variable below is needed as setSearchTerm runs asynchronously. If this isn't used
    it'll be one letter behind */
    const currentSearchTerm = e.target.value
    //Runs the filter & search function
    filterAndSearch(currentSearchTerm, filterConditions)
  }

  function handleComparison(name){
    const dataCopy = [...countriesData]
    const checkedCountryIndex = dataCopy.findIndex((country)=>country.name.common === name)
    dataCopy[checkedCountryIndex].compare = !dataCopy[checkedCountryIndex].compare
    if (dataCopy[checkedCountryIndex].compare){
      comparedCountries.push(dataCopy[checkedCountryIndex])
    } else if (!dataCopy[checkedCountryIndex].compare){
      comparedCountries = comparedCountries.filter((country)=> country.name.common !== dataCopy[checkedCountryIndex].name.common)
    }
    if (comparedCountries.length > 0){
      setShowCompareWindow(true)
    } else {
      setShowCompareWindow(false)
    }

    setCountriesData(dataCopy)
    console.log(comparedCountries);
    console.log(showCompareWindow);
  }

  return !loading ? (
    <>
        <SearchFilter 
          searchTerm={searchTerm}
          handleSearch={handleSearch}
          filterConditions={filterConditions}
          showDropdown={showDropdown}
          setShowDropdown={setShowDropdown}
          handleFilterClick={handleFilterClick}
            
        />
        <Countries 
          loading={loading}
          countries={countriesList}
          handleComparison={handleComparison}
          />
        {showCompareWindow && 
        <CompareWindow
          comparedCountries={comparedCountries}
          raiseCompareWindow={raiseCompareWindow}
          setRaiseCompareWindow={setRaiseCompareWindow}
        />
        }
    </>
  ) : <span>Loading...</span>
}

export default CountriesPage;
