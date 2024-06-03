document.getElementById('personal-info-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = {
        first_name: document.getElementById('first_name').value,
        last_name: document.getElementById('last_name').value,
        username: document.getElementById('username').value,
        gender: document.getElementById('gender').value,
        birthdate: document.getElementById('birthdate').value,
        bio: document.getElementById('bio').value,
        pronouns: document.getElementById('pronouns').value,
        course: document.getElementById('course').value,
        year_enrolled: document.getElementById('year_enrolled').value,
        email_address: document.getElementById('email_address').value,
        password: document.getElementById('password').value,
        confirm_password: document.getElementById('confirm_password').value,
    };

    fetch('http://localhost:3000/submit-form', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        alert('Form submitted successfully!');
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('An error occurred while submitting the form.');
    });
});
