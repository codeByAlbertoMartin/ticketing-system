import request from 'supertest';
import app from '../app.js';
import User from '../models/User.js';
import mongoose from 'mongoose';
import server from '../server.js';
import Ticket from '../models/Ticket.js';

describe('User API Tickets', () => {
    
    let token;

    beforeAll(async () => {
        await User.deleteMany();
        const response = await request(app)
            .post('/api/users/signup')
            .send({
                name: "Test User",
                email: "test@gmail.com",
                password: "12345678",
                role: "user"
            });
        token = response.body.token
    });

    beforeEach(async () => {
        await Ticket.deleteMany();
    })

    afterAll(async () => {
        server.close();
        await mongoose.connection.close();
    });

    test("Create a new ticket", async () => {
        const response = await request(app)
            .post('/api/tickets')
            .send({
                title: "Test Ticket",
                description: "This is a test ticket",
                status: "open",
                priority: "high"
            })
            .set('Authorization', `Bearer ${token}`); 
        expect(response.status).toBe(201);
        expect(response.body.ticket).toHaveProperty('title');
    })



})
    
