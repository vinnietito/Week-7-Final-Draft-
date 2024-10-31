document.getElementById("signup-form").addEventListener("submit", signup);

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

        const messageDiv = document.getElementById("message");
        messageDiv.style.display = "block"; // Show the message div

        if (response.ok) {
            messageDiv.textContent = data.message; // Show success message
            messageDiv.style.color = "green"; // Change message color to green
            setTimeout(() => {
                window.location.href = 'login.html'; // Redirect to login page after a delay
            }, 2000); // Delay before redirecting
        } else {
            messageDiv.textContent = data.message; // Show error message
            messageDiv.style.color = "red"; // Change message color to red
        }
    } catch (error) {
        console.error('Error during signup:', error);
        alert('An error occurred during signup.');
    }
}
