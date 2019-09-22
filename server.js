const express = require('express');
const app = express();

const connectDB = require('./config/db');

//connect to database
connectDB();

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.json({
        appname: 'contact keeper',
        status: 'running'
    })
});

//Define routers
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));