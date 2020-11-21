import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import colors from 'colors';
import connectDb from './config/db.js';

import usersRoutes from './api/routes/users.js';
import authRoutes from './api/routes/auth.js';
import recipeRoutes from './api/routes/recipes.js';

// Route Controllers

dotenv.config({ path: './config/config.env' });

connectDb();

// Middleware
const app = express();

// app.use(express.static(path.join(__dirname, 'public')));

// app.use(cors()); // DO i need this?

app.use(express.json({ extended: false }));

// Routes

app.use('/api/users', usersRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/recipes', recipeRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`.yellow));
