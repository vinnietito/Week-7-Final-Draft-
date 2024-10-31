async function login(event) {
    event.preventDefault();

    const loginData = {
        email: document.getElementById("loginEmail").value,
        password: document.getElementById("loginPassword").value
    };

    try {
        const response = await fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
        });

        const data = await response.json();

        if (response.ok) {
            alert(data.message); // Show success message
            // Handle successful login (e.g., redirect to user dashboard)
            window.location.href = 'dashboard.html'; // Redirect to your dashboard page
        } else {
            alert(data.message); // Show error message
        }
    } catch (error) {
        console.error('Error during login:', error);
        alert('An error occurred during login.');
    }
}
