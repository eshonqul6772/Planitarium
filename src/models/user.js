 const mongoose = require('mongoose');
 const bcrypt = require('bcryptjs');
 const jwt = require('jsonwebtoken');




const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match:[
            /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
            'Please enter valid email'
        ]
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    adminStatus:{
        type: Boolean,
        default: false
    },
    apiKey:{
        type: String,
        unique:true,
        required: true
    },
    balance:{
        type: Number,
        default: 0
    },
    isActive:{
        type: Boolean,
        default: true 
    }
},{timestamps:true})


userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
       next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
});

userSchema.methods.checkPassword = async function(password){
    const isMatch = await bcrypt.compare(password, this.password)
    return isMatch
};


userSchema.methods.generateJwtToken = function(){
    return jwt.sign({id:this._id, email:this.email}, process.env.JWT_TOKEN,  {
        expiresIn: process.env.JWT_EXPIRE 
    })
}


module.exports = mongoose.model('User',  userSchema)