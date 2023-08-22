import {TiTick} from "react-icons/ti"

function FilterDropdown ({showDropdown, handleFilterClick,filterConditions}) {
    return ( 
        <div className={!showDropdown ? "hide":"dropdown-container"}>
            {filterConditions.region.map((r)=>{
                if (r.checked) {
                    return (
                        <div key={Math.random()} onClick={()=> handleFilterClick(r.name)} className="dropdown-item">
                            <li key={Math.random()}>{r.name}</li>
                            <TiTick key={Math.random()} />
                        </div>
                    )
                } else{
                    return (
                        <div key={Math.random()} onClick={()=> handleFilterClick(r.name)} className="dropdown-item">
                            <li key={Math.random()}>{r.name}</li>
                        </div>
                    )
                }            
            })}
        </div>
    )
}

export default FilterDropdown