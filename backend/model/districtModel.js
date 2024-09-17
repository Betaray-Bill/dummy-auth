import mongoose from 'mongoose';


const districtSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    laundry:[
        {
            name:String,
            price:Number,
            offerPrice:{
                type: Number,
                default: 0
            }
        }
    ],
})


const District = mongoose.model('District', districtSchema);

export default District;