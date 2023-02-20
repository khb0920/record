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
