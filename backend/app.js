const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
app.use(cors(
    {origin:'*'}
))
// Middleware
app.use(bodyParser.json());
app.use(express.json())


const connectDb = async ()=>{
// Connect to MongoDB
const URL = 'mongodb+srv://dhananjayyadav221303:dhananjay@cluster0.ypu7yj1.mongodb.net/medidhan?retryWrites=true&w=majority&appName=Cluster0'
//const URL = 'mongodb://127.0.0.1:27017/medidhan?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.2';
   
try {
    await mongoose.connect(URL, { useNewUrlParser: true })
    console.log('Database connected successfully');
} catch (error) {
    console.log('Error while connecting to the database ', error);
}
};





// Routes
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {console.log(`Server running on port ${PORT}`)
connectDb();
});
