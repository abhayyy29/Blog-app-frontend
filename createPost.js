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

    const userId = localStorage.getItem("userId");

    const imageFile = document.getElementById("image").files[0];
    if (!token || !userId) {
        alert("Please login first");
        window.location.href = "login.html";
        return;
    }

    console.log("TOKEN:", token)

    
    try {
        const response = await fetch(
            `https://d3djn31vjyk97x.cloudfront.net/api/user/${userId}/category/${categoryId}/posts`,
            {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
                    
                },
                body: JSON.stringify({
                    title: title,
                    content: content
                })
            }
        );

        const data = await response.json();
        
        if(!response.ok){
            alert(data.message || "Failed to create Post");
            return;
        }
        
        const postId = data.postId;
        console.log("PostID:", postId);

            if(imageFile){
            const formData = new FormData();
            formData.append("image", imageFile);

            const imageResponse = await fetch(
                `https://d3djn31vjyk97x.cloudfront.net/api/post/image/upload/${postId}`,
                {
                    method: "POST",
                    headers:{
                        "Authorization": `Bearer ${token}`
                    },
                    body: formData
                }
            );
            if(!imageResponse.ok){
                console.log("Image upload failed");
            }else{
            console.log("image uploaded");
            }
        }

        alert("Post created Successfully");
        window.location.href = "posts.html";
    

    } catch (err) {
        console.error(err);
        alert("Something went wrong");
    }

    });



    