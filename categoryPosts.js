const token = localStorage.getItem("token");

document.addEventListener("DOMContentLoaded", fetchCategoryPosts);

async function fetchCategoryPosts() {
    const params = new URLSearchParams(window.location.search);
    const categoryId = params.get("categoryId");

    try{
        const response = await fetch(
            `https://d3djn31vjyk97x.cloudfront.net/api/category/${categoryId}/posts`
        );
        const data = await response.json();
        const posts = Array.isArray(data) ? data : data.content;
        const container = document.getElementById("postsContainer");
        container.innerHTML="";

        posts.forEach(post => {
            const div = document.createElement("div");
            div.classList.add("post-card");

            div.innerHTML=`
            <h3>${post.title}</h3>
            <p>${post.content}<p>
            `;
            container.appendChild(div);
        });
    }catch(error){
            console.error(error);
    }
}