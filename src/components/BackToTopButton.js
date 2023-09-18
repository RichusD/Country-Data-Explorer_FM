import { useState, useEffect } from "react"

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
        <div className="back-to-top-container">
            {buttonVisible && 
            <button className="back-to-top-button" onClick={()=>scrollUp()}>^</button>
            }
        </div>
    )
}

export default BackToTopButton