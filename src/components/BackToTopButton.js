import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const buttonVariants = {
    hover: {
        originX: 0,
        opacity: 1,
        backgroundColor: "#b33232",
        scale: 1.3,
        translateX: "-15%",
        transition: {
            repeat: Infinity,
            repeatType: "reverse",
            repeatDelay: 0,
            duration: 0.4
        }
    }
}

function BackToTopButton (){
    const [buttonVisible, setButtonVisible] = useState(false)
    
    useEffect(()=>{
        const makeButtonVisible = () =>{
            if (window.scrollY >300 && !buttonVisible){
                setButtonVisible(true)
            } else{
                setButtonVisible(false)
            }
        }
        window.addEventListener("scroll", makeButtonVisible)

        return () =>{
            window.removeEventListener("scroll", makeButtonVisible)
        }     
    },[])

    const scrollUp = () => {
        window.scrollTo({
            top:0,
            behavior: "smooth"
        })
    }
    
    return (
        <motion.div className="back-to-top-container">
            <AnimatePresence>
            {buttonVisible && 
            <motion.button variants={buttonVariants} initial={{opacity:0, y:-20}} animate={{opacity:0.7, y:0}} exit={{opacity:0}}whileHover="hover" className="back-to-top-button" onClick={()=>scrollUp()}>^</motion.button>
            }
            </AnimatePresence>
        </motion.div>
    )
}

export default BackToTopButton