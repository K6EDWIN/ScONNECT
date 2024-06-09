// File: server.js

const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const path = require('path');

// Create the Express app
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());
// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'Public')));


// Route for the sign-up page
app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'Public', 'Sign up.html'));
});

// MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: '', 
    database: 'users'
});

connection.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database.');
});

// Endpoint to handle form submission
app.post('/submit', async (req, res) => {
    const {
        first_name, last_name, username, gender, birthdate, bio,
        pronouns, course, year_enrolled, email_address, password
    } = req.body;

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // SQL query to insert form data into the personal_information table
        const query = `
            INSERT INTO personal_information (
                first_name, last_name, username, gender, birthdate, bio,
                pronouns, course, year_enrolled, email_address, password
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        connection.query(query, [
            first_name, last_name, username, gender, birthdate, bio,
            pronouns, course, year_enrolled, email_address, hashedPassword
        ], (err, results) => {
            if (err) {
                console.error('Error inserting data into the database:', err);
                res.status(500).send('An error occurred while saving your information.');
                return;
            }
            res.send('Information saved successfully.');
        });
    } catch (error) {
        console.error('Error hashing password:', error);
        res.status(500).send('An error occurred while processing your request.');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
