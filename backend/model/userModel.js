// import mongoose, { mongo } from 'mongoose';
// import bcrypt from 'bcryptjs';
// import BaseUserSchema from './baseUserModel.js';


// const userSchema = new mongoose.Schema({
//     fullName: {
//         type: mongoose.Types.ObjectId,
//         ref: 'BaseUserSchema',
//         // type: String,
//         required: true
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     password: {
//         type: String,
//         required: true
//     },
//     isAdmin: {
//         type: Boolean,
//         default: false
//     },

// })

// userSchema.methods.matchPassword = async function(e) {
//     return await bcrypt.compare(e, this.password);
// }


// userSchema.pre('save', async function(next) {
//     if (!this.isModified('password')) {
//         next();
//     }

//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
// })


// const User = BaseUserSchema.discriminator('User', userSchema);

// export default User;