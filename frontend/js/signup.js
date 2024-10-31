document.getElementById("signup-form").addEventListener("submit", async function (event) {
    event.preventDefault();

    // Gather form data
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    try {
        // Send POST request to the server
        const response = await fetch("http://localhost:5000/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        // Parse the JSON response
        const result = await response.json();

        // Display success message
        alert(result.message); // Shows "User registered successfully!" in an alert
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while registering. Please try again.");
    }
});