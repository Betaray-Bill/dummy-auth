import District from "../model/districtModel.js";
import State from "../model/stateModel.js";



// ADD NEW STATE
const addState = async(req, res) => {
    try{
        const {name} = req.body;
        console.log("State: " + name)
        const stateExists = await State.findOne({name});

        if(stateExists){
            return res.status(400).json({message:"exists"});
        }

        const state = await new State({name});
        await state.save();

        res.status(201).json(state);

    }catch(err){
        return res.status(500).json({message:err.message});
    }
}


// ADD DISTRICT AND UPDATE STATE
const addDistrict = async(req, res) => {
    try{
        const {stateName, districtName, laundries } = req.body;
        const state = await State.findOne({name: stateName});
        const districtExists = await District.findOne({name: districtName});
        if(!state){
            return res.status(404).json({message: "State not found"});
        }

        if(districtExists){
            return res.status(400).json({message: "district alread exists"});
        }

        const district = new District({name:districtName ,laundry:laundries});
        await district.save();
        const updateState = await State.findByIdAndUpdate(state._id, {
            $push: {districts: district._id}
        }, {new: true});

        await updateState.save()

        // ----------------------------
        // ----------------------------

        //------------- LAUNDRY DATA YET TO BE ADDED -------------- //

        console.log(laundries)


        // ----------------------------
        // ----------------------------


        res.status(201).json({district, state});


    }catch(err){
        return res.status(500).json({message:err.message});
    }
}



const getDistrictPrice = async(req, res) => {
    const {districtId} = req.params

    console.log(districtId)

    const district = await District.findById(districtId);

    return res.status(200).json({district})
}


const getDistrictByState = async(req, res) => {
    const {stateId} = req.params

    console.log(stateId)

    const state = await State.findById(stateId);

    console.log(state.districts)
    const districts = await District.find({_id: {$in: state.districts}});
    districts.map((e) => {
        console.log("District : ", e.name)
    })

    return res.status(200).json({districts})
}





export {
    addState, addDistrict, getDistrictPrice, getDistrictByState
}