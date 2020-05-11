const mongoose = require('mongoose')
const validate = require('validator')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: {type: String, required: true},
    email: {
        type: String, required: true, unique: true,
        validate: function(value){
            return validate.isEmail(value)
        },
        message: function(){
            return 'invalid email format'
        }
        
    },
    mobile: {type: Number, required: true},
    password: {type: String, required: true},
    tokens: [
        {
            token: {
                type: String
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ]
})

// prehooks
UserSchema.pre('save', function(next){
    const user = this
    if(user.isNew){
        bcryptjs.genSalt(10)
        .then(function(salt) {
            bcryptjs.hash(user.password, salt)
                .then(function(encryptedPassword){
                    user.password = encryptedPassword
                    next()
                })
                .catch(function(error){
                    console.log("user password error", error)
                })
        })
        .catch(function(error){
            console.log("user password error", error)
        })
    }else{
        next()
    }
})
// instance method
UserSchema.methods.generateToken = function(){
    const user = this
    const tokenData = {
        "_id": user._id,
        "name": user.name,
        "email": user.email,
        "password": user.password
    }

    const token = jwt.sign(tokenData, 'jwt@123')
    
    user.tokens.push({token: token})

    return user.save()
        .then(user => {
            return Promise.resolve(token)
        })
        .catch(error => {
            return Promise.resolve(error)
        })
}

// static method
UserSchema.statics.findByToken = function(token){
    let tokenData 
    
    try {
        tokenData = jwt.verify(token,"jwt@123")
     }catch(error){
        return Promise.reject(error)
    }

    return User.findOne({'_id': tokenData._id,'tokens.token': token})
               .then(user => {   
                    return Promise.resolve(user)
               })
               .catch(error => {
                   return Promise.reject({errors: "No User Found"})
               })
}

UserSchema.statics.findByCredentials = function(body){
    const User = this
    return User.findOne({email: body.email})
        .then(function(user){
            if(!user){
                return Promise.reject({"errors": "Invalid Email / Password"})
            }
            
            return bcryptjs.compare(body.password, user.password)
                    .then(function(result){
                        if(result){
                            return Promise.resolve(user)
                        }else{
                            return Promise.reject({errors: "Invalid Email / Password "})
                        }
                    })
        })
        .catch(error => {
            return Promise.reject(error)
        })
}
const User = mongoose.model('User', UserSchema)

module.exports = User;