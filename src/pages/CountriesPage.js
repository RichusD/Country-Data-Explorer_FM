import {React, useContext, useEffect, useState} from "react"

import SearchFilter from "../components/SearchFilter"
import Countries from "../components/Countries"
import CompareWindow from "../components/CompareWindow"

import { 
  ComparedCountriesContext,
  CountriesContext,
  DisplayedCountriesContext,
  FiltersContext,
  SortContext
} from "../utils/Contexts"

import { generateFilter, populationDensityCalc } from "../utils/sharedFunctions"

import {
  drivingSideList,
  populationList,
  areaList,
  UNMemberList,
  landlockedList
} from "../utils/filterArrays"

import sortOptionsList from "../utils/SortOptions"
import BackToTopButton from "../components/BackToTopButton"

function CountriesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [showCompareWindow, setShowCompareWindow] = useState(false)
  const [raiseCompareWindow, setRaiseCompareWindow] = useState(false)
  const [filterActive, setFilterActive] = useState(false)

  const {comparedCountries, setComparedCountries} = useContext(ComparedCountriesContext)
  const {countriesData} = useContext(CountriesContext)
  const {displayedCountries, setDisplayedCountries} = useContext(DisplayedCountriesContext)
  const {filterConditions, setFilterConditions} = useContext(FiltersContext)
  const {sortOptions, setSortOptions} = useContext(SortContext)
  
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
      filterConditions.UNMember.map((e)=>{
        if (e.checked){
          newList = [...newList.filter((country)=>(country.unMember === e.value))]
        }
      })
      filterConditions.landlocked.map((e)=>{
        if (e.checked){
          newList = [...newList.filter((country)=>(country.landlocked === e.value))]
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
    setDisplayedCountries(performSort(newList,sortOptions))
  }

  //SORT FUNCTION, takes a list to be sorted returns by setting displayed countries
  function handleSortClick(event){
    let updatedSortOptions = []
    const clickedOption = event.currentTarget.getAttribute("data-sortoption")
    
    if (!clickedOption){
      setSortOptions([...sortOptionsList])
    } else {
      updatedSortOptions = sortOptionsList.map((option)=>{
        if (option.name === clickedOption){
          return {name:option.name,checked: true}
        } else {
          return {name:option.name, checked:false}
        }
      })
      setSortOptions([...updatedSortOptions])
    }

    return setDisplayedCountries(performSort(displayedCountries,updatedSortOptions))
  }

  function performSort (arrayToSort, sortOptions){
    let newList = [...arrayToSort]

    sortOptions.map((option)=>{
      if (option.checked){
        if (option.name === "Alphabetically (A-Z)"){
          newList = newList.sort(function (a,b){
            if (a.name.common.toLowerCase() < b.name.common.toLowerCase()){
              return -1
            } else if (a.name.common.toLowerCase() > b.name.common.toLowerCase()){
              return 1
            } else {
              return 0
            }
          })
        } else if (option.name === "Alphabetically (Z-A)"){
          newList = newList.sort(function (a,b){
            if (a.name.common.toLowerCase() < b.name.common.toLowerCase()){
              return 1
            } else if (a.name.common.toLowerCase() > b.name.common.toLowerCase()){
              return -1
            } else {
              return 0
            }
          })
        } else if (option.name === "Population (high to low)"){
          newList = newList.sort(function (a,b){
            if (a.population < b.population){
              return 1
            } else if (a.population > b.population){
              return -1
            } else {
              return 0
            }
          })
        } else if (option.name === "Population (low to high)"){
          newList = newList.sort(function (a,b){
            if (a.population < b.population){
              return -1
            } else if (a.population > b.population){
              return 1
            } else {
              return 0
            }
          })
        } else if (option.name === "Area (high to low)"){
          newList = newList.sort(function (a,b){
            if (a.area < b.area){
              return 1
            } else if (a.area > b.area){
              return -1
            } else {
              return 0
            }
          })
        } else if (option.name === "Area (low to high)"){
          newList = newList.sort(function (a,b){
            if (a.area < b.area){
              return -1
            } else if (a.area > b.area){
              return 1
            } else {
              return 0
            }
          })
        } else if (option.name === "Population Density (high to low)"){
          newList = newList.sort(function (a,b){
            if (populationDensityCalc(a.population, a.area) < populationDensityCalc(b.population, b.area)){
              return 1
            } else if (populationDensityCalc(a.population, a.area) > populationDensityCalc(b.population, b.area)){
              return -1
            } else {
              return 0
            }
          })
        } else if (option.name === "Population Density (low to high)"){
          newList = newList.sort(function (a,b){
            if (populationDensityCalc(a.population, a.area) < populationDensityCalc(b.population, b.area)){
              return -1
            } else if (populationDensityCalc(a.population, a.area) > populationDensityCalc(b.population, b.area)){
              return 1
            } else {
              return 0
            }
          })
        }
      }
    })

    return newList
  }

  //This function handles the click on a filter
  function handleFilterClick(event, clickName){
    //Finds the filter that was clicked and changes its checked value to true
    let regions = [...filterConditions.region]
    let subr = [...filterConditions.subregion]
    let langs = [...filterConditions.languages]
    let driveSide = [...filterConditions.drivingSide]
    let UNMList = [...filterConditions.UNMember]
    let LLList = [...filterConditions.landlocked]
    let popul = [...filterConditions.totalPopulation]
    let area = [...filterConditions.totalArea]
      /* You use currentTarget here as the options under the filter are contained within a div, which contains the option as an li and
      a tick svg icon. currentTarget will refer to the target which has the event listener attached (i.e. the one with the onClick). target
      will refer to the element that was clicked, which could be the li or icon itself, which would cause bugs. */
    if (event.currentTarget.getAttribute("data-filtercategory") === "region"){
      let changeIndex = regions.findIndex((e)=> e.name === clickName)
      regions[changeIndex].checked = !regions[changeIndex].checked

    } else if (event.currentTarget.getAttribute("data-filtercategory") === "subregion"){
      let changeIndex = subr.findIndex((e)=> e.name === clickName)
      subr[changeIndex].checked = !subr[changeIndex].checked

    } else if (event.currentTarget.getAttribute("data-filtercategory") === "languages"){
      let changeIndex = langs.findIndex((e)=> e.name === clickName)
      langs[changeIndex].checked = !langs[changeIndex].checked

    } else if (event.currentTarget.getAttribute("data-filtercategory") === "drivingSide"){
      let changeIndex = driveSide.findIndex((e)=> e.name === clickName)
      driveSide[changeIndex].checked = !driveSide[changeIndex].checked

    } else if (event.currentTarget.getAttribute("data-filtercategory") === "UNMember"){
      let changeIndex = UNMList.findIndex((e)=> e.name === clickName)
      UNMList[changeIndex].checked = !UNMList[changeIndex].checked

    } else if (event.currentTarget.getAttribute("data-filtercategory") === "landlocked"){
      let changeIndex = LLList.findIndex((e)=> e.name === clickName)
      LLList[changeIndex].checked = !LLList[changeIndex].checked

    } else if (event.currentTarget.getAttribute("data-filtercategory") === "totalPopulation"){
      let changeIndex = popul.findIndex((e)=> e.name === clickName)
      popul[changeIndex].checked = !popul[changeIndex].checked

    } else if (event.currentTarget.getAttribute("data-filtercategory") === "totalArea"){
      let changeIndex = area.findIndex((e)=> e.name === clickName)
      area[changeIndex].checked = !area[changeIndex].checked
    }
    setFilterConditions({
      region:regions,
      subregion:subr,
      totalPopulation:popul,
      totalArea:area,
      drivingSide:driveSide,
      UNMember:UNMList,
      landlocked:LLList,
      languages:langs
    })
    
    //Runs the filter & search function
    filterAndSearch(searchTerm,filterConditions)
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
    setFilterConditions(
      generateFilter(
        countriesData,
        drivingSideList,
        UNMemberList,
        landlockedList,
        populationList,
        areaList,
      )
    )
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
          handleFilterClick={handleFilterClick}
          handleClearComparisons={handleClearComparisons}
          filterActive={filterActive}
          handleClearFilters={handleClearFilters}
          handleSortClick={handleSortClick}
        />

        <Countries 
          displayedCountries={displayedCountries}
          handleComparison={handleComparison}
          />

        {showCompareWindow && 
        <CompareWindow
          raiseCompareWindow={raiseCompareWindow}
          setRaiseCompareWindow={setRaiseCompareWindow}
        />}
        <BackToTopButton/>
    </>
  )
}

export default CountriesPage;
