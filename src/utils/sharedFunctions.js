import { useEffect, useRef } from "react"

export const capitalise = (string)=>{
    return string.charAt(0).toUpperCase() + string.slice(1)
}

export const useClickOutside = (actionOnClickOutside)=>{
  const domNode = useRef()

  useEffect(()=>{
      const clickOutsideBehaviour = (event) =>{
          if (!domNode.current.contains(event.target)){
              actionOnClickOutside()
          }
      }
      document.addEventListener("mousedown", clickOutsideBehaviour)
      
      return () => {
          document.removeEventListener("mousedown", clickOutsideBehaviour)
      }
  })
  return domNode
}

  //GENERATE FILTER OBJECT
  //This object can be expanded to allow other types of filtration
export function generateFilter(countriesData,drivingSideList, UNMemberList, landlockedList, populationList,areaList){
    let filterObject = 
    {
      region:[],
      subregion:[],
      totalPopulation:[],
      totalArea:[],
      drivingSide:[],
      UNMember:[],
      landlocked:[],
      languages:[]
    }

    let regionList = []
    let subregionList = []
    let languagesList = []
    
    countriesData.forEach((country)=>{
      regionList.push(country.region)
      subregionList.push(country.subregion)
      languagesList.push(Object.keys(country.languages).map((lang)=>`${country.languages[lang]}`))
    })
    
    regionList = [...new Set(regionList.sort())]
    subregionList = [...new Set(subregionList.sort())]
    languagesList = [...new Set(languagesList.flat().sort())]

    regionList.map((region)=>{
      filterObject.region.push({name:region, checked:false})
    })
    subregionList.map((subregion)=>{
      if (subregion !== ""){
      filterObject.subregion.push({name:subregion, checked:false})}
    })
    populationList.map((pop)=>{
        filterObject.totalPopulation.push({...pop})
    })
    areaList.map((area)=>{
        filterObject.totalArea.push({...area})
    })
    drivingSideList.map((side)=>{
        filterObject.drivingSide.push({name:side, checked:false})
    })
    UNMemberList.map((UNMember)=>{
        filterObject.UNMember.push({...UNMember})
    })
    landlockedList.map((landlocked)=>{
        filterObject.landlocked.push({...landlocked})
    })
    languagesList.map((lang)=>{
      filterObject.languages.push({name:lang, checked:false})
    })
    return filterObject
  }
