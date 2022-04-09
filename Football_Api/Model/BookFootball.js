const mongoose= require('mongoose');

const BookFootballSchema=new mongoose.Schema(
    {

    customer:{ type: String,required: true},
    phone:{ type: String,required: true},
    pitchName:{ type: String,required:true},
    startTime:{ type: String,required: true},
    date:{ type: String,required: true},
    price:{ type: String,required: true},
    comment:{ type: String,},
    username:{ type: String, required: true}

    },
    {collection:"Bill"}
)

const BookFootballPitch= mongoose.model("BookFootballSchema",BookFootballSchema);

module.exports=BookFootballPitch;
