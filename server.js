const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

app.use('/api/auth',     require('./routes/auth'));
app.use('/api/packages', require('./routes/packages'));
app.use('/api/city-tours', require('./routes/CityTour'));
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/contact',  require('./routes/contact'));
app.get('/', (req, res) => {
  res.json({ message: 'SafarWise API is running 🚀' });
});
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB Connected');
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server running on port ${process.env.PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  });