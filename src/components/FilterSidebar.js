import {TiTick} from "react-icons/ti"
import { capitalise, useClickOutside } from "../utils/sharedFunctions"

function FilterSidebar ({showFilter, setShowFilter, handleFilterClick,filterConditions}) {
    
    const outsideRef = useClickOutside(() => setShowFilter(false))


    return ( 
        <div className={!showFilter ? "hide":"darkness"}>
            <div ref={outsideRef} className={!showFilter ? "hide":"filter-sidebar-container"}>
                    {Object.keys(filterConditions).map((category)=>{
                        return (
                            <div key={Math.random()}>
                                <h2 className="filter-category">{category.toUpperCase()}</h2>
                                <div className="filter-options-container">
                                    {filterConditions[category].map((r)=>{
                                        if (r.checked) {
                                            return (
                                                <div key={Math.random()} data-filtercategory={category} onClick={(event)=> handleFilterClick(event, r.name)} className="filter-sidebar-item-selected">
                                                    <li>{capitalise(r.name)}</li>
                                                    <TiTick/>
                                                </div>
                                            )
                                        } else{
                                            return (
                                                <div key={Math.random()} data-filtercategory={category} onClick={(event)=> handleFilterClick(event, r.name)} className="filter-sidebar-item">
                                                    <li>{capitalise(r.name)}</li>
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