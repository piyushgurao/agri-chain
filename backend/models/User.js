import mongoose from "mongoose"
import bcrypt from "bcryptjs"

// Schema = blueprint of what a user looks like in database
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true, // removes extra spaces
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true, // no two users can have same email
      lowercase: true, // always store as lowercase
      trim: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
    },

    role: {
      type: String,
      enum: ["farmer", "processor", "warehouse", "retailer", "admin"],
      // enum means → only these 5 values are allowed, nothing else
      default: "farmer",
    },
  },
  {
    timestamps: true,
    // timestamps automatically adds →
    // createdAt (when user registered)
    // updatedAt (when user last updated)
  }
)

// -----------------------------------------------
// This runs BEFORE saving user to database
// It scrambles the password automatically
// -----------------------------------------------
userSchema.pre("save", async function () {
  // only scramble if password was changed or is new
  if (!this.isModified("password")) return ;

  // bcrypt scrambles password with strength of 10
  // 10 means how many times it scrambles — more = safer but slower
  this.password = await bcrypt.hash(this.password, 10)
 
})

// -----------------------------------------------
// Custom method to check password at login time
// -----------------------------------------------
userSchema.methods.comparePassword = async function (enteredPassword) {
  // bcrypt compares entered password with scrambled one
  // returns true if match, false if not
  return await bcrypt.compare(enteredPassword, this.password)
}

// Create model from schema
const User = mongoose.model("User", userSchema)

export default User