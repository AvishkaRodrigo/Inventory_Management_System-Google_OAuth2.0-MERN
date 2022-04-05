import mongoose , {Schema} from "mongoose";

const userSchema = new Schema ( {
    googleID : { type : String, required : true},
    gmail: {type : String, required : true},
    displayName : {type : String, required : true},
    image : {type : String, required : true},
    firstName : {type : String, required : true},
    lastName : {type : String, required : true},   
},{
    timestamps : true
});

const User = mongoose.model("users", userSchema);

export default User;








