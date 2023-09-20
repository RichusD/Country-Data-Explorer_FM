import { motion } from "framer-motion"
import { routeVariants } from "../utils/animationVariants"

function Homepage () {
    return(
        <motion.div className="homepage-container"
            variants={routeVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            >
            <h2>Here is some homepage text!</h2>
        </motion.div>
    )
}

export default Homepage