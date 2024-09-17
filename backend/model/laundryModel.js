import mongoose from 'mongoose';


const laundrySchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    prices:[
        {
            name:{
                type:String
            },
            price:{
                type:Number
            }
        }
    ]
})


const Laundry = mongoose.model('Laundry', laundrySchema);

export default Laundry;