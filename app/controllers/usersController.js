const User = require('../models/user')
const Note = require('../models/note')
const multer = require('multer')

module.exports.users = (req, res) => {
    User.find()
        .then(users => {
            res.json(users)
        })
        .catch(error => {
            res.json(error)
        })
}

module.exports.create = async (req,res) => {
    const body = req.body
    
    let user = await User.findOne({email: body.email})
        
    if(user){
        res.send({errors:'Email already exists, Please try login!'})
    }else{
        let newuser = new User(body)
        newuser.save()
            .then(user => {
               res.json(newuser)
            })
            .catch(error=> {
                res.json(error)
            })
    }
}

module.exports.login = (req, res) => {
    const body = req.body
    User.findByCredentials(body)
        .then(user => {
            return user.generateToken()
        })
        .then(token => {
            console.log("token is ", token)
            res.send({token})
            // res.setHeader('x-auth', token).send()
        })
        .catch(error => {
            res.send(error)
        })

    // User.findOne({email: body.email})
    //     .then(user => {
    //         if(!user){
    //             res.status('404').send({message: "Invalid Email / Password"})
    //         }

    //         bcryptjs.compare(body.password,user.password)
    //             .then(function(result){
    //                 if(result){
    //                     res.send({message: "User successfully logged in"})
    //                 }else{
    //                     res.send({message: "Invalid Email / Password"})
    //                 }
    //             })
    //             .catch(function(error){
    //                 res.send(error)
    //             })
    //     })
    //     .catch(error => {
    //         res.json(error)
    //     })
}

module.exports.account = (req, res) =>{
    const {user} = req
    

    res.send(user)
    // const token = req.header('x-auth')
    // if(token){
    //     User.findByToken(token)
    //         .then(user => {
    //             res.send(user)
    //         })
    //         .catch(error => {
    //             res.status('401').send(error)
    //         })
    // }
    // else{
    //     res.status('401').send({message: "Unauthorized user"})
    // }
}

module.exports.logout = (req, res) => {
    const { user , token}= req       
    User.findByIdAndUpdate(user._id, {$pull: {tokens: {token: token}}})
        .then(user => {
            res.send({message:"Successfully Logged Out"})
        })
        .catch(error => {
            res.send(error)
        })
}

module.exports.update = (req,res) => {
    const body = req.body
    const id = req.params.id 
    User.findByIdAndUpdate(id, {$set: body},{new: true, runValidators: true})
        .then(user => {
            res.json(user)
        })
        .catch(error=> {
            res.json(error)
        })
}

module.exports.show = (req, res) => {
    const id = req.params.id
    Promise.all([User.findById(id), Note.find({user: id})])
        .then(response => {
            res.json({user: response[0], notes: response[1]})
        })
        .catch(error => {
            res.json(error)
        })
}

module.exports.delete = (req, res) => {
    const id = req.params.id
    User.findByIdAndDelete(id)
        .then(user => {
            res.json(user)
        })
        .catch(error => {
            res.json(error)
        })
}

const upload = multer({
    dest:'client/src/images', 
    limits: {fileSize: 10000000, files: 1},
    fileFilter:  (req, file, callback) => {
    
        if (!file.originalname.match(/\.(jpg|jpeg)$/)) {

            return callback(new Error('Only Images are allowed !'), false)
        }

        callback(null, true);
    }
}).single('image')


module.exports.upload = (req, res) => {
    upload(req, res, function (err) {
        if (err) {
            res.status(400).json({message: err.message})
        } else {
            let path = `../../images/${req.file.filename}`
            res.status(200).json({message: 'Image Uploaded Successfully !', path: path})
        }
    })
}

