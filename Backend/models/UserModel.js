const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
      trim: true,
      match: [
        /[a-z0-9\._%+!$&*=^|~#%'`?{}/\-]+@([a-z0-9\-]+\.){1,}([a-z]{2,16})/,
        "Please enter a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
      minLength: [6, "Password must be up to 6 characters"],
      //   maxLength: [32, "Password must not exceed 32 characters"],
    },
    photo: {
      type: String,
      default:
        "https://images.pexels.com/photos/19383938/pexels-photo-19383938/free-photo-of-redhead-model-posing-in-brown-turtleneck.png?auto=compress&cs=tinysrgb&w=600",
    },
    phone: {
      type: String,
      default: "+91",
    },
    bio: {
      type: String,
      maxLength: [250, "Bio must not exceed 250 characters"],
      default: "bio",
    },
  },
  {
    timestamps: true,
  }
);

// Encrypt Password before saving to DB
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  // Hash Password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(this.password, salt);
  this.password = hashPassword;
});

const User = mongoose.model("User", userSchema);
module.exports = User;
