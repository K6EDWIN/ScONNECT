// Import required modules
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

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Home Page!');
});

// Route for the sign-in page
app.get('/signin', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'Signin.html'));
});

// Route for the sign-up page
app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'Signup2.html'));
});

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'kyle',
    password: 'g(jmvGZqlzKw/XBs',
    database: 'Users'
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('MySQL connected...');
});

// API endpoint to handle form submission
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    const sql = 'SELECT password FROM personal_information WHERE email_address = ?';
    db.query(sql, [email], (err, results) => {
        if (err) {
            console.error('Error querying the database:', err);
            res.status(500).send('Internal server error');
            return;
        }

        if (results.length > 0) {
            const storedPassword = results[0].password;
            if (storedPassword === password) {
                res.send('Login successful');
            } else {
                res.send('Incorrect password');
            }
        } else {
            res.send('No user found');
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
