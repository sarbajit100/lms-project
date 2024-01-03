
import { Schema, model } from "mongoose";
import  bcrypt  from "bcrypt";
import  jwt from "jsonwebtoken";


const userSchema = new Schema({
    fullName: {
        type: 'string',
        required: [true, 'Name is required'],
        minLength: [5, 'name must be at least 5 charchter'],
        maxLength: [50, 'name must be at least 5 charchter'],
        lowercase: true,
        trim: true,
    },
    email: {
        type: 'string',
        required: [true, 'email is required'],
        lowercase: true,
        trim: true,
        unique: true,
        
    },
    password: {
        type: 'string',
        required: [true, 'email is required'],
        minLength: [8, 'email must be at least 8 charchter'],
        
        select: false,
    },
    avatar: {
        public_id:{
            type: 'string'
        },
        secure_url:{
            type: 'string'
        },
    },
    role: {
        type: 'string',
        enum:['USER', 'ADMIN'],
        default: 'USER'
    },
    forgetPasswordToken: String,
    forgetPasswordExpiry: Date,
    
},{
    timestamps: true
});

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
})

userSchema.methods = {
    generateJWTToken: function () {
        return jwt.sign(
            {id: this._id, email: this.email, subscription: this.subscription, role: this.role},
            process.env.JWT_SECRET,
            {
            expiresIn: process.env.JWT_EXPIRY,
            }
        );
    },
    comparePassword: async function (plainTextPassword) {
        return await bcrypt.compare(plainTextPassword, this.password)
    },
    // generatePasswordResetToken:  function () {
    //     const resetToken = crypto.randomBytes(20).toString('hex');

    //     this.forgetPasswordToken = '';
    //     this.forgetPasswordExpiry = Date.now() + 15 * 60 *1000
    // }
}

const User = model('user', userSchema);


export default User;