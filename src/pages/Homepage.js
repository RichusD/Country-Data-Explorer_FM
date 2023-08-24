import Slider from "../utils/Slider"

function Homepage () {
    return <Slider
    minValue={0}
    maxValue={100000}
    minGap={2000}
    increment={1000}
    />
}

export default Homepage