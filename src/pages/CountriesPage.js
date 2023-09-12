import {React, useContext, useEffect, useState} from "react"

import SearchFilter from "../components/SearchFilter"
import Countries from "../components/Countries"
import CompareWindow from "../components/CompareWindow"

import { 
  ComparedCountriesContext,
  CountriesContext,
  DisplayedCountriesContext,
  FiltersContext
} from "../utils/Contexts"

import { generateFilter } from "../utils/sharedFunctions"

import {
  drivingSideList,
  populationList,
  areaList
} from "../utils/filterArrays"

function CountriesPage() {
  const [showDropdown, setShowDropdown] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const [showCompareWindow, setShowCompareWindow] = useState(false)
  const [raiseCompareWindow, setRaiseCompareWindow] = useState(false)
  const [filterActive, setFilterActive] = useState(false)

  const {comparedCountries, setComparedCountries} = useContext(ComparedCountriesContext)
  const {countriesData} = useContext(CountriesContext)
  const {displayedCountries, setDisplayedCountries} = useContext(DisplayedCountriesContext)
  const {filterConditions, setFilterConditions} = useContext(FiltersContext)
  



  

  //This handles the actual filter and search together
  function filterAndSearch(currentSearchTerm, filterConditions){
    //Create array to hold what will be the filtered list
    let newList = countriesData.map((countrydata)=>{return {...countrydata}})
    //Create variable to hold the checked value on each filter
    let allCheckedValues = Object.keys(filterConditions).map((cat)=>{
      return filterConditions[cat].map((el)=>el.checked)
    }).flat()
    //Check if no filters are selected
    if (allCheckedValues.every((v)=> v === false)){
      setFilterActive(false)
    } else {
      setFilterActive(true)
    //If a filter is selected, find all countries that fit the filter and add it to the newList array
      filterConditions.region.map((e)=>{
        if (e.checked){
          newList = [...newList.filter((country)=>(country.region === e.name))]
        }
      })
      filterConditions.subregion.map((e)=>{
        if (e.checked){
          newList = [...newList.filter((country)=>(country.subregion === e.name))]
        }
      })
      filterConditions.languages.map((e)=>{
        if (e.checked){
          newList = [...newList.filter((country)=>(Object.values(country.languages).includes(e.name)))]
        }
      })
      filterConditions.drivingSide.map((e)=>{
        if (e.checked){
          newList = [...newList.filter((country)=>(country.car.side === e.name))]
        }
      })
      filterConditions.totalPopulation.map((e)=>{
        if (e.checked){
          newList = [...newList.filter((country)=>(country.population >= e.min && country.population <= e.max))]
        }
      })
      filterConditions.totalArea.map((e)=>{
        if (e.checked){
          newList = [...newList.filter((country)=>(country.area >= e.min && country.area <= e.max))]
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
    setDisplayedCountries(newList)
  }

  //This function handles the click on a filter
  function handleFilterClick(event, clickName){
    //Finds the filter that was clicked and changes its checked value to true
    let regions = [...filterConditions.region]
    let subr = [...filterConditions.subregion]
    let langs = [...filterConditions.languages]
    let driveSide = [...filterConditions.drivingSide]
    let popul = [...filterConditions.totalPopulation]
    let area = [...filterConditions.totalArea]
      /* You use currentTarget here as the options under the filter are contained within a div, which contains the option as an li and
      a tick svg icon. currentTarget will refer to the target which has the event listener attached (i.e. the one with the onClick). target
      will refer to the element that was clicked, which could be the li or icon itself, which would cause bugs. */
    if (event.currentTarget.className.includes(" region")){
      let changeIndex = regions.findIndex((e)=> e.name === clickName)
      regions[changeIndex].checked = !regions[changeIndex].checked

    } else if (event.currentTarget.className.includes(" subregion")){
      let changeIndex = subr.findIndex((e)=> e.name === clickName)
      subr[changeIndex].checked = !subr[changeIndex].checked

    } else if (event.currentTarget.className.includes(" languages")){
      let changeIndex = langs.findIndex((e)=> e.name === clickName)
      langs[changeIndex].checked = !langs[changeIndex].checked

    } else if (event.currentTarget.className.includes(" drivingSide")){
      let changeIndex = driveSide.findIndex((e)=> e.name === clickName)
      driveSide[changeIndex].checked = !driveSide[changeIndex].checked

    } else if (event.currentTarget.className.includes(" totalPopulation")){
      let changeIndex = popul.findIndex((e)=> e.name === clickName)
      popul[changeIndex].checked = !popul[changeIndex].checked

    } else if (event.currentTarget.className.includes(" totalArea")){
      let changeIndex = area.findIndex((e)=> e.name === clickName)
      area[changeIndex].checked = !area[changeIndex].checked
    }
    setFilterConditions({
      region:regions,
      subregion:subr,
      totalPopulation:popul,
      totalArea:area,
      drivingSide:driveSide,
      languages:langs
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
  /* This handles where a comparison tickbox is clicked. It finds the country that was clicked,  */
  function handleComparison(name){
    const dataCopy = [...displayedCountries]
    const checkedCountryIndex = dataCopy.findIndex((country)=>country.name.common === name)
    dataCopy[checkedCountryIndex].compare = !dataCopy[checkedCountryIndex].compare
    if (dataCopy[checkedCountryIndex].compare){
      setComparedCountries((prev)=> [...prev, dataCopy[checkedCountryIndex]])
    } else if (!dataCopy[checkedCountryIndex].compare){
      setComparedCountries(comparedCountries.filter((country)=> country.name.common !== dataCopy[checkedCountryIndex].name.common))
    }
  }
  /* Once countries have been ticked, check to see if at least two have been chosen, and show the compare window if so */
  useEffect(()=>{
    if (comparedCountries.length >= 2){
      setShowCompareWindow(true)
    } else {
      setShowCompareWindow(false)
    }
  },[comparedCountries])

  //Button function to clear the comparison checkmarks
  function handleClearComparisons (){
    setDisplayedCountries(countriesData)
    setComparedCountries([])
    filterAndSearch(searchTerm, filterConditions)
  }

  function handleClearFilters (){
    setFilterActive(false)
    setSearchTerm("")
    setFilterConditions(generateFilter(countriesData,drivingSideList,populationList,areaList))
  }

  useEffect(()=>{
    if (!filterActive){
      filterAndSearch(searchTerm,filterConditions)
    }
  },[filterConditions])
  

  return (
    <>
        <SearchFilter 
          showCompareWindow={showCompareWindow}
          searchTerm={searchTerm}
          handleSearch={handleSearch}
          filterConditions={filterConditions}
          showDropdown={showDropdown}
          setShowDropdown={setShowDropdown}
          handleFilterClick={handleFilterClick}
          handleClearComparisons={handleClearComparisons}
          filterActive={filterActive}
          handleClearFilters={handleClearFilters}
        />

        <Countries 
          loading={loading}
          displayedCountries={displayedCountries}
          handleComparison={handleComparison}
          />

        {showCompareWindow && 
        <CompareWindow
          raiseCompareWindow={raiseCompareWindow}
          setRaiseCompareWindow={setRaiseCompareWindow}
        />}
    </>
  )
}

export default CountriesPage;
