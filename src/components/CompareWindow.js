import { useContext } from "react"
import { motion, AnimatePresence } from "framer-motion"

import "../pages/styles.css"
import RaisedCompareWindow from "./RaisedCompareWindow"
import { ComparedCountriesContext, CountriesContext } from "../utils/Contexts"

function CompareWindow ({raiseCompareWindow, setRaiseCompareWindow}) {

    const {comparedCountries} = useContext(ComparedCountriesContext)

/* Encountered a weird error where if I used setRaiseCompareWindow(true) to set the raiseCompareWindow variable, it would work once and wouldn't
change again if a button did the opposite. I had to change setRaiseCompareWindow(true) to setRaiseCompareWindow(!raiseCompareWindow) for the
button to work. No idea why but a button that just used (false) would not work under any circumstances.*/
    return (
        <>
        {!raiseCompareWindow &&
        <motion.div initial={{y:30, opacity:0}} animate={{y:0,opacity: 1, transition:{ease: "easeOut", duration: 0.3} }}  key={"djksjdgjhk"} exit={{y:30, opacity:0, transition:{ease:"easeIn",duration: 0.1} }}
        className="comparison-window-inactive" onClick={()=>setRaiseCompareWindow(!raiseCompareWindow)}>
            <h2 className="comparison-heading">{`Compare ${comparedCountries.length} Countries`}</h2>
        </motion.div>}
        <AnimatePresence>
        {raiseCompareWindow &&
        <motion.div initial={{opacity:0}} exit={{opacity:0}} animate={{opacity:1}} transition={{duration:0.2}}className="darkness"> </motion.div>}
        </AnimatePresence>
        <AnimatePresence>
        {raiseCompareWindow &&
        <RaisedCompareWindow raiseCompareWindow={raiseCompareWindow} setRaiseCompareWindow={setRaiseCompareWindow}/>}
        </AnimatePresence>
        </>
    )
}

export default CompareWindow