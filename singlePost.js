
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

        console.log(data);
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

        console.log(imageUrl);

        div.innerHTML= `
        <div class="post-body">

        <img src="${imageUrl}" class="post-image">

        <h2> Title: ${post.title}</h2>
        <br/>
        <h4>Content:</h4><p>${post.content}</p>
        
        <div class="post-actions">


        <button onclick="likePost(${post.postId})">❤️ Like</button>
        <button onclick="toggleComments(${post.postId})">💬 Comment</button>
        <button onclick="sharePost(${post.postId})">🔗 Share</button>

</div>

        <div id="comments-container" style="display:none"></div>

</div>
        
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
    

async function toggleComments(postId) {
    const container = document.getElementById("comments-container");

    if(container.style.display === "none"){
        container.style.display = "block";
        loadComments(postId);
    }else{
        container.style.display = "none";
    }
}

async function loadComments(postId) {
    
    const response = await fetch(
        `https://d3djn31vjyk97x.cloudfront.net/api/post/${postId}/comments`,
    );

    const comments = await response.json();
    const commentList = Array.isArray(comments) ? comments : comments.content || [];

    const container = document.getElementById("comments-container");

    container.innerHTML = "";

    commentList.forEach(comment => {
        
        const div = document.createElement("div");

        div.classList.add("comment");

        div.innerHTML = `
        <p><b>${comment.user?.name || "USER"}:</b> ${comment.content}</p>
        `;
        container.appendChild(div);
    });

    container.innerHTML += `
    <input type = "text" id="comment-input" placeholder="Write a comment...">
    <button onclick="addComment(${postId})">Post</button>
    `;
}

async function addComment(postId) {
    
    const token = localStorage.getItem("token");
    console.log("Token:", token);
    const userId = localStorage.getItem("userId");

    const input = document.getElementById("comment-input");

    const content = input.value;

    const response = await fetch(
        `https://d3djn31vjyk97x.cloudfront.net/api/user/${userId}/post/${postId}/comments`,
        {
            method: "POST",
            headers : {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                content: content
            })
        }

    );

    if(response.ok){

        input.value="";
        loadComments(postId);
    }
}

function likePost(postId){
    alert("Working on Like feature");

}

function sharePost(postId){
    const link = window.location.href;

    navigator.clipboard.writeText(link);

    alert("Post Link Copied");
}