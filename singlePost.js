
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

document.addEventListener("DOMContentLoaded", () => {

const params = new URLSearchParams(window.location.search);
const postId = params.get("postId");
console.log("PostId:", postId);
fetchSinglePost(postId);

});


async function fetchSinglePost(postId) {
    try{
        const response = await fetch(
        `https://d3djn31vjyk97x.cloudfront.net/api/posts/${postId}`
        );
        if(!response.ok){
            throw new console.error("Failed to fetch Posts");
        }
        const data = await response.json();

        renderPosts(data);
    }catch (error){
        console.error("Error", error);
        alert("Error in loading Posts");
    }
}


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

function renderPosts(post){
    const container = document.getElementById("postsContainer");
    container.innerHTML= "";

    if(!post || post.length ===0){
    container.innerHTML = "<p>No posts available</p>"
    return
    }

    
        const div = document.createElement("div");
        div.classList.add("post-card");

    

        const loggedInUser = Number(localStorage.getItem("userId"));

        console.log("Logged User:", loggedInUser);
        console.log("PostUserId:", post.user.id);

        const deletebutton = post.user.id === loggedInUser
        ? `<button onclick="deletePost(${post.postId})">Delete</button>`
        :"";

        const imageUrl = post.imageName
        ? `https://d3djn31vjyk97x.cloudfront.net/api/post/image/${post.imageName}`
        : ``;

        div.innerHTML= `
        <div class="post-body">

        <img src="${imageUrl}" class="post-image">

        <h2> Title: ${post.title}</h2>
        <br/>
        <h4>Content:</h4><p>${post.content}</p>
        
        </div>
        <div class="post-footer">
        
        Category:${post.category.categoryTitle}
        <a class="author" href="profile.html?userId=${post.user.id}">👤 ${post.user.name}</a>
        <span class="date">📅 ${new Date(post.addedDate).toDateString()}</span>
        ${deletebutton}

        <hr/>
        </div>
        `;
        container.appendChild(div);
    ;
}