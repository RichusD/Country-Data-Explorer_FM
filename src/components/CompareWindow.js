import "../pages/styles.css"

function CompareWindow ({comparedCountries, raiseCompareWindow, setRaiseCompareWindow}) {
    return (
        <div className={raiseCompareWindow ? `comparison-window-active` : `comparison-window-inactive`} onClick={()=>setRaiseCompareWindow(true)}>
            <h2 className="comparison-heading">Compare Countries</h2>
            <div className="comparison-grid">
                <h2 className="comparison-grid-item-header">Name</h2>
                {comparedCountries.map((country)=>{
                    <div className="comparison-grid-item">
                        <h3>{country.name.common}</h3>
                    </div>})}
                <h2 className="comparison-grid-item-header">Flag</h2>
                {comparedCountries.map((country)=>{
                    <div className="comparison-grid-item">
                        <h3>{country.name.common}</h3>
                    </div>})}
            </div>
        </div>

    )
}

export default CompareWindow