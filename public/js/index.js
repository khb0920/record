
const logoutBtn = document.getElementById("logoutBtn");
logoutBtn.addEventListener("click", logOut);
const userLogin = localStorage.accessToken;


if(!userLogin){
    document.getElementById("login").style.display="";
    document.getElementById("register").style.display="";
}else{
    document.getElementById("logoutBtn").style.display="";
    document.getElementById("mypage").style.display="";
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

fetch('/record/goal', {
    method : "GET",
    headers: {
        "Content-Type": "application/json",  
    },
})
.then((res) => res.json())
.then((data) => {
       var grecord = data;
       document.getElementById("g1st").innerHTML = `${grecord[0].userName}님 ${grecord[0].userGoal}득점`;
       document.getElementById("gimg1").src = `https://hbhb-bucket.s3.ap-northeast-2.amazonaws.com/${grecord[0].userImg}`;
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
       var asrecord = data;
       document.getElementById("as1st").innerHTML = `${asrecord[0].userName}님 ${asrecord[0].userAssist}도움`;
       document.getElementById("asimg1").src = `https://hbhb-bucket.s3.ap-northeast-2.amazonaws.com/${asrecord[0].userImg}`;  
})
.catch((err) => {
    console.log(err);
});

fetch("/record/mvp", {
    method : "GET",
    headers: {
        "Content-Type": "application/json",    
    },
})
.then((res) => res.json())
.then((data) => {
       var mrecord = data;
       document.getElementById("m1st").innerHTML = `${mrecord[0].userName}님 ${mrecord[0].userMvp}회`;
       document.getElementById("mimg1").src = `https://hbhb-bucket.s3.ap-northeast-2.amazonaws.com/${mrecord[0].userImg}`;
})
.catch((err) => {
    console.log(err);
});

fetch("/record/save", {
    method : "GET",
    headers: {
        "Content-Type": "application/json",    
    },
})
.then((res) => res.json())
.then((data) => {
       var srecord = data;
       document.getElementById("s1st").innerHTML = `${srecord[0].userName}님 ${srecord[0].userSave}선방`;
       document.getElementById("simg1").src = `https://hbhb-bucket.s3.ap-northeast-2.amazonaws.com/${srecord[0].userImg}`;
})
.catch((err) => {
    console.log(err);
});

fetch("/match/week", {
    method : "GET",
    headers: {
        "Content-Type": "application/json",    
    },
})
.then((res) => res.json())
.then((data) => {
    var wmatch = data;
    document.getElementById("match1").innerHTML = `${wmatch.matchMonth} 월 ${wmatch.matchDay} 일 </br></br> VS ${wmatch.matchVs} </br></br> 장소: ${wmatch.matchPlace} `;
    function diffDay(){
    const dday = document.querySelector("#dday");   
    const dtime = new Date(`${wmatch.matchYear}-${wmatch.matchMonth}-${wmatch.matchDay}`);
    const ttime = new Date();
    const diff = dtime - ttime;
    
    const diffDay = Math.floor(diff/(1000*60*60*24));
    const diffHour = Math.floor(diff/(1000*60*60)%24);
    const diffMin = Math.floor((diff/(1000*60))%60);
    const diffSec = Math.floor(diff/1000%60);   

    dday.innerHTML = `${diffDay} 일 ${diffHour} 시간 ${diffMin} 분 ${diffSec} 초`;
    }
    diffDay();
    setInterval(diffDay, 1000);
})
.catch((err) => {
    console.log(err);
});

fetch("/match/last", {
    method : "GET",
    headers: {
        "Content-Type": "application/json",    
    },
})
.then((res) => res.json())
.then((data) => {
    var lmatch1 = data;
    document.getElementById("match2").innerHTML = `${lmatch1.matchMonth} 월 ${lmatch1.matchDay} 일 ${lmatch1.matchPlace}  VS  ${lmatch1.matchVs} ${lmatch1.matchScore} : ${lmatch1.matchLoss} ${lmatch1.matchResult}`
})
.catch((err) => {
    console.log(err);
});

fetch("/user", {
    method : "GET",
    headers: {
        "Content-Type": "application/json",    
    },
})
.then((res) => res.json())
.then((data) => {
     var newUser = data.slice(0,3);
     document.getElementById("id1").innerHTML = `${newUser[0].userId}님`;
     document.getElementById("id2").innerHTML = `${newUser[1].userId}님`;
     document.getElementById("id3").innerHTML = `${newUser[2].userId}님`;
     document.getElementById("age1").innerHTML = `${newUser[0].userAge}세`;
     document.getElementById("age2").innerHTML = `${newUser[1].userAge}세`;
     document.getElementById("age3").innerHTML = `${newUser[2].userAge}세`;
     document.getElementById("pos1").innerHTML = `${newUser[0].userPos}`;
     document.getElementById("pos2").innerHTML = `${newUser[1].userPos}`;
     document.getElementById("pos3").innerHTML = `${newUser[2].userPos}`;
})
.catch((err) => {
    console.log(err);
});

fetch("/matchMvp", {
    method : "GET",
    headers: {
        "Content-Type": "application/json",    
    },
})
.then((res) => res.json())
.then((data) => {
    const lastmatchMVP = data;
    document.getElementById("MvpName").innerHTML =`MVP ${lastmatchMVP.userName}님🎉`;
    document.getElementById("matchMvp").src =`https://hbhb-bucket.s3.ap-northeast-2.amazonaws.com/${lastmatchMVP.userImg}`;
})
.catch((err) => {
    console.log(err);
});
