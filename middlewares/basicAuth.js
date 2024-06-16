function checkLoggedIn(req, res, next){

    if(global.user){
        req.user = global.user
        next()
     } else {
        res.status(401).json({message: "you must be logged in"})
     }
}

function checkRole(role) {
    return (req, res, next) => {
        if (req.user && req.user.role === role) {
            next(); 
        } else {
            res.status(403).json({ message: 'Access denied: Insufficient permissions' });
        }
    };
}



export {checkLoggedIn, checkRole}