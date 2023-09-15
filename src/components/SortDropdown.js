import { useContext } from "react"
import {TiTick} from "react-icons/ti"

import { useClickOutside } from "../utils/sharedFunctions"
import { SortContext } from "../utils/Contexts"



function SortDropdown({setShowSort, handleSortClick}){

    const {sortOptions} = useContext(SortContext)

    const sortWindow = useClickOutside(()=>{
        setShowSort(false)})
    
    return (
        <div ref={sortWindow} className="dropdown-container">
            {sortOptions.map((option)=>{
                return(
                <div 
                    key={Math.random()}
                    data-sortoption={option.name}
                    onClick={(event)=>handleSortClick(event)}
                    className={`${option.checked ? "dropdown-item-checked" : "dropdown-item"}`}
                >
                    <p>{option.name}</p> {option.checked ? <TiTick/> : ""}
                </div>
                )
            })}
        </div>
    )
}

export default SortDropdown