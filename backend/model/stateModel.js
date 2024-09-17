import mongoose from 'mongoose';


const stateSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    districts:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'District'
    }]
})


const State = mongoose.model('State', stateSchema);

export default State;