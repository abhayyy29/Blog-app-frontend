
const token = localStorage.getItem("token");

if(!token){
    alert("Please Login In to view Posts");
    window.location.href="login.html";
}

document.addEventListener("DOMContentLoaded", fetchCategories);

async function fetchCategories() {
    try{
        const response = await fetch(
            "https://d3djn31vjyk97x.cloudfront.net/api/categories/"
            
        );

        const data = await response.json();
        console.log("Response:", data);
        const categories = Array.isArray(data) ? data : data.content;
        console.log("Array", Array.isArray(categories));
        console.log("Actual object", categories);

        const container = document.getElementById("categoriesContainer");
        container.innerHTML="";

        categories.forEach(category => {
            const div = document.createElement("div");
            div.classList.add("category-card");
            div.innerHTML=`
            <h3>${category.categoryTitle}</h3>
            <p>${category.categoryDescription}</p>
            <button class="viewBtn" onclick="viewCategory(${category.categoryId})">
            View Posts
            </button>
            `;
            container.appendChild(div);
        });
    }catch(error){
        console.error("Error:", error);
    }
        }
    function viewCategory(categoryId){
        window.location.href=`categoryPosts.html?categoryId=${categoryId}`;
    }
