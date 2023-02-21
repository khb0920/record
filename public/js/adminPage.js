document.getElementById("registerMatchBtn").addEventListener("click", registerMatch);

function registerMatch() {

    const year = document.getElementById('year').value;
    const month = document.getElementById('month').value;
    const day = document.getElementById('day').value;
    const place = document.getElementById('place').value;
    const vs = document.getElementById('vs').value;

    if (!year) return alert("연도를 입력해주십시오.");
    if (!month) return alert("월을 입력해주십시오.");
    if (!day) return alert("일을 입력해주십시오.");
    if (!place) return alert("장소를 입력해주십시오.");
    if (!vs) return alert("상대팀명을 입력해주십시오.");

    fetch("/match/register", {
        method: "POST",
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            year:year,
            month:month,
            day:day,
            place:place,
            vs:vs,
        })
    })
        .then((res) => res.json())
        .then((res) => {
           if(res.success){
            alert("매치등록 완료");
            location.href ="/adminPage";
        } else {
            alert(res.msg);
        }
    })
    .catch((err) => {
        console.error("매치등록 중 에러 발생");
    }); 
};

document.getElementById("resultMatchBtn").addEventListener("click", resultMatch);

function resultMatch() {

    const ryear = document.getElementById('ryear').value;
    const rmonth = document.getElementById('rmonth').value;
    const rday = document.getElementById('rday').value;
    const score = document.getElementById('score').value;
    const loss = document.getElementById('loss').value;
    const result = document.getElementById('result').value;
    const rmvp = document.getElementById('rmvp').value;
    

    if (!ryear) return alert("년도를 입력해주십시오.");
    if (!rmonth) return alert("월을 입력해주십시오.");
    if (!rday) return alert("일을 입력해주십시오.");
    if (!score) return alert("득점을 입력해주십시오.");
    if (!loss) return alert("실점을 입력해주십시오.");
    if (!result) return alert("결과를 입력해주십시오.");
    if (!rmvp) return alert("mvp를 입력해주십시오.");
    

    fetch("/match/result", {
        method: "POST",
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            ryear:ryear,
            rmonth:rmonth,
            rday:rday,
            score:score,
            loss:loss,
            result:result,
            rmvp:rmvp,
        })
    })
        .then((res) => res.json())
        .then((res) => {
           if(res.success){
            alert("매치결과 등록 완료");
            location.href ="/adminPage";
        } else {
            alert(res.msg);
        }
        console.log(res);
    })
    .catch((err) => {
        console.error("매치결과등록 중 에러 발생");
    }); 
};

document.getElementById("recorduserBtn").addEventListener("click", recordUser);

function recordUser() {

    const username = document.getElementById('username').value;
    var goal = document.getElementById('goal').value;
    var assist = document.getElementById('assist').value;
    var mvp = document.getElementById('mvp').value;
    var save = document.getElementById('save').value;
    var partici = document.getElementById('partici').value;
    

    if (!username) return alert("회웡이름을 입력해주십시오.");
    if (!goal) var goal = '0';
    if (!assist) var assist ='0';
    if (!mvp) var mvp = '0';
    if (!save) var save ='0';
    if (!partici) var partici ='0';
    
    fetch("/match/record", {
        method: "POST",
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            username:username,
            goal:goal,
            assist:assist,
            mvp:mvp,
            save:save,
            partici:partici,
        })
    })
        .then((res) => res.json())
        .then((res) => {
           if(res.success){
            alert("매치기록 등록 완료");
            location.href ="/adminPage";
        } else {
            alert(res.msg);
        }
        console.log(res);
    })
    .catch((err) => {
        console.error("매치기록등록 중 에러 발생");
    }); 
};
