
        // Optional: You can add client-side validation or AJAX form submission here
        document.getElementById('signup-form').addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission

            const formData = new FormData(this);
            const data = Object.fromEntries(formData.entries());

            fetch('http://localhost:5000/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => {
                alert('Signup successful!');
                // You can redirect the user or perform other actions here
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('Signup failed. Please try again.');
            });
        });
