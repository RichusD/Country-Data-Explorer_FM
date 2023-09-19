import {TiTick} from "react-icons/ti"
import { motion, AnimatePresence } from "framer-motion"
import { capitalise, useClickOutside } from "../utils/sharedFunctions"

function FilterSidebar ({showFilter, setShowFilter, handleFilterClick,filterConditions}) {
    
    const outsideRef = useClickOutside(() => setShowFilter(false))


    return ( 
        <motion.div key={"mahsajsha"} initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity:0}} className={!showFilter ? "hide":"darkness"}>
            <motion.div key={"alkjsakj"} initial={{x: "100vw"}} animate={{x:0}} transition={{type: "linear", ease:"easeOut", duration: 0.2}} exit={{x: "100vw"}} ref={outsideRef} className={!showFilter ? "hide":"filter-sidebar-container"}>
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
            </motion.div>
        </motion.div>
    )
}

export default FilterSidebar