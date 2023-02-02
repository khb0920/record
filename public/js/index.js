const logoutBtn = document.getElementById("logoutBtn");
logoutBtn.addEventListener("click", logOut);
const userLogin = localStorage.getItem("accessToken");

if(userLogin){
    document.getElementById("login").style.display="none";
}else{
    document.getElementById("logoutBtn").style.display="none";
    document.getElementById("mypage").style.display="none";
}

function logOut() {
    fetch("/logout", {
        method : "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization : localStorage.getItem("accessToken"),
            Authorization : localStorage.getItem("refreshToken"),
        },
    })
    .then((res) => res.json())
    .then((res) => {
            if(res.success){
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                alert(res.msg);    
                location.href = "/";
            }else{
                alert("로그아웃 문제 발생");
            }
    })
    .catch((err) => {
        console.log("로그아웃 중 에러 발생");
    });
}