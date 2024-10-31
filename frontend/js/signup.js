async function signup(event) {
    event.preventDefault();
    
    const formData = {
        first_name: document.getElementById("first_name").value,
        last_name: document.getElementById("last_name").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        phone: document.getElementById("phone").value,
        date_of_birth: document.getElementById("date_of_birth").value,
        gender: document.getElementById("gender").value,
        address: document.getElementById("address").value
    };

    try {
        const response = await fetch('http://localhost:5000/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (response.ok) {
            alert(data.message); // Show success message
            // Redirect to login page
            window.location.href = 'login.html'; // Adjust to your actual login page path
        } else {
            alert(data.message); // Show error message
        }
    } catch (error) {
        console.error('Error during signup:', error);
        alert('An error occurred during signup.');
    }
}
