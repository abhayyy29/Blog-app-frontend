// testing js
console.log("login connected");

const savedEmail = localStorage.getItem("registeredEmail");
const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try{
        const response = await fetch(
            "http://Blog-app-env.eba-axajqaxr.eu-north-1.elasticbeanstalk.com/api/v1/auth/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: email,
                    password: password,
                }),
            }
        );

            const data = await response.json();

            if(savedEmail){
                const emailInput =document.getElementById("email");
                if(emailInput){
                    emailInput.value = savedEmail;
                }
            }
            if(response.ok){
                console.log("Login Success:", data);

                localStorage.setItem("token", data.token);
                localStorage.removeItem("registeredEmail");

                window.location.href = "posts.html";
        
            }else{
                alert("Login failed");
            }
        }catch(error){
            console.error("Error:", error);
        }
});