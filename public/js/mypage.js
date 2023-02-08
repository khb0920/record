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
        document.getElementById("myImg").src = `${user.userImg}`;
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
    // console.log(user);
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
function updateImg(){
    // if (!img) return alert("프로필 사진을 선택해주세요.");

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



