const token = localStorage.getItem("token");

if(!token){
    window.location.href="login.html";
}

const form = document.getElementById("createPostForm");

form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;
    const categoryId = document.getElementById("categoryId").value;

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
        alert("Please login first");
        window.location.href = "login.html";
        return;
    }

    console.log("DEBUG:",
        `http://blog-app-env.eba-axajqaxr.eu-north-1.elasticbeanstalk.com/api/user/${userId}/category/${categoryId}/posts`
    );
    try {
        const response = await fetch(
            `http://blog-app-env.eba-axajqaxr.eu-north-1.elasticbeanstalk.com/api/user/${userId}/category/${categoryId}/posts`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    title: title,
                    content: content
                })
            }
        );

        if (response.ok) {
            alert("Post created successfully");
            window.location.href = "posts.html";
        } else {
            const error = await response.json();
            alert(error.message || "Failed to create post");
        }

    } catch (err) {
        console.error(err);
        alert("Something went wrong");
    }
});