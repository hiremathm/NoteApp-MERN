const User = require('../models/user')

const authenticateUser = function(req, res, next){
    const token = req.header('x-auth')
    if(token){
        User.findByToken(token)
            .then(user => {
                if(user){
                    req.user = user
                    req.token = token
                    next()                    
                }else{
                    res.status('401').send({message: 'Invalid Token'})
                }
            })
            .catch(error => {
                res.status('401').send(error)
            })
    }
    else{
        res.status('401').send({message: "Unauthorized user"})
    }
}

module.exports = authenticateUser