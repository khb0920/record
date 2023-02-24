fetch("/user/me", {
        method : "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization : localStorage.getItem("accessToken"),
            Authorization : localStorage.getItem("refreshToken"),
        },
    })
    .then((res) => res.json())
    .then((data) => {
        var user = data;
        document.getElementById("myImg").src = `https://hbhb-bucket.s3.ap-northeast-2.amazonaws.com/${user.userImg}`;
        document.getElementById("myname").innerHTML = `${user.userName}님 안녕하세요`;
    }).catch(function(error) {
    console.log(error);
    });

fetch("/record/me", {
    method : "GET",
    headers: {
        "Content-Type": "application/json",
        Authorization : localStorage.getItem("accessToken"),
        Authorization : localStorage.getItem("refreshToken"),
    },
})
.then((res) => res.json())
.then((data) => {
    var myrecord = data;
    document.getElementById("myGoal").innerHTML = `${myrecord.userGoal} 골`;
    document.getElementById("myAs").innerHTML = `${myrecord.userAssist} 도움`;
    document.getElementById("myMvp").innerHTML = `${myrecord.userMvp} 회 수상`;
    document.getElementById("mySave").innerHTML = `${myrecord.userSave} 회 선방`;
    document.getElementById("myPartici").innerHTML = `${myrecord.userPartici} 회 참여`;
}).catch(function(error) {
console.log(error);
});

const changeImg = document.querySelector("#changeImg");
changeImg.addEventListener("click", updatePage);
function updatePage(){
    const a = document.getElementById("update-page");
    if(a.style.visibility=="hidden"){
        a.style.visibility ="visible";
    }else if(a.style.visibility =="visible"){
        a.style.visibility ="hidden";
    }
}

document.querySelector("#update").addEventListener("click", updateImg);
function updateImg(e){
    e.preventDefault();
    const img = document.getElementById('img').files[0];
    const form = new FormData();
    form.append('img', img);
    form.enctype = "multipart/form-data";
    fetch("/update/img", {
        method: "PUT",
        body: form,        
    })
    .then((res) => res.json())
    .then((res) => {
           if(res.success){
            alert("사진 변경 완료");
            location.reload(true);
        } else {
            alert(res.msg);

        }
    })
    .catch((err) => {
        console.error("변경 중 에러 발생");
    }); 
}

document.getElementById("deleteUser").addEventListener("click", deleteUser);
function deleteUser(e){
    e.preventDefault();
    fetch("/user/delete", {
        method: "POST",     
    })
    .then((res) => res.json())
    .then((res) => {
           if(res.success){
            alert("회원 탈퇴완료!");
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            location.href ='/';
        } else {
            alert(res.msg);

        }
    })
    .catch((err) => {
        console.error("탈퇴 중 에러 발생");
    }); 
}



