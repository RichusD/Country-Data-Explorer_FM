import {TiTick} from "react-icons/ti"

function FilterSidebar ({showDropdown, setShowDropdown, handleFilterClick,filterConditions}) {
    return ( 
        <div className={!showDropdown ? "hide":"darkness"} onClick={()=> setShowDropdown(!showDropdown)}>
            <div className={!showDropdown ? "hide":"filter-sidebar-container"}>
                    {Object.keys(filterConditions).map((category)=>{
                        return (
                            <div>
                                <h2>{category.toUpperCase()}</h2>
                                <div className="filter-options-container">
                                    {filterConditions[category].map((r)=>{
                                        if (r.checked) {
                                            return (
                                                <div key={Math.random()} onClick={(event)=> handleFilterClick(event, r.name)} className={`filter-sidebar-item ${category}`}>
                                                    <li key={Math.random()}>{r.name}</li>
                                                    <TiTick key={Math.random()} />
                                                </div>
                                            )
                                        } else{
                                            return (
                                                <div key={Math.random()} onClick={(event)=> handleFilterClick(event, r.name)} className={`filter-sidebar-item ${category}`}>
                                                    <li key={Math.random()}>{r.name}</li>
                                                </div>
                                            )
                                        }            
                                    })}
                                </div>
                            </div>
                        )
                    })}
            </div>
        </div>
    )
}

export default FilterSidebar