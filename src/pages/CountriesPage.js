import React, {useContext, useEffect, useState} from "react"

import SearchFilter from "../components/SearchFilter"
import Countries from "../components/Countries"

import { CountriesContext } from "../utils/Contexts"



let regionList = []
let drivingSideList = ["left", "right"]
let languagesList = []

function CountriesPage() {
  const [countriesList, setCountriesList] = useState([])
  const [filterConditions, setFilterConditions] = useState({})
  const [showDropdown, setShowDropdown] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)

  const {countriesData} = useContext(CountriesContext)

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
    let workingList ={region:[],languages:[],drivingSide:[]}

    regionList.map((region)=>{
      workingList.region.push({name:region, checked:false})
    })
    languagesList.map((lang)=>{
      workingList.languages.push({name:lang, checked:false})
    })
    drivingSideList.map((side)=>{
      workingList.drivingSide.push({name:side, checked:false})
    })
    setFilterConditions(workingList)
    setLoading(false)
  }, [regionList])

  //This handles the actual filter and search together
  function filterAndSearch(currentSearchTerm,filterConditions){
    //Create array to hold what will be the filtered list
    let newList = []
    //Create variable to hold the checked value on each filter
    let allCheckedRegionValues = filterConditions.region.map((reg)=>reg.checked)
    
    //Check if no filters are selected
    if (allCheckedRegionValues.every((v)=> v===false)){
      newList = countriesData
    } else {
    //If a filter is selected, find all countries that fit the filter and add it to the newList array
    //Check by Region
      filterConditions.region.map((reg)=>{
        if (reg.checked){
          newList = [...newList, ...countriesData.filter((country)=>(country.region === reg.name))]
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
  function handleFilterClick(clickName){
    //Finds the filter that was clicked and changes its checked value to true
    let regions = [...filterConditions.region]
    let changeIndex = regions.findIndex((e)=> e.name === clickName)
    regions[changeIndex].checked = !regions[changeIndex].checked
    setFilterConditions(()=>{return {region:[...regions]}})
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
        <Countries loading={loading} countries={countriesList}/>
    </>
  ) : <span>Loading...</span>
}

export default CountriesPage;
