document.getElementById("signup-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("http://localhost:5000/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, phone, password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            alert("Registration successful! You can now log in.");
            window.location.href = "login.html"; // Redirect to login
        } else {
            alert(data.message); // Show error message
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Signup failed. Please try again.");
    }
});
