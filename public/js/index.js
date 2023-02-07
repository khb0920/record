
const logoutBtn = document.getElementById("logoutBtn");
logoutBtn.addEventListener("click", logOut);
const userLogin = localStorage.getItem("accessToken");

if(userLogin){
    document.getElementById("login").style.display="none";
    document.getElementById("register").style.display="none";
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
       var grecord = data;
       document.getElementById("g1st").innerHTML = `${grecord[0].userName}님 ${grecord[0].userGoal} 득점`;
    //    document.getElementById("2nd").innerHTML = `${grecord[1].userName}님 ${grecord[1].userGoal} 득점`;
    //    document.getElementById("3rd").innerHTML = `${grecord[2].userName}님 ${grecord[2].userGoal} 득점`;
       document.getElementById("gimg1").src = grecord[0].userImg;
    //    document.getElementById("img2").src = grecord[1].userImg;
    //    document.getElementById("img3").src = grecord[2].userImg;  
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
       console.log(asrecord);
       document.getElementById("as1st").innerHTML = `${asrecord[0].userName}님 ${asrecord[0].userAssist} 도움`;
    //    document.getElementById("as2nd").innerHTML = `${asrecord[1].userName}님 ${asrecord[1].userAssist} 도움`;
    //    document.getElementById("as3rd").innerHTML = `${asrecord[2].userName}님 ${asrecord[2].userAssist} 도움`;
       document.getElementById("asimg1").src = asrecord[0].userImg;
    //    document.getElementById("asimg2").src = asrecord[1].userImg;
    //    document.getElementById("asimg3").src = asrecord[2].userImg;  
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
       console.log(mrecord);
       document.getElementById("m1st").innerHTML = `${mrecord[0].userName}님 ${mrecord[0].userMvp} 회 수상`;
    //    document.getElementById("as2nd").innerHTML = `${asrecord[1].userName}님 ${asrecord[1].userAssist} 도움`;
    //    document.getElementById("as3rd").innerHTML = `${asrecord[2].userName}님 ${asrecord[2].userAssist} 도움`;
       document.getElementById("mimg1").src = mrecord[0].userImg;
    //    document.getElementById("asimg2").src = asrecord[1].userImg;
    //    document.getElementById("asimg3").src = asrecord[2].userImg;  
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
       document.getElementById("s1st").innerHTML = `${srecord[0].userName}님 ${srecord[0].userSave} 선방`;
    //    document.getElementById("as2nd").innerHTML = `${asrecord[1].userName}님 ${asrecord[1].userAssist} 도움`;
    //    document.getElementById("as3rd").innerHTML = `${asrecord[2].userName}님 ${asrecord[2].userAssist} 도움`;
       document.getElementById("simg1").src = srecord[0].userImg;
    //    document.getElementById("asimg2").src = asrecord[1].userImg;
    //    document.getElementById("asimg3").src = asrecord[2].userImg;  
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
    document.getElementById("match1").innerHTML = `${wmatch.matchMonth} 월 ${wmatch.matchDay} 일 ${wmatch.matchPlace}  VS  ${wmatch.matchVs}`
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
    var lmatch1 = data[0];
    console.log(lmatch1);
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
     console.log(newUser);
     document.getElementById("id1").innerHTML = `${newUser[0].userId}님`;
     document.getElementById("id2").innerHTML = `${newUser[1].userId}님`;
     document.getElementById("id3").innerHTML = `${newUser[2].userId}님`;
     document.getElementById("age1").innerHTML = `${newUser[0].userAge}세`;
     document.getElementById("age2").innerHTML = `${newUser[1].userAge}`;
     document.getElementById("age3").innerHTML = `${newUser[2].userAge}`;
     document.getElementById("pos1").innerHTML = `${newUser[0].userPos}`;
     document.getElementById("pos2").innerHTML = `${newUser[1].userPos}`;
     document.getElementById("pos3").innerHTML = `${newUser[2].userPos}`;
})
.catch((err) => {
    console.log(err);
});
