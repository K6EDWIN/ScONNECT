// server.js
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');
const bcrypt = require('bcrypt');

const app = express();
const port = 3000;

// MySQL connection setup
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'users'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to database');
});

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});



// Route to handle login and retrieve user info
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    const query = 'SELECT * FROM `personal_information` WHERE  email_address= ?';
    db.query(query, [email], async (err, results) => {
        if (err) throw err;

        if (results.length > 0) {
            const user = results[0];
            const match = await bcrypt.compare(password, user.password);
            if (match) {
                res.send(`Welcome, ${user.name}!`);
            } else {
                res.send('Invalid email or password');
            }
        } else {
            res.send('Invalid email or password');
        }
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
