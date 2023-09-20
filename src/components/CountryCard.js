import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { filterVariants } from "../utils/animationVariants";

function CountryCard({flag, flagAlt, name, population, region, capital, code, comparison, handleComparison}) {

  return (
    <AnimatePresence>
    <motion.div 
    variants={filterVariants}
    initial="hidden"
    animate="visible"
    layout

    className="card">
        <img className="flag-image" src={flag} alt={flagAlt} preserveAspectRatio="false"></img>
        <div className="card-text">
            <Link to={`/countries/${code}`}><h3 className="countrycard-title">{name}</h3></Link>
            <p className="card-details"><span>Population: </span>{population.toLocaleString("en-US")}</p>
            <p className="card-details"><span>Region: </span>{region}</p>
            <p className="card-details"><span>Capital: </span>{capital.map((cap)=>`${cap}`).join(", ")}</p>
            <div className="blackline"> </div>
            <div className="card-details card-details-checkbox">
              <p><span>Compare? </span></p><input type="checkbox" checked={comparison} onChange={()=> handleComparison(name)}></input>
            </div>
        </div>
    </motion.div>
    </AnimatePresence>
  );
}

export default CountryCard;