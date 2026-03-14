const token = localStorage.getItem("token");

if(!token){
    window.location.href="login.html";
}

const authLinks = document.getElementById("authLinks");
const userLinks = document.getElementById("userLinks");

if(authLinks && userLinks){
    if(token){
        authLinks.style.display= "none";
        userLinks.style.display= "flex";
    }else{
        authLinks.style.display="flex";
        userLinks.style.display= "none";
    }
}

document.addEventListener("DOMContentLoaded", loadPost);

if(!token){
    window.location.href="login.html";
}
const userId = localStorage.getItem("userId");
const params = new URLSearchParams(window.location.search);
const postId = params.get("postId");

async function loadPost() {
    try{

        const response = await fetch(
                    `https://d3djn31vjyk97x.cloudfront.net/api/posts/${postId}`,
        );

        const post = await response.json();

        document.getElementById("title").value = post.title;
        document.getElementById("content").value= post.content;
        document.getElementById("categoryId").value= post.category.categoryId;
    }catch(error){

        console.error("Error loading Posts:", error);
    }

}

const form = document.getElementById("editPostForm");

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

    console.log("token:", token);
    console.log("PostId:", postId);

    try {
        const response = await fetch(
                    `https://d3djn31vjyk97x.cloudfront.net/api/posts/${postId}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    title: title,
                    content: content
                })
            });

        if (response.ok) {
            alert("Post updated successfully");
            window.location.href = "profile.html";
        } else {
            const error = await response.json();
            alert(error.message || "Failed to update post");
        }

    } catch (err) {
        console.error(err);
        alert("Something went wrong");
    }
});

document.getElementById("image").addEventListener("change", function(){
        const fileName = this.files[0]?.name || "Click to Upload image";
        document.getElementById("fileName").textContent= fileName;
    })