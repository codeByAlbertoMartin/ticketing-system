import express from 'express';
import Ticket from '../models/Ticket.js';
import auth from '../middlewares/auth.js';
import admin from '../middlewares/admin.js';
import { parse } from 'dotenv';
import buildFilter from '../middlewares/filter.js';
import paginate from '../middlewares/paginate.js';

const router = express.Router();

//GET /api/tickets
//GET /api/tickets?pageSize=10&page=1
//GET /api/tickets?search=issue
//GET /api/tickets?status=open&priority=high
// Public
router.get("/", buildFilter, paginate(Ticket), async (req, res) => {
    res.status(200).json(req.paginatedResults)
})

//Create a new ticket
// POST /api/tickets
//Private (only authenticated users can create tickets)
//Ticket Schema: { user, title, description, status, priority }
router.post("/", auth, async (req, res) => {
    console.log("Creating a new ticket with data:", req.body);
    const ticket = new Ticket({ //req.user._id viene del verified de auth.js
        user: req.user._id, // Assuming user is passed in the request body
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        priority: req.body.priority,
    });
    try{

        const savedTicket = await ticket.save();
        res.status(201).json({ message: "Ticket created successfully", ticket: savedTicket });
    } catch(err) {
        console.log ("dsjkaljsdhajksd")
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
})

// Get a specific ticket by ID
//GET /api/tickets/:id
// Public
router.get("/:id", async (req, res) => {
    try{
        const ticket = await Ticket.findOne({ id: req.params.id });
        if (!ticket) {
            return res.status(404).json({ message: "Ticket not found" });
        }
        res.status(200).json({ ticket: ticket });

    } catch(err) {
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
})

// Update a specific ticket by ID
// PUT /api/tickets/:id
// Private (only authenticated users can update tickets)
// Ticket Schema: { user, title, description, status, priority }
router.put("/:id",auth, async (req, res) => {
    const updates = req.body;
    try{
        const ticket = await Ticket.findOneAndUpdate(
            { id: req.params.id },
            updates,
            { new: true, runValidators: true } // Return the updated document and validate
        );
        if (!ticket) {
            return res.status(404).json({ message: "Ticket not found" });
        }
        res.status(200).json({ message: "Ticket updated successfully", ticket: ticket });
    }catch(err) {
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
})

// Delete a specific ticket by ID
// Private (only authenticated users can delete tickets)
// DELETE /api/tickets/:id
router.delete("/:id", [auth, admin], async (req, res) => {
    try {
        const ticket = await Ticket.findOneAndDelete({ id: req.params.id });
        if (!ticket) {
            return res.status(404).json({ message: "Ticket not found" });
        }
        res.status(200).json({ message: "Ticket deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
})

export default router;
