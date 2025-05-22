import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import "reflect-metadata";
import path from 'path';
import { fileURLToPath } from 'url';

// Import your entities here, with relative paths and .js extensions
import { User } from './entities/User.js';
import { Software } from './entities/Software.js';
import { AccessRequest } from './entities/AccessRequest.js';

// ESM-compatible __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env
dotenv.config();

// Initialize Express app
const app = express();
app.use(cors());
app.use(express.json());

// Setup TypeORM DataSource
const AppDataSource = new DataSource({
  type: 'sqlite',
  database: './database.sqlite',
  entities: [User, Software, AccessRequest],  // include all entities you imported
  synchronize: true,
  logging: false,
  migrations: [],
  subscribers: [],
});

// Connect to DB
AppDataSource.initialize()
  .then(() => {
    console.log('Database connected!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });

// Sample route
app.get('/', (req: Request, res: Response) => {
  res.send('Backend is running!');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
