
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
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        const data = await response.json();

        const messageDiv = document.getElementById("message");
        messageDiv.style.display = "block";

        if (response.ok) {
            messageDiv.textContent = data.message || "Registration successful!";
            messageDiv.style.color = "green";
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
        } else {
            messageDiv.textContent = data.message || "Registration failed.";
            messageDiv.style.color = "red";
        }
    } catch (error) {
        console.error('Error during signup:', error);
        document.getElementById("message").textContent = 'An error occurred during signup.';
    }
}
