import Axios from "axios"
import React, {useContext, useEffect, useState} from "react"

import SearchFilter from "../components/SearchFilter"
import Countries from "../components/Countries"

import { CountriesContext } from "../utils/Contexts"


let regionList = []



function CountriesPage() {
  const [countriesList, setCountriesList] = useState([])
  const [filterConditions, setFilterConditions] = useState({})
  const [showDropdown, setShowDropdown] = useState(false)
  const [searchText, setSearchText] = useState("")
  const [loading, setLoading] = useState(true)
  const {countriesData} = useContext(CountriesContext)

  //Make API call on launch and set response to countriesData. This also makes it so that the API is only called on page load.
  useEffect(() => {
      setCountriesList(countriesData)
  }, [])
  //Generate a list of regions from the data to use in filters.
  //This was needed as a separate useEffect hook due to getData running asynchronously. Without this sometimes the regionList would be generated as blank, as the list was generated before countriesData was populated
  useEffect(() => {
    countriesData.forEach((country)=> {
        regionList = [...regionList, country.region]
    })
    regionList = [...new Set(regionList)]
  }, [])

  //Once we have a list of regions, we can create a filter with it
  useEffect(() => {
    //GENERATE FILTER OBJECT
    //This object can be expanded to allow other types of filtration
    let workingList =[]
    regionList.map((region)=>{
      workingList =  [...workingList, {name:region, checked:false}]
    })
    setFilterConditions(()=>{
      return {region:[...workingList]}})
    setLoading(false)
  }, [regionList])

  //This function handles the click on a filter
  function handleFilterClick(clickName){
    //CHECK THE CORRECT FILTER
    let regions = [...filterConditions.region]
    let changeIndex = regions.findIndex((e)=> e.name === clickName)
    regions[changeIndex].checked = !regions[changeIndex].checked
    setFilterConditions(()=>{return {region:[...regions]}})

    /* THIS PIECE OF CODE DIDN'T WORK - The every kept returning as false if one of its values was changed to true and back to false - why? Originally I wanted to use it to track whether all of the region filters were off.
    let regionChecked = [tickle.region.map((e)=> e.checked)]
    console.log(regionChecked.every((e)=>e===false));
    console.log(regionChecked); */

    //REGION FILTER #########################################################
    let newList = [...countriesData]
    filterConditions.region.map((reg)=>{
      if (reg.checked){
        newList = [...newList.filter((country)=>{
          return (country.region === reg.name)
        })]
      }
    })
    setCountriesList(newList)
    //Close Dropdown
    setShowDropdown(false)
  }
  function handleSearch(e){
    setSearchText(e.target.value)
    let searchterm = e.target.value
    if (searchterm){
    let newList = [...countriesData].filter((country)=>{
      return (country.name.common.toLowerCase().includes(searchterm.toLowerCase()))
    })
    setCountriesList(newList)
    } else{
      setCountriesList(countriesData)
    }
  }

  return !loading ? (
    <>
        <SearchFilter 
            searchText={searchText}
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
