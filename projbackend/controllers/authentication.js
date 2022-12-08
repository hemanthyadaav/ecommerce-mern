const User = require("../models/user")
const { body, validationResult } = require('express-validator');


exports.signup = (req,res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ parameter: errors.array()[0].param , error: errors.array()[0].msg});
    }
    

    const user = new User(req.body)
    user.save((err, user) => {
        if(err){
            return res.status(400).json({
                err: "Not able to save user in DB"
            })
        }
        return res.json({
            name: user.firstName + " " + user.lastName, 
            email: user.email, 
            id: user._id,
        });
    })
}

exports.signout = (req,res) => {
    return res.json({
        message: "User Signout!"
    })
}

