const jwt = require('jsonwebtoken')
const auth = async (req, res, next) => {
    const { authorization } = req.headers
    console.log("Authorization header:", authorization); 

    if (authorization) {
        const token = authorization.split(' ')[1]
        console.log("JWT token", token);
        if (token) {
            try {
                const userInfo = await jwt.verify(token, process.env.JWT_SECRET)
                req.userInfo = userInfo
                next()
            } catch (error) {
                return res.status(401).json({ message: 'unauthorized' })
            }
        } else {
            return res.status(401).json({ message: 'unauthorized' })
        }
    } else {
        return res.status(401).json({ message: 'unauthorized' })
    }

}

module.exports = auth;