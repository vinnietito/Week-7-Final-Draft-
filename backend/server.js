const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const patientRoutes = require('./routes/patientRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const authRoutes = require('./routes/authRoutes');

dotenv.config();
const app = express();

// Serve static files from the "frontend" directory
app.use(express.static(path.join(__dirname, '../frontend')));

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use('/patients', patientRoutes);
app.use('/doctors', doctorRoutes);
app.use('/api/patients', patientRoutes);
app.use('/appointments', appointmentRoutes);
app.use(authRoutes);

// Define a route for the root URL to serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'index.html')); // Adjusting path to the index.html file
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
