import mongoose from "mongoose";

// how our document look like
const userSchema = mongoose.Schema({
  email: {
    type:String,
    unique:true
  },
  password: String,
});

// we need to turn it into a model
const userSch = mongoose.model("user", userSchema);

export default userSch;
