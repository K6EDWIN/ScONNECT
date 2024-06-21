const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');

// Create the Express app
const app = express();
const port = 3000;

//  parse JSON bodies
app.use(bodyParser.json());
// Serve static files from the directory which is public
app.use(express.static(path.join(__dirname, 'public')));

// Route for the sign-up page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'sign up index.html'));
});

// MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: '', 
    database: 'users'
});

// Handle database connection errors
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
        // SQL query to insert form data into the personal_information table
        const query = `
            INSERT INTO personal_information (
                first_name, last_name, username, gender, birthdate, bio,
                pronouns, course, year_enrolled, email_address, password
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        // Insert data into the database
        connection.query(query, [
            first_name, last_name, username, gender, birthdate, bio,
            pronouns, course, year_enrolled, email_address, password
        ], (err, results) => {
            if (err) {
                console.error('Error inserting data into the database:', err);
                res.status(500).send('An error occurred while saving your information.');
                return;
            }
            // Redirect to the dashboard after successful insertion
            res.redirect('/dashboard');
        });
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).send('An error occurred while processing your request.');
    }
});
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'dashboard index.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});