const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const config = require('./config/config');

// Import routes
const authRoutes = require('./routes/auth');
const materialRoutes = require('./routes/materials');
const pyqRoutes = require('./routes/pyq');
const testRoutes = require('./routes/test');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the frontend
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
mongoose.connect(config.mongodb.uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/materials', materialRoutes);
app.use('/api/pyq', pyqRoutes);
app.use('/api/test', testRoutes);

// Serve frontend for any other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = config.server.port;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log('MongoDB URI:', config.mongodb.uri);
    console.log('Mega Email:', config.mega.email);
}); 