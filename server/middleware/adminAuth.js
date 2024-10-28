const Users=require('../model/userSchema')

const adminAuth = async (req, res, next) => {
    try {
        const user = await Users.findOne({
            _id:req.user.id
        })
        if (user && user.role === "admin") {
            return next();
          } else {
            return res.status(403).json({ message: "Access denied. Admins only." });
          }
    } catch (error) {
        return res.status(500).json({msg:error.message})
    }
}

module.exports=adminAuth



  