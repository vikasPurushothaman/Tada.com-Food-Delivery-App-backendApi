import express from 'express';
import mongoose from 'mongoose';  // Corrected import statement
import cors from 'cors';  // Corrected import for cors
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB connected"))
  .catch(error => console.log(error));

app.get('/test', (req, res) => {
  res.send('Tada API running');
});

app.use('/api/auth', authRoutes);
app.use('/api/user', authRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
