import { useContext } from "react"
import {motion} from "framer-motion"
import {TiTick} from "react-icons/ti"

import { useClickOutside } from "../utils/sharedFunctions"
import { SortContext } from "../utils/Contexts"



function SortDropdown({setShowSort, handleSortClick}){

    const {sortOptions} = useContext(SortContext)

    const sortWindow = useClickOutside(()=>{
        setShowSort(false)})
    
    return (
        <motion.div initial={{y: -10,opacity: 0}} animate={{y:0, opacity: 1}} transition={{duration: 0.1}} exit={{y: -10,opacity: 0}} ref={sortWindow} className="dropdown-container">
            {sortOptions.map((option)=>{
                return(
                <div 
                    key={Math.random()}
                    data-sortoption={option.name}
                    onClick={(event)=>{handleSortClick(event); setShowSort(false)}}
                    className={`${option.checked ? "dropdown-item-checked" : "dropdown-item"}`}
                >
                    <p>{option.name}</p> {option.checked ? <TiTick/> : ""}
                </div>
                )
            })}
        </motion.div>
    )
}

export default SortDropdown