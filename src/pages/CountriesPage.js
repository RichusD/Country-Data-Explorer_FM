import React, {useContext, useEffect, useRef, useState} from "react"

import SearchFilter from "../components/SearchFilter"
import Countries from "../components/Countries"

import { ComparedCountriesContext, CountriesContext } from "../utils/Contexts"
import CompareWindow from "../components/CompareWindow"

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
  const [showCompareWindow, setShowCompareWindow] = useState(false)
  const [raiseCompareWindow, setRaiseCompareWindow] = useState(false)
  const [filterActive, setFilterActive] = useState(false)

  const {comparedCountries, setComparedCountries} = useContext(ComparedCountriesContext)
  const {countriesData, setCountriesData} = useContext(CountriesContext)
  

  //Generate a list of regions from the data to use in filters.
  useEffect(() => {
      setCountriesList([...countriesData])
      countriesData.forEach((country)=> {
          regionList = [...regionList, country.region]
          languagesList = [...languagesList, ...Object.keys(country.languages).map((lang)=>`${country.languages[lang]}`)]
      })
      regionList = [...new Set(regionList)]
      languagesList = [...new Set(languagesList)]
  }, [])

  //Once we have a list of regions, we can create a filter with it
  function generateFilter(regionList,languagesList,drivingSideList,populationList,areaList){
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

    return workingList
  }
  useEffect(() => {
    //GENERATE FILTER OBJECT
    //This object can be expanded to allow other types of filtration

    setFilterConditions(generateFilter(regionList,languagesList,drivingSideList,populationList,areaList))
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
      newList = [...countriesData]
      setFilterActive(false)
    } else {
      setFilterActive(true)
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
  /* This handles where a comparison tickbox is clicked. It finds the country that was clicked,  */
  function handleComparison(name){
    const dataCopy = [...countriesList]
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
    const clearedData = countriesData.map((country)=>{return{...country, compare:false}})
    console.log(clearedData)
    setCountriesData(clearedData)
    setComparedCountries([])
  }
  /* The below useEffect was needed to deal with another odd bug. Despite both countriesData and countriesList previously being set to
  clearedData above, the second one appeared to not fire. It wasn't that it fired too slowly; I checked and saw that the data was
  unchanged using test buttons well after I would've expected the operation to complete. The comparedCountries one worked fine.
  As the above code is the only place where setCountriesData is used (other than on App load) this workaround appears to work.*/
  useEffect(()=>{
    setCountriesList(countriesData)
    filterAndSearch(searchTerm, filterConditions)
  },[countriesData])
  
  function handleClearFilters (){
    setFilterActive(false)
    setFilterConditions(()=> generateFilter(regionList,languagesList,drivingSideList,populationList,areaList))
  }
  useEffect(()=>{
    if (!filterActive){
      filterAndSearch(searchTerm,filterConditions)
    }
  },[filterConditions])
  

  return !loading ? (
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
          countries={countriesList}
          handleComparison={handleComparison}
          />

        {showCompareWindow && 
        <CompareWindow
          raiseCompareWindow={raiseCompareWindow}
          setRaiseCompareWindow={setRaiseCompareWindow}
        />}

    </>
  ) : <span>Loading...</span>
}

export default CountriesPage;
