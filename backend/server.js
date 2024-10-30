const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');

const patientRoutes = require('./routes/patientRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const authRoutes = require('./routes/authRoutes');

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use('/patients', patientRoutes);
app.use('/doctors', doctorRoutes);
app.use('/api/patients', patientRoutes);
app.use('/appointments', appointmentRoutes);
app.use(authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
