const express = require('express');
const app = express();
const connectDB = require('./config/db');

// Connect to database
connectDB();

app.use(express.json({ extended: false }));

app.use('/', require('./routes/index'));
app.use('/api/url', require('./routes/url'));

// Server port listening
const PORT = process.env.PORT | 3000;

app.listen(PORT, () => {
    console.log(`Server running on the port: ${PORT}`);
})