const token = localStorage.getItem("token");

document.addEventListener("DOMContentLoaded", () => {
    
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
    alert("Please login first");
    window.location.replace("login.html");
    return;
}
    fetchProfile(userId, token);
    fetchUserPosts(userId, token);
});

async function fetchProfile(userId, token) {


    try {
    const response = await fetch(
        `http://Blog-app-env.eba-axajqaxr.eu-north-1.elasticbeanstalk.com/api/users/${userId}`,
        {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }
    );

    if (!response.ok) {
        throw new Error("Failed to load profile");
    }

    const user = await response.json();

    document.getElementById("name").innerText = user.name;
    document.getElementById("email").innerText = user.email;
    document.getElementById("about").innerText = user.about || "—";
    document.getElementById("role").innerText = user.roles[0]?.name || "USER";

    } catch (error) {
    alert(error.message);
    }
}

        // Fetch User Posts
async function fetchUserPosts(userId,token) {

    if(!token){
    alert("Please Login first");
    window.location.replace("login.html");
    return;
    }

    
    const response = await fetch(
        `https://d3djn31vjyk97x.cloudfront.net/api/user/${userId}/posts`,
        {
            headers:{
                "Authorization": `Bearer ${token}`
            }
        }
    );
    const data = await response.json();
    const posts = data.content;
    renderPosts(posts);
}


function renderPosts(posts){
    const container = document.getElementById("postsContainer");
    container.innerHTML= "";

    if(!posts || posts.length ===0){
    container.innerHTML = "<p>No posts available</p>"
    return
    }

    posts.forEach(post => {
        const div = document.createElement("div");
        div.classList.add("post-card");

        div.innerHTML= `
        <div class="post-body">
        <h2> Title: ${post.title}</h2>
        <br/>
        <h4>Content:</h4><p>${post.content}</p>
        <br/>
        </div>

        <div class="post-footer">
        Category:${post.category.categoryTitle}
        <span class="author">👤 ${post.user.name}</span>
        <span class="date">📅 ${new Date(post.addedDate).toDateString()}</span>
        <button onclick="deletePost(${post.postId})" class="delete-btn"> Delete Post</button>
        <hr/>
        </div>
        `;
        container.appendChild(div);
    });
}

// delete post

async function deletePost(postId) {
    const token = localStorage.getItem("token");

    if(!confirm("Are you sure you want to delete this post?")) return;

    try{
        const res = await fetch(
        `https://d3djn31vjyk97x.cloudfront.net/api/posts/${postId}`,
        {
            method: "DELETE",
            headers:{
                Authorization: `Bearer ${token}`
            }
        }
        );
        if(!res.ok) throw new error("Delete Failed");
        alert("Post Deleted Sucessfully");
        location.reload();
    }catch(err){
        console.error(err);
        alert("Error Deleting Post")
    }
}