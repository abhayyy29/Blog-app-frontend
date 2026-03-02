
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

document.addEventListener("DOMContentLoaded", fetchAllPosts);

async function fetchAllPosts() {
    try{
        const response = await fetch(
        "http://blog-app-env.eba-axajqaxr.eu-north-1.elasticbeanstalk.com/api/posts"
        );
        if(!response.ok){
            throw new console.error("Failed to fetch Posts");
        }
        const data = await response.json();

        renderPosts(data.content);
    }catch (error){
        console.error("Error", error);
        alert("Error in loading Posts");
    }
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
        <div class="pot-body">
        <h2> Title: ${post.title}</h2>
        <br/>
        <h4>Content:</h4><p>${post.content}</p>
        <br/>
        </div>
        <div class="post-footer">
        
        Category:${post.category.categoryTitle}
        <span class="author">👤 ${post.user.name}</span>
        <span class="date">📅 ${new Date(post.addedDate).toDateString()}</span>
        
        <hr/>
        </div>
        `;
        container.appendChild(div);
    });
}