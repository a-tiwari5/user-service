const request = require('supertest');
const app = require('../app');
const User = require('../models/user.model');

// Mock User model methods to avoid real DB interaction
jest.mock('../models/user.model');

describe('User Routes', () => {
  describe('POST /api/v1/users', () => {
    test('should return 201 and successfully create new user if data is ok', async () => {
      const newUser = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      };

      User.isEmailTaken.mockResolvedValue(false);
      User.create.mockResolvedValue({ ...newUser, _id: 'someId', role: 'user' });

      const res = await request(app).post('/api/v1/users').send(newUser);

      expect(res.statusCode).toEqual(201);
      expect(res.body.data).toHaveProperty('name', newUser.name);
      expect(res.body.data).toHaveProperty('email', newUser.email);
    });

    test('should return 400 if email is already taken', async () => {
      const newUser = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      };

      User.isEmailTaken.mockResolvedValue(true);

      const res = await request(app).post('/api/v1/users').send(newUser);

      expect(res.statusCode).toEqual(400);
      expect(res.body.message).toEqual('Email already taken');
    });
  });

  describe('GET /api/v1/users', () => {
    test('should return 200 and apply the default query options', async () => {
      User.find.mockResolvedValue([]);

      const res = await request(app).get('/api/v1/users');

      expect(res.statusCode).toEqual(200);
      expect(res.body.data).toEqual([]);
    });
  });
});
