const mongoose=require("mongoose")

const blacklistTokenSchema= new mongoose.Schema({
        // yaha par huyme voh mokngoss schema types id se lena hoga\
        token:{
            type:String,
            require:[true, "token is required to be added in blacklist"]
        }

},{
    timestamps:true
})

const tokenBlacklistModel= mongoose.model("blackListTokens",blacklistTokenSchema)

module.exports=tokenBlacklistModel