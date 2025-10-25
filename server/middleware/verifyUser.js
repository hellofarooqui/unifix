import jwt from 'jsonwebtoken'

const verifyUser = (req,res,next) => {
    const token = req.headers["authorization"].split(" ")[1]
    //console.log("Token", token)
    const user = jwt.verify(token,"aksdajksdASdajh")
    if(user){
        //console.log("User",user)
        req.user = user.id
        next()
    }
    else return res.status(403).json({msg:"Invalid Token"}) 
}

export default verifyUser