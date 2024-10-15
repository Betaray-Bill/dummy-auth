import mongoose from 'mongoose';
import BaseUserSchema from './baseUserModel.js';

const adminSchema = new mongoose.Schema({
    adminLevel: {
        type: Number,
        required: true,
        default: 1
    },
    permissions: {
        type: [String], // Array of permissions
        default: ['read', 'write', 'delete'] // default admin permissions
    }
});

// Use the discriminator to create the Admin model based on BaseUserSchema
const Admin = BaseUserSchema.discriminator('Admin', adminSchema);

export default Admin;