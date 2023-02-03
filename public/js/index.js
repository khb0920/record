
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

fetch("/record/goal", {
    method : "GET",
    headers: {
        "Content-Type": "application/json",    
    },
})
.then((res) => res.json())
.then((data) => {
       var record = data;
       document.getElementById("1st").innerHTML = `${record[0].userName}님 ${record[0].userGoal} 득점`;
       document.getElementById("2nd").innerHTML = `${record[1].userName}님 ${record[1].userGoal} 득점`;
       document.getElementById("3rd").innerHTML = `${record[2].userName}님 ${record[2].userGoal} 득점`;
       document.getElementById("img1").src = record[0].userImg;
       document.getElementById("img2").src = record[1].userImg;
       document.getElementById("img3").src = record[2].userImg;  
})
.catch((err) => {
    console.log(err);
});

fetch("/record/assist", {
    method : "GET",
    headers: {
        "Content-Type": "application/json",    
    },
})
.then((res) => res.json())
.then((data) => {
       var record = data;
       document.getElementById("as1st").innerHTML = `${record[0].userName}님 ${record[0].userAssist} 도움`;
       document.getElementById("as2nd").innerHTML = `${record[1].userName}님 ${record[1].userAssist} 도움`;
       document.getElementById("as3rd").innerHTML = `${record[2].userName}님 ${record[2].userAssist} 도움`;
       document.getElementById("asimg1").src = record[0].userImg;
       document.getElementById("asimg2").src = record[1].userImg;
       document.getElementById("asimg3").src = record[2].userImg;  
})
.catch((err) => {
    console.log(err);
});

