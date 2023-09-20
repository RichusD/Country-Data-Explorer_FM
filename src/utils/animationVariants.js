export const routeVariants ={
    hidden:{
        x:100,
        opacity:0,
    },
    visible:{
        x:0,
        opacity:1,
        transition:{
            duration: 0.2
        }
    },
    exit:{
        opacity:0,
        x:-100,
        transition:{
            duration: 0.2
        }
    }
}
export const filterVariants ={
    hidden:{
        y:-10,
        opacity:0,
    },
    visible:{
        y:0,
        opacity:1,
        transition:{
            duration: 0.2
        }
    },
    exit:{
        opacity:0,
        transition:{
            duration: 0.5
        }
    }
}