import mongoose from "mongoose";
import {v4 as uuidv4} from "uuid";
import User from "../models/User.js";
import Ticket from "../models/Ticket.js";

mongoose.connect("mongodb://localhost:27017/ticketing-db-test")
.then(() => {
    console.log("Connected to MongoDB");})
.catch((err) => {
    console.error("❌ Failed to connect to MongoDB:", err.message)})

const users =[
    {name: "user", role: "user", email: "user@email.com", password: "12345678"},
    {name: "admin", role: "admin", email: "admin@email.com", password: "12345678"}
]

const status = ["open", "in-progress", "closed"];
const priority = ["low", "medium", "high"];

async function deleteCollections() {
    await User.deleteMany({});
    console.log("Users collection deleted");
    await Ticket.deleteMany({});
    console.log("Tickets collection deleted");
}

async function createUsers() {
    for ( const userData of users) {
        const user = new User(userData);
        await user.save();
    }
}

async function createTickets() {
    const user = await User.find({});
    for (let i = 0; i < 10; i++) {
        const ticket = new Ticket({
            user: user[Math.floor(Math.random() * user.length)]._id,
            title: `Ticket ${i + 1}`,
            description: `Description for ticket ${i + 1}`,
            status: status[Math.floor(Math.random() * status.length)],
            priority: priority[Math.floor(Math.random() * priority.length)],
        });
        await ticket.save();
    }
}

async function populateDB() {
    await deleteCollections();
    await createUsers();
    await createTickets();
    console.log("Database populated successfully");
    mongoose.disconnect
          
}

populateDB();