const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const employerRoutes = require('./routes/employer.routes');
const managerRoutes = require('./routes/manager.routes');

const authRoutes = require('./routes/auth.routes');


dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/employer', employerRoutes);
app.use('/api/manager', managerRoutes);
app.use('/api/auth', authRoutes);


// MongoDB + Server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(5000, () => console.log('Server running on port 5000'));
  })
  .catch((err) => console.error('MongoDB connection error:', err));
