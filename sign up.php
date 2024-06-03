<?php
include 'db_connect.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $first_name = $_POST['first_name'];
    $last_name = $_POST['last_name'];
    $username = $_POST['username'];
    $gender = $_POST['gender'];
    $birthdate = $_POST['birthdate'];
    $bio = $_POST['bio'];
    $pronouns = $_POST['pronouns'];
    $course = $_POST['course'];
    $year_enrolled = $_POST['year_enrolled'];
    $email_address = $_POST['email_address'];
    $password = $_POST['password'];
    $confirm_password = $_POST['confirm_password'];

    if ($password === $confirm_password) {
        $password_hash = password_hash($password, PASSWORD_BCRYPT);

        $sql = "INSERT INTO personal_information (first_name, last_name, username, gender, birthdate, bio, pronouns, course, year_enrolled, email_address, password_hash)
                VALUES ('$first_name', '$last_name', '$username', '$gender', '$birthdate', '$bio', '$pronouns', '$course', '$year_enrolled', '$email_address', '$password_hash')";

        if ($conn->query($sql) === TRUE) {
            echo "New record created successfully";
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
    } else {
        echo "Passwords do not match.";
    }

    $conn->close();
}
?>
