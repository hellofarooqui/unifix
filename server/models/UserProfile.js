import mongoose, { Schema } from "mongoose";

const userProfileSchema = new mongoose.Schema({
    user: { type: Schema.Types.ObjectId , ref : "User"},
    mobile: {type : String}

})

const UserProfile = mongoose.Model( userProfileSchema, "UserProfile")

export default UserProfile