const jwt = require("jsonwebtoken");

const auth = (req,res,next)=>{

    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({msg:"Login Required"});
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch(err){
        res.status(401).json({msg:"Invalid Token"});
    }
};

module.exports = auth;