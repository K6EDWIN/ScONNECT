const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'waah',
    password: 'lSKbA4ArFpzva3kV',
    database: 'user_profile'
});

db.connect(err => {
    if (err) throw err;
    console.log('MySQL connected...');
});

// API endpoint to handle form submission
app.post('/submit', (req, res) => {
    const data = req.body;
    const sql = `INSERT INTO personal_information (first_name, last_name, username, gender, birthdate, bio, pronouns, course, year_enrolled, email_address, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [data.first_name, data.last_name, data.username, data.gender, data.birthdate, data.bio, data.pronouns, data.course, data.year_enrolled, data.email_address, data.password];

    db.query(sql, values, (err, result) => {
        if (err) throw err;
        res.send('Personal information saved to database');
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
