<?php
include 'db_connect.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $first_name = $_POST['first_name'];
    $last_name = $_POST['last_name'];
    $username = $_POST['username'];
    $gender = $_POST['gender'];
    $birthdate = $_POST['birthdate'];
    $bio = $_POST['bio'];
    $pronouns = isset($_POST['pronouns']) ? $_POST['pronouns'] : '';
    $course = $_POST['course'];
    $year_enrolled = $_POST['year_enrolled'];
    $email_address = $_POST['email_address'];
    $password = $_POST['password'];
    $confirm_password = $_POST['confirm_password'];

    if ($password === $confirm_password) {
        $password_hash = password_hash($password, PASSWORD_BCRYPT);


        $stmt = $conn->prepare("INSERT INTO personal_information (first_name, last_name, username, gender, birthdate, bio, pronouns, course, year_enrolled, email_address, password_hash) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("sssssssssss", $first_name, $last_name, $username, $gender, $birthdate, $bio, $pronouns, $course, $year_enrolled, $email_address, $password_hash);

        if ($stmt->execute()) {
            echo "New record created successfully";
        } else {
            echo "Error: " . $stmt->error;
        }

        $stmt->close();
    } else {
        echo "Passwords do not match.";
    }

    $conn->close();
}
?>
