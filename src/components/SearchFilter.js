import {BsChevronDown} from "react-icons/bs"

import mg from "../images/mag-glass.png"
import FilterDropdown from "./FilterDropdown"
import FilterSidebar from "./FilterSidebar"
import React from "react"

function SearchFilter({
  showDropdown, 
  setShowDropdown, 
  handleFilterClick, 
  filterConditions, 
  searchText, 
  handleSearch
}) {

  return (
    <div id="sf-container">
        <div id="searchbox">
            <img id="mag-icon" src={mg} alt="magnifying glass"/>
            <input 
              placeholder="Search for a country"
              value={searchText}
              onChange={(e)=> handleSearch(e)}
              />
        </div>
      
      <button onClick={() => setShowDropdown(!showDropdown)} id="filter-button">Filter by Region <BsChevronDown className="filter-button-chevron"/></button>
      <FilterSidebar showDropdown={showDropdown} filterConditions={filterConditions} handleFilterClick={handleFilterClick}/>
    </div>
  );
}

export default SearchFilter;