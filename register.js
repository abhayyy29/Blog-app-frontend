const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const about = document.getElementById("about").value;


    try {
    const response = await fetch(
        "http://blog-app-env.eba-axajqaxr.eu-north-1.elasticbeanstalk.com/api/v1/auth/register",
        {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
        name: name,
        email: email,
        password: password,
        about: about
        })
    }
    );

    const data = await response.json();

    if (response.ok) {
        localStorage.setItem("registeredEmail", email)
        alert("Registration successful! Please login.");
        window.location.href = "login.html";
    } else {
        alert(data.message || "Registration failed");
    }
    } catch (error) {
    console.error("Error:", error);
    alert("Server error");
    }
});