import {React, useState} from "react"
import {BsChevronDown} from "react-icons/bs"

import mg from "../images/mag-glass.png"
import FilterSidebar from "./FilterSidebar"
import SortDropdown from "./SortDropdown"


function SearchFilter({
  showCompareWindow,
  handleFilterClick, 
  filterConditions, 
  searchTerm, 
  handleSearch,
  handleClearComparisons,
  filterActive,
  handleClearFilters,
  handleSortClick,
}) 
{
  const [showFilter, setShowFilter] = useState(false)
  const [showSort, setShowSort] = useState(false)

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
        <button onClick={() => showSort ? "" : setShowSort(!showSort)} className="sort-button">Sort <BsChevronDown/></button>
        <button onClick={() => setShowFilter(!showFilter)} className="filter-button">Filter</button>
      </div>
      {showSort && <SortDropdown setShowSort={setShowSort} handleSortClick={handleSortClick}/>}
      {showFilter && <FilterSidebar setShowFilter={setShowFilter} showFilter={showFilter} filterConditions={filterConditions} handleFilterClick={handleFilterClick}/>}
    </div>
  );
}

export default SearchFilter;