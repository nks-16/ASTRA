import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/authRouter';
import teamRoutes from './routes/teamRouter';
import mcqRoutes from './routes/mcqRouter';
import submissionRoutes from './routes/submissionRouter';
import problemRoutes from "./routes/problemRoutes";

// Load environment variables
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose
  .connect(process.env.MONGO_URI!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as mongoose.ConnectOptions)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/mcqs', mcqRoutes);
app.use('/api/submits', submissionRoutes);
app.use("/api/problems", problemRoutes);

// Health Check Route
app.get('/', (req: Request, res: Response) => {
  res.send('Hackathon Platform API is running...');
});

// Error Handling Middleware
app.use((err: any, req: Request, res: Response, next: Function) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
