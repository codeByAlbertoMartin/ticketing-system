import mongoose from "mongoose";
import {v4 as uuidv4} from "uuid";

const  ticketSchema = new mongoose.Schema({
    id: {type: String, default: uuidv4, required: true},
    user: {type:String, required: true},
    createdAt: {type: Date, default: Date.now},
    title: {type: String, required: true},
    description: {type: String, required: true},
    status: {type: String, enum: ['open', 'in-progress','closed'], default: 'open'},
    priority: {type: String, enum: ['low', 'medium', 'high'], default: 'low'},
    
},{
    toJSON: {
        transform: (doc, ret) => {
            delete ret._id; // Remove _id field
            delete ret.__v; // Remove __v field
        },
        virtuals: true
    } 
})



ticketSchema.index({id:1, user:1});

const Ticket = mongoose.model('Tickect', ticketSchema);

export default Ticket;