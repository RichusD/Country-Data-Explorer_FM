import {BsChevronDown} from "react-icons/bs"

import mg from "../images/mag-glass.png"
import FilterSidebar from "./FilterSidebar"
import React from "react"

function SearchFilter({
  showCompareWindow,
  showDropdown, 
  setShowDropdown, 
  handleFilterClick, 
  filterConditions, 
  searchText, 
  handleSearch,
  handleClearComparisons
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
      <div className="filter-buttons-wrapper">
        {showCompareWindow && <button onClick={() => handleClearComparisons()} className="clear-comparison-button">Clear Comparisons</button>}
        <button onClick={() => setShowDropdown(!showDropdown)} id="filter-button">Filter by Region <BsChevronDown className="filter-button-chevron"/></button>
      </div>
      <FilterSidebar setShowDropdown={setShowDropdown} showDropdown={showDropdown} filterConditions={filterConditions} handleFilterClick={handleFilterClick}/>
    </div>
  );
}

export default SearchFilter;