
const token = localStorage.getItem("token");

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

const logoutBtn = document.getElementById("logoutBtn");
if(logoutBtn){
    logoutBtn.addEventListener("click", function (){
        localStorage.removeItem("token");
        window.location.href="index.html"
    });
}

const startBtn = document.querySelectorAll(".startBloggingBtn");

startBtn.forEach( (btn) => {
    btn.addEventListener("click", function () {
        const token = localStorage.getItem("token");

        if(token){

            window.location.href= "posts.html";
        }else{

            window.location.href= "login.html";
        }
    });
});

