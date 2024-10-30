document.getElementById("login-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("http://localhost:5000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            localStorage.setItem("token", data.token); // Store JWT token in localStorage
            window.location.href = "dashboard.html";   // Redirect to dashboard
        } else {
            alert(data.message); // Display error message
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Login failed. Please try again.");
    }
});
