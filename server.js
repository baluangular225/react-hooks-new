const express = require('express');
const cors = require('cors');
require('dotenv').config();

const emailRoute = require('./routes/email');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', emailRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
