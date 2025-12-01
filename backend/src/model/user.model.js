import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    }, 

    fullName: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    studyClass: {
        type: Number,
        required: true,
    },

    interests: {
        type: String,
        required: true
    },

    profilePic: {
      type: String,
      default: "",
    },

    refreshToken: {
        type: String,
    }

  },
  { timestamps: true }
);

userSchema.pre('save', function (next) {
    if (!this.isModified("password")) return next();

    const user = this;
    bcrypt.hash(user.password, 10, (err, hash) => {
        if (err) {
            return next(err);
        }
        user.password = hash;
        next();
    });
});

userSchema.methods.isPasswordCorrect = async function (enteredPassword) {
    const user = this
    return await bcrypt.compare(enteredPassword, user.password)
}

userSchema.methods.generateRefreshToken = async function () {
    return jwt.sign({
        userId: this._id
    },

    process.env.REFRESH_TOKEN_KEY,
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    });
    
}

userSchema.methods.generateAccessToken = async function () {
    return jwt.sign({
        userId: this._id,
        email: this.email,
        username: this.username,
        name: this.name

    },
    process.env.ACCESS_TOKEN_KEY,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    });
}


const User = mongoose.model("User", userSchema);
export default User;