import React from "react"
import {BsChevronDown} from "react-icons/bs"

import mg from "../images/mag-glass.png"
import FilterSidebar from "./FilterSidebar"


function SearchFilter({
  showCompareWindow,
  showDropdown, 
  setShowDropdown, 
  handleFilterClick, 
  filterConditions, 
  searchTerm, 
  handleSearch,
  handleClearComparisons,
  filterActive,
  handleClearFilters
}) 

{

  return (
    <div className="sf-container">
        <div className="searchbox">
            <img className="mag-icon" src={mg} alt="magnifying glass"/>
            <input 
              placeholder="Search for a country"
              value={searchTerm}
              onChange={(e)=> handleSearch(e)}
              />
        </div>
      <div className="filter-buttons-wrapper">
        {filterActive && <button onClick={() => handleClearFilters()} className="clear-comparison-button">Clear Active Filters</button>}
        {showCompareWindow && <button onClick={() => handleClearComparisons()} className="clear-comparison-button">Clear Comparisons</button>}
        <button onClick={() => setShowDropdown(!showDropdown)} className="filter-button">Filter by Region <BsChevronDown className="filter-button-chevron"/></button>
      </div>
      <FilterSidebar setShowDropdown={setShowDropdown} showDropdown={showDropdown} filterConditions={filterConditions} handleFilterClick={handleFilterClick}/>
    </div>
  );
}

export default SearchFilter;