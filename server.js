const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

console.log('ENV CHECK:');
console.log('MONGO_URI:', !!process.env.MONGO_URI);
console.log('JWT_SECRET:', !!process.env.JWT_SECRET);
console.log('EMAIL_USER:', !!process.env.EMAIL_USER);
console.log('EMAIL_PASS:', !!process.env.EMAIL_PASS);
console.log('PORT:', process.env.PORT);

const app = express();

app.use(cors({ 
  origin: ['https://safarwise-frontend.vercel.app', 'http://localhost:5173'], 
  credentials: true 
}));
app.use(express.json());

app.use('/api/auth',      require('./routes/auth'));
app.use('/api/packages',  require('./routes/packages'));
app.use('/api/city-tours',require('./routes/CityTour'));
app.use('/api/bookings',  require('./routes/bookings'));
app.use('/api/contact',   require('./routes/contact'));

app.get('/', (req, res) => {
  res.json({ message: 'SafarWise API is running 🚀' });
});

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB Connected');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  });