const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// create Schema for user profile

const ProfileSchema = new Schema({
    // associate user with profile
    user:{
        type:Schema.Types.ObjectId,
        ref:"users"
    },
    handle:{
        type: String,
        required:true,
        max: 50
    },
    website:{
        type:String
    },
    location:{
        type:String
    },
    bio:{
        type:String
    },
    social:{
        soundcloud:{
            type:String
        },
        youtube:{
            type:String
        },
        facebook:{
            type:String
        },
        twitter:{
            type:String
        },
        instagram:{
            type:String
        }

    },

    date:{
        type:Date,
        default:Date.now
    }
});

module.exports = Profile = mongoose.model("profile",ProfileSchema)