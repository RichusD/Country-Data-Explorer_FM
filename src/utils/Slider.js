/* Known issues:
Increment division causing problems
Validation needed to disallow letters in input fields for Mozilla
Round numbers to nearest 100
Validation works too quickly, need to give someone the chance to make a mistake first

saksl */

import { useState, useEffect } from "react"

function Slider ({minValue, maxValue, minGap,increment}) {
    const [minSliderValue, setMinSliderValue] = useState(minValue)
    const [maxSliderValue, setMaxSliderValue] = useState(maxValue)
    const barChange = {
        left: `${((minSliderValue/maxValue)*100)}%`,
        right: `${(100-(maxSliderValue/maxValue)*100)}%`
    }

    function handleValueChange (e){
            if(e.target.className ==="range-min"){
                setMinSliderValue(Math.round(Number(e.target.value)/increment)*100)
            } else if (e.target.className ==="range-max"){
                setMaxSliderValue(Math.round(Number(e.target.value)/increment)*100)
            } else if (e.target.className ==="input-min"){
                if(e.target.value < minValue){
                    setMinSliderValue(minValue)
                } else{
                setMinSliderValue(Math.round(Number(e.target.value)/increment)*100)
                }
            } else if (e.target.className ==="input-max"){
                if(e.target.value > maxValue){
                    setMaxSliderValue(maxValue)
                }else{
                    setMaxSliderValue(Math.round(Number(e.target.value)/increment)*100)
                }
            }
        }

    useEffect(()=>{
        if (minSliderValue >= Number(maxSliderValue) - minGap){
            console.log(String(maxValue).length)
            setMinSliderValue(Number(maxSliderValue) - minGap)
        }
    },[minSliderValue])
    useEffect(()=>{
        if (maxSliderValue <= Number(minSliderValue) + minGap){
            setMaxSliderValue(Number(minSliderValue) + minGap)
        }
    },[maxSliderValue])
    
    
    return(
        <div className="slider-component">
            <div className="slider-wrapper">
                <div className="price-input">
                    <div className="field">
                        <span>Min</span>
                        <input 
                        type="number" 
                        className="input-min"
                        value={minSliderValue}
                        onChange={(e)=>handleValueChange(e)}
                        maxLength={String(String(maxValue).length)}
                        />
                    </div>
                    <div className="field">
                        <span>Max</span>
                        <input 
                        type="number" 
                        className="input-max" 
                        value={maxSliderValue}
                        onChange={(e)=>handleValueChange(e)}
                        maxLength={String(String(maxValue).length)}
                        />
                    </div>
                </div>
                <div className="slider">
                    <div 
                    style={barChange}
                    className="progress"
                    ></div>
                </div>
                <div className="range-input">
                    <input 
                    type="range" 
                    className="range-min"
                    min={minValue}
                    max={maxValue}
                    value={minSliderValue}
                    onChange={(e)=>handleValueChange(e)}
                    />
                    <input
                    type="range" 
                    className="range-max"
                    min={minValue}
                    max={maxValue}
                    value={maxSliderValue}
                    onChange={(e)=>handleValueChange(e)}
                    />
                </div>
            </div>

        </div>
    )
}

export default Slider

/* Notes on this slider:

This slider was based on a tutorial for a non-react slider, which I then adapted for react:

It works pretty well, save for the flickering when you move a slider beyond its counterpart 
i.e. when you move the min slider higher than the max for example, and the useEffect comes in to correct it.

Originally had the following as a style for the min and max sliders respectively in an attempt 
to change the length of the sliders dynamically, thus stopping the flickering. 

const maxSliderWidth = {
    left: `${(((Number(minSliderValue)+minGap)/maxValue)*100)}%`,
    width: `${(100-(((Number(minSliderValue)+minGap)/maxValue)*100))}%`,
}
const minSliderWidth = {
    right: `${(100-(((Number(maxSliderValue)-minGap)/maxValue)*100))}%`,
    width: `${(((Number(maxSliderValue)-minGap)/maxValue)*100)}%`,
}

I then set the min attribute of the max slider to minSliderValue, and the max attribute of 
the min slider to maxSliderValue. This worked to stop the flickering, but also caused the 
slider handles to drift when its counterpart was moved, which looked odd. Firefox also had 
an issue where if the max slider was moved to its lowest point, the min slider would dip lower slightly

I couldn't figure out a way to stop this drifting :(
I reverted back to the version that works, but flickers.
*/