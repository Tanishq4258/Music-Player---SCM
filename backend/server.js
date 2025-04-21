// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// app.use(cors({
//     origin: 'http://127.0.0.1:5500',
//     credentials: true
//   }));
// const cookieParser = require('cookie-parser');
// const connectDB = require('./config/db');
// const authRoutes = require('./routes/authRoutes');

// const app = express();

// // Database connection
// connectDB();


// // Middleware
// app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
// app.use(express.json());
// app.use(cookieParser());

// // Routes
// app.use('/api/auth', authRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');
const port = 5000;

// ✅ Allow requests from frontend (Live Server runs on 127.0.0.1:5500)
app.use(cors({
  origin: 'http://127.0.0.1:5500',
  credentials: true
}));

app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/loginSignupDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});

const User = mongoose.model('User', userSchema);

// ✅ Signup route
app.post('/api/auth/signup', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ error: 'Server error during signup' });
  }
});

// ✅ Login route
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user)
      return res.status(400).json({ error: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ error: 'Invalid password' });

    res.json({ message: 'Login successful' });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error during login' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
